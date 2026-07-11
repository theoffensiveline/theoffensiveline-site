#!/usr/bin/env node
// Restore Firestore from a backup directory created by firestore-backup.js.
//
// Usage:
//   node scripts/firestore-restore.js <backup-dir | --latest> [options]
//
// Options:
//   --latest          use the most recent directory under backups/
//   --wipe            delete ALL existing collections before restoring
//   --project <id>    project id (default: theoffensiveline-d8493)
//   --production      required to touch production (no FIRESTORE_EMULATOR_HOST)
//   --force           skip the interactive production confirmation
//
// Every backup file is parsed and validated against manifest.json before any
// data is touched, so a corrupt or incomplete backup aborts with the target
// database intact.
//
// Examples:
//   FIRESTORE_EMULATOR_HOST=localhost:8080 pnpm db:restore --latest --wipe
//   pnpm db:restore backups/2026-07-11T09-00-00 --production
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const {
  DEFAULT_PROJECT_ID,
  initFirestore,
  isEmulator,
  targetDescription,
  deserializeValue,
  flagValue,
  countDocuments,
} = require("./lib/firestoreBackupShared");

function parseArgs(argv) {
  const args = {
    project: DEFAULT_PROJECT_ID,
    dir: null,
    latest: false,
    wipe: false,
    production: false,
    force: false,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project") args.project = flagValue(argv, ++i, "--project");
    else if (argv[i] === "--latest") args.latest = true;
    else if (argv[i] === "--wipe") args.wipe = true;
    else if (argv[i] === "--production") args.production = true;
    else if (argv[i] === "--force") args.force = true;
    else if (!argv[i].startsWith("--") && !args.dir) args.dir = argv[i];
    else {
      console.error(`Unknown argument: ${argv[i]}`);
      process.exit(1);
    }
  }
  if (args.dir && args.latest) {
    console.error("Pass either a backup directory or --latest, not both.");
    process.exit(1);
  }
  return args;
}

function resolveBackupDir(args) {
  if (args.dir) return args.dir;
  if (!args.latest) {
    console.error("Provide a backup directory or --latest. See header comment for usage.");
    process.exit(1);
  }
  const root = "backups";
  const entries = fs.existsSync(root)
    ? fs.readdirSync(root).filter((e) => fs.existsSync(path.join(root, e, "manifest.json")))
    : [];
  if (entries.length === 0) {
    console.error(`No backups found under ${root}/`);
    process.exit(1);
  }
  entries.sort();
  return path.join(root, entries[entries.length - 1]);
}

/**
 * Parse every collection file and cross-check it against manifest.json.
 * Runs before any database mutation — exits on the first inconsistency so a
 * truncated file or stray JSON can never be discovered mid-restore.
 */
function loadAndValidateBackup(backupDir) {
  const manifestPath = path.join(backupDir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.error(`${backupDir} is not a backup directory (no manifest.json)`);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  const files = fs
    .readdirSync(backupDir)
    .filter((f) => f.endsWith(".json") && f !== "manifest.json");
  const fileCollections = new Set(files.map((f) => f.replace(/\.json$/, "")));
  const manifestCollections = new Set(Object.keys(manifest.collections ?? {}));

  for (const name of manifestCollections) {
    if (!fileCollections.has(name)) {
      console.error(`Backup is incomplete: manifest lists "${name}" but ${name}.json is missing.`);
      process.exit(1);
    }
  }
  for (const name of fileCollections) {
    if (!manifestCollections.has(name)) {
      console.error(`Stray file ${name}.json is not listed in manifest.json — refusing to restore it.`);
      process.exit(1);
    }
  }

  const collections = [];
  for (const file of files) {
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(path.join(backupDir, file), "utf8"));
    } catch (err) {
      console.error(`Corrupt backup file ${file}: ${err.message}`);
      process.exit(1);
    }
    if (typeof parsed.collection !== "string" || !Array.isArray(parsed.documents)) {
      console.error(`Corrupt backup file ${file}: expected { collection, documents }.`);
      process.exit(1);
    }
    const expected = manifest.collections[parsed.collection];
    const actual = countDocuments(parsed.documents);
    if (actual !== expected) {
      console.error(
        `Corrupt backup file ${file}: contains ${actual} docs but manifest says ${expected}.`
      );
      process.exit(1);
    }
    collections.push(parsed);
  }
  return collections;
}

function confirm(question) {
  if (!process.stdin.isTTY) {
    console.error("stdin is not a TTY — cannot confirm interactively. Use --force to skip.");
    process.exit(1);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "yes");
    });
  });
}

async function wipeDatabase(db) {
  const collections = await db.listCollections();
  for (const col of collections) {
    console.log(`  wiping ${col.id}...`);
    await db.recursiveDelete(col);
  }
  // recursiveDelete uses BulkWriter internally, whose failures can be
  // swallowed — verify the postcondition instead of trusting it.
  const remaining = await db.listCollections();
  if (remaining.length > 0) {
    console.error(
      `Wipe incomplete — collections still present: ${remaining.map((c) => c.id).join(", ")}`
    );
    process.exit(1);
  }
}

function restoreDocs(db, writer, parentRef, docs, stats) {
  for (const doc of docs) {
    const ref = parentRef.doc(doc.id);
    // Phantom parents (subcollections only, no fields) have no data key —
    // recreating them via set() would turn them into real empty docs.
    if (doc.data !== undefined) {
      stats.queued++;
      // writer.close() never rejects; failures only surface on the per-write
      // promise, so each one must be tracked.
      writer.set(ref, deserializeValue(doc.data, db)).then(
        () => {
          stats.written++;
        },
        (err) => {
          stats.failures.push(`${ref.path}: ${err.message}`);
        }
      );
    }
    for (const [subName, subDocs] of Object.entries(doc.collections ?? {})) {
      restoreDocs(db, writer, ref.collection(subName), subDocs, stats);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const backupDir = resolveBackupDir(args);
  const collections = loadAndValidateBackup(backupDir);

  if (isEmulator() && args.production) {
    console.error(
      "--production passed but FIRESTORE_EMULATOR_HOST is set — these contradict. " +
        "Unset the env var to target production, or drop --production for the emulator."
    );
    process.exit(1);
  }

  if (!isEmulator()) {
    if (!args.production) {
      console.error(
        "Refusing to touch production without --production. " +
          "To use the emulator instead, set FIRESTORE_EMULATOR_HOST."
      );
      process.exit(1);
    }
    if (!args.force) {
      const ok = await confirm(
        `About to ${args.wipe ? "WIPE and " : ""}restore PRODUCTION (${args.project}) ` +
          `from ${backupDir}. Type "yes" to continue: `
      );
      if (!ok) {
        console.log("Aborted.");
        process.exit(1);
      }
    }
  }

  const { db, cleanup } = initFirestore(args.project);
  console.log(`Restoring ${targetDescription(args.project)} from ${backupDir}`);

  if (args.wipe) {
    console.log("Wiping existing data...");
    await wipeDatabase(db);
  }

  const writer = db.bulkWriter();
  const stats = { queued: 0, written: 0, failures: [] };
  for (const { collection, documents } of collections) {
    restoreDocs(db, writer, db.collection(collection), documents, stats);
    console.log(`  ${collection}: queued`);
  }
  await writer.close();

  if (stats.failures.length > 0 || stats.written !== stats.queued) {
    console.error(`RESTORE INCOMPLETE: ${stats.written}/${stats.queued} documents written.`);
    for (const failure of stats.failures) console.error(`  failed: ${failure}`);
    process.exit(1);
  }
  console.log(`Done. Restored ${stats.written} documents.`);
  await cleanup();
}

main().catch((err) => {
  console.error("Restore failed:", err);
  process.exit(1);
});

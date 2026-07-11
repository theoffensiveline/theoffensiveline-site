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
    if (argv[i] === "--project") args.project = argv[++i];
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

function confirm(question) {
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
}

function restoreDocs(db, writer, parentRef, docs, stats) {
  for (const doc of docs) {
    const ref = parentRef.doc(doc.id);
    // Phantom parents (subcollections only, no fields) have no data key —
    // recreating them via set() would turn them into real empty docs.
    if (doc.data !== undefined) {
      writer.set(ref, deserializeValue(doc.data, db));
      stats.count++;
    }
    for (const [subName, subDocs] of Object.entries(doc.collections ?? {})) {
      restoreDocs(db, writer, ref.collection(subName), subDocs, stats);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const backupDir = resolveBackupDir(args);

  if (!fs.existsSync(path.join(backupDir, "manifest.json"))) {
    console.error(`${backupDir} is not a backup directory (no manifest.json)`);
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

  const files = fs
    .readdirSync(backupDir)
    .filter((f) => f.endsWith(".json") && f !== "manifest.json");
  const writer = db.bulkWriter();
  const stats = { count: 0 };
  for (const file of files) {
    const { collection, documents } = JSON.parse(
      fs.readFileSync(path.join(backupDir, file), "utf8")
    );
    restoreDocs(db, writer, db.collection(collection), documents, stats);
    console.log(`  ${collection}: queued`);
  }
  await writer.close();
  console.log(`Done. Restored ${stats.count} documents.`);
  await cleanup();
}

main().catch((err) => {
  console.error("Restore failed:", err);
  process.exit(1);
});

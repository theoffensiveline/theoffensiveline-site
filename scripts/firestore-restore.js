#!/usr/bin/env node
// Restore Firestore from a backup directory created by firestore-backup.js.
//
// Usage:
//   node scripts/firestore-restore.js <backup-dir | --latest> [options]
//
// Options:
//   --latest                use the most recent directory under <repo>/backups/
//                           (backups written with --out are not discovered)
//   --wipe                  delete ALL existing collections before restoring
//   --project <id>          project id (default: theoffensiveline-d8493)
//   --production            required to touch production (no FIRESTORE_EMULATOR_HOST)
//   --force                 skip the interactive production confirmation
//   --allow-source-mismatch permit restoring a backup into a different
//                           project/host than it was taken from
//
// Every backup file is parsed, validated against manifest.json, and
// dry-run deserialized before any data is touched, so a corrupt or
// incomplete backup aborts with the target database intact. The restore
// itself is not atomic — take a fresh backup of the target before any
// --wipe restore so an interrupted run can be rolled back.
//
// Examples:
//   FIRESTORE_EMULATOR_HOST=localhost:8080 pnpm db:restore --latest --wipe
//   pnpm db:restore backups/2026-07-11T09-00-00 --production
const readline = require("readline");
const {
  DEFAULT_PROJECT_ID,
  initFirestore,
  isEmulator,
  targetDescription,
  deserializeValue,
  flagValue,
  resolveBackupDir,
  loadAndValidateBackup,
  backupSource,
  sourceMatchesTarget,
} = require("./lib/firestoreBackupShared");

function parseArgs(argv) {
  const args = {
    project: DEFAULT_PROJECT_ID,
    dir: null,
    latest: false,
    wipe: false,
    production: false,
    force: false,
    allowSourceMismatch: false,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project") args.project = flagValue(argv, ++i, "--project");
    else if (argv[i] === "--latest") args.latest = true;
    else if (argv[i] === "--wipe") args.wipe = true;
    else if (argv[i] === "--production") args.production = true;
    else if (argv[i] === "--force") args.force = true;
    else if (argv[i] === "--allow-source-mismatch") args.allowSourceMismatch = true;
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

// Deserializing malformed markers (e.g. a hand-edited timestamp missing its
// seconds) throws synchronously; prove the whole backup deserializes before
// wiping or writing anything.
function assertDeserializable(db, docs, prefix) {
  for (const doc of docs) {
    const docPath = `${prefix}/${doc.id}`;
    if (doc.data !== undefined) {
      try {
        deserializeValue(doc.data, db);
      } catch (err) {
        console.error(`Backup contains an unrestorable value at ${docPath}: ${err.message}`);
        process.exit(1);
      }
    }
    for (const [subName, subDocs] of Object.entries(doc.collections ?? {})) {
      assertDeserializable(db, subDocs, `${docPath}/${subName}`);
    }
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
  const { manifest, collections } = loadAndValidateBackup(backupDir);

  // Provenance guard: the backup records where it was taken from. Writing an
  // emulator or wrong-project backup into production is almost always a
  // mistake; restoring production backups into the emulator is routine.
  if (!sourceMatchesTarget(manifest, args.project)) {
    const mismatch =
      `Backup was taken from ${backupSource(manifest)} but the target is ` +
      `${targetDescription(args.project)}.`;
    if (!isEmulator() && !args.allowSourceMismatch) {
      console.error(`${mismatch} Pass --allow-source-mismatch if this is intentional.`);
      process.exit(1);
    }
    console.warn(`Warning: ${mismatch}`);
  }

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

  for (const { collection, documents } of collections) {
    assertDeserializable(db, documents, collection);
  }

  if (args.wipe) {
    console.log("Wiping existing data...");
    await wipeDatabase(db);
  }

  const writer = db.bulkWriter();
  const stats = { queued: 0, written: 0, failures: [] };
  try {
    for (const { collection, documents } of collections) {
      restoreDocs(db, writer, db.collection(collection), documents, stats);
      console.log(`  ${collection}: queued`);
    }
  } catch (err) {
    // writer.set() can throw synchronously (Firestore-side data validation);
    // still flush what was queued so the failure report below is accurate.
    stats.failures.push(`enqueue aborted: ${err.message}`);
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

#!/usr/bin/env node
// Export every Firestore collection (including subcollections) to timestamped
// JSON files under backups/.
//
// Usage:
//   node scripts/firestore-backup.js [--project <id>] [--out <dir>]
//
// Backups default to <repo>/backups/, which is the only place restore and
// validate's --latest looks — treat --out as scratch, not primary storage.
//
// Targets the emulator when FIRESTORE_EMULATOR_HOST is set, otherwise
// production via Application Default Credentials:
//   pnpm db:backup                                        # production
//   FIRESTORE_EMULATOR_HOST=localhost:8080 pnpm db:backup # emulator
const fs = require("fs");
const path = require("path");
const {
  DEFAULT_PROJECT_ID,
  initFirestore,
  targetDescription,
  flagValue,
  countDocuments,
  dumpCollection,
  DEFAULT_BACKUP_ROOT,
} = require("./lib/firestoreBackupShared");

function parseArgs(argv) {
  const args = { project: DEFAULT_PROJECT_ID, out: DEFAULT_BACKUP_ROOT };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project") args.project = flagValue(argv, ++i, "--project");
    else if (argv[i] === "--out") args.out = flagValue(argv, ++i, "--out");
    else {
      console.error(`Unknown argument: ${argv[i]}`);
      process.exit(1);
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { db, cleanup } = initFirestore(args.project);
  console.log(`Backing up ${targetDescription(args.project)}`);

  const stamp = new Date().toISOString().replace(/:/g, "-").replace(/\..*/, "");
  const outDir = path.join(args.out, stamp);
  if (fs.existsSync(outDir)) {
    console.error(`${outDir} already exists — refusing to overwrite a previous backup.`);
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const collections = await db.listCollections();
  const manifest = {
    createdAt: new Date().toISOString(),
    projectId: args.project,
    emulatorHost: process.env.FIRESTORE_EMULATOR_HOST ?? null,
    collections: {},
  };

  for (const col of collections) {
    const docs = await dumpCollection(col);
    const file = path.join(outDir, `${col.id}.json`);
    fs.writeFileSync(
      file,
      JSON.stringify({ collection: col.id, documents: docs }, null, 2)
    );
    manifest.collections[col.id] = countDocuments(docs);
    console.log(`  ${col.id}: ${manifest.collections[col.id]} docs → ${file}`);
  }

  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  const total = Object.values(manifest.collections).reduce((a, b) => a + b, 0);
  console.log(`Done. ${total} documents in ${outDir}`);
  await cleanup();
}

main().catch((err) => {
  console.error("Backup failed:", err);
  process.exit(1);
});

#!/usr/bin/env node
// Export every Firestore collection (including subcollections) to timestamped
// JSON files under backups/.
//
// Usage:
//   node scripts/firestore-backup.js [--project <id>] [--out <dir>]
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
  serializeValue,
} = require("./lib/firestoreBackupShared");

function parseArgs(argv) {
  const args = { project: DEFAULT_PROJECT_ID, out: "backups" };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project") args.project = argv[++i];
    else if (argv[i] === "--out") args.out = argv[++i];
    else {
      console.error(`Unknown argument: ${argv[i]}`);
      process.exit(1);
    }
  }
  return args;
}

async function dumpDocument(docSnap) {
  const entry = { id: docSnap.id, data: serializeValue(docSnap.data()) };
  const subcollections = await docSnap.ref.listCollections();
  if (subcollections.length > 0) {
    entry.collections = {};
    for (const sub of subcollections) {
      entry.collections[sub.id] = await dumpCollection(sub);
    }
  }
  return entry;
}

async function dumpCollection(collectionRef) {
  const snapshot = await collectionRef.get();
  // Docs with subcollections but no fields don't appear in collection gets;
  // listDocuments() includes them so nested data isn't silently skipped.
  const allRefs = await collectionRef.listDocuments();
  const seen = new Set(snapshot.docs.map((d) => d.id));
  const docs = [];
  for (const docSnap of snapshot.docs) docs.push(await dumpDocument(docSnap));
  for (const ref of allRefs) {
    if (!seen.has(ref.id)) docs.push(await dumpDocument(await ref.get()));
  }
  return docs;
}

function countDocs(docs) {
  let total = docs.length;
  for (const doc of docs) {
    for (const sub of Object.values(doc.collections ?? {})) total += countDocs(sub);
  }
  return total;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { db, cleanup } = initFirestore(args.project);
  console.log(`Backing up ${targetDescription(args.project)}`);

  const stamp = new Date().toISOString().replace(/:/g, "-").replace(/\..*/, "");
  const outDir = path.join(args.out, stamp);
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
    manifest.collections[col.id] = countDocs(docs);
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

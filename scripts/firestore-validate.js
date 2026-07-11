#!/usr/bin/env node
// Verify that a local backup matches the live Firestore database, document
// by document. Read-only — safe to run against production.
//
// Usage:
//   node scripts/firestore-validate.js <backup-dir | --latest> [--project <id>]
//
// Targets the emulator when FIRESTORE_EMULATOR_HOST is set, otherwise
// production via Application Default Credentials. Exits 0 when the backup
// and the database are identical, 1 with a diff report otherwise.
//
// Examples:
//   pnpm db:validate --latest                              # against production
//   FIRESTORE_EMULATOR_HOST=localhost:8080 pnpm db:validate --latest
const {
  DEFAULT_PROJECT_ID,
  initFirestore,
  targetDescription,
  flagValue,
  dumpCollection,
  resolveBackupDir,
  loadAndValidateBackup,
  backupSource,
  sourceMatchesTarget,
} = require("./lib/firestoreBackupShared");

function parseArgs(argv) {
  const args = { project: DEFAULT_PROJECT_ID, dir: null, latest: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--project") args.project = flagValue(argv, ++i, "--project");
    else if (argv[i] === "--latest") args.latest = true;
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

/** JSON.stringify with sorted object keys, so field order can't cause diffs. */
function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

// Flatten dumped docs into "collection/doc[/subcollection/doc...]" →
// canonical JSON. Phantom parents (no data key) get a sentinel so a phantom
// and an empty-but-real doc still compare as different.
function flatten(docs, prefix, map) {
  for (const doc of docs) {
    const docPath = `${prefix}/${doc.id}`;
    map.set(docPath, doc.data === undefined ? "<phantom>" : stableStringify(doc.data));
    for (const [subName, subDocs] of Object.entries(doc.collections ?? {})) {
      flatten(subDocs, `${docPath}/${subName}`, map);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const backupDir = resolveBackupDir(args);
  const { manifest, collections: backupCollections } = loadAndValidateBackup(backupDir);

  const { db, cleanup } = initFirestore(args.project);
  console.log(`Validating ${backupDir} against ${targetDescription(args.project)}`);
  if (!sourceMatchesTarget(manifest, args.project)) {
    console.warn(
      `Warning: this backup was taken from ${backupSource(manifest)}, ` +
        `not from the target being validated — differences are expected.`
    );
  }

  const backupMap = new Map();
  for (const { collection, documents } of backupCollections) {
    flatten(documents, collection, backupMap);
  }

  const liveMap = new Map();
  for (const col of await db.listCollections()) {
    flatten(await dumpCollection(col), col.id, liveMap);
  }

  const onlyInBackup = [...backupMap.keys()].filter((p) => !liveMap.has(p));
  const onlyInLive = [...liveMap.keys()].filter((p) => !backupMap.has(p));
  const mismatched = [...backupMap.keys()].filter(
    (p) => liveMap.has(p) && liveMap.get(p) !== backupMap.get(p)
  );

  if (onlyInBackup.length === 0 && onlyInLive.length === 0 && mismatched.length === 0) {
    console.log(`OK: backup matches the database exactly (${liveMap.size} documents).`);
    await cleanup();
    return;
  }

  console.error("MISMATCH between backup and database:");
  for (const p of onlyInBackup) console.error(`  only in backup:   ${p}`);
  for (const p of onlyInLive) console.error(`  only in database: ${p}`);
  for (const p of mismatched) console.error(`  differs:          ${p}`);
  console.error(
    `${onlyInBackup.length} missing from database, ${onlyInLive.length} not in backup, ` +
      `${mismatched.length} with different contents.`
  );
  console.error(
    "If the app was writing during validation, re-run to rule out transient differences."
  );
  process.exit(1);
}

main().catch((err) => {
  console.error("Validate failed:", err);
  process.exit(1);
});

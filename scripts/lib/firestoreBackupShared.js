// Shared helpers for the Firestore backup/restore/validate scripts in
// scripts/. Node-only — do not import from src/.
const fs = require("fs");
const path = require("path");
const { initializeApp, deleteApp } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  GeoPoint,
  DocumentReference,
} = require("firebase-admin/firestore");

const DEFAULT_PROJECT_ID = "theoffensiveline-d8493";

/**
 * Initialize firebase-admin. If FIRESTORE_EMULATOR_HOST is set, the SDK
 * talks to the emulator and no credentials are needed. Otherwise it uses
 * Application Default Credentials (gcloud auth application-default login
 * or GOOGLE_APPLICATION_CREDENTIALS).
 */
function initFirestore(projectId) {
  const app = initializeApp({ projectId });
  const db = getFirestore(app);
  return { app, db, cleanup: () => deleteApp(app) };
}

function isEmulator() {
  return Boolean(process.env.FIRESTORE_EMULATOR_HOST);
}

/** Read the value following a flag, erroring if it's missing or another flag. */
function flagValue(argv, i, name) {
  const v = argv[i];
  if (v === undefined || v.startsWith("--")) {
    console.error(`Missing value for ${name}`);
    process.exit(1);
  }
  return v;
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

/** Resolve an explicit backup dir or the newest one under backups/. */
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
 * Exits on the first inconsistency so a truncated file or stray JSON is
 * caught before anything acts on the backup.
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
      console.error(`Stray file ${name}.json is not listed in manifest.json — refusing to use it.`);
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

/** Total documents in a dumped collection, including nested subcollections. */
function countDocuments(docs) {
  let total = docs.length;
  for (const doc of docs) {
    for (const sub of Object.values(doc.collections ?? {})) {
      total += countDocuments(sub);
    }
  }
  return total;
}

function targetDescription(projectId) {
  return isEmulator()
    ? `EMULATOR at ${process.env.FIRESTORE_EMULATOR_HOST} (project ${projectId})`
    : `PRODUCTION project ${projectId}`;
}

// Firestore values that don't survive JSON round-trips are wrapped in
// { "__fs": <type>, ... } markers. Timestamps keep seconds+nanoseconds so
// the round trip is lossless.
function serializeValue(value) {
  if (value === null || value === undefined) return value;
  // NaN/Infinity are valid Firestore numbers but JSON.stringify turns them
  // into null — encode them explicitly so they survive the round trip.
  if (typeof value === "number" && !Number.isFinite(value)) {
    return { __fs: "number", value: String(value) };
  }
  if (value instanceof Timestamp) {
    return {
      __fs: "timestamp",
      seconds: value.seconds,
      nanoseconds: value.nanoseconds,
    };
  }
  if (value instanceof GeoPoint) {
    return { __fs: "geopoint", latitude: value.latitude, longitude: value.longitude };
  }
  if (value instanceof DocumentReference) {
    return { __fs: "ref", path: value.path };
  }
  if (value instanceof Buffer || value instanceof Uint8Array) {
    return { __fs: "bytes", base64: Buffer.from(value).toString("base64") };
  }
  if (Array.isArray(value)) return value.map(serializeValue);
  if (typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = serializeValue(v);
    // A user map that happens to contain a literal "__fs" key would be
    // mistaken for a type marker on restore — wrap it to disambiguate.
    if (Object.prototype.hasOwnProperty.call(value, "__fs")) {
      return { __fs: "map", value: out };
    }
    return out;
  }
  return value;
}

function deserializeValue(value, db) {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((v) => deserializeValue(v, db));
  if (typeof value === "object") {
    switch (value.__fs) {
      case "timestamp":
        return new Timestamp(value.seconds, value.nanoseconds);
      case "geopoint":
        return new GeoPoint(value.latitude, value.longitude);
      case "ref":
        return db.doc(value.path);
      case "bytes":
        return Buffer.from(value.base64, "base64");
      case "number":
        return Number(value.value);
      case "map": {
        // Escaped user map whose own keys include "__fs" — deserialize its
        // entries directly so the wrapper isn't re-parsed as a marker.
        const out = {};
        for (const [k, v] of Object.entries(value.value)) {
          out[k] = deserializeValue(v, db);
        }
        return out;
      }
      default: {
        const out = {};
        for (const [k, v] of Object.entries(value)) out[k] = deserializeValue(v, db);
        return out;
      }
    }
  }
  return value;
}

module.exports = {
  DEFAULT_PROJECT_ID,
  initFirestore,
  isEmulator,
  targetDescription,
  serializeValue,
  deserializeValue,
  flagValue,
  countDocuments,
  dumpCollection,
  resolveBackupDir,
  loadAndValidateBackup,
};

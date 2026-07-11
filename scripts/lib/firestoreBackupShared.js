// Shared helpers for the Firestore backup/restore scripts (scripts/firestore-backup.js,
// scripts/firestore-restore.js). Node-only — do not import from src/.
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
};

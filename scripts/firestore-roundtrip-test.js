#!/usr/bin/env node
// Integration test for the backup/restore/validate scripts: seeds every
// Firestore value type (plus adversarial cases) into an emulator, then runs
// backup → wipe+restore → backup → validate through the real CLIs and
// asserts a lossless round trip. Exits 0 on pass, 1 on any failure.
//
// Requires a running emulator:
//   FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/firestore-roundtrip-test.js
//
// Uses its own project namespace (demo-roundtrip-test), so running it
// against your dev emulator won't touch dev data.
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { initializeApp, deleteApp } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  GeoPoint,
  FieldValue,
} = require("firebase-admin/firestore");

const PROJECT = "demo-roundtrip-test";
const SCRIPTS = __dirname;

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  console.error("Refusing to run: FIRESTORE_EMULATOR_HOST is not set. This test wipes data.");
  process.exit(1);
}

let failures = 0;
function check(label, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}: ${label}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) failures++;
}

function runCli(script, args, opts = {}) {
  try {
    const stdout = execFileSync("node", [path.join(SCRIPTS, script), ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { status: 0, output: stdout };
  } catch (err) {
    if (opts.expectFailure) {
      return { status: err.status ?? 1, output: `${err.stdout ?? ""}${err.stderr ?? ""}` };
    }
    console.error(`FAIL: ${script} ${args.join(" ")} exited ${err.status}`);
    console.error(err.stdout ?? "", err.stderr ?? "");
    process.exit(1);
  }
}

async function seed(db) {
  // Wipe the test project namespace so reruns start clean.
  for (const col of await db.listCollections()) {
    await db.recursiveDelete(col);
  }

  await db.doc("users/user1").set({
    string: "hello",
    bool: true,
    int: 42,
    double: 42.5,
    nullField: null,
    nan: NaN,
    posInf: Infinity,
    negInf: -Infinity,
    timestamp: new Timestamp(1751000000, 123456000),
    geopoint: new GeoPoint(40.7128, -74.006),
    ref: db.doc("leagues/league1"),
    bytes: Buffer.from("hello bytes"),
    array: [1, "two", NaN, new Timestamp(1752000000, 0), { nested: true }],
    map: { deep: { deeper: [new GeoPoint(1, 2)] } },
  });
  // Adversarial: user data shaped like our own __fs type markers.
  await db.doc("users/hostile").set({
    fakeTimestamp: { __fs: "timestamp", seconds: 1, nanoseconds: 2 },
    fakeMapWrapper: { __fs: "map", value: { sneaky: true } },
    benignFsKey: { __fs: "hello" },
    nested: { deep: { __fs: "bytes", base64: "bm90IHJlYWw=" } },
  });
  await db.doc("leagues/league1").set({ name: "Test League" });
  await db.doc("leagues/league1/newsletters/week1").set({ published: true });
  // Phantom parent: league2 exists only via its subcollection.
  await db.doc("leagues/league2/newsletters/week1").set({ published: false });
  await db.doc("empty/realEmptyDoc").set({});
}

async function main() {
  const app = initializeApp({ projectId: PROJECT });
  const db = getFirestore(app);
  await seed(db);
  console.log("Seeded type zoo.");

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ff-roundtrip-"));
  const outA = path.join(tmp, "a");
  const outB = path.join(tmp, "b");

  runCli("firestore-backup.js", ["--project", PROJECT, "--out", outA]);
  const dirA = path.join(outA, fs.readdirSync(outA)[0]);
  runCli("firestore-restore.js", [dirA, "--project", PROJECT, "--wipe"]);
  runCli("firestore-backup.js", ["--project", PROJECT, "--out", outB]);
  const dirB = path.join(outB, fs.readdirSync(outB)[0]);

  for (const file of fs.readdirSync(dirA).filter((f) => f !== "manifest.json")) {
    const a = fs.readFileSync(path.join(dirA, file), "utf8");
    const b = fs.readFileSync(path.join(dirB, file), "utf8");
    check(`${file} identical after wipe+restore`, a === b);
  }

  const validate = runCli("firestore-validate.js", [dirA, "--project", PROJECT]);
  check("validate reports OK", validate.output.includes("OK: backup matches"));

  // Type-level assertions on the restored data, beyond byte equality.
  const restored = (await db.doc("users/user1").get()).data();
  check("NaN restored as NaN", Number.isNaN(restored.nan));
  check("Infinity restored", restored.posInf === Infinity && restored.negInf === -Infinity);
  check("Timestamp type restored", restored.timestamp instanceof Timestamp);
  check("Timestamp value exact", restored.timestamp.isEqual(new Timestamp(1751000000, 123456000)));
  check("GeoPoint restored", restored.geopoint instanceof GeoPoint);
  check("ref restored as reference", restored.ref?.path === "leagues/league1");
  check("bytes restored", Buffer.isBuffer(restored.bytes) && restored.bytes.toString() === "hello bytes");
  const hostile = (await db.doc("users/hostile").get()).data();
  check(
    "fake markers restored as plain maps",
    !(hostile.fakeTimestamp instanceof Timestamp) && hostile.fakeTimestamp.seconds === 1
  );
  check("fake map wrapper unwrapped correctly", hostile.fakeMapWrapper.value.sneaky === true);
  const phantom = await db.doc("leagues/league2").get();
  check("phantom parent not materialized", !phantom.exists);
  const emptyDoc = await db.doc("empty/realEmptyDoc").get();
  check("real empty doc restored", emptyDoc.exists);

  // Unsupported Firestore types must fail the backup loudly, not corrupt it.
  let vectorSeeded = false;
  try {
    await db.doc("vectors/v1").set({ embedding: FieldValue.vector([1, 2, 3]) });
    vectorSeeded = true;
  } catch {
    console.log("SKIP: emulator rejected vector write; unsupported-type test skipped.");
  }
  if (vectorSeeded) {
    const result = runCli(
      "firestore-backup.js",
      ["--project", PROJECT, "--out", path.join(tmp, "c")],
      { expectFailure: true }
    );
    check(
      "backup rejects unsupported value type",
      result.status !== 0 && result.output.includes("unsupported Firestore value type"),
      result.output.slice(0, 200)
    );
    await db.doc("vectors/v1").delete();
  }

  fs.rmSync(tmp, { recursive: true, force: true });
  await deleteApp(app);
  if (failures > 0) {
    console.error(`${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("All round-trip checks passed.");
}

main().catch((err) => {
  console.error("Round-trip test failed:", err);
  process.exit(1);
});

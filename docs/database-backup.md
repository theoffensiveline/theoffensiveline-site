# Database Backup, Restore & Validate

Maintenance tooling for the Firestore database. All commands run from the
repo root; the scripts live in `scripts/` and are Node-only (never bundled
into the site).

| Command | What it does | Writes to the DB? |
| --- | --- | --- |
| `pnpm db:backup` | Export every collection to JSON + zip | No |
| `pnpm db:validate --latest` | Compare a backup doc-by-doc against the live DB | No |
| `pnpm db:restore <dir\|--latest>` | Write a backup back into the DB | **Yes** |
| `pnpm db:roundtrip-test` | Integration test of all three (emulator only) | Emulator only |

Every command targets the **emulator** when `FIRESTORE_EMULATOR_HOST` is
set, otherwise **production** via Application Default Credentials.

## One-time setup (production access)

```bash
brew install --cask google-cloud-sdk   # then restart the terminal
gcloud auth application-default login  # sign in with the project owner account
```

If a command later complains about a quota project:

```bash
gcloud auth application-default set-quota-project theoffensiveline-d8493
```

## Taking a production backup

```bash
echo $FIRESTORE_EMULATOR_HOST   # must print nothing — unset it if not
pnpm db:backup
pnpm db:validate --latest       # certify the backup matches prod exactly
```

Expect `Backing up PRODUCTION project theoffensiveline-d8493`, per-collection
doc counts, then `OK: backup matches the database exactly (N documents)`
from validate. A stray `differs` line usually means the app wrote during the
run — re-run validate and it should clear.

Output lands in `backups/<timestamp>/` (one readable JSON file per
collection plus `manifest.json`) with a `.zip` sibling for offsite copies.
`backups/` is gitignored.

> **Backups contain secrets.** The `config` collection holds Discord webhook
> URLs. Treat backup directories and zips as private — fine on this machine,
> but don't put them anywhere public.

## Restoring

Restore reads backup **directories**, not zips. If starting from an offsite
zip, unzip it into `backups/` first (it contains the timestamped folder):

```bash
unzip 2026-07-11T23-01-15.zip -d backups/
```

**Into the local emulator** (routine — e.g. seeding dev with prod data):

```bash
FIRESTORE_EMULATOR_HOST=localhost:8080 pnpm db:restore --latest --wipe
```

**Into production** (disaster recovery):

```bash
# 1. Always snapshot the current state first, even if it's broken —
#    restore is not atomic, and this is the rollback if it's interrupted.
pnpm db:backup

# 2. Restore. You'll be prompted to type "yes".
pnpm db:restore backups/<timestamp> --production --wipe
```

Safety rails, in the order they fire:

- Every file is parsed, cross-checked against the manifest, and dry-run
  deserialized **before** anything is wiped or written — a corrupt backup
  aborts with the database untouched.
- A backup taken from the emulator (or another project) is refused for
  production targets unless you pass `--allow-source-mismatch`.
- `--production` is required for any non-emulator target, plus an
  interactive confirmation (`--force` skips it, e.g. for scripts).
- Failed writes are tracked individually; an incomplete restore reports
  `RESTORE INCOMPLETE: n/m documents written` and exits 1.

`--latest` only scans `<repo>/backups/`; backups written with `--out` are
not discovered — treat `--out` as scratch.

## Round-trip test

Verifies that every Firestore type (Timestamp, GeoPoint, references, Bytes,
NaN/±Infinity, nested maps/arrays, phantom parents, adversarial data shaped
like the serialization markers) survives backup → wipe → restore losslessly,
driving the real CLIs:

```bash
FIRESTORE_EMULATOR_HOST=localhost:8080 pnpm db:roundtrip-test
```

It refuses to run without an emulator and uses its own project namespace
(`demo-roundtrip-test`), so it's safe alongside dev data on the shared
emulator. Run it after any change to `scripts/`.

## Known limits

- **Not atomic / not point-in-time.** Collections are read and written over
  a span of seconds; concurrent app writes can produce torn snapshots or
  transient validate diffs. Fine at this database's size.
- **Unsupported field types fail loudly.** Anything the serializer doesn't
  recognize (e.g. vector embeddings) aborts the backup naming the document,
  rather than silently corrupting it.
- **Integer precision.** Fields beyond 2^53 have already lost precision in
  the SDK before the backup sees them; the backup warns but can't recover it.

# Security advisory: malicious code present in Neotree repositories, April–August 2026

**Published:** 30 August 2026
**Status:** resolved — repositories cleaned, history rewritten and verified
**Affects:** anyone who cloned, forked or downloaded the repositories listed below during the stated periods

---

## Summary

Between April and August 2026, an obfuscated malicious loader was introduced into
several Neotree repositories by an unauthorised party using stolen developer
credentials. In four repositories the code was present **on the default branch**,
which means it was included in ordinary clones and downloads.

The repositories have been cleaned and verified. This advisory exists so that
anyone who obtained a copy during the affected period can check it and respond.
We have no way to identify who cloned the repositories, which is why this notice
is published rather than sent.

## Affected repositories and periods

The malicious code was present on the **default branch** — the branch you get
from a normal `git clone` — during these periods:

| Repository | Branch | File | Present from | Removed |
|---|---|---|---|---|
| `neotree-editor` | `master` | `postcss.config.mjs` | 30 April 2026 | 16 August 2026 |
| `dhis-integration` | `main` | `app.js` | 15 July 2026 | 25 August 2026 |
| `node-api` | `master` | `index.js` | 16 July 2026 | 25 August 2026 |
| `neotree-impilo-shr-adapter` | `master` | `src/fhir-adapter/index.ts` | 16 July 2026 | 25 August 2026 |

Additional non-default branches in these repositories were also affected and have
been cleaned. Two repositories, `neotree` and `neotree-react-native-app`, were
affected on other branches but **never on their default branch**.

If you cloned any of the four repositories above between the dates shown, your
copy contains the malicious file.

**A copy taken at any point before 28 August 2026 may still carry the affected
commits in its history**, even if the file itself was already gone from the files
you see. The repository history was rewritten on 27–28 August; before that, the
old commits remained in every clone. If in doubt, check — the third command
below searches history rather than only the current files.

## What the code does

The loader is inserted into an existing source file, preceded by a long run of
whitespace so that it sits off-screen in most editors and diff views. In some
files it also adds two short lines at the very top, so it is worth looking at
both ends of a suspect file rather than only the bottom.

- It executes **when the project is built or run** — not when it is cloned or
  downloaded. Simply holding a copy does not run it.
- On execution it contacts external infrastructure and retrieves further code.
- It attempts to collect credentials and authentication material from the machine
  it runs on, including tokens and keys belonging to unrelated projects.
- It attempts to re-establish itself if removed.

**The risk is to the machine that builds or runs the code, not to the copy at
rest.**

## How to check a copy you already have

From the root of your clone:

```bash
grep -rlF "$(printf '%500s' '')" . \
  --include='*.js' --include='*.mjs' --include='*.ts' --include='*.jsx' --include='*.tsx'
```

Any file listed contains the padding signature and should be treated as affected.
This test looks for the structure of the insertion rather than any particular
variant of it, and does not depend on knowing which version you have.

The padding in the observed samples runs to two thousand characters or more. The
test above deliberately looks for a shorter run of 500, for two reasons: it stays
well inside the limits of every `grep` implementation, and it leaves margin. A
test set to the exact observed length would have no tolerance at all, and would
miss a variant even slightly shorter. A run of 500 spaces is still far longer
than any legitimate formatting.

**Keep the `--include` filters.** The signature is structural, so binary files —
images especially — can contain a matching run of bytes by pure chance. Limiting
the search to source files is what prevents false alarms, and it does not affect
the test's ability to find the real thing.

**Do not rewrite this as a regular expression such as `' {2000,}'`.** BSD `grep`,
which is what macOS ships, rejects interval repetition above 255 — on some shells
it fails silently and reports the copy clean. The fixed-string form above (`-F`,
built with `printf`) behaves identically on GNU and BSD systems.

That command checks only the files currently checked out. To check the current
files on **every branch**, run this from inside the repository:

```bash
PAD="$(printf '%500s' '')"
for ref in $(git for-each-ref --format='%(refname)' refs/heads refs/remotes); do
  git grep -qF "$PAD" "$ref" -- '*.js' '*.mjs' '*.ts' '*.jsx' '*.tsx' 2>/dev/null \
    && echo "affected: $ref"
done
```

Neither of those looks into **history**. A clone can have clean files on every
branch and still carry the affected commits behind them — which is exactly the
state Neotree's own repositories were in between 25 and 27 August. To search the
history itself:

```bash
PAD="$(printf '%500s' '')"
git log --all -S"$PAD" --oneline -- '*.js' '*.mjs' '*.ts' '*.jsx' '*.tsx'
```

Any commit listed introduced or removed the padding signature. On a clean copy
this returns nothing.

If all three commands return nothing, the copy is clean. **If only the third
returns anything, the files you would build are clean but the affected commits
are still present in the repository** — delete the copy and clone afresh rather
than attempting to remove them.

## What to do

**Do not simply `git pull` an existing clone.** The history of all six
repositories was rewritten on 27–28 August 2026, so every commit identifier has
changed. Pulling into an older clone attempts to merge the old history back in,
which reintroduces the affected commits — while looking like an ordinary update.
Delete the old copy and clone afresh.

**If you hold a clone but never built or ran it** — delete it and clone again.
The current repositories are clean. No further action is needed.

**If you built or ran the affected code** — treat the machine as compromised:

1. Disconnect it from networks you care about.
2. Rotate every credential that was available to that machine — not only Neotree
   ones. This includes cloud provider keys, package registry tokens, SSH keys,
   personal access tokens, and saved browser credentials.
3. Revoke active sessions and authorised applications on your source control and
   cloud accounts.
4. Rebuild the machine rather than cleaning it. The loader is designed to
   reinstate itself.
5. Check for outbound connections and for repository history rewrites originating
   from that machine.

**If you operate a Neotree deployment** — Neotree's own deployments were rebuilt
from cleaned sources on 26 August 2026, and repository history was rewritten on
27–28 August; bringing Neotree's server checkouts onto the rewritten history is in
progress. If you run your own instance built from these repositories during the
affected period, rebuild it from current sources rather than updating in place.

## What has been done

- All affected branches across all repositories have been cleaned, and the result
  independently verified against fresh copies retrieved from GitHub.
- Repository history was rewritten on 27–28 August so that the malicious code is
  absent from the commit record itself, not merely removed by a later commit.
- All deployments have been rebuilt from clean sources. **Source-control
  credentials and all database passwords have been rotated. A defined set of
  further credential rotations is in progress.**
- Protection against history rewriting has been applied to every branch that is
  deployed from.
- Access permissions have been reduced so that contributors hold write access only
  where they actually work.
- Automated scanning for vulnerable dependencies, committed secrets and code
  defects has been enabled across the organisation.

## A note on mirror clones and scanners

Two things may still surface the original code until GitHub completes its own
removal, which has been requested:

- **Historical pull-request references** retained by GitHub.
- **Commits no longer reachable from any branch**, which remain resolvable by
  their commit identifier for a period after a history rewrite.

Neither is retrieved by a normal `git clone` or `git pull`, and neither can be
deployed from. Reaching them requires either a full mirror clone or already
knowing a specific commit identifier.

If you run a security scanner that performs a mirror clone, it may flag these.
That is expected, and it is not an indication that the current code is affected.

## Reporting

If you find anything further, or if you believe you were affected and want help
assessing it, please use the private reporting channel described in `SECURITY.md`.
We would rather hear about it.

# Changelog

## 0.1.0 — 2026-10-30

- **The records leave the BelType monorepo.** `project/` (25 records) and `cicero/` (101 records), with their READMEs, are copied from `.claude/decisions/` of `github.com/egildo/beltype` at 42b348b5.
- **153 links out of the records are pinned** to `https://github.com/egildo/beltype/{blob,tree}/42b348b5…/<path>`, each one checked to exist at that commit. Links between the two records stay relative. No other text changed.
- **The guard test comes along**, from `packages/engine-cicero/test/decisions.test.js`, as `test/decisions.test.ts`. It gains one check: every link out of the repository names a commit, except issue and pull-request links. 9 tests, 9 pass.
- **The essay venue and the battery pin are not here yet.**

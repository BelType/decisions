# Changelog

## Unreleased

- **The same list prints the same bytes, amended a third time** (project, 2026-11-04): under Caster's opt-in `convertImages: 'cmyk'` an image may be converted to the output intent's CMYK in the page, after its reduction, through the vendored Little-CMS, and reaches the list as `DeviceCMYK` samples; the list goes to version 7, and the definition is cut at 7.0.0.
- **A definition is proved by two strangers** (project, 2026-11-03): the display list becomes a definition of its own in `codeberg.org/BelType/common`, a workspace of four packages, with a shared corpus and a shared suite that Caster's writer and forme pass as equals, each with its own expectation file; Egildo's fourteen rulings and the sequencing ruling that the image-handling round lands first, and the seven refusals.
- **The same list prints the same bytes, amended again** (project, 2026-11-03): ruling 1 is superseded, the lists, the pool, the reference files and the refusal cases move from Caster to `@beltype/display-list-corpus`; Caster keeps the recording door and its report snapshots.
- **PDF/UA-2 is a flag, not a given** (project, 2026-11-03): Caster's `standard` flag, `'ua-2'` by default, claims PDF/UA-2 and both Well-Tagged PDF declarations and refuses by name a word gap that would be glyph 0; `'none'` claims nothing and writes such a gap as positioning with no glyph. The list carries the claim as data already and stays at version 6; the cff2 fixture is swapped for a CFF2 face with a space.
- **A writer in a worker holds no frame** (project, 2026-11-03): forme, the Rust writer, writes in a dedicated worker for every write in a page and holds no frame; a page whose policy forbids the worker is refused by name, never written on the main thread; in node the write stays a direct call. Amends Caster's *the writer pauses after 50 ms of work*.
- **The same list prints the same bytes, amended** (project, 2026-11-03): ruling 6 takes PNG decoding before the list, beside WebP, AVIF and GIF, so the Rust writer links no PNG decoder and its size ceiling stays; the display list goes to version 6.
- **The same list prints the same bytes** (project, 2026-11-02): Caster's display list closed, the writer a function of the list alone, the corpus committed and replayed in node; Egildo's eight rulings for the round and the four refusals. The first ruling written here first, as the README says.

## 0.1.0 — 2026-10-30

- **The records leave the BelType monorepo.** `project/` (25 records) and `cicero/` (101 records), with their READMEs, are copied from `.claude/decisions/` of `github.com/egildo/beltype` at 42b348b5.
- **153 links out of the records are pinned** to `https://github.com/egildo/beltype/{blob,tree}/42b348b5…/<path>`, each one checked to exist at that commit. Links between the two records stay relative. No other text changed.
- **The guard test comes along**, from `packages/engine-cicero/test/decisions.test.js`, as `test/decisions.test.ts`. It gains one check: every link out of the repository names a commit, except issue and pull-request links. 9 tests, 9 pass.
- **The essay venue and the battery pin are not here yet.**

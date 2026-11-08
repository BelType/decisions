# The first run waits for no picture

**Status: Decided 2026-11-08, Executed 2026-11-08.** Egildo's ruling of the day on the quick-rulings row *rim-awaits-images-no-mutation-observer*, made on a measurement and not before it ([`image-await.md`](https://github.com/egildo/beltype/blob/cc0b2758f2b6fe6f5540d37ff798a8379fd040b6/.claude/plans/quick-rulings-2026-11-08/image-await.md) in the monorepo's plans). Supersedes [*images are awaited at intake*](images-are-awaited-at-intake.md), whose await was a stand-in for the first run until a rim existed, and answers the measurement [*late truth is an edit*](late-truth-is-an-edit.md) left owed. Built on Cicero's `fix/no-first-run-image-await`, released in 0.1.10 ([`CHANGELOG.md`](https://codeberg.org/BelType/cicero/src/commit/b08c06ddd43655b2a7e4f7b2b1644ac0b9e49c5f/CHANGELOG.md)).

## Context

The intake awaited every image of the document before the first cut, and the driver awaited them again, so a document whose pictures came late showed nothing until the last of them had come. Measured 2026-11-08 on a 59-page document with 60 images served 300 to 800 ms late: the first paint came at 5.8 s with the two awaits, and at 0.74 s with both gone. The rim then heard every one of the 60 loads and resumed for each, 59 resumes that moved nothing, because an image whose `width` and `height` are declared draws at the box the cut already measured. The superseded record's own Context had said the await was a stand-in for the first run only, and the rim that made it redundant was built on 2026-10-13.

## Decision

**The first run waits for no picture.** The intake's await and the driver's are retired. The driver still makes a `loading="lazy"` image eager (`eagerImages`, `src/measure.ts`), since a lazy image with no box never loads and a parked original has no box, but it waits for none, and its `cicero:images` measure times that pass with `detail.awaited` false.

**A picture's arrival is a signal only where it moved the box.** The rim judges a `load` or an `error` when the runs have ended, against the height the last run measured for the box, and a box drawn as itself at that height is no signal: no resume, no work. A box the picture grew or shrank resumes as any late truth does, one resume at that box.

**What the author gets for a declared size.** An image with `width` and `height` declared gives the fast first paint with nothing moved afterwards; one without them is cut at its placeholder height and its page is cut again when it arrives. Neither is wrong; the second is the price of the omission, and the engine does not pay it for the author in advance.

**Kept.** The slice's own clone await (`awaitCloneImages`, [*the clones' images are awaited where they are measured*](the-clones-images-are-awaited-where-they-are-measured.md)) stays until a document a Service Worker controls is measured without it: that record's finding was that under a worker a clone of a loaded image answers `complete: false` for about 300 ms, and nothing measured here touched that case.

**Refused.** Waiting for the pictures the first screen shows and no others: the pages the host asks for first are the host's business, and `run({ until })` already cuts as far as it is asked. A `MutationObserver` for arrivals: the rim's `load` and `error` listeners already hear them, and the row's name records the question.

## Consequences

- `seam/client.ts` and `src/driver.ts` lose their awaits; `src/measure.ts` keeps `eagerImages`; `seam/rim.ts` judges an arrival against the last measured height. SPEC II.1.3, II.1.4 and XI.3.6 are amended, with a row in the amendment log.
- `test/browser/images.browser.ts` proves the first pages presented with no picture arrived, the final pages equal to a preloaded run's, and one resume for a picture that grew its box against none for one that did not.
- The essay battery, run on the merged main against the main before it: `prove` identical chapter for chapter, `reftest` identical in every outcome. Caster's corpus reads identical.
- The Service Worker measurement for the clone await is a row of the assessment, not ruled here.
- [*Images are awaited at intake*](images-are-awaited-at-intake.md) is superseded; [*late truth is an edit*](late-truth-is-an-edit.md) gains the clause under its Consequences.

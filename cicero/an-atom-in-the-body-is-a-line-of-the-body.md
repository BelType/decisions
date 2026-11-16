# An atom in the body is a line of the body

**Status: Decided 2026-11-16.** Egildo's ruling of the day, on the refusal of an `<img>` standing directly in the body: "let's fix the img refusal. Makes no sense and blocks a specimen". It narrows [*bare body content is refused by name*](bare-body-content-is-refused-by-name.md), which stands for everything else it names. Built on Cicero's main ([`002dc12`](https://codeberg.org/BelType/cicero/src/commit/002dc1269a6cc7288346181e1f7d33040fa77fcd/CHANGELOG.md)), not yet released when this was written.

## Context

*Bare body content is refused by name* refused every inline-level box standing directly in the body, an `<img>` among them, because such a box was drawn on no page wherever a page ended at it. The refusal was honest and too wide. An invoice that opens its body with its logo is an ordinary document, and the first sample chosen from another tool's own tests (Gotenberg's invoice) was refused for it.

**Why the box was lost.** Measured 2026-11-16 with the refusal lifted and nothing else changed: the top-level inline box was in no procession. The Gauge marked it inline, the flow's procession skips an inline atom, and the Stonehand's walk reads no inline box, so the walk stopped at the first block below the page's edge and the cut fell before that block. A box standing just before it stayed on the page before, below the page area, drawn on no page. The anonymous boxes the Gauge already builds ([*the anonymous box is in the procession*](the-anonymous-box-is-in-the-procession.md)) do not reach it: they are built inside a box of the list and only for a run holding a word, and a run of atoms has no word to give an address.

**The canon.** CSS 2.1 §9.2.1.1 puts a run of inline-level boxes beside block-level siblings in an anonymous block box. CSS Fragmentation §4.1 names a replaced element, and any box that cannot be divided, monolithic: it is moved whole to the next page, and sliced only where it is taller than a page. A run that holds atoms and no word has no break point any reader could address, so the whole line is one such unit.

**What was not reopened.** The refused design of the earlier record stays refused: the engine wraps nothing in an element of its own making, since an element it added is one the author's selectors can see. And the teaching round, reading a run of words in the body as an anonymous block with an address, is still its own round.

## Decision

**A run of inline-level boxes standing directly in the body that holds atoms and no word is the one line of its anonymous block box, and is read as one monolithic unit of the flow.** No element is added to the document.

- **What an atom is here.** A replaced element (`<img>`, `<video>`, `<canvas>`, `<object>`, `<iframe>`), an SVG or MathML element, and a box whose `display` is `inline-block`, `inline-flex`, `inline-grid` or `inline-table`. An inline box whose displayed content is such boxes and line breaks alone counts with them: a `<picture>` around its image, an `<a>` around a logo.
- **The run.** Each maximal run of the body's inline-level children in which every member holds atoms alone or is a line break, and at least one holds an atom. Its first box stands for it in the flow's procession and is a monolith; the others stay inline, are not walked, and are on the page the first is on. Two images on one line move together.
- **Its extent is the line, not the image.** A line holds a strut the image does not show, so the run is measured from the bottom margin edge of the block before it (or its own top) to the top margin edge of the block after it (or its own bottom); at the flow's end, to the flow's bottom, at most one line-height below the run. A 50 px image on a 40 px line with 60 px left is moved, as a browser would move it.
- **Where it is cut.** A cut before the run is the bare path to its first element, and a cut after it is the next block's path. The address, the fragments and the presentation are unchanged.
- **Taller than a page**, the run is moved to a page of its own and sliced at the page's edge, exactly as the same image with `display: block` is.

**Still refused by name, as before**: text directly in the body, a box with `display: contents`, and an inline-level box holding a word, a `<span>` or an `<a>` with text, whose message now says "an inline-level box holding words". A float or an absolutely positioned image was never refused: CSS makes it a block.

The reading is in the Gauge (`takeReport` in `src/gauge.ts`), which every top-level cut goes through; the Stonehand's `monolithic` answers true for it; the test for a box that holds atoms alone is `holdsAtomsAlone` in `src/word-space.ts`, and `refuseBareContent` in `src/scope.ts` passes over what it answers true for. The cases are `test/browser/body-image.browser.ts`.

## Consequences

**A document that opens with its logo prints.** Gotenberg's invoice is taken by the engine, its logo once on its first page.

**Measured 2026-11-16.**

- Of the fifteen new cases, eleven were red with the refusal lifted and the Gauge unchanged: the image where a page ends exactly at it, the image taller than what is left, the image as the body's last child on a full page, two atoms on one line, an `inline-block` alone, a `<picture>`, an `<a>` around an image, an inline `<svg>`, the strut case. The four green before prove nothing about the change: an image in mid-page, as the first child, after a forced break, and floated or positioned.
- The essay's eighteen chapters: every claim and every page count as before, 44 green and the one known red. Its pages were not held to pixels: the essay keeps goldens for Cicero 0.1.6 only.
- The web platform tests under Caster, against the record of Cicero 0.1.14: css-page from 47 pass, 25 fail and 141 refused of 213 to 50, 25 and 138; css-break unchanged at 20, 12 and 32 of 64. Three tests of an `inline-block` in the body went from refused to pass, and no pass became a fail or a refusal. Four more, of an image and of a canvas in the body, are no longer refused by the engine and are refused by Caster for a picture with no alternative text.

**Known edges, left as they are.**

- A run of atoms that wraps onto several lines is moved whole, where a page could have ended between its lines. Nothing is lost.
- A float inside a run ends the run.
- Where the block after the run has its top margin collapsed with a larger margin of its first child, the run reads taller than its line and moves a page early, never late.
- The composed mode and a host that hands the run its own boxes were not exercised by the cases.

**What it leaves open.** The teaching round: a run holding words. When it is built, an atom's run is its simplest case, and this record and the one it narrows are superseded together.

**What it touches on the tablet.** *The conservation of words* is kept by placing the box, where the earlier record kept it by stopping: a refusal is the right answer only while the engine cannot keep what it was given.

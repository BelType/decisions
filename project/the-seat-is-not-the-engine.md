# The seat is not the engine

**Status: Decided 2026-09-22, Executed 2026-09-22.** Supersedes two clauses of [Paged.js returns in its own window](paged-js-returns-in-its-own-window.md) — its "Linked, not dressed" and its "Refused: Paged.js in the pane"; the rest of that record stands. Recorded in [`packages/editing-tools/DESIGN.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/editing-tools/DESIGN.md) as proposition 49 and in [`packages/caster/DESIGN.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/caster/DESIGN.md) as S68.

## Context

Four days after Paged.js came back, its window had done its job and the shape it came in had become the cost. 47 gave the second engine a window because it had to give it somewhere, and in doing so it fused two questions that are not one: *which engine paginates this document* and *where are its pages shown*. Eight places in `app.js` knew the answer to the first by reading the second — two ready handlers, a router that compared against a named frame, a nav hook on the pane's `load`, an inspector that read `$('preview').contentDocument`, a bar that unchecked and disabled follow and inspect under Paged.js, and two published URLs.

What that cost was not cosmetic. An author working under Paged.js lost the click that opens a source line, the follow that scrolls the preview, and the inspector that names the declaration winning a property — the three things the Cicero cut was undertaken to buy. They were not lost because Paged.js cannot support them; they were lost because they had been written against the pane by name.

47's own refusal named the reason to leave it that way: *Paged.js rewrites every sheet into inserted `<style>` elements with no provenance*, so a pane dressed for it could not answer "where is this rule written". That was a claim about the engine, checked against its source and true as far as it went — and the conclusion drawn from it did not follow. The rewrite keeps rule order and drops rules, which is exactly the relationship the Dresser's provenance walk already handles, because Chromium drops rules it does not implement and the walk is a SUBSEQUENCE walk for that reason.

## Measured before building (2026-09-22, Paged.js 0.4.3, headless Chromium 153)

P3's parked stall was the one risk that could have ended the round: Paged.js in the editing tools' nested preview iframe was recorded producing zero pages with no console error. The 2026-09-18 round had measured `requestAnimationFrame` running at full rate in a hidden same-origin frame; the VISIBLE pane iframe was the un-measured cell.

- **M1.** The Caster specimen published into the pane iframe and driven with `preview()` there: **nine pages in 204 ms**, the same nine the window shows. No stall.
- **M2.** `preview(undefined, [...removeStyles(), { '/styles/specimen.css': text }])` inserts exactly **one `<style data-pagedjs-inserted-styles>` per item, in argument order**, after the one the Polisher's own `setup()` inserts. The author's geometry arrives through the text and nothing else: an `@page { size: A5; margin: 11mm }` written only into the handed-over text produced 148 mm pages at 11 mm margins.
- **M3.** The subsequence mint over an inserted sheet paired `.running-mark` with **its own line 60** and mis-mapped nothing. Paged.js's generated margin-box rules and a `:nth-of-type` selector it rewrites into a data-attribute form came back **unmapped**, and the rule written straight after the `:nth-of-type` one still minted to its own line.

## Decision

**A render has an ENGINE and a SEAT, and neither knows the other.** The engine — `cicero` or `pagedjs`, one at a time — decides what is composed, how the document is dressed and paginated, and what is printed. The seat — `pane` or `window` — decides where it is shown. Every combination works; the tool starts on Cicero in the pane; nothing is persisted.

**The Dresser owns the text and the provenance; the engine decides the seating.** `dress(target, gen, { readText, rewrite, adopt })` keeps doing what it did and gains two verbs. `texts()` returns each seat's current text, drafts included, in the shape `Previewer.preview(content, stylesheets)` takes. `bindInserted(styles)` re-seats each entry on the `CSSStyleSheet` of the `<style>` the engine inserted for it and re-mints provenance against that, refusing by name when the count disagrees. `whoSets` needs no change at all: it walks document sheets and then adopted ones, and the inserted styles are document sheets whose rules are now in the map.

**Paged.js is dressed through its Polisher.** The document is published undressed under BOTH engines, to ONE URL. `paginatePaged(view, { sheets })` lifts the document's remaining sheets — `removeStyles()` returns them in document order — and puts the author texts after them, so the cascade the engine processes is mechanics < addendum < engine < author, as the shell wrote it. A CSS draft reaches Paged.js exactly as it reaches Cicero: the Dresser fetched it draft-first, the seat holds it, the reload re-paginates.

**One ready handler, seat-blind; one accessor for the seat.** `seatView()` answers `{ win, doc }`, and `reloadPreview`, `publishDocument`, the `message` router, the preview click, `revealInPreview`, the inspector and the test hooks all read it. Follow, inspect and the source jump work in both seats under both engines, with no engine code: the belt stamps `data-beltype-pos` on ELEMENTS, Cicero adopts them into `<beltype-root>`'s light DOM and Paged.js clones them into its pages with every attribute, so one `querySelectorAll` finds the page fragments in either.

**Preparation is an engine property** (F2). ~~Paged.js is Caster-prepared wherever it paginates, so its pages are the pages the print frame cuts; Cicero is prepared in neither seat, because preparation must not touch what the author is looking at. The asymmetry is recorded as open rather than resolved here.~~ **Superseded, and the asymmetry closed, 2026-10-16** ([beltype#45](https://github.com/egildo/beltype/issues/45), Egildo's ruling; `packages/editing-tools/DESIGN.md` 62, `packages/caster/DESIGN.md` S81): Caster's `prepare()` runs in no author preview, pane or window, under either engine, and only in the print frame, which is discarded after the export. F2's reason (a real marker is a real box, so an unprepared Paged.js could cut a page the PDF does not) became an obligation on Caster instead of a preparation of the seat: preparation must not change layout, and `packages/caster/test/preview-unprepared.test.js` paginates prepared and unprepared and compares the cuts. Preparation is not an engine property any more; it is the print frame's.

**The chrome gets a separate seat toggle** (F1), beside the engine buttons, and the engine button loses its arrow. An engine button that also moved the seat would re-couple what this round decouples.

**The window look is Paged.js-in-window's alone** (F3): `pagedjs-window.css` and the zoom-to-width. Cicero in a window shows its own interface at natural size.

## Consequences

- The print frame loads the one URL the seat shows, so what is printed is what is shown by construction rather than by a table that could disagree. Caster's `acceptance-pagedjs.test.js` reads the pane now and asserts the same thing it always asserted.
- `PAGED_URL`, `onPagedReady`, `attachPreviewNav` and `showPagedWindow` are gone rather than kept beside their replacements; `#paged-placeholder` became `#window-placeholder`.
- The `@import` case is refused rather than guessed. Paged.js fetches an imported sheet itself and inserts it among ours, so the positional pairing no longer holds: `paginatePaged` reports no correspondence, `bindInserted` refuses naming the counts, and that seat keeps its pages and loses its rule map — which the inspector already has words for.
- A window is still a pop-up, and a browser that refuses one gets a banner and stays in the pane.

## Refused

- **Printing from the window.** The print frame is the app's, and a second printer in a second document would be a second arrangement to keep in step.
- **Paged.js's `pageOf`/`sourceOf` this round.** The spine is line-granular and block level was ruled ENOUGH on 2026-09-21, so there is no consumer. The road is recorded for when one appears: `Chunker.hooks.renderNode.triggerSync(clone, sourceNode)` gives a clone→source map, and `afterPageLayout(pageElement, page, breakToken)` gives each page's start as a `BreakToken { node, offset }`.
- **A look of Cicero's own for the window.** Nothing asked for one; the engine's interface is a look already.

# A page box has a border and a padding

**Status: Decided 2026-09-07, Executed 2026-09-07.**

## Context

The page-context round of 2026-09-04 ([*the page context dresses the host*](the-page-context-dresses-the-host.md)) carried the whole `@page` rule across to the Chase and withheld exactly two things by name. The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s part four records why, with the numbers: **`border` and `padding` are honoured by Chromium's print and both take room**, a 5px page border moving the first printed item from x 60 to x 65 and `padding: 30px` moving it from (60,75) to (90,105). They were withheld on that evidence rather than by omission — *painting them would draw a frame the arithmetic cannot see* — and the row that records it says what it costs: *a document declaring one lays out against a measure too wide by twice it*.

css-page-3 §6 is not permissive about this. *"Appendix A defines the normative list of CSS 2.1 properties that apply to page boxes. If a conforming user agent supports any of these properties on block boxes, then it must also support that property in the page context."* Both are on the list, with all their longhands. And §3 says what supporting them means, because the page box is an ordinary box: *"The content area of a page box is called the page area"*, and *"as with other CSS boxes, a page box consists of margin, border, padding, and content areas."* So the page area is the page box less all three insets, and Cicero's was the page box less one.

The corpus cannot draw this — `seeds/generate.js` writes `size` and margins into its page rules and nothing else — so the row has waited on an authored document, which the chapter's `wanted` list has carried as `the-page-that-takes-room`.

## Decision

**Both are modelled, and the modelling is the whole permission to draw them.** Four changes plus one found by exercising them.

**One — the capture reads both, and reads `border-style` beside `border-width`.** A declared border width takes room only where the same side's style draws a border. That is CSS's own rule and not a policy: `border-style` is `none` initially, and a `none` or `hidden` border has a used width of zero however wide it was declared. The page context has no computed style to ask — nothing computes a page — so the ABSENCE of a style declaration is the initial value, and `borderIsDrawn` is the one place that has to know it. `@page { border: 5mm }` therefore declares five millimetres and takes nothing, while `@page { border: 5mm solid }` takes five on every side.

The paddings take css-page-3 §6's per-axis percentage base, and the sentence covers both by name: *"Percentage values on the margin and padding properties are relative to the dimensions of the containing block. For right and left values, percentages are relative to the width of the containing block; for top and bottom values, percentages are relative to the height."* That is the base the margins already use, so one rule serves three insets. A border width takes no percentage at all, so its base is never consulted — such a declaration never reaches the CSSOM.

**Two — a length is seated on the property it was declared on.** [*Page lengths are measured*](page-lengths-are-measured.md) seats a declared page length on an off-viewport probe and reads the browser's px back, and it chose `margin-top` as the seat because *"margins accept negatives and percentages, which `width` does not"*. That reasoning generalises the wrong way once there are three insets: a margin's permissions are not a padding's and neither is a border's. So the seat is now the property itself, which hands the browser three more questions this file would otherwise have had to hold a table about — **`thin` is a border width and refuses as a margin, `-5px` measures as a margin and refuses as a padding, and a percentage measures on both of those and refuses on a border.** The probe's inner element carries `border-style: solid` permanently for the same reason `borderIsDrawn` exists: without it every border on every page would measure zero. That is the probe's own dress and not a reading of the document.

**Three — the content area wears them, and that is where they belong.** The Chase's page-context sheet gains a fourth rule, `.content-area`, carrying the author's own `border-*` and `padding-*` declarations verbatim — widths, styles, colours, `border-image-*`, everything. §3 gives the page box a margin, a border, a padding and a content area in that order inward; the host **is** the whole page box and the margin cells occupy its margin area, so the box whose border edge sits just inside the margins is the content area. Its border box is therefore the page box inside its margins and its content box is the page area, which is why the grid tracks needed no new arithmetic: they change from `contentW / 3` to `(pageW − margins) / 3`, which is the same number for a page with no border and no padding and the right one for a page with either.

**The firewall is not opened, and the reason is structural rather than careful.** What it guards is INHERITANCE — an inherited page-context declaration must not descend into slotted content, which inherits from the root element and not from the page. `border` and `padding` inherit into nothing, and the capture's own split is what guarantees the fourth rule carries only those: `.content-area` takes exactly the two prefixes withheld from `:host` and `.margin-cell`, one list minus another rather than two lists that can disagree. Putting `color` on `:host` would still leak it into every paragraph, and is still refused.

**Four — the criterion moves them a category.** The dresser's own rule names three kinds of owned declaration: a property the Chase writes, a geometry input the capture models, and *something measured and not yet modelled*. These two were the third kind. They are the second now, and the engine still learns no property name: the split is by where a declaration belongs on the Chase, never by what it is called.

**Five, found by exercising it — the press sheet zeroed one inset of three.** An author's own `@page` rules stay linked in the document throughout, because their non-page rules must keep styling the light-DOM content. The press sheet's named rules override the margin and did not override the other two, so a bare `@page { border; padding }` applied a **second** time, to the real print page box, shrinking the printable area under a host sized for the whole sheet. Measured on the new case: four presented pages printed as **eight**, with the page count on screen still correct. Every inset is zeroed now. The page box the Press hands the print path is a frame and nothing else, and every inset the author declared is drawn inside it by the Chase — which was already true and was true of one property.

**Refused: widening `readPageGeometry`.** The legacy single-geometry reader still computes the page area from the margins alone. Its one caller is the venue's benchmark, over a corpus whose page rules write `size` and margins and nothing else, so the difference is unreachable there — and a second implementation of the page area is exactly what `readGeometryTable` exists to be the only one of. The limit is stated in the function's own header rather than quietly left.

**Refused: laws.** None moves. This is I5 kept rather than amended: a decision made against a page area the browser will not reproduce is not a decision, and the page area was wrong by twice the padding.

## Predictions

Frozen on write, before `src/` was touched.

1. **A new case declaring `border: 5mm solid` and `padding: 5mm` on a 120×90mm page with 10mm margins prints four pages, identically on all three columns**, where the same document against a page area computed from the margins alone would print three. *Breaks* on any other number, and on a divergence between the columns — Chromium honours both, so this row has a real oracle and a disagreement would mean one of us is wrong about the page model.
2. **`startsAPage` distinguishes the two readings even where the page count would not.** *Breaks* if the three named blocks open pages under both readings, which would make the document a page-count claim wearing a positional one.
3. **Every existing case is unmoved.** No case and no seed declares a page border or a page padding, and the two arithmetics agree exactly at zero. *Breaks* on any case whose result differs from the run against the pre-round `src/`.
4. **`cases/acceptance.js` keeps its pinned 12 pages in both modes.** *Breaks* on any other number.
5. **The DOM-free suite gains a pin per rule and stays green.** *Breaks* on a rule whose pin cannot be written without a browser.

## Verdict

**Prediction 1 held, after one failure that was the round's second finding.** The first run of `cases/30-the-page-that-takes-room` presented **4 pages and printed 8** — the page count right on screen and doubled in the print, which is the press-sheet defect above. With the other two insets zeroed in the press sheet it is four presented and four printed, `partition: identical` with Chromium, no page error on any column.

**Prediction 2 held, and the counterfactual was measured rather than reasoned.** The same case run against the pre-round source through `ENGINE_DIR` presents **3** pages, prints 6, and fails on "Block two begins a page" and "Block four begins a page" while still passing on "Block six" — which is exactly the shape prediction 2 was frozen against: one of the three positional claims survives a wrong page area by coincidence, and the page count alone would have reported a document three pages long that agrees with nothing.

**Prediction 3 held.** The whole case suite was run after the change and diffed against the run taken at the close of the previous round: **identical, line for line, with one line added** — case 30's own heading. 27 checks failing before and after, the same thirteen cases, all environmental.

**Prediction 4 held.** 12 pages presented and printed, native and `--composed` alike.

**Prediction 5 held.** 74 tests to **78**: four in a new `test/capture.test.js` — `borderIsDrawn` over the four `border-style` cases that matter, the page area's six-term subtraction, the per-side pairing with eight distinct powers of two so a transposition cannot hide, and a page with neither inset keeping the area it always had. All four fail against the previous source.

**Too good to be true, checked.** The grid tracks needing no new arithmetic looked like luck and is not: `(pageW − margins.left − margins.right) / 3` is algebraically what `contentW / 3` used to be, so the change is a no-op on every page with no border and no padding and the corpus cannot tell the two apart. That is the reason prediction 3 could be frozen as confidently as it was, and it is worth writing down because the *same* algebra is why nothing else in the view had to learn about either property.

**One thing was found and not fixed.** `readPageGeometry`, the legacy single-geometry reader, still computes the page area from the margins alone. It is stated in its own header, its one caller cannot reach the difference, and widening it would mean a second implementation of the thing this round just made harder to get right.

**The battery ran at the close of the rounds (2026-09-07), and no standing number moved for this round — checked by a counterfactual rather than by a tally.** The three gates whose tallies the run disagrees with — `native` (0–199), `composed-v2` (200–299 `--composed`) and `v3-native` (400–449) — were each run a second time against the **pre-round `src/`**, the tree at `1cce345` reached through `ENGINE_DIR`, and the two runs' reports are **identical seed for seed**: 164/18/11/7 native, 84/12/4 composed-v2, 42/6/1/1 v3-native. The algebraic identity therefore held where it claimed to: `borders` and `paddings` are zero on every seed, at zero the new page area is `pageW − margins` term for term, and every page margin the corpus declares is an absolute length that never reaches the length probe. **The three disagreements with `gates/records.js` are identical before and after these rounds and are therefore not the engine's**; they are the machine's, the record is left standing, and the account is in the repo [CHANGELOG](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/CHANGELOG.md) and in the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) §7. The pin is not rewritten — only a complete run with every gate green may write one, and `cases` and `suite` are red here on a font substitution.

## Consequences

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) does not move.

[`architecture.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md)'s The Chase records the fourth rule and why the content area is the page's border box; The Furniture's capture paragraph records that a length is seated on the property it was declared on.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) moves in three. Part one §1's page-context line stops naming `border` and `padding` as withheld. Part four's table rows for both go from *withheld on this evidence* to modelled, with the seat and the `border-style` rule named. The design open that carried them closes.

Next door, [`cases/30-the-page-that-takes-room`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/30-the-page-that-takes-room/README.md) is authored and held by the chapter that wanted it, whose §6-with-Appendix-A row goes from `open` to `settled`.

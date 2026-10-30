# The margin after a forced break is preserved

**Status: Decided 2026-09-29, Executed 2026-09-29.**

## Context

css-break-3 §5.2: *"When an unforced break occurs before or after a block-level box, any margins adjoining the break are truncated to zero. When a forced break occurs there, adjoining margins before the break are truncated, but margins after the break are preserved."* The engine has kept the sentence since 2026-07-29 for a box at the top level: `driver.js`' `truncateLead` is false where `cursor.forced` is true, the page's measured start keeps the leading margin, and probe P27 gates it. It kept it nowhere below. A forced break landing before a nested box is a bare-path cut into its ancestor, and `mutateToContinuation`'s bare-path branch dressed the resumed box with `truncateAdjoiningMargin` — its own margin and its first-child chain's zeroed — whether the break was forced or not. [*The grab descends*](the-grab-descends.md) named it a build owed on 2026-09-03, since every block of a BelType document is nested in a `<section>` and every forced break there is of this kind; a real venue's contents page measured it on 2026-09-29, its `nav { page: index }` opening on an `h2` pulled into the page margin by `margin-top: -95px` and a 95px border, which the engine set inside the page area. [`cases/77-the-margin-after-the-forced-break`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/77-the-margin-after-the-forced-break/README.md) reproduced it on the small page: two borders printed at the page area's top instead of 18pt below it, the band inside the page area, three page heads moved, in both modes.

The case corrected the entry's premise: the address is `{ path, word, char, px }` and a forced cut is a bare path like any Class A cut. Whether the break was forced is a fact about the PAGE — the account entry's `trace.forced`, the driver's `cursor.forced` — and nowhere on the address.

## Decision

**The continuation built for a page whose opening cut is forced keeps the block-start margin of the box it resumes at and of that box's first-child chain.** That is the margin adjoining the break, the one §5.2 preserves, a negative one included — which is how a band is pulled into the page margin. **The divided ancestors do not keep theirs.** An ancestor the cut divides began pages ago; its block-start margin is not after this break, so it gives up its margin, and under `slice` its border and padding, exactly as before. The class of the cut still never enters the dressing (*the cut divides its ancestors*): the forcedness is the page's, handed in beside the address.

**Plumbed as `forced`, in both callers.** `mutateToContinuation`, `continuationClone` and `fragmentOf` take `{ forced }`; the bare-path branch skips `truncateAdjoiningMargin` when it is true. The measure feed passes the driver's `cursor.forced` for the cursor's block. The presentation passes `pg.start.forced`, which `positions.js`' `pageIntervals` reads off the closing entry's own `trace.forced` — the one place the driver wrote it — and a blank parity page carries it forward to the page after it, as the cursor does. A carried parallel flow and a row item are not what the forced break resumed and are passed nothing. **This is why it was a build and not a patch**, measured: with the flag passed to the measure feed and not to the presentation, the feed measured the margins and the pages dressed them away, so the pages disagreed with their own account — the border back at the page area's top, and `c0w020` to `c0w023` printed on no page.

**Where the band's ink goes was left open here, and is closed by [*the page clips at its bleed area on the block axis too*](the-page-clips-at-its-bleed-area-on-the-block-axis-too.md)** (2026-10-02): in the forced page's own top margin. At the time of this record the case claimed only that it is not inside the page area on the forced page. Chromium lays the band out exactly and paints its ink at the FOOT of the page before (22.5, 180pt, 105×22.5pt on page five, measured), since its print clips at the page area; the engine now lays it out 30px above page six's page area and paints it on no page, clipped at that page's flow. §5.1 and `bleed` would put it in page six's own margin, which neither paints. Which of the three a page should show is Egildo's design question.

## What the rivals do

- **WeasyPrint** (`layout/page.py`, `layout/block.py`). `context.forced_break` is set once per page from the break that began it (`next_page['break'] != 'any' or next_page['page']`, a named page counting), and `block_level_layout` and `_in_flow_layout` zero the margin of a box beginning an empty page only `if not context.forced_break`, at whatever depth it stands. **Taken**: the flag on the page, read at any depth. **Not taken**: its `margin-break` (css-break-4), which this engine does not model.
- **fragmentainers** (`algorithms/block-container.js`, `layout/margin-collapsing.js`). A forced break is a break token, `createBreakBefore(child, true)`, for a `break-before` and a named-page change alike; the child resumed after it carries `isForcedBreak`, and `computeMarginBefore` preserves the child's margin and every margin collapsing through its first-child chain, one strut. Forcedness rides the ADDRESS there. **Refused**, as the case README argued: the address here carries no class and need not — the page already knows. And its `trailingMargin` keeps the margin BEFORE a forced break too, where §5.2 truncates it; not taken.
- **Paged.js classic** (`utils/dom.js`' `rebuildAncestors`, `polisher/base.js`). Rebuilt ancestors are marked `data-split-from` and lose `margin-top`, `padding-top` and `text-indent`; the box the page resumes at is never marked and keeps its margin — right after a forced break by never truncating any margin at a page start. Nothing to take.
- **pagedNG** fragments through fragmentainers, above.

## Audit

- `fragments.js`: `mutateToContinuation`'s bare-path branch is the one place the flag is read; the word branch (a Class B cut, never forced) and the shell branch are untouched; `truncateLeadingDecoration` on the clone and on the chain above the target is unconditional, as the Decision says. `continuationClone` and `fragmentOf` pass it through; `firstFragmentClone` and `mutateToFirstFragment` take nothing, since §5.2 truncates the margin before a forced break either way.
- `driver.js`: `buildFeed` passes `cursor.forced` to the cursor's block's continuation only; carried flows are not passed it. `truncateLead`, `pageStart`, `leadPx` and `spentLeadOf` already read `cursor.forced` and are untouched: with the margin kept in the clone, the page's measured start keeps it exactly as it does for a top-level box, and `.flow`'s `display: flow-root` keeps it inside the flow box, so `usedPx` counts it.
- `positions.js`: `pageIntervals`' endpoint carries `forced` from the entry's trace; `pageOfPos`, `presentationWidths` and `extensionPx` do not read it.
- `root.js`: the continuation and the both-ends fragment of the page's first block pass `pg.start.forced`; carried flows do not.

## Measurements

**Case 77**, `node cases/runner.js 77` after the change: every claim green in all three columns — seven pages presented and printed, the ink on pages two and four at 40.5pt (the borders 105×3pt, the backgrounds 105×42 and 105×162pt), no band inside page six's page area, `p0w000`, `a0w000`, `p1w016`, `b0w000`, `b0w020`, `c0w000` and `p2w000` beginning pages one to seven, the page names, every word printed once, and *ok [chromium] page for page and word for word with cicero*, in both modes.

**P27**, `node probes/margins.js` alone: *ok P27 — all four match Chromium*, the margin kept at the document start and after a forced break, truncated at the unforced one, the zero-margin control unmoved; P28 as recorded, its float cell the standing deliberate divergence.

**The case's document without its `<section>`**, a scratch copy deleted after, where every forced cut is a top-level block boundary: every claim of the case green in all three columns, so the top-level path still agrees.

**The neighbours** 07, 09, 21, 34, 51, 53, 54, 55, 56, 63, 65, 66, 70, 71, 72, 73, 74, 75 and 76 hold, and so does the whole case suite, every engine: `node cases/runner.js`, *every case holds*, 78 of 78.

**The counterfactual**, reverted: the flag passed to the measure feed and not to the presentation turned the case's ink and totality red in both modes — *page 2: no fill #c00000 at 22.5,40.5*, and `c0w020` to `c0w023` printed on no page, since the account had measured twelve lines onto page six that the presented page, its band back inside the page area, could not hold.

## Consequences

The checklist's §5.2 entry under Design opens closes with this record, and its §5.2 table row loses its *at the top level only* clause; the book's §5.2 row is settled again; `.claude/NEEDED-FIXES.md`'s row moves to Closed. The tablet is untouched: §5.2 was always the law, and this is the build [*the grab descends*](the-grab-descends.md) owed it.

**Left open when this record was written, closed 2026-10-02 by [*the page clips at its bleed area on the block axis too*](the-page-clips-at-its-bleed-area-on-the-block-axis-too.md)**: where a band pulled above the forced page's area is painted — at the foot of the page before (Chromium), on no page (this engine, now), or in the forced page's own margin (§5.1 and `bleed`) — is a design question for Egildo; the case claims only its absence from the page area. **And not examined**: a forced break whose resumed box is a parallel flow or a row item, which no document draws.

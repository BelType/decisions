# The clone is hollow outside the interval

**Status: Decided 2026-09-27, Executed 2026-09-27.** Ruled by Egildo on 2026-09-27 with the plan that convened the four rounds after the fragmentation studies (its second ruling: *the two clones are excess*); opened with its predictions frozen, the build following on the round's branch.

## Context

Two clones are the largest cost left in a run. **The feed**: `driver.js`'s `buildFeed` deep-clones every top-level block from the cursor's to the last, maps it, strips its fixed boxes and, composed, hints it whole, and only then does `cutFeedAt` cut it at the forced event or the Cast-off's place and put away what lies past it. **The presentation**: `fragments.js` builds every divided block's fragment on every page as a deep clone of the whole block, and puts away what lies outside the page's interval by emptying its text. Measured on this round's branch before any source changed, each the second of two runs (tables in `packages/essay/RESULTS.md`): the feed is 1.15 s of the BGD manual's 3.02 s in the default mode and its presentation 1.39 s; 3.56 s of the synthetic book's 4.79 s; 6.93 s of BelType's manual's 13.6 s default and 10.96 s of its 22.2 s composed, where *[the composition lays out once](the-composition-lays-out-once.md)* found `applyRecordsUnder` hinting the whole clone on every pour.

**No law binds either clone** — the four fragmentation studies agree on it, unanimously (`/Users/egildo/Privata/dev/fragmentation-study/synthesis.md`). What binds the mechanism is the rule of *[every branch gets a place](every-branch-gets-a-place.md)*: outside its interval a box is **kept and not displayed**, never removed, so the author's structural selectors match on every page what they match in the source ([`cases/60`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/60-the-section-the-author-addressed/README.md), [`cases/61`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/61-the-zebra-list/README.md)). That record named the cheaper shape and left it unbuilt: *hidden boxes kept as elements with their interiors emptied, if the pages-times-document tree ever measures badly*. It measures badly.

## Decision

Three moves, one round, because they share one function and one proof.

**Clone to the place.** The Cast-off's place and the grab's forced event are known before anything is cloned: the Cast-off needs only the cursor and the forcing index, the forced event only the grab. So the feed is cloned from the cursor's block through the place's block and no further. The blocks after it were absent from every feed the Stonehand ever read — `cutFeedAt` sliced them away before the layout — so nothing measured changes, on a document of many blocks or of one.

**A box outside the interval is hollow.** In the feed and in the presentation, a box put away is an element with its tag and its attributes, in its place among its siblings, `display: none` as before, and **no children** — where it used to be a deep clone with its text emptied. The shape is built once, by `fragments.js`'s `putAway`, and it is built at construction: `cloneInterval` clones a block deep inside the interval and makes every box that the interval's two chains leave wholly before the start or wholly after the end a hollow copy, mapped to its source, so the clone-to-source map holds exactly the elements that exist. Every path walk was read for an assumption that a put-away box still has children — `chainTo`, `targetOf`, `elAtIn`, the shells, the carried flows, the row places, `truncateFrom` and both word consumers — and none has one: each walks the chain to a box inside the interval, or resolves a box on the source and reaches its clone through the map, and the boxes they reach are never hollowed at construction. Two things keep that true by rule rather than by luck. A box that is, or holds, a row item with a place of its own is never hollowed at construction, since the item's own cut resolves inside it. And a start or end target is never hollowed at construction either — a bare end's target leaves the fragment, and `putAway` hollows it then, after the walk that named it.

Selectors that read an element's existence, place and attributes go on matching — `:nth-child`, `:first-child`, `:last-child`, `:nth-last-child`, `+`, `~`, and `section:has(> h2.x)`, whose heading is kept as an element with its class. What stops matching is a `:has()` whose argument reaches INSIDE a hollow box, and `:empty` on the hollow box itself, which is `display: none` either way.

**The premise, stated so it can break: the browser lays out the displayed content of a fragment identically whether the boxes outside its interval are deep and emptied or hollow.** Both are `display: none`; neither generates a box, a counter operation (CSS 2.1 §12.4.3) or a line.

**The guard.** When any stylesheet the document wears — every rule `capture.js`'s `styleSheetsOf` reaches, grouping rules and imports included — has a selector containing `:has(`, the feed and the presentation build deep clones as before, the whole feed and every fragment, and the driver says so once per run on the console. A sheet the engine cannot read counts as one that might. [`cases/69-the-selector-that-looks-inside`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/69-the-selector-that-looks-inside/README.md) is the document the guard is for: `section:has(figure img)`, the figure on the page before, the tint owed on the page after.

**Hints after the cut.** Composed, `applyRecordsUnder` hinted the whole feed clone before the cut, C7's *hints first, slicing after*. The Cast-off's place and a forced event are box boundaries, never inside a composed line stack, so hinting only what stays displayed after the tail is put away gives every displayed leaf the same hints. The feed's tail is now cut first, then the clone is hinted — `applyRecordsUnder` passes over a box `putAway` put away — and then the start cut consumes the cursor's leaf, after its hints, as before. Under the guard this is the whole of the move; without it the tail is hollow from construction and has nothing to hint. The presentation keeps its order: its end cut can fall inside a line stack, where the hints must come first.

## Predictions, frozen on write

1. **Every standing gate comes back unmoved, and a complete run re-records the pin.** BREAK on any record that moves.
2. **Every page's verdict — class and kind — and grab answer is identical page for page** on the BGD manual in both modes, BelType's manual in both modes and the synthetic book, in the first run of each pair and in the second. BREAK on one page.
3. **A debug assertion, scratch only, over every pour of the three documents**: the new feed, once cut, serializes identically to the old feed, once cut, with every put-away box's interior removed from the old one — the tags, attributes and text of every element either feed holds, in order. BREAK on one pour.
4. **The BGD manual, default mode, runs under 1.9 s** (3.02 s before on this branch; 2.78 s recorded by *the Cast-off bounds the feed*), **its feed under 0.3 s** (1.15 s) **and its presentation under 0.6 s** (1.39 s). BREAK on any.
5. **The synthetic book runs under 2.5 s** (4.79 s before). BREAK at 2.5 s or more.
6. **BelType's manual composed runs under 15 s** (22.2 s before on this branch; 24.6 s measured by *the paragraph is what the browser breaks* at its close) **and in the default mode under 9 s** (13.6 s). BREAK on either.
7. **Cases 60 and 61 stay green** — 61 through the hollow boxes, whose `:nth-child` still counts them, and 60 through the guard, since its sheet uses `:has(`. **Case 69 is green through the guard**, and its README says what breaks without it, measured by a scratch run with the guard forced off. BREAK on any red.
8. **The census (P36) and the conservation survey (P35) are unmoved** in both modes — 85 of 89 documents holding in the census, the same four red; *same 129 · TWICE 12 · LOST 18 · moved 21* in the survey — and **the view gates and Caster's suite pass**, since Caster's adapter pairs a fragment with its source by position and must meet hollow boxes where it met emptied ones. BREAK on any.
9. **What the instrument cannot say.** No gate draws a document without `:has(` whose layout would read a put-away box's interior, which is the premise, so the premise is proven where the assertion ran and the gates looked, not in general. The guard's reading of a selector is textual: a `:has(` that reaches only an element's children (`:has(> h2)`) is safe hollow and falls back to deep all the same, which costs time and never a match. And the manuals' own stylesheets carry no `:has(`, so the guard is exercised by cases 60 and 69 alone.

## Consequences

The architecture's fragment and feed paragraphs say what is built. The checklist closes the frontier entry *the feed clones the whole remaining document on every pour* with this record, and the record of *every branch gets a place* has its named upgrade built. `.claude/NEEDED-FIXES.md` carries no row for it. Caster's pairing is unchanged in code: a hollow box is not displayed, gets no twin, and still counts among its siblings.

## Verdict

Measured on the round's branch, Apple M1 Max, Chromium 153.0.8010.12, nothing else running; before at `8e6dbb3` (`src/` as round two left it), after at `88b3373`; each figure the second of two runs. The tables are in `packages/essay/RESULTS.md`, *The clone is hollow outside the interval, before and after*.

**Prediction 1 held.** The complete battery ran once, alone, with `src/` committed: 25 gates in 7.1 minutes, 25 ok, every standing record reproduced, the pin re-recorded against `88b3373`.

**Prediction 2 held.** Every page's verdict and grab answer is the same before and after, page for page, in the first run of each pair and in the second: the BGD manual 133 pages in each mode, BelType's manual 268 default and 272 composed, the synthetic book 283 — not one different.

**Prediction 3 held.** The assertion ran over every pour of five runs — the BGD manual in both modes (178 pours each), BelType's manual default (284) and composed (288), and the synthetic book composed (283): 1 211 pours, the new feed and the old one identical in every one, once a style attribute is read as the set of declarations it is. Before that reading 172 of the BGD manual's 178 pours differed, all in the ORDER of one element's declarations: the new feed cuts its tail before its start cut, so a block the two cuts both dress lists `margin-bottom` before `margin-top` where the old one listed them the other way round. Both manuals ran hollow, not under the guard — 6 511 and 5 481 hollow boxes presented — so the assertion compared what the round built. The patch that carried it was scratch and is not in the history.

**Predictions 4, 5 and 6 held, and far past their bounds.**

| Document | Before | After | Bound | Feed | Presentation |
| :-- | --: | --: | --: | --: | --: |
| BGD manual, default | 3.02 s | 0.50 s | 1.9 s | 1 147 → 51 ms | 1 386 → 124 ms |
| BGD manual, composed | 5.09 s | 1.28 s | — | 1 842 → 70 ms | 2 032 → 128 ms |
| BelType's manual, default | 13.6 s | 3.39 s | 9 s | 6 926 → 176 ms | 3 521 → 1 008 ms |
| BelType's manual, composed | 22.2 s | 7.38 s | 15 s | 10 957 → 286 ms | 4 343 → 1 146 ms |
| synthetic book | 4.79 s | 1.68 s | 2.5 s | 3 559 → 348 ms | 370 → 330 ms |

The BGD manual's feed bound was 0.3 s and its presentation's 0.6 s.

**Prediction 7 held.** Cases 60, 61 and 69 green in all three columns in the battery's `cases` gate. With the guard forced off, scratch, case 69 goes red on page two in both of the engine's modes — *no fill #e6f2d9 at 15,15,270,75* — and cases 60 and 61 stay green: `section:has(> h2.mark)` finds the hollow heading, which keeps its class, and `:nth-child(odd)` counts the hollow items.

**Prediction 8 held.** The census reads 85 of 89 documents holding in both modes, the same four red with the same words; the survey *same 129 · TWICE 12 · LOST 18 · moved 21* in both, its reports identical cell for cell. The three view gates reproduced their records, and Caster's suite passed, 192 of 192.

**Prediction 9 stands as written.** The manuals' sheets carry no `:has(`, so the guard ran only in cases 60 and 69, and the premise is proven where the assertion ran and the gates looked.

**What was too good to be true was the bounds themselves.** They were written from the studies' picture — the feed a whole clone, the presentation a whole clone per divided page — and priced the saving at about what those two clones cost. What they cost was more than their own share: a clone of the manual's remaining block is thousands of elements mapped, stripped and, composed, hinted, and the browser then carries every one of them through style and layout as a `display: none` subtree. **The layout phase fell too** — 2 294 → 1 386 ms on the manual default, 238 → 125 ms on the BGD manual — though nothing the Stonehand reads changed; a hidden subtree is not free to the browser that holds it. **So the composition is now the largest phase of a composed run** — 732 ms of the BGD manual's 1.28 s, 3.2 s of the manual's 7.38 s — which is round two's broken bound, and the parked question about per-word widths, back at the front. And what is left of the manual's presentation, about a second, was not broken down: a profile taken in the paragraph round put 2.6 s of a composed run in `chase.js`'s `layoutBands`, whose width reads force a layout of everything presented, which this round made smaller and did not otherwise touch.

# A cell keeps its own window

**Status: Decided 2026-10-06, Executed 2026-10-06.** Built on branch `cicero/the-cell-keeps-its-window`, from the held branch `cicero/cases-from-the-vivliostyle-probes`; the verdict was written on 2026-10-07, when the two branches closed together.

## Context

`packages/essay/cases/84-the-window-inside-the-cell`, authored red on 2026-10-05 from the study that put Vivliostyle.js beside Chromium's print and Cicero, puts one question: a table row crosses the foot of a page, and each of its cells carries its own `orphans` and `widows`. css-break-3 §3.3 applies the two properties to every block container that establishes an inline formatting context, a cell included, so a row divided by a page is divided where every cell's own counts allow, and not divided where no point inside it allows them all. Chromium reads both: it moves the row whole where a cell would leave fewer than `orphans` lines behind, and divides it a line higher where a cell would carry fewer than `widows` over. Cicero read neither: the row was cut at the page's foot whatever the counts said, one line of a cell left behind where `orphans` asked for two, one carried over where `widows` asked for two, and the same pages printed under counts of 1.

The tablet's The Flows said why: the Stonehand *offers no candidates inside a parallel flow and reads no constraints from within one*, and the Delegation passages say a parallel flow's split is the platform's answer, inherited — which on screen, where nothing fragments, is no answer. The architecture recorded the tension as a design question rather than a build item, and `.claude/NEEDED-FIXES.md` carried it as a stated debt: never a lost word, the row severed.

**What the rivals do.** Vivliostyle.js 2.45.2 treats each cell as a column with its own candidate list (`layout.ts` `PseudoColumn`) and prices a cut through a row as the sum of the cells' minima (`table.ts` `InsideTableRowBreakPosition`). WeasyPrint (`layout/table.py`, `resume_at` per cell) and fragmentainers move the whole row where a cell's constraint cannot be met at any height.

**What the code already held.** The driver places every item of a row at any cut height (`placesOf(box, cutY)`, *every branch gets a place*), and the resume address already names a place inside a cell. What was missing was the offer and its price.

## Decision

A row crossing the foot of a page is cut at a height its cells' own orphans and widows allow. The Stonehand offers the row's cut at the foot AND at every line bottom of any of its items above the foot (`stonehand.js`, the `if (row)` block, kind `R`). Each offer is priced on the make-up order's second key by the SUM, over the row's items, of the shortfall `owShortfall(k, T, orphans, widows)` that Class B already uses, for an item the height divides — some of its lines above, some below. An item wholly above or wholly below the height is not divided and costs nothing. The order then takes, unchanged: no avoid broken, then the least shortfall, then the highest height. Where no height has zero shortfall, the Class A boundary before the row, which separates no line stack and scores zero, outranks every row cut, and the row moves whole — what Chromium prints, with no new rule.

**Why a sum.** It is the rivals' rule, and it ranks two unsatisfiable heights by how far short they fall, which is what the order already does for a line stack. Case 84 only needs zero against non-zero, so a maximum would have passed too.

The driver and the fragments needed no change. One file moved: `stonehand.js`, 28 lines in and 13 out.

## Consequences

**Predictions, frozen on write, and what happened.**

- Case 84 green in both modes, Chromium's partition identical: **held** (`node cases/runner.js 84`, 2026-10-06 and again 2026-10-07).
- Case 85 unchanged: **held** — the same seven checks failed, until the case was retired from disk on 2026-10-07 (below).
- No other case moves: **held**; `node cases/runner.js` failed on 85 alone.
- Fast suites and `npm run check` green: **held**, except `packages/caster/test/pairing.test.js`'s hyphenated fixture, which failed identically on the held branch's tip without this change — the engine's round *the hyphen is written at the cut* had divided a word across a page, and Caster's partition counted its two halves as two words. Closed in Caster on 2026-10-07 (`packages/caster/DESIGN.md` S70), not here.
- Every battery record reproduces: see the verdict.

**What it does not do, stated.** An item that holds blocks rather than lines (a cell with paragraphs inside) reports no lines of its own, so it is read for nothing inside it — a limit, not a posture. An item's own keeps beyond orphans and widows, and a forced break inside a cell, stay unread. Where a whole row is taller than a page and stands at its top, the order picks the least-short height, as it does for an impossible line stack. The avoid test at the foot is what it was; at a height above the foot it reads only an item the height divides.

**The tablet amendment — proposed here, superseded 2026-10-08.** Egildo ruled a wider replacement in the round *a parallel flow is a fragmentainer* (the tablet's The Flows: the interior is adjudicated by the same walk, the cell sentence verbatim); what follows is the proposal as first written. The Flows says the Stonehand *offers no candidates inside a parallel flow and reads no constraints from within one*. The replacement proposed then: *The Stonehand offers no candidates inside a parallel flow; it reads the orphans and widows of the line stacks of a row's items, at the one height the row is cut, and prices that cut by the sum of their shortfalls. A parallel flow's other interior decisions remain the browser's.* The brief *the fragmentainer inside a fragmentainer* (`.claude/rounds/cicero/the-fragmentainer-inside-a-fragmentainer.md`) lists it with the other sentences that round must amend.

**Left unfixed in the documents.** `architecture.md`'s interface sketch gives the Chase a `measure()`; the code's Chase owns no Gauge, the driver measures through the measure context. Noted on 2026-10-06 and left for the same brief, which needs that sketch redrawn.

**Retired with it, 2026-10-07.** Case 85, *the new row of columns*, the other case the study authored red, is this round's sibling and not its subject: a multi-column box is a nested fragmentation context, which the engine does not have. It was taken off the disk so that the suite claims nothing it does not hold, filed back as chapter two's wanted *the-columns*, and is restored from commit `98956c0` when the brief's round opens.

## Verdict

**Every record reproduced, 2026-10-07**, on the held branch with this round merged into it (`97e4d03`): `npm run gates` 25 of 25 in 7.8 minutes — the six differential tallies unmoved (native 163 agree, 18 legal-divergence, 7 theirs-illegal, 11 unclassified, 1 reference-invalid; composed-v1 89/8/3; composed-v2 86/10/4; v3-native 43/5/1/1; v3-composed 28/1/1; v4 43/4/2/1), the three views agreeing on every page (50, 40, 30), both acceptances, every probe, and **the narrated cases green with no case excused**, case 85 having left the disk. The pin re-recorded against the same commit. Every package's fast suite green, Caster's 193 of 193 with its S70 fix; root suite 378; `npm run check` clean.

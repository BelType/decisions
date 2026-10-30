# The presentation composes the pages it has

**Status: Decided 2026-09-15, Executed 2026-09-15.**

## Context

The checklist's design opens carry it, measured the same day and pinned red by `packages/essay/cases/49-the-page-a-parity-narrows`: in the composed mode, a page whose width the presentation never composed prints the browser's lines under a cut decided on the Compositor's. `driver.js` composes each page's region at that page's own `conditions.contentW`, parity and `:first` included (C8). `composeForPresentation` composed one width per page NAME — `pageFor({ name })`, no parity, no `:first` — over blocks grouped by the top-level block's `effectivePageName`, and `present()` looks a page's records up by the page's own content width. Two routes miss: a width only a parity or `:first` rule decided, and a page name declared below the top level (case 19's plate). The same measurement found the presentation never composing a width the walk had not, over every case and 122 seeds.

## Decision

**The presentation composes the pages the account has, not the page names the stylesheet has.** The account already carries, per page, the conditions the walk decided (`closes.contentW`) and the interval of blocks that page shows (`pageIntervals`). So the question *which blocks does each width need* is account arithmetic, answered DOM-free in `positions.js` as `presentationWidths(pages, blockCount)`: for every page that takes flow, its width key gathers the blocks from the interval's first block through its last, and the blocks a carried parallel flow brings onto it. `composeForPresentation` composes each width over exactly those blocks, in a measure context of that width, into the same cache the walk filled — so every record it needs is a hit, which is what a presentation of the decided pages should be.

**One key, one definition.** The width key a page is looked up by was written inline in `root.js` as `String(Math.round(contentW * 100) / 100)` and again, as a number, in `compose-dom.js`. `positions.js` exports `widthKeyOf(contentW)`, and both the presentation's map and `present()`'s lookup read it.

**Refused: composing every block at every width the account names.** It makes the lookup total by construction and costs a composition per block per width, most of them for pages a block never lands on — the composed mode already takes 38 seconds on the manual. **Refused: re-deriving parity and `:first` in the presentation.** The walk decided them and the account carries them; a second derivation is a second answer waiting to disagree with the first.

## Consequences

`composeForPresentation(doc, blocks, account, cache)` takes the account, and both callers — `seam/client.js` and `packages/essay`'s `lib/client.js` — already hold it. `compose-dom.js` stops importing `readGeometryTable` and `effectivePageName`. The checklist's entry closes. **What stays owed, stated so it is not mistaken for closed:** the venue's own composed instruments — `judgeMeasure`'s composed checks and `serializeComposed`'s print reference — still group blocks by page name, and a print reference applies one record per block as literals, which cannot express a block that sits on pages of two widths at all. The seeds never draw either route, so no record moves; the instrument owes the reading the engine now gives.

## Predictions

Frozen on write.

1. **Case 49 goes green on all three columns**, its composed column's page two reading 214.64pt and 241.64pt, and nothing else in the case moves. BREAK if any other claim changes.
2. **No page of any case presents without a record in composed mode** — the probe that found the fault reads zero pages unkeyed over every case, case 19's plate page included — **and the presentation still composes no width the walk did not**. BREAK on either.
3. **No recorded number moves.** The seeds never vary width by parity and name pages only at the top level, so their presented hints are the same records they were; every gate reproduces, and every other case holds. BREAK on any tally moving.
4. **The composed mode gets no slower on a real document**, since every record the presentation needs is a cache hit. Observed, not gated.

## Verdict

Built in one commit on the round's own branch, after the case had been merged red the round before.

**1 — Case 49 goes green on all three columns. HELD.** The composed column's page two prints the Compositor's lines at the claimed 214.64pt and 241.64pt, and every other claim in the case, which held before, holds unmoved.

**2 — No page presents without a record, and no width the walk did not compose. HELD.** The probe that found the fault, re-run against this engine over every case, seeds 0, 1, 400–402, 600 and 601, and the left-and-right document it was reproduced on, reads zero pages without a record — case 19's plate page among them — and zero fresh compositions.

**3 — No recorded number moves. HELD, and it is the whole battery.** `npm run gates` closed **25 of 25 in 7.4 minutes**, every standing record reproduced, the three composed differentials at 89/8/3, 86/10/4 and 28/1/1 and the composed view gate at 40 view-agree, exactly as recorded; the pin now names `round-the-pages-it-has@e77d6a0`. Every case holds.

**4 — No slower. NOT MEASURED.** No real document was timed in this round; the claim stays an expectation, and the manual under the composed switch is where it would be read.

**What was too good to be true** is only that the fix is smaller than the fault: the account already held every fact the presentation needed, and the fault was a second derivation of them from the stylesheet. The instrument's own name-grouping, owed in the Consequences, is untouched and still cannot see a parity width.

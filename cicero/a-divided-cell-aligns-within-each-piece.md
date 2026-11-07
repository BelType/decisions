# A divided cell aligns within each piece

**Status: Decided 2026-11-07, Executed 2026-11-07.** Built on Cicero's `fix/collapsed-cut-and-corners`, merged into Cicero's `main` and released in Cicero 0.1.8 the same evening. Ruled by Egildo the same night, one ruling of ten in the assessment of 2026-11-07. Covers Cicero's SPEC IV.11 and VI.1.11, both added on 2026-11-07 with no owning record.

## Context

Two rows of the assessment met at one fault. In a row a cut divides, a short cell's text landed on a later page than the row began: a label beside 300 words stood on page 1 in Chromium's print and on a later page under Cicero, with the default alignment and no author CSS (rerun 2026-11-07 through the real CLI 0.1.7 on a scratch build of Cicero's `main`, `--printer chromium`, against Chromium printing the same file alone). In a collapsed table, a row cut without `break-inside: avoid` moved the next page's start by one row against Chromium, changing every page after it. The triage had blamed collapsed borders and called Cicero late. Both readings were wrong: nothing depended on collapsed borders, and Cicero was a row early. Cicero took a cell's `vertical-align` offset over the whole row, as if the row were not divided; Chromium's print aligns a divided cell within its first piece, so content the alignment would have pushed across the page's edge prints above it.

No specification text says how a divided cell aligns. Where the text is silent the oracle is evidence, not authority (the tablet, The Oracle); here the evidence is one engine's print, and it is the one the essay's claims are read against.

## Decision

**A cell a cut divides aligns within each of its pieces.** The first piece is judged and presented with its content set from the cell's top, its `vertical-align` offset dropped, and it reaches the page's foot, as Chromium's print aligns a divided cell within its first fragment. A later piece aligns from its own top. The offset computed over the whole row is never carried across a cut. This is SPEC IV.11.

**A piece is shaped alone.** A piece is laid out by the browser as a box of its own, so `text-wrap` shapes each piece's lines alone. Under `balance` a continuation balances its own lines, where Chromium's print does not balance a divided paragraph: a continuation of fourteen words printed eight and six, and shows seven and seven (measured 2026-11-07). The words on each page agree, and under `pretty` the lines agreed as well. This is SPEC VI.1.11, stated so that the difference is a known one and not a finding waiting to be made.

**Chromium is the oracle here because no text speaks.** Were a specification to say otherwise, this record would be read against it, as *a sibling counter scope stays by the book* is.

**Not this record.** A cell spanning rows (`rowspan`) at a cut is also red. It is ordinary work, a fault to fix against the same oracle, and needs no ruling.

## Consequences

Measured when it was built: a sweep of 72 divided-table cases against Chromium's print went from 13 differing to none (`test/browser/table-row-cut.browser.ts` in Cicero holds the claim). The fix sits on Cicero's `main` and shipped in 0.1.8.

Owed in Cicero: SPEC IV.11 and VI.1.11 drop "no record yet" and the amendments table names this record as the owner of both rows; case 93 is rerun on 0.1.9; the spanning cell at a cut is its own fix.

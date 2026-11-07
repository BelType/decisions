# A sibling counter scope stays by the book

**Status: Decided 2026-11-07.** A ruling not to fix. Nothing is built and the replay in Cicero's `src/document-state.ts` is unchanged. Ruled by Egildo on the night of 2026-11-07, one ruling of ten in the assessment of that day.

## Context

The engine reads the document's counters at the start of each page by replaying the operations it logged ([*a counter is read at the start of the page*](a-counter-is-read-at-the-start-of-the-page.md)). The replay follows CSS 2.1 §12.4.1, *Nested counters and scope*, and css-lists-3: a `counter-reset` on an element reaches that element's following siblings and their descendants. Chromium's print does not: on the measured document it shows F4 where the specification gives F2. A counter whose sibling-scoped reset straddles a page break therefore mixes the two, the specification's number before the break and Chromium's after it, or the other way about. No case claims the difference.

The ruling was first proposed the other way, to make the replay follow the oracle. Egildo asked for the case against fixing, and it won.

## Decision

**The replay keeps the specification.** Cicero is a standards-only engine whose oracle is Chromium's print: the oracle is the evidence where the text is silent (the tablet, The Oracle), never the standard itself. Where the specification speaks and Chromium departs from it, the engine does not copy the departure. Here the specification speaks plainly, in two documents that agree, so the departure is Chromium's to own.

**The divergence stays recorded as Chromium's**, and the row in the assessment closes as accepted until a case claims it.

**Not built unless asked: a console detector** that says when a sibling-scoped reset straddles a page break, where the two numberings could disagree on the page. It is optional, and waits for Egildo.

## Consequences

A document that relies on Chromium's sibling scope prints the specification's numbers under Cicero. A case that claims the difference reopens the question, and the answer then starts from this record. Contrast [*a divided cell aligns within each piece*](a-divided-cell-aligns-within-each-piece.md), decided the same night, where no text speaks and the oracle decides.

The ruling says the divergence stays recorded in Cicero's SPEC. At Cicero's `b9b6a4e` SPEC.md names it in no article: it was carried in the monorepo's `.claude/NEEDED-FIXES.md` and its checklist entry, *Chromium diverges from the specifications on a sibling's counter scope*. A sentence in SPEC citing this record is owed.

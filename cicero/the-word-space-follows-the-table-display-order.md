# The word space follows the table display order

**Status: Decided 2026-11-07.** Executing on Cicero's `fix/table-word-order`, its own branch, the essay battery before merge. Ruled by Egildo on the night of 2026-11-07, one ruling of ten in the assessment of that day.

## Context

The word space is the engine's address: a position is one integer, the global word index ([*the flat position space*](the-flat-position-space.md)), and a page is the interval between two positions. Until now the index numbered a table's words in source order. A table may write its groups in any order, and the display does not follow the source: CSS 2.1 §17.2 shows the header groups first, the body groups in source order, and the footer groups last, wherever each was written.

The assessment found a table losing most of its rows, with no message, when its `thead` was written after the rows or its `tfoot` was written first and was taller than a page. The first half was built on Cicero's `fix/late-thead-tall-tfoot` and released in Cicero 0.1.7: a `thead` after the rows moves to the front of the Gauge's order and repeats, and the CLI shows all 25 rows where 11 were lost. The earlier finding that no word is lost was wrong: measured on 2026-11-07, words are lost in both taller shapes. Three placements waited on a ruling about the word space itself: a late header that does not repeat, whose words are numbered at the end while Chromium shows it first; a footer written first and taller than the page area, which is now refused; and a footer too tall to repeat, still shown on the first page.

## Decision

**Inside a table the word space follows CSS 2.1 §17.2 display order: the header groups, then the body groups in source order, then the footer groups.** The order is computed once, in the index that numbers words, so every reader of a position (the cut, the reads, the presentation, a host's page) sees the same order without computing it again.

**Refused: header and footer rows as repeated chrome with no words, as running elements are.** A running element has no word of its own ([*a running element is a named node*](a-running-element-is-a-named-node.md)), and a header repeated as chrome would be the same. A table's header and footer cannot be: they have real text a reader selects, a screen reader speaks and the printer must claim (*the conservation of words*, Caster's DESIGN.md S61). Taking their words out of the space would leave that text with no address.

## Consequences

The three placements become cases against Chromium's print, written red first. The branch merges only after the essay's battery (`pnpm run prove` and `node src/cli.ts reftest` in `codeberg.org/BelType/essay`) and Cicero's own suite.

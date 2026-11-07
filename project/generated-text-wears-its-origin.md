# Generated text wears its origin

**Status: Decided 2026-11-07.** Executing on `fix/generated-marker` in Caster, Cicero and common, a case on each side. Ruled by Egildo on the night of 2026-11-07, one ruling of ten in the assessment of that day.

## Context

A running head printed "3. Results" where css-gcpm-3 says "Results": `content()`, the value `string-set` takes by default, is the element's text without its `::before` and `::after`. The triage blamed Cicero's `content()`. Traced on Cicero's `fix/counters-and-heads`, the head is Caster's: Caster's preparation turns the heading's `::before` into a real span before Cicero cuts, so that every word the page shows is an element the printer can claim (*the conservation of words*, Caster's DESIGN.md S61), and Cicero's `content()` then reads that span as the author's text. A case pins Cicero's side. The CLI's README and the testbench's results blamed the wrong package; the CLI's line was corrected on `fix/standard-header-and-readme`.

Both packages are right on their own terms. Preparation must reify generated content, and a reader of an element's text must not count what the author did not write. What was missing is a way for the second to know what the first made.

## Decision

**Every element Caster's preparation makes from generated content carries `data-beltype-generated`, whose value names the pseudo-element it was made from.** Cicero's `content()` and `string-set` readers skip an element that carries it. `content(before)` and `content(after)` may read such elements, since they ask for exactly that text.

**The name lives in common's types**, beside the other words the packages share (`packages/common/src/data-beltype.ts`): on the branch, `GENERATED_ATTRIBUTE` and the values `before`, `after` and `marker`, a list item's.

**`data-beltype-`, not `data-caster-`.** The attribute is a contract between two packages, one that writes it and one that reads it, and neither owns the other. It is also not Caster's alone: the editing view will reify generated content the same way, and a reader there must skip it for the same reason. A product prefix names the contract once for every writer.

## Consequences

A case on each side: in Caster, preparation marks what it makes; in Cicero, the readers skip what is marked, with the running head "3. Results" as the case. The testbench's results line on the running head is corrected. A future writer of reified generated content, the editing view first, sets the same attribute, and the readers need no other change.

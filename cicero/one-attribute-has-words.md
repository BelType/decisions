# One attribute has words

**Status: Decided 2026-10-10, Executed 2026-10-10.**

## Context

Cicero shows a page through copies of the slice on it, and keeps the boxes outside the slice as HOLLOW elements (*the clone is hollow outside the interval*) so that structural selectors match as in the source. A `:has()` whose argument reaches inside a hollow box finds nothing, and the answer then was a guard: wherever any stylesheet the document wears had a `:has(`, every copy was built deep. Measured 2026-10-10 on the BGD manual with three `:has()` rules added to its stylesheet (the manual as it stands writes none): 284 250 elements instead of 10 100, a presentation 8 times and a pagination 3 times dearer, 2.6 s against 0.64 s for a full run, 5.1 s against 1.8 s composed.

The design is the note `.claude/plans/cicero-optimisation/data-beltype.md` (step 1) and the census beside it (`one-attribute-census.md`), ruled by Egildo on 2026-10-09 and 2026-10-10. This entry records the moment step 1 was built and the three places the code met the note.

## Decision

**`data-beltype` is one attribute of space-separated words, and its registry is one zero-import module, `src/data-beltype.js`.** A flag is a bare word, a value is `key:value`; the grammar is `words`, `wordOf`, `hasWord`, `addWord`, `removeWord` (read, modify, write — a copy keeps what its source carried, and the attribute goes with its last word), no key may end with another key, and the table declares each word once: the three bare values already in use (`transform`, `cicero-provision`, `cicero-interface`), the first value family `has:`, and the line stamp's key `pos` (reserved; core writes it from step 2, [*the piece words*](the-piece-words.md)). Core and the editing tools' dresser keep their own literals, pinned equal by `test/data-beltype.test.js`; the engine's no-import law is not amended. The registry also spells the `has:` forms, as `gcpm-encoding.js` spells its four.

**Every `:has(A)` the document writes becomes `:is(:where([data-beltype~="has:H"]):is(*, A′), :where(:not([data-beltype~="fragment"])):has(A))`** in `seam/rewrite.js` (spelled `[data-beltype-fragment]` until step 2), in place and on its line, at any depth and in any grouping rule. `A′` is `A` without each item's leading combinator, so the union weighs what `:has(A)` weighed (`:where()` nothing, `:is(*, A′)` what `A` does). `H` is six base-36 characters of a 53-bit hash of the argument's canonical text (comments out, whitespace collapsed), widened on a collision and stable for the realm. Each rewritten sheet ends with `:not(*) { --beltype-has-H: "A" }`, one rule carrying the arguments, which the capture reads from the CSSOM (`capture.js`'s `hasArgumentsOf`). An argument that reads state a word computed once cannot follow (`:hover`, `:checked`, `:focus-within`, `:target`, `:focus-visible`, `:visited`, form validity, a media element's state, `:state()`, `:scope`, `&`) is left as written, named on the console, and keeps today's guard for its document.

**The answers are computed once per run, from the originals, and written on the copies** (`src/has-words.js`, `word-space.js`). `paginate` asks each top-level box (`matches` and `querySelectorAll`) for each argument in the real tree, seats the result as a map source element → words, and `noteSource`/`mapCloneToSource` write it on a copy as it is registered against its source; the Compositor's measuring clones are dressed alike. The source is never written (C5). `sheetsUseHas` now means a `:has(` that nothing answers for, counted as every `:has(` of a selector less the unions in it.

**A box whose words moved is a box that was edited.** The run keeps, per top-level box, which element got which words; a resumed run compares and restarts at the first page touching each box whose words moved, and may not stop before the last — the mechanism a changed delivered read already had (`resume.js`'s restart and `atLeast`). An argument can reach across blocks, so an edit in one block can flip a later block's tint while its entry key stays equal.

**Refused.** Parsing selectors back out of the CSSOM (the registry rule carries the arguments instead). A word on the source (C5). Rewriting `:has()` inside `@supports selector()` (only rule preludes are walked). Hosting the zeroing of margins and borders in a sheet, `hollow` and `:empty`, the piece words and the `pos:` fold: steps 2 and 3.

## Where the code met the note

1. **The registry property is `--beltype-has-H`, not `--beltype-has:H`.** A colon cannot stand in a custom property's name.
2. **The native arm is guarded for the root of a copy.** The note's union asks `:has(A)` natively of every element, and the root of a copy has, for siblings, the other copies in `<beltype-root>` in page order: the first fragment of a section saw its own continuation, which held the paragraph the rule looks for (case 101; the pin `packages/essay/test/has-words-edit.test.js` agreed with itself while both columns were wrong, and a case with an absent-ink claim found it). `:where(:not([data-beltype~="fragment"]))` before the native `:has(` takes the arm away from a copy's root and weighs nothing; step 2 spelled it with the word `fragment` (2026-10-11). **What it left:** an ORIGINAL presented whole has no word and asked `~`/`+` natively among the root's children, copies included — closed in step 2 by the same guard inside the native argument ([*the piece words*](the-piece-words.md), case 102).
3. **The BGD manual as it stands writes no `:has(`.** The cliff measured in the note (286 000 elements) is not on the manual today; the numbers below are for the manual with three rules added (`p:has(+ ul)`, `li:has(> ul)`, `section:has(> h2)`), and the manual as it is is the control: unchanged.

## Consequences

BGD manual, 123 pages, headless Chromium at a visible page, three runs each (milliseconds of a full run; elements under `<beltype-root>`):

| | Before | After |
| :-- | :-- | :-- |
| as it stands (no `:has()`), default | 652–718 ms, 10 068 | 624–683 ms, 10 068 |
| as it stands, composed | 1 853 ms, 10 457 | 1 876 ms, 10 457 |
| with three `:has()` rules, default | 2 569–2 618 ms, 284 250 | 622–640 ms, 10 100 |
| with three `:has()` rules, composed | 5 126 ms, 332 810 | 1 832 ms, 10 489 |

The answers cost 1.5 ms a run on the manual with three rules (`cicero:has-words`). BelType's own manual (no `:has()`; 278 pages, 59 769 elements with this round's own section in it): default 3 176–3 536 ms before, 3 179–3 329 after; composed 7 962 before, 8 091 after.

The editing tools' preview patch road no longer stops at `[data-beltype]` (it would have matched every stamped block once the stamp folds), the dresser and the stylesheet rewrite test the two head words, and the inspector shows the author's selector, never the union, and skips the registry rule. An author-written `data-beltype` is refused in `{…}` lists and directive attributes with a `ValidationError`. Cases 100 (a `:has()` rule against competitors of equal, higher and lower weight in both source orders) and 101 (a copy that must not see its continuation) are new, and case 69 is green through the word and not through the guard.

Open, by name: `sheetReach` still treats any `:has(` as reaching, so the forced-break index's memo is dropped each run for such a document (the edit line says so); the composition cache's block key does not carry a neighbour's words, so a composed block whose width a cross-block `:has()` decides can be answered stale after an edit elsewhere (unmeasured; no case holds it).

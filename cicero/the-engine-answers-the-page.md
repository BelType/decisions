# The engine answers the page

**Status: Decided 2026-09-04, Executed 2026-09-04.**

## Context

`paginate()` has returned a position index since the streamline round, and its own header states the purpose: *a caller holding a source element — a host that knows which node an edit touched — can ask where in the paginated document that node's words begin without rebuilding anything.* No caller ever received it. `seam/client.js` destructures `{ account, wordCounts }` and drops `index`, `ledger`, `composition` and `conditions`; `run()` resolves to `{ pages, ms }`. `BeltypeRoot.present()` has the same shape one level down: it reconstructs the full page interval table from the account, builds every frame from it, and publishes nothing. Both halves of *which page does this node's text sit on* are computed on every render and reachable by nobody. Filed as beltype#19 by the probe that went looking for them — a Markdown character mapped to a DOM boundary point exactly inside a block, and could not be asked which page it landed on at all.

The obvious repair is to widen `run()`'s return, and it is the wrong one (beltype#20). The index answers in the **word space** — `wordsBefore(el)`, `blockOfEl(el)` — where a word is a maximal non-whitespace run of the block's joined text, continuing across text-node and inline-element seams, and `indexBlocks`' own header warns that its tokenization must equal `joinedWords`' exactly. A consumer working in characters would have to reimplement that tokenizer, and an off-by-one there produces a confidently wrong page rather than a visible failure.

## Decision

**Cicero answers a page for a source element and a character offset within it. It exposes no index.** The verb is `pageOf(sourceElement, charOffset)`, seated on `<beltype-root>` — the object that presented the pages — and published to a host through `window.__beltypeCicero.pageOf`. It returns the zero-based page index, or `null`.

Three consequences of that shape, each the reason for it:

**The tokenizer never leaves the realm it is checked in.** The char→word step is `wordsBeforeChar(el, charOffset)` in `positions.js`, written in the same walk as `indexBlocks` and next to it, so the two cannot drift apart in different packages. The host asks in characters, which is the space an editor actually holds, and never learns what a word is here.

**The query works in `{ block, word }`, not in the flat position.** The word space under-determines block seams wherever a block has no words — case 04's plate, already the reason `posBlock` is carried as a view literal — so a query resolved through `bases` would inherit the ambiguity the presentation was taught to avoid. The page intervals carry their own block literals; the query compares against those.

**`null` is an answer, and it names one thing: the position space cannot discriminate here.** Two cases produce it beyond the ordinary refusals (an element the index does not hold, an offset past the element's text, a document not yet presented). A character inside a block the presentation cut **geometrically** — a monolith sliced by a shell — has the same word position on every slice, so nothing in the record says which slice bears it. A character in a **word-empty** block spanning more than one page has no word position at all. Both are refusals the engine can state and a consumer cannot detect, which is exactly why they are the engine's to make. Refused alternative: falling back to `elementFromPoint` over the original's client rect. It reads null below a straddler's cut — the rect lands inside the *next* page's frame — so it converts a stateable refusal into a silent one.

**And the interval table stops being built twice.** `pageIntervals(account)` is pure arithmetic over the account, in `positions.js`; `present()` reads it instead of rebuilding it inline, and the query reads the same table. One construction, two readers — the account ruling's own rule, applied to the view's side of it.

Refused: widening `run()`'s return with `index`. It publishes live DOM references across the seam, which `packages/editing-tools/DESIGN.md`'s parked horizon — the engine leaving the realm — would strand; a verb survives that move and an exposed index does not.

## Predictions, frozen on write

1. **The interval extraction is behaviour-preserving.** `present()`'s reconstruction moves to `positions.js` verbatim in its arithmetic. Hold: every standing gate reproduces, no record moves. Break: any page count, any divergence tally, any positional gate changes.
2. **`pageOf` is exact wherever the word space discriminates**, and refuses at a shell slice and inside a word-empty block spanning pages. Break: a case where it answers a page the presentation did not put the character on.
3. **Expected to be unable to say:** which slice of a sliced monolith a character is on. That is prediction 2's refusal, stated as a limit rather than discovered as one — the character refinement (`(gi, char)`, reserved and unminted) would not help, because a shell cut moves no position at all.

## Consequences

`src/positions.js` gains two pure functions and stays DOM-free and browserless-testable; `src/root.js` keeps the interval table it already built and answers over it; `seam/client.js` publishes one more member on the handle it already sets. `paginate()`'s return is unchanged — `index` still rides out, now with a reader inside the package rather than none anywhere. The architecture's Ledger section said *element queries remain projections by law — re-mint it from `paths` the day a caller exists*; the caller exists, and the projection was minted in the view rather than in the Ledger, because *which page* is a presentation fact and the Ledger is DOM-free by construction.

Closes beltype#19 and beltype#20.

## Verdict

**Prediction 1 held, and it was checked rather than assumed.** The battery ran the whole 25 gates in 17.2 minutes: 24 ok, `cases` failed two checks. Neither is this round's. The same two — `[native]` and `[composed] top-band furniture`, case 12 — reproduce identically against `main`'s `src/` through `ENGINE_DIR`, and a check-for-check diff of the two runs is **empty**: every other line agrees. They belong to *the page context dresses the host*, which never ran the battery (its pin is recorded stale on purpose), and the cause is the fix working — `@top-center`'s `letter-spacing: 0.2em` now reaches the cell, so extracted PDF text reads `F V R N I T V R A` and a substring test for `FVRNITVRA` fails. Filed as `.claude/NEEDED-FIXES.md` §2.3, with both honest repairs named; deliberately **not** fixed here, since a check authored against a missing feature is its own question.

**Prediction 2 held, with an oracle rather than an assertion.** `packages/essay/test/view.test.js` gains a browser-backed pin whose ground truth is the presentation itself: a whole box is assigned to its page's root slot, named `iv-N`, so the browser says which page bears it. `pageOf` agrees for every whole box in the case, the last character of a block answers the same page as its first, and both refusals — an element outside the index, an offset past the text — come back `null`. Six DOM-free tests beside it; 58 in the package, 330 at the root.

**What was too good to be true.** The first implementation of `pageOfPos` tested the shell refusal on the page the interval search **landed** on, and the test caught it immediately: a shell cut leaves the position exactly where it was, so its pages carry *empty* intervals and the search sails straight past them into a page that merely looks like the answer. The refusals are properties of the **block**, not of the page found — which is the same shape as the boundary lesson `posBlock` already exists for, met a second time from a different direction.

**Unpredicted:** nothing. The extraction was verbatim and behaved verbatim.

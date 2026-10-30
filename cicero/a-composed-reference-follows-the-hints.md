# A composed reference follows the hints

**Status: Decided 2026-09-15, Executed 2026-09-15.** Convened by Egildo on the first-fragment round's close, which found the conflict and did not edit the records.

## Context

The first-fragment round closed at 21 gates of 25 ([*the first fragment is constructed*](the-first-fragment-is-constructed.md), verdict on prediction three). The three composed differentials disagreed with their records — 89/8/0/3 run against 77/10/10/3 recorded, 86/10/0/4 against 68/9/19/4, 28/1/0/1 against 26/0/3/1 — and the pre-round engine, run from its own committed source against references built fresh, produced the same three tallies. The engine had not moved them. What had moved was which bytes Chromium was handed to print.

The mechanism is in `seeds/differential.js` and `seeds/ledger.js`. A composed reference is Chromium printing `screen.serializedHtml` — the document with this engine's own chosen line breaks materialised as literals, so that both sides break the same lines and a composed run tests the cut rather than the wrap ([harness.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/harness.md), the composed mode). It is cached per seed, and `ledgerValidity` admits a cached reference on three clauses: the generator's token count, its first token, and the reader's schema. A compositor that chooses different lines changes none of the three. So a cached composed reference outlives the compositor that produced it, and a run that reads one compares this engine's cuts against an older engine's lines, which files as a wrap divergence, which is `unclassified`.

That is what the composed records recorded. On 2026-09-10 *the rag is priced once* changed the Compositor's badness model, the composed ranges were re-run against the cache the previous compositor had printed, agreement fell from 89 to 77, and the fall was read as the price of a stronger optimiser coinciding with greedy wrapping less often — a note this venue wrote with care and measured at length. The measurement of the rag stands: over 784 priced lines the mean was unmoved and the spread fell a fifth. The tally conclusion drawn from it does not. Agreement never fell; the reference had gone stale under the compositor, and the fourth slice's close reproduced the same 77 from the same cache. This venue's oldest scar is a cached reference from a different generator; this is the same scar in the one place the validator was never built to look.

## Decision

**One — a composed reference is keyed on the hints it was printed from.** `hintsOf(serializedHtml)` is a twelve-character SHA-256 prefix of the hinted bytes, one definition in `seeds/ledger.js`. The differential computes it before it looks at the cache, passes it to `ledgerValidity` as a fourth clause, and stamps it into a fresh reference's `meta.hints` before writing. A cached composed reference whose `meta.hints` differs — or is missing, which every reference printed before this round is — is refused with both digests named, deleted, and printed again. Native references are untouched: they print the generator's bytes, and the three clauses already say whose.

**Two — the site's reader checks content and shape only, and says so.** `readLedger` serves the book's seed reports and cannot recompose a seed to learn its hints, so it passes none and the clause stays silent. A stale composed reference can therefore still be *shown* by the site until a differential run rebuilds it; it can no longer be *gated on*. The alternative — the site running the Compositor to learn the digest — would put the engine's decision-side in a page that exists to read records, and is refused.

**Three — the three composed records are re-recorded at the numbers a fresh reference gives**, their notes rewritten to say what the tallies count now and what the 2026-09-10 note got wrong. This is the records edit Egildo authorised at the round's opening, and the battery at close is run `--fresh`, which is the honest form: every reference rebuilt, the pin recording `fresh: true` for the first time since the pin has carried the flag.

**Refused: bumping `LEDGER_SCHEMA`.** A schema bump invalidates every reference, native ones included, and says nothing about why; the fourth clause invalidates exactly the references that are wrong and names the reason.

**Refused: a content check that would have caught it.** The composed reference's tokens ARE the generator's tokens in the generator's order; no property of the printed text distinguishes two line stacks. Only the input does, and a content check cannot audit an input any more than it can audit a format — which is the sentence the third clause was added under.

## Predictions

Frozen on write.

1. **A fresh battery reproduces the first-fragment round's fresh numbers exactly** — composed-v1 89/8/0/3, composed-v2 86/10/0/4, v3-composed 28/1/0/1 — and every other gate reproduces its record, 25 of 25, the pin rewritten with `fresh: true`. BREAK on any composed tally differing from those three, which would mean the first-fragment round's counter-check was itself served by something, or the engine merged since moved a composed cut.
2. **Zero `unclassified` in every composed range.** Composed mode prints this engine's own lines, so a wrap divergence cannot arise there by construction; every `unclassified` the three records carried was the cache. BREAK on a single one, which would be a wrap divergence with a cause this entry has not named.
3. **The main checkout's cached composed references are refused on the next run there**, every one of the 230 naming `meta.hints missing`, and rebuilt. Not run in this round — the round's worktree begins with an empty `out/` — and stated so the next session knows what the first composed run on `main` will spend.
4. **What the instrument cannot say.** Nothing here verifies that `serializedHtml` is the whole of the composed input. If the Compositor ever reads something the serialization does not carry — a computed style read off the source rather than materialised as a literal — the digest would agree while the lines differed. The `composedChecks` the run already performs (fit violations, line-count mismatches) are the guard on that side, and they are stated here rather than gated further.

## Consequences

`harness.md`'s cache-validity clause gains the fourth clause and the composed-mode section says a reference is a function of the hints. `gates/records.js`'s three composed entries carry the fresh tallies and honest notes; `RESULTS.md`'s scoreboard is regenerated from them and its closing paragraphs record this round; the venue's `CLAUDE.md` gotcha written by the first-fragment round becomes a rule that is built rather than a hazard to remember. `test/ledger.test.js` exercises the clause both ways.

**What this owes the 2026-09-10 note.** Its rag measurement was true and its tally reading was not, and the corrected note says both. The lesson is the venue's own, restated: a number that reproduces from a cache reproduces the cache.

## Verdict

**Prediction 1 held exactly.** The battery ran `--fresh` — every reference rebuilt, 7.5 minutes — and closed at **25 gates of 25**: composed-v1 89/8/0/3, composed-v2 86/10/0/4, v3-composed 28/1/0/1, and every other gate reproducing its record. The pin is rewritten at `7d3ab34` with `fresh: true`, the first pin to carry the flag as true.

**Prediction 2 held.** No `unclassified` in any composed range. Printing one's own lines leaves no wrap to diverge on, and the three counts the records carried were the cache and nothing else.

**Prediction 3 is carried, not answered.** This round's worktree began with an empty `out/`, so the refusal of a pre-clause reference was exercised by the unit test and not by the run. The main checkout holds 230 composed ledgers with no `meta.hints`; the first composed differential there will refuse each by name and rebuild it, at the cost of one fresh composed run.

**Prediction 4 stands as stated.**

**What was too good to be true.** Nothing in the mechanism — the clause is one comparison and a digest, and the numbers landed where the first-fragment round's counter-check said they would. What was too good was the 2026-09-10 note: a careful measurement of the rag was attached to a tally that measured the cache, and the attachment made the tally look explained. A number that reproduces from a cache reproduces the cache, and the fourth slice's close reproduced it a second time with the same care. The venue's rule about a green run applies to a red one too: a fall must fall for a reason somebody can name, and this one was named wrong.

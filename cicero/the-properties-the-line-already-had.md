# The properties the line already had

**Status: Decided 2026-09-07, Executed 2026-09-07.**

## Context

The composed mode owns line breaking and reads the browser for widths, alignment, indent, `hyphens` and the content language. Three css-text-4 properties that govern the same decision were never asked for, and all three are computed and readable in the oracle — measured on a throwaway probe: `hyphenateCharacter`, `hyphenateLimitChars` and `overflowWrap` all come back with the author's value or `auto`/`normal`.

- **§6.3.2 `hyphenate-character`.** `compose-dom.js` wrote a literal `'-'` and measured a literal `'-'`, in two places. The section says otherwise twice: `auto` means the UA *"should find an appropriate string based on the content language's typographic conventions"*, and it names the usual answer — *"the hyphen character (U+2010) is most typically used to indicate that a word has been split"*. An author may name any string, and *"specifying the empty string is valid, and causes the UA to break at hyphenation opportunities without inserting a visible hyphenation character"*.
- **§6.3.4 `hyphenate-limit-chars`.** `hyphenationOffsets` took only the pattern set's `leftmin`/`rightmin`, so an author could not change them.
- **§6.4 `overflow-wrap`.** The Compositor's degenerate case takes an overfull line and never cuts inside a word. Under `break-word` or `anywhere` an over-long word may be divided at an arbitrary point, and the section says outright: **no hyphenation character is inserted at the break point.**

The venue had already paid for the first of these without knowing it. `cases/runner.js`'s `stripHyphens` had to learn **three** characters, and the note beside it says why: *"Chromium's own hyphenation emits U+2010 and the engine under study materializes an ASCII U+002D"* — a normalisation that knew only the ASCII one reported a lost word where a word had merely been divided by the other column.

## Decision

**All three are read. None of them is large, and the interesting part of each is where the reading stops.**

**One — the hyphenation character is read, written and measured.** `hyphenCharOf` unwraps the computed CSS string (quotes on, as the CSSOM serializes it) and returns U+2010 for `auto`. The character rides the composition record, because `applyHints` has the record and nothing else and the character is a property of the source's own style rather than of the width the record was composed at. `measureHyphenWidth` measures *it* rather than a hyphen-minus, and returns 0 for the empty string — so §6.3.2's empty string falls out of the arithmetic rather than needing a branch.

**Refused: keeping U+002D as the `auto` value on the grounds that nothing would move.** Something does move, and it moves toward the oracle: both columns of `cases/29-the-hyphen-priced-in` print U+2010 three times each now, where the engine's printed U+002D. The venue's own three-character normalisation was built to survive that disagreement and it stays three characters wide, because an author may still name any string and a conditional hyphen is a fourth thing again.

**Two — the three limits are read, and each `auto` resolves to what the pattern set already said.** §6.3.4's `auto` is *"a value that adapts to the current layout"*, and the layout this engine has is the pattern set's own `leftmin` and `rightmin`, with their sum for the word total. That is what makes the property free to read: **a document declaring nothing gets the numbers it got before, term for term**, so no standing composed figure can move on this change alone.

**The limits bind an exception list's divisions and an author's own soft hyphens as well as a pattern match**, and the reading is stated because it is the section's own and it is unqualified: *"if the word does not meet the required minimum number of characters in the word / before the hyphen / after the hyphen, then the word must not be hyphenated"* — a sentence about the word, saying nothing about where the opportunity came from. A soft hyphen inside a word the limits exclude is therefore not taken, which is a real cost and is what the specification says. Soft hyphens are not counted as characters of the word when the offsets are measured against the limits, since they are not characters of the word.

**Three — `overflow-wrap` admits emergency breaks, and the condition is what makes them a last resort.** Under `break-word` or `anywhere`, a word that will not fit a line of its own gains a break candidate at every code-point boundary, marked `glyph: false`: no hyphen advance in the fit arithmetic, no hyphen demerit, and no character written.

**Refused: pricing them into the ordinary candidate set.** §6.4 admits an emergency break *"if there are no otherwise-acceptable break points in the line"* — a statement about a line, not a cost to trade off — and a price alone cannot express it here, because an ordinary line's demerits are unbounded in practice: badness is cubed, capped at 10000, and then squared, so any finite emergency price is eventually beaten by a merely ugly line. Asking §6.4's own condition of the **word** is the checkable form of it, and it means the candidates simply do not exist anywhere they would be wrong. The price is then only an ordering among candidates that all belong: dearer than any hyphen, cheaper than an overflow.

**`glyph` is written only where it is false.** Every break that shows a hyphen keeps the two-field shape it has always had, so nothing downstream and no existing pin had to learn a field to go on meaning what it meant — which is also the cheapest possible statement that this change is inert wherever §6.4's property is not declared.

**Refused: `anywhere`'s effect on intrinsic sizes.** The section makes `anywhere`'s soft wrap opportunities count toward min-content sizing and `break-word`'s not. That is a question about intrinsic widths, which this engine reads from the browser and never computes, so the two values are treated identically here and the difference is recorded as unmodelled rather than approximated.

**Refused: grapheme clusters.** §6.4 requires them to stay together. Code-point boundaries are the half of that reachable without a segmenter — a surrogate pair is never split — and combining marks are stated as a limit rather than approximated.

**Refused: laws.** None moves. This is the tablet's *uniform law, never uniform pixels* in its ordinary shape: the same algorithm, now reading three more of the author's own instructions.

## Predictions

Frozen on write.

1. **The engine's own column prints U+2010 where it printed U+002D**, and `cases/29-the-hyphen-priced-in` still holds. *Breaks* if the case moves — the glyph widths differ, so a composed line's width changes by a fraction and a near-tie could re-break.
2. **Nothing else moves.** No case declares any of the three properties, and each read resolves to the engine's previous behaviour when nothing is declared. *Breaks* on any case whose result differs from the previous round's run — and the prediction is deliberately about the CASES, since a pin that asserts the character itself must move and would be a finding if it did not.
3. **`cases/acceptance.js` keeps its pinned 12 pages in both modes.**
4. **The DOM-free suite gains pins for each of the three and stays green**, and the existing Compositor pins pass unchanged. *Breaks* if an existing pin has to be edited, which would mean the Hints value changed shape for breaks that are not emergency ones.

## Verdict

**Prediction 1 held, and the measurement is the round's most satisfying.** Both columns of case 29 print **U+2010, three times each**. Before this round the engine's column printed U+002D and Chromium's U+2010 — which is exactly the disagreement the venue's `stripHyphens` was widened to survive, three weeks after it was first noticed. The case holds unchanged: same page count, same positional claim, same recorded divergence about *which* words the two resources divide.

**Prediction 2 held on the cases and broke, correctly, on one venue pin.** The whole case suite was run and diffed against the previous round's: **identical, line for line**, 27 checks failing on the same thirteen cases. What did move is `packages/essay/test/compose.test.js`' end-to-end hyphenation regression, which matched `/-<br class="__beltype-break">/` — the literal the engine used to write. It matches U+2010 now, and it is a **character-exact** match on purpose rather than a loosened one: a pin that accepted either would have stopped being able to tell the two apart, which is the whole thing that line is for. That it went red is the fixture working; the loosening would have been the defect.

**Prediction 3 held.** 12 pages presented and printed, native and `--composed` alike.

**Prediction 4 held, including its second clause, which is the load-bearing one.** 87 tests to **93** — three for `overflow-wrap` (the division taken and charged no hyphen advance; the property changing nothing where no word is overlong; a hyphen point inside the overlong word outranking an emergency break) and three for the limits (an `auto` resolving to the pattern set's own numbers, each of the three binding on its own, and the limits reaching an exception list's divisions). **Every existing Compositor pin passed with no edit**, which is what `glyph` being written only where it is false buys.

**Too good to be true, checked.** The first version of the `overflow-wrap` pins asserted a break at char 9 on a twenty-character word with a hyphen point there, and it failed — because from char 9 the remainder is eleven characters and needs a third line, where the emergency break at char 10 gives two. The DP was right and the expectation was arithmetic nobody had done. The test now uses a nineteen-character word, where both candidates give two lines and the hyphen wins on price, which is the claim it was meant to make.

**One thing was found and not fixed.** `candidatesFor` mixes two offset spaces when a word carries both a soft hyphen and a Liang candidate: soft-hyphen offsets index the word as written, Liang's index the word with its soft hyphens removed. That is pre-existing, it predates this round, and it is only reachable by a word that has both — which no document here writes. It is recorded rather than repaired, because repairing it means choosing which space the Compositor's `char` is in, and that is a question about the Hints value rather than about these three properties.

**The battery ran at the close of the rounds (2026-09-07), and no standing number moved for this round — checked by a counterfactual rather than by a tally.** The argument was the weakest of the seven, so the check matters most here, and it is the composed gate that carries it. The three gates whose tallies the run disagrees with — `native` (0–199), `composed-v2` (200–299 `--composed`) and `v3-native` (400–449) — were each run a second time against the **pre-round `src/`**, the tree at `1cce345` reached through `ENGINE_DIR`; the two runs' reports are **identical seed for seed**, and `composed-v2` — the gate whose population is exactly the documents whose lines this engine composes — is identical at 84 agree / 12 legal-divergence / 4 theirs-illegal. So `hyphenate-character`, the one read that could have moved a number, moved none: the corpus does not hyphenate, and there is no division for the new glyph to appear in. **The three disagreements with `gates/records.js` are identical before and after these rounds and are therefore not the engine's**; they are the machine's, the record is left standing, and the account is in the repo [CHANGELOG](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/CHANGELOG.md) and in the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) §7. The pin is not rewritten — only a complete run with every gate green may write one, and `cases` and `suite` are red here on a font substitution.

## Consequences

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) does not move.

[`architecture.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md)'s The Compositor records the hyphenation character as read rather than literal, and names §6.4's emergency break as a candidate kind with its own marking.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s part one §5 `hyphens: auto` line records the three reads.

Next door, `lib/chapters.js`' rows for §6.3.2, §6.3.4 and §6.4 say what is read and where the reading stops; chapters fifteen and seventeen say the same in prose, and seventeen's example gains the sentence about the character both columns now print. `test/compose.test.js`' hyphenation regression matches U+2010, character-exact, with the reason beside it.

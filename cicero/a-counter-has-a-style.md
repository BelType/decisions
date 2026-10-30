# A counter has a style

**Status: Decided 2026-09-14, Executed 2026-09-14.**

## Context

`capture.js#resolveContent` is the Furniture's literal reader: it turns a margin box's captured `content` value into the string the Chase writes into a shadow cell (I4). Its grammar was one regex, `counter\(\s*page\s*\)|counter\(\s*pages\s*\)|"…"|'…'`, and `counter()` takes a counter style as its second argument exactly as it does anywhere else in CSS. So `counter(page, lower-roman)` matched nothing, `parts` stayed empty, and the function returned `null` — **an empty box, not a wrong number**, which is the front-matter idiom printing nothing at all.

Found by reading on 2026-09-14 and measured before it was touched: P33a and P33f (`probes/counters.js`) record Chromium honouring `counter(page, upper-roman)` as I, II, III and `counter(pages, lower-alpha)` as c, c, c. `cases/36-the-numbered-page` was authored red against it in the same round — two front pages asking for the counter in lower roman, three text pages asking for the same counter in digits, and a top-right box that says which page of how many on every one of the five.

## Decision

**The reader takes `counter(<page|pages>[, <style>])`, and a named style formats the value.** Two parts, and the second is a module rather than a branch.

**One — the grammar widens by exactly one optional argument.** `counter\(\s*(page|pages)\s*(?:,\s*([a-z-]+)\s*)?\)`. Nothing else about `resolveContent` moves: it stays DOM-free, it stays a concatenation of counters and quoted strings, and `none`/`normal` still yield `null`.

**Two — `src/counter-styles.js` holds the formatting, and it is a module because a second reader is already owed.** The predefined styles this engine answers are `decimal`, `decimal-leading-zero`, `lower-roman`, `upper-roman`, `lower-alpha`, `upper-alpha`, `lower-latin`, `upper-latin` and `none` — css-counter-styles-3's alphabetic and numeric predefined set, minus the scripts nobody in the corpus writes. The same function answers an author's counter the moment one is read from a margin box, which is the very next fix in this round, so it is written once here rather than twice there.

**Three — an unknown style falls back to `decimal` and says so on the console, once per style.** This is the one place in this engine where a fallback beats a refusal, and the reasoning is the tablet's own *the build cannot fail* read against what a reader would actually lose. **A folio that vanishes is worse than a folio in the wrong numerals**: the number is still the page's, still correct, still readable, and the console line names the style that was not understood — whereas a refusal takes down the whole render for `counter(page, cjk-earthly-branch)`, and the value the author asked to see is arithmetic this engine already holds. *A refusal is a detector; a fallback is a hiding place* is the standing scar, and it cuts the other way exactly where the hidden thing is not a fact the engine failed to compute. Here the fact is computed; only its spelling is unknown. The console line is what stops it being a hiding place, and it is emitted once per distinct style so a hundred-page document does not bury it.

**Refused: implementing `@counter-style`.** An author's own counter style is a CSSOM read and a descriptor grammar, and no document has asked for one. Named on the checklist, not built.

**Refused: laws.** None moves. This is I4 in its plainest shape — a resolved value delivered as a literal — reading one more argument than it did.

## Predictions

Frozen on write.

1. **`cases/36-the-numbered-page` goes green on both Cicero columns**, with the two front pages reading `i` and `ii` and the three text pages reading `3`, `4`, `5`. *Breaks* if the text pages read anything but 3, 4, 5 — that would mean a named page is being taken for a counter reset, which is a different gap (design open (2)) and not this fix.
2. **Every other case is unmoved.** No case in the tree writes a styled `counter()`, and an unstyled one takes the same path it always took. *Breaks* on any case whose result differs.
3. **The DOM-free suite gains pins for the formatter and for the widened grammar**, and the formatter's pins are arithmetic rather than a transcription: the roman boundaries (4, 9, 40, 900, 3999), the alphabetic wrap at 26 and 27, the leading zero below ten, and the out-of-range fallbacks. *Breaks* if the only pin anyone can write is a table of expected strings typed twice.
4. **No standing number moves.** The corpus's generated documents declare `@page { size; margin }` and no margin boxes at all, so no seed resolves any `content` whatever. *Breaks* if any gate's tally moves.

## Verdict

**Prediction 1 held.** `cases/36-the-numbered-page` is green on `cicero` and `cicero-composed`, every check: five pages presented and printed, the two front pages reading `i` and `ii` at the foot, the three text pages reading `3`, `4` and `5`, and every page's top-right box reading `1 of 5` through `5 of 5`. The text pages read 3, 4 and 5 rather than 1, 2 and 3, so a named page is not being taken for a counter reset — which is the break criterion, checked rather than assumed.

**Prediction 2 held.** The nine cases run beside it — 12, 15, 16, 17, 20, 30, 31, 37, 38 — are unmoved check for check against the run taken before the change. The four failures left in that run are 37's two and 38's two, the two fixes this round has not reached yet.

**Prediction 3 held.** The DOM-free suite goes from **106** tests to **115**: seven in a new `test/counter-styles.test.js` and two appended to `test/capture.test.js`. None is a table typed twice — the roman pins are the subtractive boundaries (4, 9, 40, 90, 400, 900, 3999) and the fact that the upper case IS the lower case cased; the alphabetic pins are the wrap (26 → `z`, 27 → `aa`, 52 → `az`, 703 → `aaa`) and the aliasing of `latin` to `alpha` asserted as an identity rather than as two expected strings; and the two out-of-range fallbacks are asserted as css-counter-styles-3's own range rule rather than as arbitrary outputs.

**Prediction 4 is answered by the battery, in the round's own changelog entry.**

**Too good to be true, checked.** The formatter's own tests passed on first write, which is what arithmetic tests do and is therefore no evidence at all. What was worth distrusting is the GRAMMAR, since a regex that gained a group could quietly stop answering what it used to: `counter(page)`, `counter( pages )` and `counter(page) " of " counter(pages)` are pinned explicitly as the pre-round behaviour, and `url(x.png)` is pinned as still resolving to nothing rather than to a guess.

**One limit, stated rather than discovered.** On this fix's code a bare `counter(chapter)` — an author's own counter — still resolves to nothing, because nothing reads the document's counters yet. That is design open (3) and the round's third fix, not a shortcoming of this one.

## Consequences

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) does not move.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s part one §2 records the styled form as built, and design open (1) closes.

`src/counter-styles.js` is new and DOM-free, pinned by `test/counter-styles.test.js`. It is the reader *a counter is read at the start of the page* uses for an author's counter later in the same round.

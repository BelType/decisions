# A line inside a word is a break point

**Status: Decided 2026-09-23, Executed 2026-09-23.**

## Context

[*The line inside a word earns a case*](the-line-inside-a-word-earns-a-case.md) authored `cases/63-the-line-inside-a-word` red and left the fix to a design round, which Egildo held the same day. The fault, in one sentence: css-break-3 §4.1's Class B is *between line boxes*, the engine finds it *between words*, and a word set on several lines — CJK text, `word-break: break-all`, a URL under `overflow-wrap: anywhere`, lines joined by `<br>` — offers no Class B point, so the edge cut divides a line of text through its glyphs (native mode) or the Compositor sets the paragraph on one line and loses the rest (composed mode).

The laws already say what the code does not. I3: *"the line box is the atom."* I2, as amended 2026-09-18: *"inside a line stack, and only there, it is a word"* — and the decision behind that amendment wrote the rest of the sentence down: *"Inside a line stack the address is a word, and one day a word and a character."* `positions.js`' header reserves the slot (*"nothing mints a `char` today"*), and the Compositor already models `{ word, char }` places with `glyph: false` for a break that draws no hyphen. This round mints it.

## Decision

Three parts, in this order, one commit each.

**One — a `<br>` ends a word.** In all four tokenizations at once (`indexBlocks`, `wordsBeforeChar`, `joinedWords`, the Gauge's `measureWords`), through one predicate in `word-space.js`, `isLineBreak`. A tag test and not a computed-style test, and that is not a relaxation of *read computed display and nothing else*: what makes a `<br>` break the line is not its `display` — Chromium computes `inline` for it — but HTML's own rendering of the element as a line feed, so no property could answer the question and the element's name is the honest one. **The engine's own `br.__beltype-break` is exempt**: the Compositor's hints insert it into feed clones, inside a word at a hyphenated break (`exam‐<br>ple`), and the source it was copied from has none — so counting it would make a clone and its source disagree about how many words a leaf holds, which is the identity every address rests on. `BREAK_CLASS` moves into `word-space.js` for that reason, and `compose-dom.js` re-exports it.

**Two — the address gains a character.** `{ path, word, char, px }`, where `char` is an offset in UTF-16 code units into the word `word` names, present only when non-zero. It is minted only where **a line box begins inside a word at a silent break** — a break the browser took with nothing drawn: a CJK or `break-all` opportunity, `overflow-wrap`'s emergency break. The Gauge splits a word whose rects fall on several lines into **pieces**, one per line, each carrying its word index and the character its line begins at (found by a binary search over single-character ranges), and the line stack is clustered from the pieces — so a line holding nothing but the middle of a word is a line at last, and Class B, orphans and widows all count it. The Stonehand is unchanged: its candidates are between lines, and the driver reads the resume place off the first piece of the next line. `fragments.js` consumes to a word and a character at both ends. `cutAfter` orders `char` after `word`. The flat projection stays a word index — a page that resumes inside word *w* projects to *w* — so the Ledger, strings, counters and `pageOf` are untouched.

**A break is silent unless it may have drawn a hyphen.** Not silent: the character before it is U+00AD, or the box's computed `hyphens` is `auto` and both characters at the break are letters of a script that hyphenates. That second test cannot see whether the browser actually hyphenated, so it refuses where it cannot tell — a hyphenated word stays whole, as it is today, and chapter seventeen's *the-hyphen-across* stays wanted: dividing one needs the fragment to write the hyphen the browser drew, which is its own round. **A line stack carrying the Compositor's own breaks is never split into pieces**: its lines are the engine's, set by hints the address must not count.

**Three — the Compositor refuses what it cannot set.** Its break opportunities are spaces, hyphenation points and §6.4's emergency break. A block whose text the browser may break elsewhere — computed `word-break: break-all`, `line-break: anywhere`, or text in a script written without spaces (Han, Hiragana, Katakana, Thai, Lao, Khmer, Myanmar) — is not composed: its lines stay the browser's and the console says so on every run, exactly as a block beside a float is refused (`compose-dom.js`). Teaching the Compositor UAX #14's opportunities is the real fix and a later one.

**Refused: a character-only address**, words derived from characters. Cleaner on paper, and every consumer of the flat position — the Ledger's order, the differential's token ledgers, strings and counters — speaks words; adding `char` beside `word` changes none of them.

**Refused: a line-aware word space**, words split at the lines they happen to fall on. An address is resolved against the SOURCE in every realm and the page's geometry changes between pages (C8), so a unit that depends on where lines fall would name different text in different trees. A character offset into the source's own text does not.

## Predictions

Frozen on write, break-versus-hold decided in advance.

1. **Case 63 turns green in the native column**: five pages, `a0w012`, `a0w024`, `b0w000` and `b0w012` opening pages, every sentinel once, the partition identical to Chromium's. *Breaks* on any of them.
2. **Case 63 turns green in the composed column too**: the unspaced block is refused composition by part three and paginates on the browser's lines through part two; the joined block's `<br>`s are author breaks the Compositor already respects. *Breaks* on any claim.
3. **No standing record moves.** No seed and no other case carries a whitespace-free `<br>`, `break-all`, `line-break: anywhere` or unspaced script (grepped), no corpus word is wider than its measure, and case 29's hyphenated breaks are not silent — so every standing tally, and every other case's verdict, stands exactly where it stood. *Breaks* on any change in `gates/records.js`' assertions or any other case changing colour.
4. **The DOM-free suites carry the new arithmetic**: `cutAfter` orders a character, and the tokenizations end a word at `<br>` and not at `br.__beltype-break`, each pinned by a test that fails without the change.
5. **The battery is run, complete**, and re-records the pin — `src/` moves under every part, and the pin has been STALE since 2026-09-21 besides.

## Verdict

**Prediction 1 held.** After part two the native column is green on every claim of case 63 — five pages, all four page starts, every sentinel once, and page for page and word for word with Chromium's print. Part one alone had already closed the joined block: pages four and five matched Chromium's 12 / 8 exactly while the unspaced block still printed `a0w012` twice.

**Prediction 2 held**, after part three and not before it: with parts one and two in, the composed column still set the unspaced block on one line and printed three pages; refusing the block composition gave it the browser's lines, and every claim then held.

**Prediction 3 held.** A complete `gates:fresh` — every print reference rebuilt, Chromium 153 — ran all 25 gates in 9.1 minutes, 25 ok, and reproduced every standing record: native 163 agree, composed-v1 89, composed-v2 86, the three view gates exact, both acceptances, every probe, and the cases gate with all sixty-four cases holding in both modes.

**Prediction 4 held.** The DOM-free suite went from 184 to 186 tests: `cutAfter` ordering a character after its word and before the next word, `mayBeHyphenated` on a soft hyphen, `manual`, `auto`, CJK and digits, and the tokenizations ending a word at an author's `<br>` and not at `br.__beltype-break`. The first of them fails without part two's one line in `cutAfter`, and the third without part one.

**Prediction 5 held.** The run re-recorded the pin at this branch, source tree `5a82cd1` — which also retires the staleness `.claude/NEEDED-FIXES.md` had carried since 2026-09-21.

**Measured beyond the case**, on the scratch document that found the fault: a Japanese paragraph with no spaces now divides between lines on every page (page one ends on これは改, page two opens on 行のない), and no line on any of its five pages is painted in part.

**One consequence not taken, and why.** The entry said chapter three's Class B row would return to *settled*. It stays *open*, narrowed: this decision keeps a hyphenated word whole, so there is still one kind of line boundary Class B names and the engine does not offer, and a settled row would say otherwise.

**Too good to be true, checked.** A battery that reproduces every record after a change to the Gauge could mean the change reaches nothing. It reaches exactly what it should and nothing else: no seed or other case carries a whitespace-free `<br>`, `break-all`, an unspaced script, or a word wider than its measure (grepped before the run), and the one document that does — case 63 — went from seven failed checks to none.

## Consequences

The tablet's I2 finishes its own sentence: inside a line stack the address is a word, and a character where a line box begins inside one. The architecture's Gauge section gains pieces; `positions.js`' and `ledger.js`' headers stop saying the slot is empty. The checklist's design open on *a word set on several lines* closes for silent breaks and stays open, narrowed, for hyphenated ones. Chapter three's first standing row returns to settled if prediction 1 holds.

# The line inside a word earns a case

**Status: Decided 2026-09-23, Executed 2026-09-23.**

## Context

Found on 2026-09-23 by following a dead helper. A dead-code query over a fresh CodeGraph index named `word-space.js`' `noteSource` as unreached; its one caller was replaced by `mapCloneToSource` when [*the cut is a place in the tree*](the-cut-is-a-place-in-the-tree.md) was built, and reading the four tokenizations the address rests on — `positions.js`' `indexBlocks`, `fragments.js`' `joinedWords`, `gauge.js`' `measureWords` and `compose-dom.js`' `collectWords` — turned up a fault none of the checklist's entries names.

**A word is a maximal run of non-whitespace, and a line box is not.** Three of the four tokenizations end a word only at whitespace or at a non-inline boundary (*a word stops at a block boundary*). `<br>` computes as `display: inline` in Chromium 153 (measured), so `foo<br>bar` is ONE word to the position index, to the fragment builder and to the Gauge, and TWO to the Compositor's `collectWords`, which ends a word at a `<br>` — four tokenizations the engine states *must never disagree*, disagreeing. And a word may occupy any number of lines: the Gauge takes one rect per word, the largest top, so a word spanning several lines is homed on its last, and the line boxes above it offer no Class B candidate at all. css-break-3 §4.1 defines Class B as *"between line boxes inside a block container box"* and says nothing about words.

Measured on scratch documents under `beltype --engine cicero`, a page area of 105 × 100 mm, 12pt on a 1.4 line: forty lines joined by `<br>` with no whitespace printed a clipped sliver of `line27` at the foot of page two and printed `line27` whole again at the head of page three, where the same forty lines joined by `<br>` and a newline divided 12 / 13 / 13 / 2 at line boundaries; a Japanese paragraph with no spaces had page one's last line cut horizontally through its glyphs and page two opening on the lower half of the same characters; a long URL under `overflow-wrap: anywhere` was cut the same way between pages four and five. With no candidate inside the word and none before it that fits, the Stonehand reaches the edge cut (C10), which exists for content that has no break point, and divides a line of text at the limit.

Neighbouring and not the same: chapter seventeen's `wanted` entry *the-hyphen-across*, blocked because *the engine's resume addressing counts words and would need character offsets*. That is a word the engine divides itself; this is a word the browser has already set on several lines.

## Decision

**Author `cases/63-the-line-inside-a-word` in the venue and change nothing under `src/`.** A fault is not fixed in the round that authored its case, because a case written after the fix only tells you the fix agrees with itself ([*forcing under sections earns a case*](forcing-under-sections-earns-a-case.md) is the precedent).

**One document, two ways in.** An unspaced paragraph under `word-break: break-all`, one six-character sentinel to a line — the general form, and the one CJK text takes by default — and a `<br>`-joined paragraph opening its own page. A page area twelve and a half lines tall puts the edge through the middle of a line on every page. They are one fault, and they are kept together because they will not be fixed together: making `<br>` end a word in all four tokenizations would turn the second block green and leave the first exactly as red, and a case that stays red on half its claims is the case telling you which half of a fix happened.

**Refused: a CJK document.** It is the case that matters most to an author and the worst one to assert: the reader matches printed sentinels, a CJK face is a system font the pin does not name, and the extraction of CJK text from the print has never been checked by this venue. The `break-all` block draws the same shape in Courier with sentinels the reader already reads, and the checklist carries the Japanese measurement in prose.

**Refused: `overflow-wrap: anywhere` as the unspaced block's mechanism.** It divides a word only when the word cannot fit a line of its own, so its line boxes depend on how long the word is; `break-all` makes every letter a soft wrap opportunity and gives exactly one sentinel per line at six and a half characters' measure.

## Predictions

Frozen on write, break-versus-hold decided in advance.

1. **Chromium prints five pages and every claim holds.** Pages two, three, four and five open at `a0w012`, `a0w024`, `b0w000` and `b0w012`; every sentinel is printed once, in order; every page is 300 × 217.5 pt. *Breaks* on any claim — and before anything is touched, css-break-3 §4.1 and css-text-4 §5.2 are reopened, since a browser dividing a line through its middle would be the oracle departing from the text.
2. **Cicero, in its native mode, fails totality and the partition, and may well agree on the page count.** At least one sentinel standing on an edge is printed on two pages or on none. *Breaks* if totality passes on either block — that would mean a candidate path this reading missed, and the fault would be narrower than recorded.
3. **The sliced sentinel reaches the print's text layer on BOTH pages** — the glyphs are clipped, not removed, so the reader sees a duplicate rather than a loss. *Breaks* if it is on one page or on neither; either is still a totality failure, but it is a different failure to name.
4. **The composed column fails the same way on the unspaced block.** The Compositor sets the lines, but the Gauge and the position index still read one word, so no Class B candidate appears inside it. What the composed column does with the joined block is **not predicted**: `collectWords` ends a word at `<br>` and the other three do not, and which of the two readings wins in the presentation is exactly the disagreement this entry names and nobody has measured.
5. **No standing tally moves.** `src/` is untouched and `gates/PIN.json` is content-addressed on the source tree. *Breaks* on any change in `gates/records.js` or a red `npm run pin`.
6. **The battery is not run.** Per [cycle.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/cycle.md)'s "skip it, and say so in the entry": the diff cannot reach a page, and the one gate it changes is the one meant to go red.

## Verdict

**Prediction 1 held.** Chromium prints five pages at 300 × 217.5 pt, `a0w000`–`a0w011` / `a0w012`–`a0w023` / `a0w024`–`a0w029` / `b0w000`–`b0w011` / `b0w012`–`b0w019`, every sentinel once, each on its own line at a 20px pitch. The oracle breaks between line boxes inside a word exactly as §4.1 says it may.

**Prediction 2 held**, page count included: the native mode prints five pages and fails totality and the partition from page one.

**Prediction 3 held.** `a0w012` is on page one at y 273 and on page two at y 23; `b0w012` on page four at y 273 and on page five at y 23. The page area ends at y 270, so each is the same line, clipped, its upper half on one page and its lower half on the next — a duplicate in the text layer, never a loss. Page three then opens at `a0w025`, which is why the `a0w024` claim fails while nothing is missing.

**Prediction 4 broke, and in the worse direction.** The composed column does not slice the unspaced block: it LOSES it. `collectWords` reads the paragraph as one word, the Compositor sets one word on one line, and the materialized hint is `white-space: nowrap` — so thirty lines become one line, clipped at the page after fifty-three characters, and `a0w009` to `a0w029` are on no page. Three pages against five. The joined block, whose composed behaviour was deliberately not predicted, slices exactly as the native one does: page two ends on `b0w012` at y 273 and page three opens on it at y 23. So the tokenizer disagreement does not show at the `<br>` in the presentation; what the Compositor's reading of `<br>` buys is invisible here because the Gauge and the address still read one word.

**Prediction 5 held in its own terms.** `git diff main -- packages/engine-cicero/src` is empty, and `gates/records.js` is untouched. The pin reads STALE, and did before this branch existed: its records were taken on `cicero/a-fragment-is-an-interval` at src `a02ba48`, and `main` has been at src `913d635` since the 2026-09-21 merges — the complete `gates:fresh` `.claude/NEEDED-FIXES.md` already lists as owed.

**Prediction 6 held**, as a decision: the battery was not run.

**Unpredicted, and a scar recurring.** The first run reported `a0w010` and `a0w011` missing from the native print, and they were not missing: `read-print.js` takes the bottom 56 pt of every page as the folio band and drops what it finds there, which on a 217.5 pt page is the last two lines of the page area. That is the reader default the file itself names as *the venue's oldest scar* (a 104.88 pt page, 2026-09-10); it cost ten minutes here instead of a round because a per-page dump of the text layer was taken before the loss was believed. The case declares `folio.maxYPt: 8`, as case 34 does, and the README says why.

**Too good to be true, checked.** A red case whose failures all agree with the theory could be failing for a reason it does not name. The dump separates them: the native duplicates sit at the one y where the page area ends, on the one sentinel whose line straddles it, and nowhere else; the composed loss is a single printed item of fifty-three characters at y 33, which is what a nowrap line is and what a slice is not.

## Consequences

The venue gains `cases/63-the-line-inside-a-word`, seated in chapter three, *Where a break may occur*, whose first standing row stops calling Class B settled for this engine. The checklist gains a design open carrying the arithmetic and the Japanese and URL measurements. [`.claude/NEEDED-FIXES.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/NEEDED-FIXES.md) gains the entry.

The fix is a design question and not a patch, and it is Egildo's. A Class B candidate needs a place to point inside a word, and the address is `{ path, word, px }` — a word count cannot name the fourth line of a word. Either the address gains a position inside a word (a character offset, which *the-hyphen-across* is already waiting on), or the word space stops being whitespace-delimited and becomes line-aware, which touches I2 as amended on 2026-09-18 — *paths order boxes; words order lines* — and is a design round with Egildo. The cheap half — `<br>` ending a word in all four tokenizations — is available on its own and closes the joined block and the tokenizer disagreement; it does not touch the general case.

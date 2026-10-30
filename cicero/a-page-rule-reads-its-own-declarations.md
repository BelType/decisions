# A page rule reads its own declarations

**Status: Decided 2026-08-26, Executed 2026-08-26.**

## Context

[the margin box leak earns a case](the-margin-box-leak-earns-a-case.md) authored `cases/15-the-margin-box` and left `capture.js` deliberately untouched, so that the case could be watched going red for the reason it names. It is red, in both faces, and the numbers are recorded in three places that agree: the [checklist's](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) design opens carry the arithmetic, the case's own README carries what failure looked like when it was written, and the margin box leak earns a case's verdict carries the separation experiment that proves the two halves are independently pinned.

The fault, stated once and not re-argued: `readGeometryTable` collects a `@page` rule's `size` and margins by running regexes over `rule.cssText`, which the CSSOM serializes **with the rule's nested margin-box blocks inside it**. So `longhand('top')` finds the folio's `margin-top: 6mm` — the only literal `margin-top:` in the text, because Chromium serializes the page's own four longhands back out as a shorthand — and `/size:/` finds the tail of a running head's `font-size:` wherever no earlier `size:` occurs in the same rule.

The remedy is not a repair of the regexes. It is the observation that **there was never a reason to parse serialized text**: the CSSOM already separates a page rule's own declarations from its margin boxes, and the ZENTE probe measured that it does so completely — every reading in that instrument's DECLARED column resolved through `rule.style.getPropertyValue(...)`, reported `via: style` on all six page conditions, and the cssText-stripping fallback it carried was never once needed. Chromium exposes the `size` descriptor there despite `size` being a descriptor rather than a property, which was the one open question and is now answered by measurement rather than by hope.

## Decision

**`readGeometryTable` reads a page rule's `size` and margins from `rule.style`, and nothing from `rule.cssText`.**

Three parts, each with its reason:

- **`size` comes from `rule.style.getPropertyValue('size')`**, tokenized on whitespace as before. A margin box's `font-size` is in a different declaration block and can no longer be seen from here — not because a better regex excludes it, but because the box is not in the text being read.
- **The four margins come from the four longhands on `rule.style`, and the shorthand path is deleted.** The CSSOM has already done the expansion: a rule declaring `margin: 20mm 16mm 22mm` answers `getPropertyValue('margin-top')` with `20mm`, and a rule declaring only `margin-top: 40mm` answers the shorthand with the empty string. Parsing `margin` ourselves would be re-implementing an expansion the browser performed before we arrived, and the intra-rule ordering that the shorthand-then-longhand sequence existed to honour is exactly what a declaration block already resolves.
- **No text fallback is kept for geometry.** Cicero runs in a live browser and its interface to the author's CSS is the CSSOM; a fallback that no reachable engine can trigger is a claim nothing can fail, which is the thing this venue keeps paying to learn. `marginBoxesOf`'s existing cssText path is left alone — it is older than this decision, it answers a different question, and gutting it here would be a second decision smuggled into one entry.

Refused: **widening the fix to `marginBoxesOf`'s content-only test** (the checklist's frontier entry, which asks whether a box declaring only `font-size` should exist), and **making `toPx` safe against unknown units** (the frontier entry beside it). Both are real, both are owed a decision about meaning rather than a change of mechanism, and both would make this entry's verdict unreadable — a battery run that moves two things tells you about neither.

## Predictions

Frozen on write, break-versus-hold decided in advance.

1. **`cases/15-the-margin-box` goes green in both modes.** Six pages at 340.16 × 481.89 pt within the venue's 2 pt tolerance, `native.partition: identical`, the running head in every top band and the folio counting through. *Breaks* if any check stays red — and a partial green is a break, not a pass, because the margin box leak earns a case established by hand that the two faults are separately pinned and a half-fix produces exactly five pages against six.
2. **No standing tally moves anywhere else.** The change is visible only to a rule whose margin box declares a `margin` or whose serialized text puts a `font-size` before its `size` — and the corpus contains neither: the generator has never written a margin box at all, and of the fourteen older cases every base rule declares `size` first and not one declares a margin inside a box (read before writing this, not after). *Breaks* on any change in `gates/records.js` beyond case 15 and the pin.
3. **This package's own suites cannot say whether the fix worked, and will pass either way.** `packages/engine-cicero/test/` is DOM-free by construction — Ledger laws, Stonehand arithmetic, Compositor tables, Liang hyphenation, the ADR's own grammar — and `capture.js` needs a CSSOM, so no unit test in this repo touches it. The whole proof is next door. *Breaks* if any unit test's verdict changes, which would mean something reached capture that was believed not to.
4. **The pin goes red before the battery is run and green after, naming a new source tree.** `gates/PIN.json` is content-addressed on `src/`, so editing `capture.js` invalidates it the moment the file is saved, and only a complete run rewrites it. *Breaks* if `--check-pin` still reports green against the edited source, which would mean the pin is not addressing what it claims to address.
5. **BelType's `test/book.md` renders A4 under `--engine cicero`** — the eleven-page book that Cicero enters the seam in beta recorded as thirty 12 × 12 px squares. This is the beta's own regression and belongs to the other repo, so it is verified by eye and by the page box's measured size, not by the battery. *Breaks* if the page box is not 794 × 1123 px.

## Verdict

**All five predictions held**, which is a sentence this venue distrusts on principle, so the checking is below rather than the celebration.

**1 — case 15 green in both modes.** Fourteen checks, native and composed: six pages at 340.16 × 481.89 pt, `partition: identical`, the running head in every top band, the folio counting 1 to 6. It went from eleven failing checks to zero on one edit.

**2 — no standing tally moved.** `gates/records.js` is byte-for-byte unchanged after a complete 25-gate run: 163 agree on the native differential, the same 18 legal divergences and 7 theirs-illegal, every view gate, every probe P1–P32. The prediction's ground was read before it was written rather than after — the generator has never drawn a margin box, and of the fourteen older cases every base rule declares `size` first and not one declares a margin inside a box.

**3 — this package's suites could not say whether the fix worked.** 45 pass, before and after, none of them touching `capture.js`, because they are DOM-free and it needs a CSSOM. The whole proof was next door, exactly as the prediction said it would have to be.

**4 — the pin went red on save and green on the complete run**, naming source tree `e008867`. Content-addressing earned itself twice in one session, once in each direction.

**5 — `test/book.md` renders A4** — 793.70 × 1121.52 px against A4's 793.70 × 1122.52, the missing pixel being `chase.js`'s documented print-safety inset, which the prediction had not accounted for and which the code comment explains. Thirty 12 × 12 px squares became seven A4 pages.

**Too good to be true, checked three ways.** A fix this small producing zero movement everywhere else could mean the fix is inert. It is not, and the three tests that would have caught it: *if `rule.style` returned nothing*, `pageFor` would throw `no explicit size` and every gate would be red — none was. *If the margins read null*, they would default to `0px` and every case's page count would move — none did. *If only one half were fixed*, case 15 would sit at five pages against six, which the margin box leak earns a case established by hand before this entry was written — it sits at six. The identical tallies are evidence the fault was **narrow**, not evidence the change was nothing; case 15 is the discriminator, and it is the only thing in the battery that moved.

**Unpredicted, and the more useful for it: the run found a defect in the instrument.** `gates/run.js` printed *"the engine tree was dirty: this pin names a state that exists on one machine only"* over a pin whose `srcDirty` was `false`. `pin.js`'s own header draws that distinction carefully — uncommitted **engine source** cannot be vouched for; an unrelated dirty file is context — and the message collapsed the two, so a valid pin announced itself as worthless. That is the *cries-wolf* failure the same header was written to prevent, living in the line that reports it. Fixed in the venue: two messages, one per claim.

**Unpredicted, filed, not fixed: `test/book.md` accounts for 205 flow words.** The page box is right and the pagination is legible for the first time, and the driver reports seven pages where Chromium gives eleven — but the figure that matters is the word count, because a flow accounting for two hundred words of a document thousands of words long has not seen the document, and that is upstream of every decision the tablet governs. On the checklist's frontier with its suspects deliberately unranked and the one measurement that would settle it named. It is the second finding the beta has produced from a document nobody here wrote for the engine.

**The process scar, and it cost twenty minutes.** The first complete battery was run against an uncommitted `src/`, so its pin gate failed on a claim that could not be true yet — the tree was dirty *because* the fix had not been committed — and `PIN.json` was correctly not written, since only a complete run may write it. The battery had to run twice. `cycle.md` step 5 says to prove after the work and did not say to commit the source first; it does now.

## Consequences

`src/capture.js` loses its text-parsing path for geometry and gains nothing — the diff is expected to be shorter than what it replaces, which is the shape a fix takes when the fault was doing work that was never needed. The checklist's design-open for the capture fault closes and its line changes to built; the frontier keeps the two entries this decision explicitly refused, `toPx`'s unit throw and `marginBoxesOf`'s content-only test, which are now the only things standing between the capture slice and the Furniture round.

The `cases` gate stops being deliberately red. `.claude/NEEDED-FIXES.md` loses its §1.1, which was its head entry and the one the fix order named first.

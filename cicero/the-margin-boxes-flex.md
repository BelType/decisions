# The margin boxes flex

**Status: Decided 2026-09-14, Executed 2026-09-14.**

## Context

The Chase lays a page as one 5×5 grid, and `applyConditions` has always written the three middle column tracks as `(pageW − margins.left − margins.right) / 3`. Equal thirds. css-page-3 §5.3.2 says otherwise in a page of arithmetic: the three boxes of a horizontal band are sized *in proportion to the amount of content*, with the middle box centred, and §5.4's first worked example says in as many words that where no centre or right box is generated **the extent of the top-left box is allowed to cross the centre of the page box**.

The gap is measurable rather than theoretical. `cases/38-three-boxes-one-band` was authored red on 2026-09-14: a twenty-eight-character head in a monospaced face at nine points measures about 151pt, the band is 272pt, and the algorithm gives the middle box about 254 of it — one line, centred. The equal-thirds grid gives it 90.7pt and wraps the head onto three lines. Chromium performs §5.3.2 to the point on the same document (measured in the same round; the first reading that said otherwise was the venue's reader seating pdf.js's one-word items singly, since corrected).

## Decision

**Three changes: a band of its own, the browser measuring the content, and the algorithm as a pure function.**

**One — each horizontal band becomes its own grid, and it has to.** A CSS grid has ONE set of column tracks for every row in it, so a single 5×5 grid cannot give the top band and the bottom band different divisions — and they routinely want different ones, since the two bands hold different strings. So the three top boxes move into a `.band` element spanning the outer grid's columns 2–4 of row 1, the three bottom boxes into one spanning row 5, and each band carries its own `grid-template-columns`. The corners and the six side boxes stay where they were, on the outer grid, because they are seated in columns 1 and 5 which no band touches. The outer grid's three middle tracks now govern nothing but the content area and the two bands, all three of which span the whole of them, so the `cw3` arithmetic stays exactly as it was and moves nothing. **The bands default to `1fr 1fr 1fr`**, which is the equal thirds the engine had, so a page whose boxes have not been measured yet looks precisely as it did.

**Two — the browser measures the content, because the browser owns geometry.** §5.3.2's inputs are each box's outer max-content and min-content widths, which are intrinsic sizes of a real box in a real font, and this engine's standing ruling on exactly this shape of question is *page lengths are measured*: a hand-rolled text-measuring path would be a second layout engine. The measurement seats the question on the cells THEMSELVES rather than on a probe — the band's `grid-template-columns` is set to `max-content max-content max-content`, the three rects are read, then to `min-content min-content min-content`, and the three read again. Two layouts per band and no element created, where a probe would have needed a fourth copy of the cell's own dress to be honest about padding, borders and the box's own declarations. **A box that is not generated measures zero on both**, which is §5.3.2's own assumption rather than a special case.

**The measurement is memoized on the page's dress and the box's text**, so a document whose hundred pages carry the same running head costs two layouts in total rather than two hundred. The key is the page-context sheet's own text plus the box name plus the string, which is exactly what the intrinsic widths depend on.

**Three — the arithmetic is a pure function in `src/margin-boxes.js`, and it is the specification's own two-level shape.** `bandWidths({ a, b, c, available })` takes three `{ min, max }` pairs and answers three used outer widths. With B not generated it distributes the band between A and C; with B generated it distributes between B and §5.3.2's **imaginary AC box**, each of whose dimensions is double the larger of A and C — which is what preserves B's centring — and then gives A and C `(available − B) ÷ 2` each. The distribution has the section's three branches in the section's own order: flex space above the sum of the max-content widths, distributed in proportion to them; else flex space above the sum of the min-content widths, distributed in proportion to `max − min`; else the same arithmetic with a NEGATIVE flex space and factors in proportion to the min-content widths. Both factors are 1 where their sum is zero, as the section says. It lives in `margin-boxes.js` rather than in `chase.js` for the reason that module already exists: `chase.js` cannot be imported without `HTMLElement`, and a transcribed algorithm is worth checking without a browser.

**Refused: `min-width` and `max-width`.** §5.3.2's *Handling min-width and max-width* paragraph re-runs the whole distribution up to twice more, substituting the constraint for the computed `width` and considering the three boxes together. Only `width: auto` is implemented, which is the initial value and what every document in the tree writes; the two constraints are named on the checklist rather than approximated. A document declaring either gets the auto answer, silently — stated here because a silent approximation nobody wrote down is this venue's oldest scar.

**Refused: an explicit `width` on a margin box.** The same paragraph's *"If only one box has `width: auto`"* branch needs a used width for the box that does not, which is a fourth reading of the page context this capture does not take. Named, not built.

**Refused for now: the side bands.** §5.3.2's last paragraph applies the same rules down `@left-top`/`@left-middle`/`@left-bottom` with *width* replaced by *height*, so the side bands are variable in the BLOCK direction and not fixed at all. They keep equal thirds in this round, for two reasons said plainly: the outer grid's row tracks would need the same band treatment the columns just got, on a second axis; and the venue cannot see the result — the print reader divides no side margin into a band, which is the instrument *where in the band* already recorded as owed for the vertical half of §6.2's table. Building it blind would be a number nobody can check.

**Refused: laws.** None moves. The Chase holds and never decides; where a box sits in its band is a condition, and this is that condition computed correctly.

## Predictions

Frozen on write.

1. **`cases/38-three-boxes-one-band` goes green on both Cicero columns.** Page one's `top-center` carries the whole head on one line, starting at 94.5pt ± 6 and measuring 151.2pt ± 6; page two's lone `top-left` starts at 34.02pt and measures 210.6pt ± 6, which is past the page's centre. *Breaks* if the head still wraps — that would mean the measurement, not the arithmetic, is wrong.
2. **The measured max-content widths agree with the case's own arithmetic to within a point.** The case is authored on six-tenths of an em a character at nine points, so the twenty-eight-character head should measure 151.2pt and the thirty-nine-character one 210.6pt. *Breaks* if either is out by more than a point, which would say the cell's dress is not the page context's and the measurement is being taken in the wrong font.
3. **Every existing case with margin boxes is unmoved** — 12, 15, 16, 17, 20, 31 — and case 31 is the one to watch, since its whole subject is where a box's content sits in its band and its cells are about to stop being thirds. Its four flush-edge claims should be unaffected, because a box flush with the band's edge is flush with it under either division. Its two CENTRED claims are the ones at risk. *Breaks* on any changed check.
4. **No page's content geometry moves.** The bands span the same columns the three middle tracks always spanned, and the content area is untouched. *Breaks* if any case's page count, partition or `startsAPage` changes — which would mean the band wrapper reached the content area.
5. **The DOM-free suite gains pins for the algorithm against the specification's own priorities and against the case's numbers**, including the negative-flex branch, which no case exercises. *Breaks* if the only pin anyone can write is the three outputs of case 38.

## Verdict

**Prediction 1 held.** `cases/38-three-boxes-one-band` is green on `cicero` and `cicero-composed`, every check. Read off the presented page rather than off the print, the top band's three tracks are **9.07pt, 253.97pt, 9.07pt** on page one and **272.12pt, 0, 0** on page two — the first within two hundredths of a point of the 253.98 the algorithm predicts on the case's own arithmetic, the second the whole band, which is what lets the lone head cross the page's centre.

**Prediction 2 held, and more exactly than it asked for.** The measured max-content widths are **151.23pt** for the twenty-eight-character head and **210.64pt** for the thirty-nine-character one, against the case's arithmetic of 151.2 and 210.6 — three hundredths and four hundredths of a point out, which is the case's own rounding of six-tenths of an em rather than a discrepancy. The min-content widths measure 27.00pt and 37.80pt, which are exactly `NEEDS` and `ALLOWED` at 5.4pt a character. So the cells are being measured in the page context's own font, which was the break criterion.

**Prediction 3 held.** Cases 12, 15, 16, 17, 20 and 31 are unmoved check for check, case 31's two centred claims included. A box flush with its band's edge is flush with it under either division, which is why the four flush claims could not move; the two centred ones were the risk and did not.

**Prediction 4 held.** No page count, partition or `startsAPage` moved in any of the nine cases run beside 38.

**Prediction 5 held.** The DOM-free suite goes from 115 tests to **121**, six of them in `test/margin-boxes.test.js`, and they are the section's priorities rather than case 38's three outputs: that the two sides come out EQUAL whenever the middle box is generated (which is what the imaginary AC box is for), that the algorithm is continuous at its own branch boundary — `available` exactly equal to the sum of the max-content widths must give the same answer from either side — that the negative-flex branch no case exercises shrinks in proportion to the min-content widths, and that a band of nothing divides evenly rather than dividing by zero. Case 38's numbers sit beside them as one test, which is where a case's arithmetic and the module's can be compared without a browser.

**What was too good to be true: a syntax error that read as a pagination hang.** The first run after the change failed all ten cases with `page.waitForFunction: Timeout 20000ms exceeded` — the shape of a stalled engine, and this venue has a standing parked defect that looks exactly like it. It was neither: a CSS comment added to `chase.js`'s shadow `<style>` contained a backtick pair around an identifier, the `<style>` is a template literal, and the module would not parse. **`node --check` on every changed file found it in one second.** The scar is worth the line: a browser-side stall is a hypothesis of last resort, and the parser is free.

**One limit measured rather than assumed.** The measurement costs two forced layouts per band per DISTINCT dress-and-text combination, memoized on exactly those; a document whose hundred pages carry one running head pays for one page. Nothing measures this yet beyond the case timings, which did not move.

## Consequences

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) does not move.

[`architecture.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md)'s The Chase records that a horizontal band is its own grid and why one grid could not do it.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s part one §2 records the twelve as flexing across the two horizontal bands, with the side bands, `min-width`/`max-width` and an explicit `width` named as not built.

`src/margin-boxes.js` gains `bandWidths`, pinned by `test/margin-boxes.test.js`.

# The ink is read, not borrowed

**Status: Decided 2026-10-19, Executed 2026-10-19.** Decided on a spike's numbers, and executed by not building: Caster keeps deriving its ink (borders, backgrounds, radii, decorations, SVG, images) from computed style and rectangles in the tab, and does not take it from the browser's own print. The spike's numbers are in [`.claude/plans/ink-from-chromium/results.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/plans/ink-from-chromium/results.md), its test on the unmerged branch `claude/sharp-cray-714e2c` (commit `ef0a4ce1`), nothing under `src/` changed. The geometry half of what it measured stands on `main` as Caster's third reader (`packages/caster/DESIGN.md` S84).

## Context

Caster rebuilds CSS painting in JavaScript, about five thousand lines under `packages/caster/src/vectors/`, and [TABLET.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/TABLET.md)'s *trust the standard* says a proposal that reads "and now we build our own version of X" is the sign to look harder for the X that exists. The X looked for was Chromium's own print, `page.pdf()`, a serialisation of Blink's paint tree, and the question was whether it could be Caster's ink layer while Caster kept what its DOM read gives: words with real glyphs and font programs, the structure tree, the PDF 2.0 header, the press boxes, CMYK and spot colour.

## Measured (2026-10-19, Paged.js, the Caster specimen, one server and one engine)

- **Geometry holds.** Nine pages both ways; 3 824 of 3 837 words within 0.5 pt of each other; Chromium places text on a 0.375 pt grid where Caster places it where Range measurement put it. Page boxes a third of a point apart, Chromium's grid against the nominal length Caster writes.
- **Ink separates.** Stripping every text object from Chromium's streams loses no path, clip or image. Chromium's ink under Caster's words differs from Caster's own file in under 0.64 % of pixels on the worst page and in none on five of nine. What differs: list markers (text to Chromium, shapes to Caster), rules snapped to Chromium's pixel grid, a gradient `border-image` Chromium paints and Caster defers, images Chromium re-encodes (94 003 bytes of Flate where Caster passes 5 358 bytes of DCT through).
- **Colour by sRGB lookup fails, by construction.** A `--pdf-color` hint is a custom property Blink never paints, so the sRGB Chromium writes carries no trace of the plate asked for; both specimen hints collide with 205 unhinted elements of the same colour.
- **Chromium's structure tree is no substitute**: PDF 1.4 names, 297 `NonStruct`, no sections, footnotes, formulas or list bodies.

## Decision

**The ink is read from the DOM, in the tab, in any browser, and never borrowed from a print the page cannot see.** The reason is not the composite's quality, which was good, but the door: `page.pdf()` is Playwright's verb outside the page, Firefox and Safari expose no programmatic print a page can read, and no web API exposes the paint tree. A borrowed ink layer would serve the CLI road under one browser, at the cost of three rulings (who owns a marker, whether re-encoded images are acceptable, how an ink hint reaches a paint it never touched). That is an optimisation for one door against the printer's premise, which is the tab. Caster's premise stands: [TABLET.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/TABLET.md)'s *capability lives inside members*; the printer runs in the realm it prints (Caster's DESIGN.md S20).

## Consequences

**What the spike leaves behind, and is kept.** A printer Caster shares no code with places every word within half a point: that check is permanent, the CLI acceptance's third reader (S84). A measured defect list for `vectors/`: the gradient `border-image` deferred where Chromium paints it, rules a fraction of a pixel from Chromium's, the `struck` line-through unresolved. Two findings in passing, both Caster's own: preparation shifts the text of a tight ordered list by 9 pt (a break of *preparation runs in no author preview, and must not change layout*, S81, under repair in its own session), and the word pairing can take a far record when a piece has none nearby (615 pt on one heading; a distance cap is the fix, not made).

## Refused

- Chromium's print as an ink layer for the CLI road alone. One door, three rulings, and a second code path for the same ink.
- Mapping sRGB values back to plates after the fact. A hint that never reaches the screen cannot be recovered from the screen's colour; the author would have to keep every hinted colour unique, a burden the hint exists to remove.

## Open

- Whether Caster prints under Firefox at all is unmeasured. HarfBuzz shaping, fontkit, the wasm bundles, Range measurement and `CSS.registerProperty` (Firefox 128+) are shared; Blink's 1/64 px grid and "Blink's geometry" for markers are the recorded Chromium facts (S10, S74). A battleground run of the strip acceptance under Playwright's Firefox is the first number. Safari shapes with CoreText and is the harder case.

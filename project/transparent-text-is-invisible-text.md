# Transparent text is invisible text

**Status: Decided 2026-11-18, Executed 2026-11-18.** Built in forme ([`8636301`](https://codeberg.org/BelType/forme/src/commit/8636301dbe09330330732b62098ae50f1c7a54c9/CHANGELOG.md)) and in Caster ([`6eb616d`](https://codeberg.org/BelType/caster/src/commit/6eb616d8ae8113844f65c5c5a5caf9ac2e6b1f26/CHANGELOG.md), proposition S110 of its `DESIGN.md`); released 2026-11-18 in `@beltype/caster` 0.2.12, which `@beltype/cli` 0.1.16 pins. Egildo's ruling of the day, "Invisible text plus true alpha", the second of two options laid before him. Builds on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md) and [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md).

## Context

On 2026-11-18 Egildo reported that Caster prints `color: transparent` text in black. Read in the code the same day, not yet reproduced in a print: the text measure reads the computed colour, which Chromium answers as `rgba(0, 0, 0, 0)` for `transparent`, and keeps its first three numbers ([`textMeasure.ts`](https://codeberg.org/BelType/caster/src/commit/1903c3237aa792e8a0a463c9a72a3f3091719d39/src/measure/textMeasure.ts), `parseRgb`). The alpha is dropped, so transparent text prints black and translucent text prints opaque. The display list's fill has no alpha to carry it. Chromium paints text with `-webkit-text-fill-color`, which Caster never reads. A solid rule's colour is read the same way, so a transparent `<hr>` prints a black bar.

Transparent text is common on the web for a reason: text kept for search, selection and assistive technology over a picture, or text whose paint comes from elsewhere (`background-clip: text`). Its words are rendered and in the document; *the conservation of words* (Caster's S61) claims them like any other.

Two answers were laid before him: invisible text alone, the smallest round, or invisible text together with a true alpha for translucent text, which moves the display list to a new version and touches both writers.

## Decision

**Text whose paint is fully transparent is written as PDF's invisible text, and translucent text keeps its alpha.**

- **Alpha 0 is text render mode 3** (`3 Tr`), the form OCR layers use: the glyphs, the text layer, the tags and the structure tree are those of visible text, and nothing is drawn. No following run inherits the mode.
- **An alpha between 0 and 1 is the fill alpha** of a graphics state (`/ca`), allocated once per value, as vector paints already carry theirs.
- **The paint is `-webkit-text-fill-color`**, which is what the browser draws text with; where an author sets none it is the same value as `color`.
- **A rectangle Caster paints from a colour keeps the same alpha**: a transparent one is not painted, a translucent one is painted with its fill alpha.
- **A declared ink keeps its own colour and takes the computed alpha**: a transparent run with a CMYK hint is still invisible.
- **The display list carries the alpha in the fill**, absent when 1, and moves to version 8. Both writers write it, byte for byte alike.

**Corrected 2026-11-18, the day it was written.** The line above says both writers write the alpha "byte for byte alike". That is wrong, and the session that wrote it is at fault: the two writers have never written the same bytes from one list (`paper.pdf` is 111 114 bytes from the TypeScript writer and 95 441 from forme), and [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md) holds forme to what the readers find, operator by operator, word by word and pixel by pixel, not to the other writer's bytes. The alpha is held to that.

## Consequences

**A file with no transparent or translucent text or rule prints the same bytes as before**, under both writers. A file that has them changes where they stand: what printed black is now invisible, and what printed opaque is now translucent.

**To be measured in the build**: that text under a fill alpha passes veraPDF under the PDF/A-4 and PDF/UA-2 profiles, under both writers, and that invisible text stays extractable and tagged.

**Not in this ruling**: `-webkit-text-stroke`, and the gradient `background-clip: text` paints through the glyphs. What Caster paints for the second, behind the now invisible text, was not checked.

**Measured 2026-11-18.** Caster's suite, 554 tests, has no failure under either writer; its nine new cases print a transparent run, a translucent one beside an opaque one, a transparent and a red fill colour, a transparent run with a CMYK ink, and a transparent and a quarter-alpha rule, and run veraPDF 1.30.4 under the PDF/UA-2 profile and, under both claims, the PDF/A-4 profile: no failed rule under either writer. The transparent words are extracted from the file and are in the structure tree; a page of only invisible text renders white. The two writers agree on the new cases operator for operator, word for word and within the lines in pixels. Every committed list and every fixture printed afresh prints the same bytes as before the round, under both writers. The essay's eighteen chapters and the web platform tests under Caster read exactly as under Caster 0.2.11. Not raced on the testbench: the change adds a colour read per run and no bytes for ordinary text.

**Not in the build**: colours the browser computes in `color(…)` or `oklch(…)` notation are still read as they were, wrongly; SVG `fill-opacity`; `-webkit-text-stroke`.

# Transparent text is invisible text

**Status: Decided 2026-11-18.** Egildo's ruling of the day, "Invisible text plus true alpha", the second of two options laid before him. Builds on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md) and [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md).

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

## Consequences

**A file with no transparent or translucent text or rule prints the same bytes as before**, under both writers. A file that has them changes where they stand: what printed black is now invisible, and what printed opaque is now translucent.

**To be measured in the build**: that text under a fill alpha passes veraPDF under the PDF/A-4 and PDF/UA-2 profiles, under both writers, and that invisible text stays extractable and tagged.

**Not in this ruling**: `-webkit-text-stroke`, and the gradient `background-clip: text` paints through the glyphs. What Caster paints for the second, behind the now invisible text, was not checked.

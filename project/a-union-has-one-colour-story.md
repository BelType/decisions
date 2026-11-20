# A union has one colour story

**Status: Decided 2026-11-20.** Egildo's rulings of 2026-11-20, "Forced equal" and then "yes, auto as on", on the first of the two decisions [a union joins display lists, never finished files](a-union-joins-display-lists-never-finished-files.md) cannot make mechanically. Nothing is built.

## Context

A file has one colour story or none: the output intent, `/DefaultRGB` and the two ICC profiles (`writing.colour` in the display list). Caster decides per document whether to write it. Under `colour: 'auto'`, the default, it is on where the document declares a `--pdf-*` colour hint or `blackText` or `convertRgb` is set; under any PDF/A member of `standard` it is always on. So two pieces printed with the same flags can still disagree, one with a story and one without, and a joined file cannot hold both.

He was asked first whether the pieces are forced to agree or the request decides; he chose forced equal. Two ways of forcing were then laid before him: a union reads `auto` as `on`, or every piece is printed, and those that left the story off are printed again with it on.

## Decision

1. **Every piece of a union is printed under one colour decision.**
2. **A union reads `colour: 'auto'` as `on`.** `on` and `off` mean what they mean for a single print, and `off` under a PDF/A member is refused as it is for one.

Refused: printing, looking and printing again. It keeps a file without a colour story exact, at the price of printing some pieces twice.

## Consequences

- A union whose pieces declare no colour still carries an output intent and the sRGB profile, a few kilobytes written once.
- Under a PDF/A member, the case of the request that convened this, the story is on for every piece already and nothing changes.

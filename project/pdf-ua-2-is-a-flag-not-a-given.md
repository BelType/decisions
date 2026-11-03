# PDF/UA-2 is a flag, not a given

**Status: Decided 2026-11-03, Executed 2026-11-03.** Executed in Caster on the branch `round/rust-writer`, three commits, and in forme, two; Caster's record of it is *PDF/UA-2 is a flag, not a given* (S103) in [`DESIGN.md`](https://codeberg.org/BelType/caster/src/commit/9a5ede62b1966ca325dc8e311f39ee813aa6a7a0/DESIGN.md), which carries the measured numbers. Decided by Egildo on the Rust writer's cff2 fixture, the ninth of his rulings of 2026-11-03 on that round, after Typst's `--pdf-standard`, WeasyPrint's `--pdf-variant` and Prince's `--pdf-profile`. Builds on [the printer guesses, says so, and withdraws the claim](the-printer-guesses-says-so-and-withdraws-the-claim.md), which it leaves as it is, and on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md), whose display list already carries the claim as data.

## Context

Caster stamps every file it prints PDF/UA-2 in the XMP, and since the Rust writer's stage 10 forme also writes Well-Tagged PDF's accessibility and reuse declarations beside the claim and withdraws them with it. The one road that withdraws the claim is *the printer guesses, says so, and withdraws the claim* (Caster's DESIGN.md S90): a custom element printed by its layout under `unknownElements: 'infer'` leaves the file tagged and claiming nothing. Nothing else in Caster asks whether a file can stand behind the claim before it is made.

The Rust writer's stage 4 found the case. The cff2 fixture of Caster's corpus is HarfBuzz's test subset of Source Serif 4 Variable, a face of one character with no space glyph. The builder asks the shaper for the space's glyph, gets glyph 0, `.notdef`, and writes `space: 0` on the text item, so both writers show `.notdef` in every word gap. PDF/UA-2 forbids it (ISO 14289-2, 8.4.5.9, which Well-Tagged PDF repeats), and veraPDF fails the file under `ua2`, `wt1a` and `wt1r`. The oracle refuses the list for its `HVAR` widths before it gets that far, so only forme's file showed it, and the file claimed a standard it broke.

The other engines ask the author which standard to claim: Typst's `--pdf-standard`, WeasyPrint's `--pdf-variant`, Prince's `--pdf-profile`. A claim the author asked for is a claim the printer must keep or refuse; a claim nobody asked for is a guess about the author's intent.

## Decision

**A Caster flag, `standard: 'ua-2' | 'none'`, default `'ua-2'`.**

**Under `'ua-2'` the file claims PDF/UA-2 and both Well-Tagged PDF declarations**, accessibility and reuse, as it does today, and **a word gap that would be written as glyph 0 is refused by name**: a face with no space glyph cannot show a gap PDF/UA-2 accepts, so the print stops and the refusal names the face and its missing space, and says that `standard: 'none'` prints it.

**Under `'none'` the file is tagged as ever and claims nothing**: no PDF/UA-2 identification in the XMP and no Well-Tagged PDF declarations. Such a gap is written as positioning alone, the pen moved to where the browser put the next word, with no glyph shown. The structure tree, the marked content and every other byte of the file are what `'ua-2'` writes; only the claim and the gap differ.

**The claim travels as it does today.** The display list's `info.conformance` is already the claim as data, `pdfua2` or `tagged`, so `'none'` writes `tagged` and no writer needs a new field: the list stays at version 6. The builder decides the gap, since it knows the flag; a writer that still meets a space of glyph 0 on a list claiming PDF/UA-2 refuses with the same sentence, and on a list claiming nothing writes the positioning.

**How it meets *the printer guesses, says so, and withdraws the claim*.** That record stays as it is: under `'ua-2'` a guess still withdraws the claim and its two declarations, and the report says so. It is the one road on which `'ua-2'` is asked for and softened, and the report's `conformance` names it. Under `'none'` there is no claim to withdraw, and a guess is still listed. The gap is not softened under `'ua-2'` by a guess: the flag asked for the standard, and the refusal names the flag that prints the document.

**The cff2 fixture is swapped** for a CFF2 face that keeps a space glyph, so the corpus's CFF2 road holds no `.notdef` and its file can pass the profiles it claims.

## Consequences

- Caster's flag table gains the row, its DESIGN.md records the ruling as a proposition with the next free number, and both writers honour the gap rule; the cff2 document alone is re-recorded, and every other corpus file stays byte for byte what it was.
- A host that wants a file claiming nothing asks for `'none'`; the default prints every document that printed before, byte for byte, except one whose face has no space glyph, which is now refused where it printed `.notdef` under a claim it broke.
- Only two values exist. A PDF/A or a PDF/UA-1 claim is a new value when a customer asks for one, with its own measurement.
- The spelling of the Well-Tagged PDF declarations' URIs, where the WTPDF 1.0.0 text and veraPDF disagree, was open when this was written; corrected 2026-11-03: Egildo ruled the same day that forme writes both spellings, four entries under `'ua-2'` and none under `'none'`, and forme's README records the evidence.

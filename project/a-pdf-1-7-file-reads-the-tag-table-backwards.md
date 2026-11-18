# A PDF 1.7 file reads the tag table backwards

**Status: Decided 2026-11-18.** Egildo's ruling of the day, the fourth of four on the PDF 1.7 family; he answered "a to all four". Builds what [the older tag names are written in the older namespace](the-older-tag-names-are-written-in-the-older-namespace.md) ruled in principle on 2026-11-17 as "the other direction", and adds the one question it left: the Well-Tagged PDF declarations. The list's new members are [the PDF 1.7 family joins the list](the-pdf-1-7-family-joins-the-list.md).

## Context

Caster's tag table is written for PDF 2.0: its types live in the PDF 2.0 namespace, and `BlockQuote`, `Code`, `Quote`, `TOC`, `TOCI` and `Reference` in the PDF 1.7 one. A PDF 1.7 file has no namespaces and knows only the 1.7 types. The survey of 2026-11-17 measured, on probe files under veraPDF's PDF/UA-1 and PDF/A-2a profiles, that `Em`, `Strong` and `Aside` pass as custom names role-mapped to `Span`, `Span` and `Div`, and that a footnote passes as a `Note` with an `/ID` of its own.

forme writes two Well-Tagged PDF declarations in the XMP of a PDF/UA-2 file. Well-Tagged PDF 1.0 "describes a usage of PDF 2.0 (ISO 32000-2) that is compatible with PDF/UA-2", so the declarations say something a 1.7 file is not.

## Decision

**In a PDF 1.7 file the table is read backwards, as ruled, and no Well-Tagged PDF declaration is written.**

- **The 1.7 types are written under their own names, with no namespace**: `BlockQuote`, `Code`, `Quote`, `TOC`, `TOCI`, `Reference`, and every type the two versions share.
- **A PDF 2.0 type with no 1.7 counterpart is a custom name in the role map**, mapped to the 1.7 type nearest in meaning: `Em` and `Strong` to `Span`, `Aside` to `Div`. Any other 2.0 type the table writes is mapped the same way, and its mapping is measured under veraPDF in the build before it ships.
- **A footnote is a `Note` with its own `/ID`**, in place of PDF 2.0's `FENote`.
- **The `Ref` arrays are left out.** A structure element's `Ref` key, which points a contents entry at its heading and a footnote's call at its note, is new in PDF 2.0 (ISO 32000-2, Table 355, "Optional; PDF 2.0"); PDF 1.7's structure element has no such key. The link annotations that carry the reader to the target stay, as they are in every file.
- **The Well-Tagged PDF declarations are written only in a PDF 2.0 file**, by both writers alike, as they are today.

## Consequences

**The display list carries the version, and the writers read the table from it**, so both write the same structure for the same list.

**A PDF 2.0 file is not touched**: a list with no 1.7 member prints the bytes it prints today.

**What it touches on the tablet.** One table, read in two directions, so that a quotation is a quotation in either version and nothing is flattened to fit.

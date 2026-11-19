# The files that carry a file join the list

**Status: Decided 2026-11-19.** Egildo's ruling of 2026-11-19, one of seven on attachments, each laid before him with two options and my pick first; asked whether he took the first on all seven, he answered "a to all". Amends [the standard is a list](the-standard-is-a-list.md) and [the PDF 1.7 family joins the list](the-pdf-1-7-family-joins-the-list.md), which this adds four members to. Nothing is built.

## Context

Caster's `standard` names the claims a file makes. On 2026-11-17 Egildo asked for the archival standards and the older ones, and then said "I think BelType is in the position of offering all of it"; the part of all of it still unruled was a file that carries another file: the archival standards that admit an attachment, and through them the electronic invoice.

Two standards admit any attached file. PDF/A-3 is PDF/A-2 with that one permission added, at the same three levels, on PDF 1.7. PDF/A-4f is PDF/A-4 with it, on PDF 2.0, and demands that at least one file be attached. The members that do not carry the letter admit an attached file only if it is itself PDF/A.

**Not on the machine**: the texts of ISO 19005-2, -3 and -4. Every rule about a standard here is read from the rule text of veraPDF 1.30, which quotes them: PDF/A-2 and PDF/A-4 admit an embedded file only if it is itself PDF/A; PDF/A-3 and PDF/A-4f admit any file; every embedded file names its MIME type, carries the `F` and `UF` keys and an `AFRelationship`; a PDF/A-4f file has an `EmbeddedFiles` entry in the catalog's name dictionary.

Two shapes were laid before him: all four members now, or `a-3b` and `a-4f` alone.

## Decision

1. **`standard` gains `a-3b`, `a-3u`, `a-3a` and `a-4f`.** The first three print a PDF 1.7 file and are to PDF/A-3 what `a-2b`, `a-2u` and `a-2a` are to PDF/A-2; `a-4f` prints a PDF 2.0 file and is PDF/A-4 that carries a file.
2. **Each rule of its twin holds**: one version per file and one PDF/A member per list, each refused by name; a guess lowers `a-3a` to `a-3u` as [it lowers PDF/A-2a](a-guess-lowers-pdf-a-2a-to-pdf-a-2u.md); the claim is kept or refused as [an archival claim is](an-archival-claim-is-kept-or-refused.md).
3. **The default stays `ua-2`.**

Refused: `a-3b` and `a-4f` alone. The three levels of PDF/A-2 are built, and PDF/A-3 differs from them by what may be attached and by the part number it writes.

## Consequences

- The list has four more values, and the table that says which may stand together grows with them.
- What an attachment is, how a document names one and what happens where the claim cannot carry it are their own rulings of the same day: [a document names what it attaches](a-document-names-what-it-attaches.md) and [an attachment is carried or the print is refused](an-attachment-is-carried-or-the-print-is-refused.md).
- **Not checked:** that veraPDF passes a file of either writer under any of the four; nothing is built.

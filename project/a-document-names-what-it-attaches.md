# A document names what it attaches

**Status: Decided 2026-11-19.** Egildo's ruling of 2026-11-19, one of seven on attachments, each laid before him with two options and my pick first; asked whether he took the first on all seven, he answered "a to all". This record holds three of the seven: how an author attaches a file, how the file's relationship to the document is said, and that an attachment a reader opens from the text waits. Nothing is built.

## Context

A PDF may carry other files. The archival standards that admit any file ask that each say its MIME type and what it is to the document, in the standard's words its `AFRelationship`: the *source* the document was made from, the *data* behind it, an *alternative* form of it, a *supplement* to it, or *unspecified*.

How the other tools take an attachment, read on the day from their documentation: WeasyPrint reads `<link rel="attachment" href title>` in the document's head, and `<a rel="attachment">` in the text for one the reader opens; Typst has the author write `pdf.attach(path, relationship:, mime-type:, description:)` in the document; Gotenberg takes the files beside the document, posted with it. Prince's forum holds a report of an attached invoice arriving under the name `Attach000`, where the invoice standard demands a name of its own.

**Not on the machine**: the texts of ISO 19005-2, -3 and -4. Every rule about a standard here is read from the rule text of veraPDF 1.30, which quotes them: PDF/A-2 and PDF/A-4 admit an embedded file only if it is itself PDF/A; PDF/A-3 and PDF/A-4f admit any file; every embedded file names its MIME type, carries the `F` and `UF` keys and an `AFRelationship`; a PDF/A-4f file has an `EmbeddedFiles` entry in the catalog's name dictionary.

`beltype print` answers every request from the document's folder and reaches no network, and a file the document asks for and the folder lacks refuses the print by name.

## Decision

1. **The document says what it attaches**, in its head: `<link rel="attachment" href="…" type="…" title="…">`. `href` is a file of the document's own folder, fetched as a face or a picture is; `type` is its MIME type; `title` is its description. It is WeasyPrint's spelling, taken whole. The file is attached under its own name, the last segment of `href`.
2. **A file that is not there refuses the print by name**, as any file the document asks for does.
3. **Where `type` is not given**, the type is the one the file's extension has in the table BelType already shares (`@beltype/common/mime`), and `application/octet-stream` where it has none, which is what the standards ask for a type nobody knows.
4. **The relationship is one attribute on that link, `data-pdf-relationship`**, with the standard's own words in lower case: `source`, `data`, `alternative`, `supplement`, `unspecified`. Not given, the file is written as `unspecified`. Another word refuses the print and names the five.
5. **An attachment the reader opens from the text waits.** The standards admit the annotation only under PDF/A-3 and PDF/A-4f, and nobody has asked for it.

Refused: the files handed beside the document, in a flag or a form field. The document would then be one thing on the author's screen and another in the print, and a mail merge's template could not say what its customers carry. Refused too: refusing an attachment that does not say its relationship, since the standard has a word for unsaid.

## Consequences

- A document with such a link prints with the file inside under every value of `standard` that can carry it; where the claim cannot, see [an attachment is carried or the print is refused](an-attachment-is-carried-or-the-print-is-refused.md).
- `rel="attachment"` is not among HTML's registered link types. A browser ignores a link type it does not know, so the document's preview is unmoved.
- Both writers write the same file, so the attachment travels in the display list, or beside it as the faces' bytes do; which is the build's to settle.
- **Not checked:** how Chromium fetches such a link (it does not on its own, since it knows no such type; the printer reads the file through the door it reads a face's bytes through).

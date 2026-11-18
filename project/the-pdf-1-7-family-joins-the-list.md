# The PDF 1.7 family joins the list

**Status: Decided 2026-11-18.** Egildo's ruling of the day, the first of four on the PDF 1.7 family, each laid before him with options; he answered "a to all four". Amends [the standard is a list](the-standard-is-a-list.md), whose members were `ua-2` and `a-4` and whose refusal of a list that mixes the two versions was not written because no 1.7 member existed. The other three rulings of the day are [a guess lowers PDF/A-2a to PDF/A-2u](a-guess-lowers-pdf-a-2a-to-pdf-a-2u.md), [a broken heading sequence withdraws PDF/UA-1](a-broken-heading-sequence-withdraws-pdf-ua-1.md) and [a PDF 1.7 file reads the tag table backwards](a-pdf-1-7-file-reads-the-tag-table-backwards.md).

## Context

On 2026-11-17 Egildo asked "what limits do we have to pdf 1.7 so we can export more broadly supported PDFs", and then "I think BelType is in the position of offering all of it". Caster writes PDF 2.0 only. Many readers, archives and procurement rules still ask for PDF 1.7 and for the standards built on it: PDF/UA-1 (ISO 14289-1) for accessibility, and PDF/A-2 (ISO 19005-2) for keeping, in three levels, `b` (the file looks the same), `u` (and its text is Unicode) and `a` (and it is tagged).

The survey of 2026-11-17 measured what a 1.7 file needs beyond what Caster writes, under veraPDF 1.30.4 on hand-made probe files: the `%PDF-1.7` header; an XMP extension schema for the `pdfuaid` namespace, which PDF/A-2 does not know; under PDF/UA-1 a heading sequence that starts at `H1` and skips no level (ISO 14289-1, 7.4.2); and the PDF 2.0 tag types written another way. The ISO 19005 texts are not on this machine, so the PDF/A-2 rules rest on veraPDF's rule text, as the PDF/A-4 ones did.

## Decision

**The list gains five members: `ua-1`, `a-2b`, `a-2u`, `a-2a`, and `pdf-1.7`, a PDF 1.7 file that claims nothing.**

- **A member fixes the file's version.** `ua-2` and `a-4` are PDF 2.0; the five new members are PDF 1.7. A list that holds members of both is refused by name before anything is printed, naming one member of each, as the record this amends said it would be.
- **One PDF/A member at most.** A file carries one PDF/A identification, so a list naming two PDF/A members, `a-2b` beside `a-2a`, or `a-4` beside any, is refused by name.
- **`pdf-1.7` is to PDF 1.7 what `none` is to PDF 2.0**: a tagged file with no claim. Beside `ua-1` or a PDF/A-2 member it adds nothing and is accepted.
- **The default stays `ua-2` alone.** A host gets a PDF 1.7 file only by asking for one.
- **Each new claim is kept or answered for by its own ruling**: a PDF/A-2 claim as [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md) says, read for PDF/A-2 in place of PDF/A-4, and the two of the day that differ for this family.

**Why a bare `pdf-1.7`.** A reader that opens PDF 1.7 and not PDF 2.0 is the reason to ask for the older version, and that reader does not need a claim; without the member, the only way to such a file would be to make a claim the author did not ask for.

## Consequences

**The spelling of the report, the display list and the CLI's line is the build's**, as it was for PDF/A-4: the CLI names each claim the file makes, as it names `pdf-2.0; pdf-ua-2; pdf-a-4` today.

**Both writers write what the list says**, so the version, the header and the XMP extension schema are carried by the display list, not chosen by a writer.

**Not ruled here.** Attachments, which PDF/A-2 allows only when the attached file is itself PDF/A, and PDF/A-3, which allows any, wait for the round on invoices. A placed PDF page stays refused under every PDF/A claim until a round reads it against the rules.

**What it touches on the tablet.** The older version is a reader's need, not a lesser output; the author asks for it by name and the printer keeps or answers for each claim it makes.

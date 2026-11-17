# An archival claim is kept or refused

**Status: Decided 2026-11-17.** Egildo's rulings of the day on PDF/A-4, six of the seven laid before him one by one, each with two options; to each he answered "a". The first of the seven is its own record, [the standard is a list](the-standard-is-a-list.md), which this one stands on. Builds on [PDF/UA-2 is a flag, not a given](pdf-ua-2-is-a-flag-not-a-given.md) and on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md).

## Context

On 2026-11-17 Egildo said "caster should be able to do archivable /A-4". PDF/A-4 (ISO 19005-4:2020) is the archival standard built on PDF 2.0: a file that says what its colours mean, carries its own fonts, and depends on nothing outside itself.

**Measured 2026-11-17**, by veraPDF 1.30.4 under its PDF/A-4 profile over the eighteen files Caster's TypeScript writer has recorded in `fixtures/lists/`: every one fails, and every failure is of the writer's own doing, none of the documents'.

- No file identifier in the trailer, in all eighteen. PDF 2.0 itself requires one of every file; forme writes it and the TypeScript writer does not.
- The document information dictionary, in all eighteen. PDF/A-4 allows it only when it holds a modification date and nothing else.
- No PDF/A identification in the metadata, in all eighteen.
- Device colour with nothing to give it meaning: RGB in fifteen, CMYK in five, grey in one.
- A page with transparency and no archival colour profile behind it, in seven.
- An image asking the viewer to smooth it (`/Interpolate true`), in ten. Caster writes it where the page's CSS asks for smooth scaling.

The survey of the same day, by an agent, ran forme's nineteen files too and patched copies of both: with the output intent's subtype changed from `GTS_PDFX` to `GTS_PDFA1` every colour failure went away, since veraPDF does not count a print shop's intent as an archive's. That run was not repeated by the session that wrote this.

**Not on the machine**: the text of ISO 19005-4. Every rule above is read from veraPDF's own rule text, which quotes the standard.

## Decision

**Under `a-4` a file is PDF/A-4 or it is not printed.**

- **The claim is kept or refused.** Where the document cannot be PDF/A-4 as written, the print is refused by name, saying what broke the claim and where; no file is written with the claim dropped. This differs on purpose from PDF/UA-2, where a guessed tag withdraws the claim and warns: a guess is a judgement about meaning, and a colour with no profile is a fact. A guessed tag still withdraws the accessibility claim alone, where both are asked for, and leaves the archival one standing.
- **The claim is written** as the PDF/A identification in the metadata, part 4, with no conformance level, as the standard defines it. This needed no ruling.
- **The document information dictionary is removed under `a-4`, and only there.** A file that does not make the claim keeps it, since older viewers and file managers read the title from it.
- **An image is not smoothed under `a-4`, and only there.** The flag is written false or left out. A file that does not make the claim stays as the page asked.
- **The colour profile is labelled for the archive and for the print shop both**, two output intents on the one profile, so an author who asked for a press profile still has it.
- **CMYK colour with no CMYK profile behind it is refused by name under `a-4`**, the message saying to supply one. It is not converted to sRGB: a silent conversion changes the ink the author asked for.
- **A page of another PDF placed in the document is refused under `a-4`, for now**, the message naming it. Caster copies such a page as it is and does not read what it copies, so it cannot stand behind it.
- **PDF/A-4 alone, of its three kinds.** PDF/A-4f, the same with files attached, comes with the feature for attaching a file, in the round on invoices. PDF/A-4e, for engineering, is asked for by nobody.

**Two corrections, whatever the claim.** They were found by this survey and are owed by every file.

- **Every file carries the file identifier**, under both writers.
- **A transparency group names the managed colour space where colour management is on.** Today it says plain device colour even then.

On the three questions of colour he answered "a" once; it was read as all three and he was told so in the same breath.

## Consequences

**The bytes change once for every file of the TypeScript writer**, which gains the identifier, and for every file of either writer that holds transparency under colour management. Their pages do not change. A file that does not ask for `a-4` is otherwise what it was.

**To be measured in the build, and brought back if it fails**: that a file may hold the archive's output intent and the print shop's on one profile and still pass. The survey passed a file with the archive's alone.

**Owed after this.**

- A round that reads a placed PDF page against the rules, so the refusal can be lifted. A scanned annex in an archival document is an ordinary need. Accepting a placed file because it declares itself PDF/A was considered and set aside: a declaration is not a check.
- PDF/A-4f, with attachments.

**Not checked**: which viewers still read the title from the information dictionary alone, and how visible the loss of smoothing is in practice.

**What it touches on the tablet.** A refusal by name where the printer cannot keep its word. An archive is the reader who comes latest of all, and a file that is silently not archival fails there, with nobody watching.

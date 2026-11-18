# An archival claim is kept or refused

**Status: Decided 2026-11-17, Executed 2026-11-18.** Built in forme ([`1169f6c`](https://codeberg.org/BelType/forme/src/commit/1169f6ca93093635220ab406dbb32c282aaff6f3/CHANGELOG.md)) and in Caster ([`39d5c2f`](https://codeberg.org/BelType/caster/src/commit/39d5c2ff8b8d2ac64e336531bf8014fcbae3480f/CHANGELOG.md), proposition S109 of its `DESIGN.md`); released 2026-11-18 in `@beltype/caster` 0.2.10, which `@beltype/cli` 0.1.14 pins. Egildo's rulings of the day on PDF/A-4, six of the seven laid before him one by one, each with two options; to each he answered "a". The first of the seven is its own record, [the standard is a list](the-standard-is-a-list.md), which this one stands on. Builds on [PDF/UA-2 is a flag, not a given](pdf-ua-2-is-a-flag-not-a-given.md) and on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md).

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

**A document that names no colour profile, ruled 2026-11-18.** The seven questions did not cover it, and the build found it: with colour management off a file has no output intent, so its device colour means nothing under the claim. Two answers were laid before him, that Caster writes its own sRGB profile as the output intent whenever `a-4` is asked for, or that `a-4` is refused unless the author supplies a profile; he answered "Yes, sRGB". So `a-4` turns the colour objects on, a document that names no profile gets the sRGB one Caster already carries, and `colour: 'off'` together with `a-4` is refused by name. The second answer would have left most authors unable to print PDF/A-4 at all, since Caster ships no CMYK profile.

On the three questions of colour he answered "a" once; it was read as all three and he was told so in the same breath.

## Consequences

**The bytes change once for every file of the TypeScript writer**, which gains the identifier, and for every file of either writer that holds transparency under colour management. Their pages do not change. A file that does not ask for `a-4` is otherwise what it was.

**To be measured in the build, and brought back if it fails**: that a file may hold the archive's output intent and the print shop's on one profile and still pass. The survey passed a file with the archive's alone.

**Measured in the build, 2026-11-18: it passes.** A file holding the archive's output intent and the print shop's on one profile passes veraPDF 1.30.4 under its PDF/A-4 profile, under both writers, and under its PDF/UA-2 profile too where both claims are made.

**As built, 2026-11-18.** Written out in Caster's S109.

- Under `a-4` the information dictionary is removed whole, and the XMP carries the title and the dates.
- `a-4` turns colour management on, and `colour: 'off'` beside `a-4` is refused by name.
- forme accepts an RGB output profile, which it refused before, so the sRGB profile of a document that names none is written by either writer.
- What counts as CMYK for the refusal: declared inks, process and spot, `blackText: '100k'`, a CMYK vector paint or gradient, the print marks, a picture's DeviceCMYK samples and a four-component JPEG.

**Measured 2026-11-18.** Caster's suite, 545 tests, has no failure under either writer, and its new cases run veraPDF under the PDF/A-4 profile on every file that makes the claim. Printed through `@beltype/cli` 0.1.14 by the session that released it: a document that names no colour profile passes PDF/A-4 under `a-4`, passes PDF/A-4 and PDF/UA-2 under both claims, and under `ua-2` alone fails PDF/A-4, as it should. The essay's eighteen chapters keep every claim, with the one known red, and the web platform tests under Caster read as before: css-page 50 pass, 25 fail and 138 refused of 213, css-break 20, 12 and 32 of 64. By the testbench's probe of the server, the unreleased Caster against the released one in four short runs of each, alternated, on a machine in use: no row slower outside the spread of one variant's own runs, the means between 2.0 % under and 6.3 % over the released, where the released bills by folder alone ran from 143.7 to 180.0 a minute. The identifier's SHA-256 on the paper's 111 114 bytes takes 0.2 ms.

**Not checked in the build**: a colour-managed render in any viewer (the pages were compared by poppler at 60 dpi alone, 37 of them identical before and after), the other readers Caster is held to, and forme's replay of recorded lists. Caster's `identity check`, a script outside its suite that was already failing on two files, now differs on every file by the identifier and needs a deliberate re-record.

**Left for the CLI.** `X-Beltype-Standard` and `beltype print`'s line do not name the archival claim: Caster's report carries the PDF/UA-2 claim alone, so a file printed under `a-4` reads `pdf-2.0`.

**Owed after this.**

- A round that reads a placed PDF page against the rules, so the refusal can be lifted. A scanned annex in an archival document is an ordinary need. Accepting a placed file because it declares itself PDF/A was considered and set aside: a declaration is not a check.
- PDF/A-4f, with attachments.

**Not checked**: which viewers still read the title from the information dictionary alone, and how visible the loss of smoothing is in practice.

**What it touches on the tablet.** A refusal by name where the printer cannot keep its word. An archive is the reader who comes latest of all, and a file that is silently not archival fails there, with nobody watching.

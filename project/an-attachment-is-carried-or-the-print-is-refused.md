# An attachment is carried or the print is refused

**Status: Decided 2026-11-19.** Egildo's ruling of 2026-11-19, one of seven on attachments, each laid before him with two options and my pick first; asked whether he took the first on all seven, he answered "a to all". Extends [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md) to what a file carries. Nothing is built.

## Context

A document may name a file to attach ([a document names what it attaches](a-document-names-what-it-attaches.md)) and ask for an archival claim that cannot carry it: PDF/A-2 and PDF/A-4 admit an attached file only if it is itself PDF/A, and PDF/A-4f demands that one be attached.

**Not on the machine**: the texts of ISO 19005-2, -3 and -4. Every rule about a standard here is read from the rule text of veraPDF 1.30, which quotes them: PDF/A-2 and PDF/A-4 admit an embedded file only if it is itself PDF/A; PDF/A-3 and PDF/A-4f admit any file; every embedded file names its MIME type, carries the `F` and `UF` keys and an `AFRelationship`; a PDF/A-4f file has an `EmbeddedFiles` entry in the catalog's name dictionary.

Two shapes were laid before him: the print is refused and names the member that would carry the file, or Caster moves the claim itself, `a-4` to `a-4f`, and says so.

## Decision

1. **Under `a-4`, `a-2b`, `a-2u` or `a-2a` a document that attaches a file is refused by name**, and the refusal names the member that carries it: `a-4f` for the first, `a-3b`, `a-3u` or `a-3a` for the others.
2. **Under `a-4f` a document that attaches nothing is refused by name**, and the refusal names `a-4`.
3. **Caster does not read an attached PDF to learn whether it is PDF/A.** So under the members without the letter every attachment is refused, a PDF/A file among them, which those standards would admit.
4. **Under a list with no archival member the file is attached** and nothing is claimed about it.

Refused: moving the claim. The author asked for one standard by name, and a file that says another is not the file asked for; it is the reasoning of the ruling this extends, where a colour with no profile is a fact and not a judgement.

## Consequences

- An author who wants an archival file with its source inside asks for `a-3b` or `a-4f` and is told so by the refusal if they asked for less.
- A PDF/A file attached to a PDF/A-2 or PDF/A-4 file is refused, though the standards allow it. Lifting that takes a reader of the attached file against the PDF/A rules, the same round that would lift the refusal of a placed PDF page under PDF/A, and it is not planned.

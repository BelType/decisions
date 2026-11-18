# A guess lowers PDF/A-2a to PDF/A-2u

**Status: Decided 2026-11-18.** Egildo's ruling of the day, the second of four on the PDF 1.7 family; he answered "a to all four". Read beside [the printer guesses, says so, and withdraws the claim](the-printer-guesses-says-so-and-withdraws-the-claim.md) and [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md), which this one reconciles for the one level of PDF/A that is about meaning. The list's new members are [the PDF 1.7 family joins the list](the-pdf-1-7-family-joins-the-list.md).

## Context

Under Caster's default, `unknownElements: 'infer'`, a custom element with no role is walked as CSS laid it out, every guess is reported, and the PDF/UA-2 claim is withdrawn: a guess is a judgement about meaning, and the claim says the meaning was declared. An archival claim, by contrast, is kept or refused: a colour with no profile cannot be made to keep.

PDF/A-2 has three levels. `b` and `u` are about keeping the look and the text; `a` adds that the file is tagged so its meaning can be read, which is the same promise PDF/UA makes. A guess therefore touches only the third level. Two answers were laid before him: the guess lowers the claim to `u` with a warning, or the print is refused.

## Decision

**Under `a-2a`, a guessed tag lowers the claim to `a-2u` and says so; the archival part is still kept or refused.**

- **The warning is the guess's own**, one per guess as today, and the report says the file claims `a-2u`, so a host can tell the author what was asked and what was kept.
- **What PDF/A-2u itself needs is kept or refused**, as under PDF/A-4: a colour with no profile, a font that cannot be embedded, a placed PDF page, each refused by name.
- **Under `unknownElements: 'refuse'` nothing changes**: the custom element is refused before any claim is weighed.
- **Beside `ua-1`, the guess withdraws PDF/UA-1 too**, as it withdraws PDF/UA-2.

**Why lower and not refuse.** The file the author asked for can still be kept for as long as the archive keeps it; only the claim that its meaning was declared is untrue. Refusing would throw away a file that keeps everything but one promise, and the guess rule already answers that promise in the same way for PDF/UA.

## Consequences

**A claim can come out smaller than it went in**, for the first time under an archival member. The report and the CLI's line name what the file claims, never what was asked, so the lowering is visible where the claim is read.

**PDF/A-4 is not touched.** It has no level about meaning; the guess there withdraws PDF/UA-2 alone, as before.

**What it touches on the tablet.** A guess is said and its cost is the claim about meaning, nothing more; what the printer can keep, it keeps.

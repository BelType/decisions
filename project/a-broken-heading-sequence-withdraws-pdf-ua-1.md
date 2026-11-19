# A broken heading sequence withdraws PDF/UA-1

**Status: Decided 2026-11-18, Executed 2026-11-19.** Built in forme ([`8b98b90`](https://codeberg.org/BelType/forme/src/commit/8b98b90bb163bcb66c8df6c8b605ba11a904e65f/CHANGELOG.md)) and in Caster ([`3011b5c`](https://codeberg.org/BelType/caster/src/commit/3011b5c1412ec7ad6460849b67a4c9224ae12667/CHANGELOG.md), proposition S111 of its `DESIGN.md`); released 2026-11-19 in `@beltype/caster` 0.2.13, which `@beltype/cli` 0.1.17 pins, and whose claims that CLI names in its print line and its `X-Beltype-Standard` header ([`7f7ec3d`](https://codeberg.org/BelType/cli/src/commit/7f7ec3d581040812871ffc0c3174849b69a57c62/CHANGELOG.md)). Egildo's ruling of the day, the third of four on the PDF 1.7 family; he answered "a to all four". Amended 2026-11-19 under Decision: a skipped level is refused under `ua-1` as under every value, and only a first heading that is not `H1` withdraws the claim. Applies the rule of [the printer guesses, says so, and withdraws the claim](the-printer-guesses-says-so-and-withdraws-the-claim.md) to a rule PDF/UA-2 does not have. The list's new members are [the PDF 1.7 family joins the list](the-pdf-1-7-family-joins-the-list.md).

## Context

PDF/UA-1 (ISO 14289-1, 7.4.2, *Numbered headings*) says of a document that is not strongly structured: if any heading tags are used, `H1` shall be the first, and a descending sequence "shall not skip an intervening heading level. H1 H2 H3 is permissible, while H1 H3 is not." PDF/UA-2 has no such rule, and a document BelType prints today may go from an `h2` to an `h4`, or start at an `h2`, and still claim PDF/UA-2. The survey of 2026-11-17 found the rule enforced by veraPDF's PDF/UA-1 profile. **Corrected 2026-11-19**, by the build: the sentence above on what PDF/UA-2 lets through is half wrong. Caster's walk already refuses a heading that skips a level on the way down, under every value of `standard` (`caster: heading level jumps from H2 to H4 at …`, in `src/walk/structure.ts`, the walker's own rule and no standard's), so a skip never reached a PDF/UA-2 file. A document that starts at an `h2` does print and claim PDF/UA-2 today. The ruling was made without knowing of the refusal.

Three answers were laid before him: withdraw the PDF/UA-1 claim with a warning naming the heading; write the heading as the unnumbered `H`, which needs the strongly structured form the document does not have; or refuse the print.

## Decision

**Where the headings break PDF/UA-1's sequence, the PDF/UA-1 claim is withdrawn, with one warning naming each heading that breaks it.**

- **Two breaks are counted**: a first heading that is not `H1`, and a heading more than one level below the one before it. A heading that climbs any number of levels, or repeats one, breaks nothing.
- **The file is printed as the author wrote it**, its headings at the levels they have. Nothing is renumbered: the level is the author's statement of the outline, and a printer that moved it would be guessing.
- **The report says the file is tagged and does not claim PDF/UA-1**, as it says for a guess; the warning tells the author which heading to move.
- **Other claims are not touched.** PDF/A-2a asks for tags, not for a heading sequence, and keeps its claim.

**Why withdraw and not refuse.** The headings are the author's and can be fixed by the author; the file is still a good tagged file in the meantime, and the claim is the one thing it cannot honestly carry.

## Consequences

**The check runs only under `ua-1`.** A PDF 2.0 file is not asked for it, since PDF/UA-2 does not ask.

**A host that shows Caster's warnings shows this one** with no work of its own, as it shows a guess.

**What it touches on the tablet.** The printer answers for a claim by name and never rewrites the author's outline to keep one.

**Amended 2026-11-19, a skip is refused under `ua-1` as everywhere.** The build found the walk's own refusal of a skipped level, under every value of `standard` (see the correction under Context), and built this ruling by lifting that refusal under `ua-1` alone, so the one standard that forbids a skip would have been the one value under which a document with a skip printed. Laid before Egildo with two answers, keep the refusal under `ua-1` too or print and withdraw under `ua-1` alone, he answered "Refuse, as everywhere". So the first of the two breaks counted under Decision is no longer counted: a skip on the way down never reaches the claim, because the walk refuses the print first, under `ua-1` as under every value. What is left of the ruling is the other break: a first heading that is not `H1` prints as written and withdraws the PDF/UA-1 claim with one warning naming it, and PDF/A-2a beside it keeps its claim.

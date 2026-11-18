# The standard is a list

**Status: Decided 2026-11-17, Executed 2026-11-18.** Built in forme ([`1169f6c`](https://codeberg.org/BelType/forme/src/commit/1169f6ca93093635220ab406dbb32c282aaff6f3/CHANGELOG.md)) and in Caster ([`39d5c2f`](https://codeberg.org/BelType/caster/src/commit/39d5c2ff8b8d2ac64e336531bf8014fcbae3480f/CHANGELOG.md), proposition S109 of its `DESIGN.md`); released 2026-11-18 in `@beltype/caster` 0.2.10, which `@beltype/cli` 0.1.14 pins. Egildo's ruling of the day, the first of seven on PDF/A-4, each laid before him with two options and answered one by one; to this one he answered "a". Amends [PDF/UA-2 is a flag, not a given](pdf-ua-2-is-a-flag-not-a-given.md), whose flag held one claim and said a PDF/A claim would be "a new value when a customer asks for one". The claim it makes room for first is in [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md).

## Context

Caster's flag `standard` takes `'ua-2'` or `'none'`. On 2026-11-17 Egildo asked for more: "caster should be able to do archivable /A-4. And what limits do we have to pdf 1.7 so we can export more broadly supported PDFs", and then "I think BelType is in the position of offering all of it". All of it is a family: PDF/A-4 beside PDF/UA-2, later the standards built on PDF 1.7 (PDF/UA-1, PDF/A-2) and the ones that carry an attached file (PDF/A-3, PDF/A-4f).

A file can make more than one of these claims at once. PDF/A-4 and PDF/UA-2 are both built on PDF 2.0 and ask for different things, the first that the file can be kept, the second that it can be read by everyone. One flag with one value cannot say both.

Two shapes were laid before him: the flag becomes a list, as Typst's `--pdf-standard` is, or the flag stays and a second one, `archive`, is added beside it.

## Decision

**Caster's `standard` names a list of claims, and the file makes every claim on the list.**

- **The members today** are `ua-2` and `a-4`. The default stays what it is, `ua-2` alone, and claiming nothing stays possible.
- **Every value accepted before this ruling means what it meant.** A host that passes `'ua-2'` or `'none'` gets the file it got.
- **A list no single file can keep is refused by name**, before anything is printed: a standard built on PDF 1.7 beside one built on PDF 2.0, when the first of the 1.7 family arrives, since a file has one version. The refusal names the two members.
- **Each claim is kept or answered for on its own.** What happens when the file cannot keep a claim is that claim's own ruling: [the printer guesses, says so, and withdraws the claim](the-printer-guesses-says-so-and-withdraws-the-claim.md) for PDF/UA-2, and [an archival claim is kept or refused](an-archival-claim-is-kept-or-refused.md) for PDF/A-4.
- **The display list carries the claims as data**, as it carries the one today, so both writers write what the list says.

**Why a list and not a second flag.** The family grows by members, and a flag for each member would leave the list that cannot exist to be refused somewhere anyway.

## Consequences

**The spelling is the build's.** How the list is written on Caster's input, on the CLI's `--set` and in the display list is not ruled here, only that the old values keep their meaning.

**As built, 2026-11-18.** On Caster's input and on the CLI's `caster.standard` the list is written `'ua-2'`, `'a-4'`, `'ua-2,a-4'` or `'none'`; Caster's input also takes the list itself, `['ua-2', 'a-4']` in any order, and `[]` for `'none'`. In the display list the archival claim is `info.archival: 'pdfa4'` beside `info.conformance`, and the list keeps its version, 7. The refusal of a list that mixes PDF 1.7 and PDF 2.0 members is not written: no 1.7 member exists yet to refuse.

**A new member is a new ruling**, with its own measurement, as the earlier record said of a new value.

**What it touches on the tablet.** A claim the author asked for is a claim the printer keeps or answers for by name; the list makes each of them one the author asked for.

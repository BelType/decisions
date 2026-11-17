# The warm writer may keep the blobs it has checked

**Status: Decided 2026-11-16, Executed 2026-11-17.** Egildo's ruling of the day: "We can flag an option to keep fonts". Amends [*a print server keeps the writer warm*](a-print-server-keeps-the-writer-warm.md), whose third ruling said a long-lived worker keeps "never a document's data". Built in forme ([`10b3cf8`](https://codeberg.org/BelType/forme/src/commit/10b3cf80fc63bc22b43b089ec5b7369ace52b75c/CHANGELOG.md)), in Caster ([`289c218`](https://codeberg.org/BelType/caster/src/commit/289c2183a70902b56c66afd2eeb58e60f7f9f72f/CHANGELOG.md), proposition S104 of its `DESIGN.md`, amended) and in the CLI as `beltype serve --keep-fonts`; released 2026-11-17 in `@beltype/caster` 0.2.8 and `@beltype/cli` 0.1.12.

## Context

The testbench's round on the cost of a print (*The cheaper print* in its plan) surveyed where Caster's milliseconds go. Measured 2026-11-16 on the paper specimen, three font programs of 2.7 MB together: a third of forme's write, about 9.6 ms of 28, is its SHA-256 of every blob it is handed, the check behind *a blob is named by its bytes*; the same bytes are copied to the worker on every write; and the module's 940 kB crossed with every message though the worker read it only on the first. The fonts of a mail merge are the same for every customer, so the same bytes were copied and hashed again for each.

The rule that stood in the way was this record's parent: the worker kept its compiled code and its memory's size, and each write made its own `Writer` and freed it. That rule was written to keep one document's data out of the next one's write.

Two options were laid before him: keep the fonts in the worker, checked once on arrival; or leave the rule and gain only by building the hash for speed. He chose the first, as an option a host asks for.

## Decision

**A host may ask the shared writer worker to keep the blobs it has checked, and with the option off nothing changes.**

- **The option** is `PrintInput.formeKeepsBlobs` in Caster, default off, beside the port to the worker, and `--keep-fonts` on `beltype serve`, off unless given.
- **What is kept.** One forme `Writer` for the life of the worker's instance, holding the blobs it has been handed, by the SHA-256 that names each: font programs above all, pictures by the same rule. Up to 32 MiB, the least recently written forgotten first.
- **The page never assumes what the worker holds.** It sends the list and the keys the list names; the worker answers with what it lacks, the module among it after a restart; the page sends exactly that. A write takes three messages at most.
- **The check is kept, and paid once.** forme hashes a blob on the first write that uses it after it arrived and refuses a mismatch there, in the sentence it always used. A blob that crosses again is hashed again. A blob in a refused write that had not been checked before is dropped.
- **What the worker still never keeps**: the list, the file, the records, and any blob it has not checked.

**Why this keeps one customer's data out of another's file.** A kept blob is reached only by the hash of its own bytes, which the page computes from the bytes it holds for this document. A list can name only what its own page hashed, so a document cannot be handed a blob it did not itself contain, and two documents that name the same key hold the same bytes.

## Consequences

**Measured 2026-11-16 and 17**, through `beltype serve` on one kept page, the paper and a bill in turn, on a machine that was not quiet: with the option on, the paper's write step went from 29 ms to 18 and the bill's from 12 to 9, on the module built for speed ([*the Rust writer is built for speed*](the-rust-writer-is-built-for-speed.md)). 48 files, the released packages against the new ones with the option off and with it on, are byte for byte the same.

**Measured again 2026-11-17, on a quiet machine**, by the testbench's probe of the server (three rounds, the unreleased packages mounted, the option off and then on). The option is worth 4 % more papers a minute and about 2 % more bills: the paper from 230 to 239 a minute with one client and from 565 to 589 with four workers and four clients; a bill by data from 194 to 198 and from 631 to 643. CPU a document: the paper 0.360 s to 0.347, a bill by data 0.369 to 0.363. The step-by-step gain above is real and small against a whole print.

**One behaviour differs with the option on.** If the page's bytes under a key were changed after the page hashed them, the page does not send them, since the worker already holds that key, and the print succeeds with the bytes the key names. With the option off the changed bytes cross and are refused. The key is the page's own hash of the array it holds, and nothing in Caster writes to a font program after it is read, so no print is known to meet this.

**Not exercised**: a worker that crashes in the middle of a write under the option, and several pages writing through one worker at once. The protocol covers both by asking again; no test holds either.

**What it touches on the tablet.** Nothing new: the writer is still a function of the list, and a refusal by name still stands where the bytes are not what they are called.

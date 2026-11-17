# The Rust writer is built for speed

**Status: Decided 2026-11-16, Executed 2026-11-17.** Egildo's ruling of the day, on three options laid before him. Amends the size ceiling of [*the same list prints the same bytes*](the-same-list-prints-the-same-bytes.md) (its amendment of 2026-11-03, *trim both, keep the ceiling*). Built in forme ([`10b3cf8`](https://codeberg.org/BelType/forme/src/commit/10b3cf80fc63bc22b43b089ec5b7369ace52b75c/CHANGELOG.md)) and vendored in Caster ([`289c218`](https://codeberg.org/BelType/caster/src/commit/289c2183a70902b56c66afd2eeb58e60f7f9f72f/CHANGELOG.md), proposition S102 of its `DESIGN.md`, amended); released 2026-11-17 in `@beltype/caster` 0.2.8.

## Context

forme, the Rust writer, was held to a ceiling: the module and its glue could weigh no more than the bytes forme let Caster delete, 1 061 704. It was therefore built for size, `opt-level = "z"` and `wasm-opt -Oz`, and weighed 952 151 bytes.

The testbench's round on the cost of a print asked why forme was no faster than the TypeScript writer it replaces. Measured 2026-11-16 on one dumped list, in node: built at `opt-level = 3` with `wasm-opt -O3`, forme writes the same file, byte for byte, 19 % faster on the paper specimen and 25 % faster on a bill of 61 rows, about 5 ms a document, and its module is 62 % larger.

Three options were laid out.

- **Leave it**: size wins, the ceiling stands.
- **Speed everywhere, the budget raised.**
- **Speed for the hot libraries alone**, the hash, the compression and the font subsetter, and size for the rest. Its size was not measured.

## Decision

**forme is built for speed, whole, and its budget is raised to 1 600 000 bytes.** The second option.

- The `wasm` profile is `opt-level = 3`, and the build ends in `wasm-opt -O3`.
- The module and its glue are held to 1 600 000 bytes, stated in forme's README and checked by `BUDGET` in Caster's `scripts/bundle-forme.js`. They weigh 1 562 793.

**Why.** A print server loads the module once and keeps it warm, so the write is paid on every print and the size once. A tab that downloads the module pays about 0.6 MB more, once a cache.

## Consequences

**Measured 2026-11-16**, on a machine that was not quiet. The write alone, in node, median of 40: the paper from 26.8 ms to 22.0, a bill of 61 rows from 20.3 to 15.5. Through `beltype serve`, the write step with its hand-off: the paper from 33 or 34 ms to 28, a bill from 14 to 12. Every list of Caster's corpus, nineteen, writes the size build's file byte for byte.

**Measured again 2026-11-17, on a quiet machine**, by the testbench's probe of the server, with everything Caster 0.2.8 carries and not this build alone: the paper from 199 to 230 a minute with one client, against the record of 2026-11-16 on Caster 0.2.7, and its CPU a document from 0.40 s to 0.36. A bill, by folder or by data, did not move outside the noise.

**The ceiling no longer buys anything back.** The old ceiling was an exchange: forme could cost what it let Caster delete. The new one is a number with headroom, and the next thing forme is asked to carry is weighed against the print's time, not against a deletion.

**What it leaves open.** Whether a tab that prints once, the studio or an editor, should be handed a size build while a server is handed this one. Nobody has asked.

# A writer in a worker holds no frame

**Status: Decided 2026-11-03, Executed 2026-11-03.** Executed in Caster on the branch `round/rust-writer`, two commits; Caster's record of it is the amendment to S93 in [`DESIGN.md`](https://codeberg.org/BelType/caster/src/commit/b5faed5224b347a611445b747f27ba069866e33e/DESIGN.md), which carries the measured numbers. Decided by Egildo on the Rust writer's main thread, the sixth of his rulings of 2026-11-03 on that round, after its stage 9 measured forme holding the page. Amends Caster's *the writer pauses after 50 ms of work* (S93) and applies *the capability registry never falls back* (S6) to the worker. Builds on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md).

## Context

Caster's TypeScript writer, the oracle, yields the tab after every 50 ms of work, the browser's own threshold for a long task (*the writer pauses after 50 ms of work*, S93), because the editing tools' print panel runs Caster in the tab the author is working in and a write that never paused would freeze it. forme, the Rust writer that is to replace it, is a WebAssembly module, and a wasm call cannot pause. Its stage 9 measured the write in Chromium 153 on the main thread: 30.7 ms on the paper, under the line, and 764 ms in one call on a list of 300 pages, where the oracle never held the thread more than about 400 ms. An earlier ruling of 2026-11-02 allowed a dedicated worker for a write over 50 ms on a paper-sized list, since forme reads only the list and *the printer runs in the realm it prints* (S20) binds the walk and the measurement, not the writer. The paper came in under the line, so stage 9 built no worker and asked. The options it put were a worker for every write, a worker only past a list size, the main thread with S93 not holding for forme, and a build tuned for speed over size.

## Decision

**forme writes in a dedicated worker for every write in a page.** The `forme` capability writes in a worker built from the vendored module; the page awaits a promise and holds no frame. There is no size threshold, so there is one road in a page and no number to tune. S93 is amended: its rule binds a writer on the frame's thread, and a writer in a worker holds no frame, so it needs no pause.

**A page whose policy forbids the worker is refused by name**, never written on the main thread: the main thread is the fallback *the capability registry never falls back* (S6) refuses, since a print that quietly moved back would pass every byte check and freeze the tab it was moved out of.

**In node, where no frame exists, the write stays a direct call.**

The ruling is written here first, and Caster's DESIGN.md records it as an amendment to S93.

## Consequences

- The page compiles the module once and hands it to the worker, which instantiates it; the list's JSON and its blobs cross into the worker and the file comes back. What crosses by copy and what by transfer, and the measured cost of the handoff, are Caster's record of the amendment.
- A refusal of forme's reaches the page as the same refusal, with the same sentence and the same list item, so `print()` still names the block.
- A host that prints with forme must serve the worker's script and the glue beside Caster's modules and allow a module worker from its own origin (`worker-src`), and allow WebAssembly (`'wasm-unsafe-eval'`); a page that forbids either is refused by name, naming the `forme` capability and the `writer` flag.
- The oracle keeps its 50 ms pauses until its retirement; the amendment changes nothing it writes.

Measured at the execution, in Chromium 153: the paper writes in 39.5 ms end to end through the worker, where it took 30 ms on the main thread, and the main thread is held at most 3.6 ms; the 300-page list writes in 828 ms and holds the main thread at most 34 ms, where it held it 764 ms; the handoff alone is 10.6 ms. The worker's file is node's byte for byte on all 14 documents of Caster's corpus.

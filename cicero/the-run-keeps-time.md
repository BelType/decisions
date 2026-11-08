# The run keeps time

**Status: Decided 2026-09-25, Executed 2026-09-25.** Amended 2026-11-08 under Consequences: the long-lived host clears what it has read.

## Context

Cicero paginates a 133-page software manual (the Borsa di Giunta Digitale's *bgd-assessorati*) about ten times slower than Paged.js paginates the same document, and the only performance figure on record was the synthetic book benchmark's 218 ms/page, taken 2026-07-28 with three stopwatches around whole phases (checklist, *Book-scale benchmark*). That figure named a cause — the trivial Cast-off — and could not say whether a real document's time went there. The round *where the time goes* was convened to measure a real document phase by phase, optimize nothing, and leave the instrument in place so the next performance question starts from a table rather than a stopwatch.

## Decision

**The run keeps time in the platform's User Timing API, and in nothing else.** At every phase boundary the engine calls `performance.measure(name, { start, end, detail })` against one running timestamp — a one-liner that needs no import, no flag, no logger and no dependency, costs microseconds, prints nothing, and is inert until somebody reads the entries. `performance` is a global in every realm Cicero runs in, browser and Node 22 alike, so `src/` stays dependency-free and the DOM-free suites are untouched. Chromium's Performance panel draws every measure on its timeline, so `beltype <doc> --engine cicero` plus DevTools is already a profiler.

**Where the marks are.** Every name begins `cicero:`.

- `seam/client.js`'s `run()`, around what the host-level run does: `cicero:rewrite`, `cicero:paginate`, `cicero:compose-presentation` (composed mode only — skipped rather than recorded as zero) and `cicero:present`, which ends after a forced layout (`void root.offsetHeight`) so the presentation's own layout is inside it.
- `src/driver.js`'s `paginate()`, once per run: `cicero:fonts`, `cicero:images` (`{ images }`), `cicero:index` (`{ blocks, words }`), `cicero:document-ops`. Once per page, each carrying `{ page }`: `cicero:conditions` (`{ recreated }` — whether the measure context was rebuilt), `cicero:grab` (`{ from, found }` — the block the walk started at and whether it found forcing), `cicero:compose` (`{ blocks }`, only when the cache key missed), `cicero:feed` (`{ blocks, carried }`, the feed after the grab's truncation), `cicero:layout` (`{ blocks }`), `cicero:clone-images` (`{ waited }`), `cicero:report` (`{ boxes }`), `cicero:adjudicate` (`{ cls, kind }`). The `detail` is the denominator: a duration without its count cannot tell *the feed is big* from *each item is slow*.
- `root.js`'s `present()` carries none: it is one loop over pages, and the seam's `cicero:present` covers it.

The one change of shape the marks needed: `measure.js`'s `awaitCloneImages` returns whether it waited, the boolean it already computed.

**How a host reads them.** `performance.getEntriesByType('measure')` in the realm the engine ran in — the document under `beltype --engine cicero`, the preview frame under `beltype edit`. `packages/essay`'s `seeds/benchmark.js --url` is the reader this round built: it prints the totals by phase, the per-page curve and the slowest pages, and counts style and rect reads harness-side without touching the engine.

**A measure never changes what the engine decides.** Nothing in `src/` or `seam/` reads an entry back, and none of the values a `detail` carries is computed for it alone; a mark that ever needed a computation the run would not otherwise do is a mark to refuse.

**Refused.** A logger or `console.log` of timings from `src/`: it prints on every run, and output nobody asked for is noise the operator learns to ignore. A profiling flag or environment variable: an `if (profiling)` is a second code path through the engine, and the platform already has the switch — nobody reads the entries, nothing happens. A `clock.js` wrapper: a helper that exists to call one platform function is indirection with no second caller.

## Consequences

The pin goes red because `src/` bytes moved, and the battery is not run for it: a `performance.measure` call cannot reach a page, and `awaitCloneImages`'s return value is read only by the measure. The first readings — the synthetic book, BelType's own manual, and the BGD manual on the CLI and in the editing tools' pane under both modes, with the Paged.js number beside them — are in the checklist's *Book-scale benchmark* record and in `packages/essay/RESULTS.md`'s observations; the round's changelog entry carries the recommendation for the next round. The Cast-off's bound is still a tablet question and gets its own design round.

**Added 2026-11-08: the long-lived host clears what it has read** (Egildo's ruling the same day). The browser keeps every User Timing entry for the page's life, and a run writes about a dozen measures per page per fill. The CLI's run ends; an editor's does not, so a long session in an editor accumulates entries without limit. A host that runs the engine more than once in one page therefore owns the entries it caused: once it has read what it wants, after each settle, it clears the `cicero:` measures, by `performance.clearMeasures(name)` per name or by prefix over `getEntriesByType('measure')`, and the `cicero:` marks the same way (the presenter leaves one, `cicero:idle-built`). The engine is unchanged: it writes and never clears, so a profiler reading the buffer after a single run still sees everything, and the Performance panel, which records its own trace, is untouched by any clearing. `prosemirror-beltype` is the first such host.

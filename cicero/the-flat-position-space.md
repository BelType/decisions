# The flat position space

**Status: Decided 2026-08-19, Executed 2026-08-20.** Engine `0f2e7ba`, venue `00df5b1`; 25/25 gates, every standing record reproduced byte-for-byte.

## Context

A cut's position was a lexicographic `[blockIndex, wordIndex]` tuple; the joined-word space was rebuilt by tree-walk once per consumer per page; ancestor chains were recovered and stored write-only in ledger entries. Meanwhile the venue had addressed cuts as flat cumulative indices since 2026-07-30 and flattened the engine's tuples at its own seam. Egildo's provocation: adopt a ProseMirror-like flat position system.

## Decision

**A position is one integer — the global word index, `gi = bases[b] + w`**, over the one word space (maximal non-whitespace runs of joined text, identical to the Gauge's and the venue's declared counts). Built once per paginate (`src/positions.js`); ordering numeric; a page is the interval between consecutive entry positions. **Word-granular, not ProseMirror character tokens** — refused on evidence: hint materialization pollutes character counts, and the honesty seam speaks declared word counts. The `(gi, char)` sub-word slot is designed and reserved for hyphenated continuations, not built. Classified by Egildo: a technical trick the engine adopts, not an essay concept — its seat is [architecture.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md)'s Ledger section and the `positions.js` header.

**The amendment the battery forced** (case 04, a frozen prediction falsified): where the word space under-determines the tree — a word-empty block with geometry — the tree fact is **carried as a view literal** (`posBlock`, and `block` per carried flow), never derived by arithmetic; seam resolution survives only as a probe-side fallback documented as an approximation.

## Consequences

`Ledger.through`, stored ancestor chains, and the venue's tuple-flattening seam deleted; `wordOffsetBefore`'s linear scans replaced by index lookups; tablet law I2's headline reworded in-session (a resume point *resolves to* a path), substance untouched. The full story is the CHANGELOG's 2026-08-20 position-system entry.

# The host names the first page number and the total

**Status: Decided 2026-11-20.** Egildo's ruling of 2026-11-20, "One door, both", for a union of several documents numbered across the joined file (the project's record *a union joins display lists, never finished files*, in `project/`). Nothing is built.

## Context

A union may ask that pages be numbered across the joined file: the third page of the second piece, after a first piece of two pages, prints 5, and every piece prints the joined file's total. Each piece is cut by itself, so it needs two facts it cannot know: the number its first page carries, and the total.

Read on 2026-11-20 at Cicero 0.1.16:

- **The first number can be written today**: `@page :first { counter-set: page S }` numbers the pages S, S + 1, … (measured 2026-11-07, `document-state.ts`). Injected by a host, though, it meets the author's own `@page :first` counter rules and may lose to them or override them.
- **The total has no door.** It is the piece's own page count in three places: the page host's `pages` counter (`chase.ts`'s `setCounters`), the presentation's `total` (`root.ts`, `account.length`), and the page values the reads loop measures a flow site under (`reads.ts`, `pages ${account.length}`).
- **A total written late is safe.** A margin box is resolved and never flowed (*chrome is resolved, never flowed*), so a number in a running head moves no line of the body. A flow site that reads `counter(pages)` reads the reservation `0`, hidden, until the total is known; the reads loop then measures its block again with the true value and lays the document out again from the first page whose lines moved, three runs at most, never failing, the console naming what still moves. A page reference through `target-counter()` goes through the same loop.

Two shapes were laid before him: one door for both facts, or a door for the total alone and the first number left to an injected rule.

## Decision

1. **A host may tell a run the number its first page carries and the document's total.** Cicero uses the given first number where it counts from 1, and the given total wherever it uses its own page count today, the reads loop's check among them, so the loop converges on the total the host gave.
2. **Absent either, nothing changes.**
3. **A union cuts its pieces in order**: each piece's first number is one past the last page of the piece before. The total is known once the last piece is cut and is given to every piece, and a piece whose lines move under it is laid out again by the reads loop.

Refused: the first number as an injected `@page :first` rule. It would meet the author's own rules, and the two facts are the same kind of thing, a fact the host knows and the document does not.

## Consequences

- The change lands in the Cicero repository first and is proved in the essay.
- **Open, not ruled:** whether a piece that begins on an even page of the joined file has its first page on the left, by its place in the file, or on the right, as a document laid out by itself does.
- **Open:** what a run does with a given total smaller than its own last page number.
- The pieces of a union are cut one after another, never at once.

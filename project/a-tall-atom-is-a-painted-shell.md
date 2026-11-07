# A tall atom is a painted shell

**Status: Decided 2026-11-07.** Executing on prosemirror-beltype's `fix/tall-atom-shell`, with one fixture. Ruled by Egildo on the night of 2026-11-07, one ruling of ten in the assessment of that day.

## Context

In the editing view, prosemirror-beltype's Cicero page (`src/cicero-page.js`) takes an atom taller than the page area whole: a verdict that maps to no position, since a schema's atom has none inside it, is an uncuttable run at the page's start, so the page shows the node, warns on the console that it is taken whole and clipped, and records the account's kind as `whole`. The lower part of the atom shows on no page, and only the console line says so. The same package already slices a monolith taller than the page as a painted shell (`src/shells.js`, the engine's first-fragment work at a pixel cut), as Cicero itself does in print.

## Decision

**An atom taller than the page area is sliced as a painted shell, as a monolith is.** The page shows the atom's first piece cut at the page's foot, and the next page continues it, so every part of it appears on a page. The view and the print then agree on the atom, as they already agree on a monolith: parity between view and print is what the view is for.

**The `whole` kind stays only for a cut that maps to no position the shell path cannot take.** It remains the fallback the page never throws past (*the build cannot fail*), not the treatment of a tall atom.

## Consequences

One fixture, an atom taller than the page area, shows each of its pieces on consecutive pages, and the console line no longer fires for it.

# A block with no content hole is a face where it stands whole

**Status: Decided 2026-11-08.** Executing on prosemirror-fragview's `fix/block-faces`, then prosemirror-beltype's `fix/block-faces-page`. Ruled by Egildo in the session of 2026-11-08. Extends [*a fragmented view gives a leaf a node view*](a-fragmented-view-gives-a-leaf-a-node-view.md) and answers the deferral it left for a block.

## Context

The studio holds its tables as `prosemirror-spreads`' nodes and wants the spreadsheet on the page: a cell selected and edited in a native input, formulas recomputed, the arrows moving through the grid. Spreads' `TableView` is one view over the whole table, with no `contentDOM`: it builds the sections, rows and cells itself and owns their events. Fragview refuses it when the view is made, since the leaf record admits a node view for a leaf only, and the [Codeberg issue on block node views](https://codeberg.org/egildo/prosemirror-fragview/issues/5) asked for a block's, starting with a block that stays whole on one page. It also listed what lifting the refusal alone would not give: a stand-in for a non-leaf, positions inside a face, the outer decorations reaching `update`, and `getPos` while the constructor runs.

The alternative weighed was the studio's road since 8 November: spreads' plugin runs with `tableView: false`, the grid is drawn from `toDOM`, and a cell's buffer is a native input laid over the cell by the frame's offset, as a spreadsheet draws its cell editor over its grid. It works today and needs nothing from fragview, and closing the issue by it was possible. Egildo chose to solve the issue instead; the reason is his and not recorded here. What the road costs is on the record: a second editor in the host for every block that holds state, and spreads' grid chrome left undrawn.

The leaf record refused a block on the ground that a block divided across fragments would need one view per piece, and left a block that may not be cut to a ruling of its own, if its stand-in were an atomic box. The measurement of 2026-11-08 (BelType's `.claude/plans/block-node-views/measurement.md`) tested that shape under a real `CiceroPage` against the print. Measured 2026-11-08 in Chromium 153: a plain `display: block` wrapper around a `<table>` leaves the chain, the page count, every row's box and the column widths identical, for a short, a straddling and a tall table, with and without `break-inside: avoid`. With `avoid` a straddling table of 148 px moves whole to the next page and a tall one of 358 px still divides at a row edge, in the view and the print alike, and the print's breaks fall at the same rows in all six documents. An atomic stand-in is the wrong shape: a table drawn as one leaf moves whole where the print divides it, and a tall one is cut 260 px into its drawing through the middle of a row and sliced as a painted shell, with the node view constructed twice, one live element on each page. Pinning `block-size` on a table is unsafe: taller than natural it stretches the rows and moves the chain, shorter does nothing since a table's height is a minimum, and on a divided table every piece takes the pinned height, so the row before the cut stretches past the foot, shows on no page, and the page warns of 138 px or 58 px cut off.

## Decision

**The face follows the cut; the cut never follows the face.** The view decides where a face goes after the cut is made, and nothing about a face changes where the document is cut. The view and the print then cut the same document the same way, which is what the view is for.

**A block whose node view has no content hole is admitted, as a leaf is.** Its stand-in is the plain `display: block` wrapper around the whole `toDOM` drawing, cells and all, with every position inside it mapped as for any drawn node, so Cicero cuts the stand-in under the document's own CSS exactly as print cuts the table. A view that answers a `contentDOM` stays refused at the prop, since a content hole would be divided across fragments; the refusal's wording says so. A text node's view stays refused.

**A face is placed only where its node stands whole in one page.** After a fill, a wrapper gets the host's element only when it maps the node from its start to its end within that page. A block the cut divided keeps its `toDOM` drawing on every page that shows a piece, read-only, and the view warns once per node by type and position. The wrapper of a placed face carries `data-fragview-face="placed"` and a wrapper without one does not, so a host reads `view.nodeDOM(pos)` to know which it has, and CSS can dress a divided drawing.

**A node has at most one face, in the earliest built fragment that shows its start, leaves included.** A later piece keeps its drawing. This makes true for a tall leaf sliced as a painted shell (*a tall atom is a painted shell*) what the leaf record already said, that the host's element is shown once.

**A block's stand-in pins no size, and size agreement is the host's.** The face must draw at `toDOM`'s box. When it does not, the view warns once by name and keeps the face, with no refill and no pin, because a pin on a table that is later divided loses a row.

**Print is told nothing.** The author's `break-inside: avoid` on the table is what moves a fitting table whole, in the view and the print alike, and a table taller than the page area divides in both. Fragview adds no rule to make a faced block whole.

**One view per piece stays refused**, for the leaf record's reason: it would invent an `update(node, piece)` contract that nobody upstream has. A long table divides and is drawn, not faced.

## Consequences

Fragview admits the block in its registry, maps the wrapper as the node's entry, places a face by the whole-in-one-page test, answers `getPos()` inside the constructor with the position the placement knows, hands the constructor and `update` the node decorations whose range is the node's, as `prosemirror-view` does, treats a placed face as one unit for the selection, the arrows, `posAtCoords` and the selection paint, and calls the face's `setSelection` when the model selection lies inside it. Its README's section on node views, its view's header and its `docs/plan.md` say: a leaf, or a block whose view has no content hole, placed only where it stands whole. A view that answers a `contentDOM`, as `prosemirror-tables`' `columnResizing` does for `table`, is still refused.

prosemirror-beltype proves it under `CiceroPage`: a faced table that fits keeps its face across a refill and a move to the next page, with the same chain as no node view; a divided one has no face and the same cuts; a tall leaf has one face. Cicero writes `table-layout: fixed` and a width on the pieces of a divided bare table and nothing on a wrapped one, with no effect on any column measured; that step traces why, and a drift found goes to Cicero as a row of its own, not here.

Spreads keeps `tableView: false` as an option, and the studio turns the table view back on after the merges, on Egildo's word. The studio's buffer over the frame stays for a divided table, chosen by reading the wrapper's `placed` attribute, and the studio's sheet makes spreads' grid draw at `toDOM`'s box.

The view's continuation page repeats no table header where print does, a 21 px difference measured the same day, present with or without the wrapper. It is prosemirror-beltype's row, not this record's, and nothing here assumes a repeated header.

Foreclosed: a stand-in that pins a block's size, a face for a node across a cut, and a view that changes the cut to keep its face. Not foreclosed: a door for a divided block's state, if a host asks for one by name, and the overlay, which stays a host's pattern for what fragview refuses.

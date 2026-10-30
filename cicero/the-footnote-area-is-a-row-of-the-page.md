# The footnote area is a row of the page

**Status: Decided 2026-10-21.** Opened by Egildo on 2026-10-21, in the design round that decided [*the page carries its conditions*](the-page-carries-its-conditions.md), as the seat for footnotes in the page component. It decides where the footnote area is and how its generated content is delivered; it does not decide the solver, whose three questions are recorded below as owed to Egildo. It runs after that round closes, on the component it leaves behind.

## Context

Footnotes are designed in the tablet ("The Flows": competing flows, `float: footnote`) and built nowhere; the checklist lists them as designed and the research of 2026-10-09 (`.claude/NEEDED-FIXES.md`, three prior-art reports in `.claude/prior-art/reports/`: TeX, WeasyPrint, Vivliostyle) closed with a step not taken, a design note asking Egildo three things. That note also said where the area goes: "the area can be a real row of the page's grid".

The page component today is a 5×5 grid: sixteen margin cells, and a content area holding the flow's slot and the furniture slot for fixed boxes. A running element's clone is slotted into a margin cell. The question Egildo put was whether the grid should grow two slots, one for running elements and one for footnotes. The running half is answered by the text below: a running element goes into a margin box and nowhere else, so its slot is the cell it already has. The footnote half is this record.

## What the text says

- css-gcpm-3 §2.1, the footnote area: "A page area that can be used to display footnotes is described in the page context using an `@footnote` rule. This rule defines a box that, if used, will contain all the footnote elements that appear on that page."
- §2.1.1, positioning: "The bottom margin edge of the footnote area is positioned so that it touches the bottom of the page area. The footnote area can only contain footnotes."
- §2.1.2, size: "The `max-height` property on the footnote area limits the size of this area, unless the page contains only footnotes"; user agents "may set a default `max-height` value".
- §2.3, `::footnote-call`: "inserted in place of the footnote element when the latter is removed from the flow", default `content: counter(footnote)`, superscripted. §2.4, `::footnote-marker`: "behaves like a `::marker` pseudo-element", default `content: counter(footnote)` with `'. '` after it.
- §2.5.2: the footnote counter "should depend on the position of the footnote element in the document tree, not where it is eventually placed". §2.8: "A footnote body must never be placed on a page before the footnote reference."
- css-gcpm-3 §1.2.3: `element()` "places an element … in a page margin box". There is no running area of a page.

## Decision

**The footnote area is a row of the content area, below the flow, with its own slot; it is dressed from `@footnote` as a margin cell is dressed from its at-rule; and its generated content is counters the host carries.** Four rulings on the seat, and the solver left open.

1. **One row, inside the page area.** The content area splits into two rows: the flow, and the footnote area, whose bottom edge is the page area's bottom (§2.1.1). It is not a seventeenth margin cell: the margin cells stand outside the page area, and the footnote area shrinks it. Its height is what the solver gives this page, capped by `@footnote`'s `max-height`; `setFlow`'s `reservePx`, the room a page gives up below the cut, is the hook it takes, since a footnote row is that reserve made a box with content in it.
2. **The footnote bodies are slotted, one clone per page, as a running element's are.** A node is not a value, and the slot is the door for a node, the one row where a read and a slot meet (*a pointer is a read*). A body divided across pages is a continuation like any other block's.
3. **`@footnote` is dressed, not resolved.** Its declarations go into the page's shadow sheet onto the footnote area, through the dress that carries a margin cell's own declarations, so `@footnote { border-top: 1px solid; margin-top: 1em }` draws its rule. Chromium does not know the at-rule inside `@page`, so the rewrite must encode it as it encodes `:blank`; measured before building.
4. **The two pseudo-elements and the counter go through the host.** `::footnote-call` and `::footnote-marker` are unknown to Chromium's parser and are rewritten onto pseudo-elements it keeps, the call on the element left in the flow, the marker on the body; their default `content: counter(footnote)` is native. A footnote counter reset in the page context (`@page { counter-reset: footnote }`) is a page fact the host publishes beside `page`, which is what makes the call's number a layout read, how many notes this page holds before me (the pointer record's own example of a moment that belongs to the edge). A document-wide counter is a cascade fact the replay already answers.

**Refused.** A running slot beside the cells: §1.2.3 places a running element in a margin box, so the cell is its slot and a second one would be a holding area with no position on the page. A footnote cell in the margin grid: §2.1.1 puts the area inside the page area.

**Open, owed to Egildo before the solver is designed** (the research's three questions, unchanged; restated with the canon and a recommendation beside each in [*a competing flow bargains the foot of the main flow*](a-competing-flow-bargains-the-foot-of-the-main-flow.md), 2026-10-22, which also decides the object the area is, the fragmentainer with a bargained foot):

- Split a long note the TeX way, in the routine that cuts the page, with a carried remainder going first on the next page and a later note never overtaking an earlier one; or refuse to split and carry the whole note.
- Adopt `bigfoot`'s floor on main text as a price in the make-up order, so a page is never mostly notes, or let `max-height` alone be the lever as every other engine does.
- A call inside a table cell, a float or a column is a demand on the outer page, so "only height crosses the wall" does not hold for it; how the inner flow reports it.

## Consequences

- **Owed before design**: one probe measuring what Chromium's parser keeps of `@footnote` inside `@page`, `::footnote-call`, `::footnote-marker` and `float: footnote`, and whether a `max-height` on a grid row behaves as §2.1.2 wants when the row's content exceeds it.
- **Owed by the solver's round**: the design note answering the three questions; the Stonehand's price for a note; the Cast-off's reserve made real; cases red first, from the research's findings (a note at the page's last line, a long note split, a note called from a cell); the tablet's correction on the wall.
- **Where the content lives**: the seat in `chase.js` when built; the status in the checklist's footnotes row; the research in `.claude/NEEDED-FIXES.md` until this record supersedes it as the one place to look.

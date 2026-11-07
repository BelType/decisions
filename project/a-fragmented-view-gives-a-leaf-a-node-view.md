# A fragmented view gives a leaf a node view

**Status: Decided 2026-11-07.**

## Context

`prosemirror-fragview` shows a document across fragments, and every node is drawn from `toDOM`, so state held in an element (focus in an input, an iframe's document, a framework component's own state) is lost at each refill, and a refill can follow any edit before the node. On 2026-11-03, closing the Codeberg issue on node views, Egildo chose `toDOM`, plugin views and `redraw` first, with an overlay as the fallback, on the ground that one persistent element per node does not fit a view that draws a node several times. That choice stood in the issue alone, while fragview's plan still listed node views as a duty of the view, and the integration review of 2026-11-04 asked for a ruling.

An investigation of 2026-11-07 tested the ground. A fill draws a node at least three times, into a detached fragment first, and Cicero takes every node a page is given, so a live element cannot be what the trial measures: the earlier ground holds for the measuring copies. It does not hold for the copy the reader sees. In the pinned Chromium, `Node.moveBefore` keeps an iframe's document and a textarea's focus across a move between parents, where `appendChild` reloads the iframe and drops focus, and the same holds moving into a wrapper slotted in a real `<beltype-page>`. No editor was found that keeps one node view for a node divided across two real fragmentainers, so a block has no prior art to borrow. Of the hosts named, Tiptap's stateful components for atoms need a node view; tables need decorations and small shims on the view, and Yjs needs a `docView` shim and widget decorations.

## Decision

**A leaf node type may have a node view, and any other node type may not.** The host's element is shown once, in the shown copy of the page that holds the node, and is kept across refills and across a move to another page. Every measuring copy gets a stand-in drawn from `toDOM`, and the two must agree in size. `toDOM` stays what prints, so a leaf always has a static drawing.

Refused: a node view for a block, by name at the prop. A block divided across fragments would need one view per piece, a contract nobody upstream has and no host has asked for, and it invents a private language above the ecosystem's. The overlay stays a host's pattern for what is refused, and nothing is built for it. A block that may not be cut could follow later as a leaf is treated, if its stand-in is an atomic box; that needs a ruling of its own.

This supersedes the choice in the issue comment as far as leaves go. `toDOM`, plugin views and `redraw` stay the road for a node that holds no state.

## Consequences

The prop keeps `prosemirror-view`'s shape, so a Tiptap React or Vue renderer for an atom can run on it, and the engine still knows no view: neither Cicero nor `CiceroPage` learns the word, and a host that draws its face at another size than `toDOM` pays a refill, or a screen that disagrees with the print. A plugin that registers a node view for a block, as `prosemirror-tables`' `columnResizing` does for `table`, gets the refusal too.

A face is absent from its page while its page fills. Measured when it was built: with no image loading it is out for 5 ms and no frame paints, and when the page holds a picture that has not loaded it is gone for the wait, so the blink is seen when a picture first arrives on its page, not while typing. A door in the page's `setContent` would remove it; it waits for a customer.

The stand-in's wrapper is the plainest box of its level, `display: block` or `display: inline`, with the size pinned on the drawing inside it. Measured under a real `CiceroPage`, these two cut a document where no wrapper cuts it. An `inline-block` collapses a percentage, and Cicero's block walk skips a `display: contents` box and what it holds. The one difference left is a block leaf drawn as a bare inline-level element, so such a `toDOM` should draw a block-level box. A parked element must stay rendered: in a `visibility: hidden` holder a focused element loses focus at the next frame, for good.

The input layer's own fixes (`hasFocus()` narrowed to the editing host, an element keeping its events, the mutation observer leaving a leaf's drawing alone) hold under any ruling and come first. `docs/plan.md` in fragview changes to match this record the same day it lands. A browser without `moveBefore` falls back to today's loss of state; fragview's browser scope remains a ruling owed.

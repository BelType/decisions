# The editor is measured in Chromium

**Status: Decided 2026-11-07.** Executing on prosemirror-beltype's `wire/cicero-pin-and-scope` and prosemirror-fragview's `fix/scope-and-delete`, for the README paragraphs and the delete. Ruled by Egildo on the night of 2026-11-07, one ruling of ten in the assessment of that day. Answers the browser scope that [*a fragmented view gives a leaf a node view*](a-fragmented-view-gives-a-leaf-a-node-view.md) left owed.

## Context

The paged editor is two packages, `prosemirror-fragview` (the view) and `prosemirror-beltype` (BelType's fragmentainer for it). In Safari or Firefox the screen comes from that browser's layout and the PDF from Chromium's, and nothing measures the difference. Every test that drives a browser is Chromium's alone (fragview's `scripts/browser.mjs`), and no repository of the organization has a Firefox or WebKit project. The packages' numbers are Blink's: Caster refuses any realm that is not (`src/precheck.ts`, `isBlink`), Cicero's margin boxes fix widths in sixty-fourths of a pixel, the layout quantum Blink uses, and Cicero's facsimile relies on a customized built-in element. The essay's own scope says Firefox and Safari are not measured. fragview's README stated no browser scope, and on Android a composition over an existing word duplicates text and Backspace skips the keymaps (read, not run: no CDP command sets a composing region).

## Decision

**Desktop Chromium-family browsers are the measured target for the paged editor**, because there the screen and the PDF come from one layout engine, and what the view shows is what prints.

**Elsewhere the view loads, edits and declares itself not WYSIWYG**, and the printer refuses as it already does. Nobody is locked out of editing; nobody is told the pages they see are the pages that print.

**Android is unsupported for now.** The README tells a host to mount a plain `EditorView` there. When Android is taken up, key handling is synthesized from `beforeinput` on a keydown with `keyCode` 229, as `prosemirror-view` does.

**Two hardenings are done regardless of scope.** A delete whose target range is empty, which today deletes nothing silently, becomes one step in the model. The 229 synthesis waits for the Android round.

## Consequences

A paragraph in each package's README states the scope. [*The ink is read, not borrowed*](the-ink-is-read-not-borrowed.md) says Caster reads ink in any browser; that remains true of the reading, and the printer still runs only where it was measured. A Firefox or WebKit project in the browser tests is the precondition for widening this record.

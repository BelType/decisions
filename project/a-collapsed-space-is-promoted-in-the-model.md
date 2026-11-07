# A collapsed space is promoted in the model

**Status: Decided 2026-11-07, Executed 2026-10-25.** Confirms the decision of 2026-10-25 against the integration review's objection; `collapsedSpaces()` exists in prosemirror-beltype since then (`src/spaces.js`). Ruled by Egildo on the night of 2026-11-07, one ruling of ten in the assessment of that day.

## Context

The document is HTML, and HTML collapses whitespace: a space beside a space, and a space at a line's start or end, draw nothing, on the Cicero page as in BelType's CLI round. Measured on 2026-10-25 in the studio with real keystrokes, `A  B` held two spaces in the model and drew one. The round *a space beside a space* decided that a space that would collapse is promoted to U+00A0 after every transaction, so model, CLI round and page agree on a visible character, and built `collapsedSpaces()` (prosemirror-beltype's `docs/found.md`, *A typed double space collapses on the page*). One undo takes a typed space and its promotion.

The integration review objected that the plugin writes non-breaking spaces into saved documents in place of typed spaces. The worse fault it found, words glued together when a run of U+00A0 stood at a line's edge and was never demoted, is fixed: a run now alternates from a space after ink, as the same text inserted at once gives. Whether the plugin should write into the document at all was left to Egildo.

## Decision

**A space that would collapse is promoted to U+00A0 in the model, as ruled in October.** It is the platform's own behaviour: Chromium's contenteditable writes alternating U+00A0 on its own under `white-space: normal` for the same reason, and CKEditor 5 and TinyMCE do the same where the host collapses whitespace. Doing it in the model puts it where undo, collaboration and the saved document see it, and makes it the same in every browser.

**Refused: substitution at render time**, leaving the model's spaces alone and drawing them visible on the page. The page would show two spaces and the print, which renders the model's HTML, one: the editing view and the PDF would disagree on what the reader typed.

**A host that wants a clean model leaves the plugin out.** The plugin is opt-in, installed in the editor's state, and the page then draws what HTML draws.

## Consequences

The row closes as confirmed. prosemirror-beltype's README states the trade in a sentence, so a host can choose; that sentence is the only work owed.

# Paged.js returns in its own window

**Superseded in part, 2026-09-22:** its *Linked, not dressed* and its *Refused: Paged.js in the pane* are replaced by [the seat is not the engine](the-seat-is-not-the-engine.md) — the engine is dressed through its own Polisher now and paginates in whichever seat is chosen; the rest of this record stands.

**Status: Decided 2026-09-18, Executed 2026-09-18.** Supersedes the *one engine* clause of [the generation stays in the tab](the-generation-stays-in-the-tab.md) (its "One engine, and its pane is dressed"); the rest of that record stands. Recorded in [`packages/editing-tools/DESIGN.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/editing-tools/DESIGN.md) as proposition 47 and in [`packages/caster/DESIGN.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/caster/DESIGN.md) as S59. Its *linked, not dressed* and *refused in the pane* clauses were superseded by [the seat is not the engine](the-seat-is-not-the-engine.md).

## Context

The Cicero cut left the editing tools one engine and said the others "would return through the same seam, one per round, each answering the dressing question for itself". Caster then learned to print Paged.js's pages (its S49–S55) with no BelType host to print them from — its acceptance stood one up by hand, and [beltype#35](https://github.com/egildo/beltype/issues/35) parked the CLI's door. Egildo's proposal (2026-09-18): a separate window with a Paged.js preview, which the printer reaches, so the dependency pays its rent twice; follow and inspect rest while it shows.

Measured before building, in the live tool: `requestAnimationFrame` runs at full rate in a `visibility: hidden` same-origin frame, so the engine's queue does not stall where the print frame sits; and a tab compile with a Paged.js engine whose bootstrap only posts `beltype:ready`, then `prepare()`, `PagedPolyfill.preview()` and `print()` in a hidden frame, printed the Caster specimen at nine pages, the count Caster's own record holds.

## Decision

**One engine at a time, and it decides everything downstream of a compile.** The engine bar offers `cicero` and `pagedjs ↗`; the active one is what the tab composes, where it publishes, what is shown and what the print panel prints. A render compiles once, with that engine. Nothing is persisted: the tool starts on its pane.

**Paged.js lives in a window, not the pane.** The pane is Cicero's and keeps its instruments, which read the pane; the window is opened inside the operator's click (a window opened after the compile's `await` would carry no gesture, and a blocker would be right to refuse it) and navigated to `/_beltype/edit/pagedjs` once the document is published there. Closing the window is switching back — there is no mode in which nothing previews. Follow, inspect and Cicero's composed switch are disabled while it shows, and say why.

**Paged.js's answer to the dressing question is to stay linked.** It reads `<link>` and `<style>` source text through its own Polisher and never an adopted sheet — the fact proposition 35 already recorded — so its document is published as the belt made it, links and all, and the Service Worker answers each link with its draft when one exists. No Dresser, no `reapplyDrafts`, no rewriter: the engine parses source text itself, `string-set` and `running()` included.

**The host drives it, as it drives Cicero.** The composed bootstrap posts `beltype:ready` to `opener || parent` instead of calling `preview()`, one statement for the pane, the window and the print frame. That answers #35's `PagedConfig.before` question for this host without a hook: the host calls `prepare()` and then `preview()` itself, under a 45 s guard that now rejects rather than degrading, because a host about to print or report a count has no use for a document still changing.

~~**The window is prepared, so its pages are the printed pages.**~~ **Withdrawn 2026-10-16** (`packages/editing-tools/DESIGN.md` 62, [beltype#45](https://github.com/egildo/beltype/issues/45)): no author preview is prepared, in either seat under either engine; only the print frame is, and the check that the pages agree is `packages/caster/test/preview-unprepared.test.js`. It read: Caster's preparation changes layout — a real marker is a real box — so the window runs it before paginating wherever Caster is installed, and the print frame loads the same document and runs the same two steps. Printing still happens in a fresh hidden frame, never in the window: `print()` restyles the page chrome it reads and strips the `footnote` class from every call, and the window must not change under the author. Caster's Paged.js acceptance now asserts the file has exactly the window's page count.

**The window's look is its own sheet, applied after pagination.** Spreads — the interface sheet's own facing-pages layout, which its "recto/verso book" block had turned back into one column — on a neutral ground, with the violet page-box outline gone, and the strip zoomed to the window's width. Linked after `preview()` resolves, so it is a look and never a layout the engine cut against; the print frame never gets it.

**Refused: printing from the window.** One pagination saved per print, at the price of the window visibly changing and then reloading under the author.

**Refused: Paged.js in the pane.** The pane's inspector answers file and line through the Dresser's constructed sheets, and Paged.js rewrites every sheet into inserted `<style>` elements with no provenance; a pane that switched engines would carry an instrument that silently stops working.

## Consequences

`@egildo/beltype-engine-pagedjs` is a declared dependency of the editing tools again, required rather than optional (it is published); the server lists its `vendor-assets.js` half — never its node face, which imports a Chromium launcher — and `session.engines` is `['cicero', 'pagedjs']`. The server still refuses to start without Cicero, whose pane the tool is. `packages/caster/test/acceptance-pagedjs.test.js` runs through the editing tools now, and its static server, CORS headers and `PagedPolyfill` setter are deleted. `site` is still outside the package. #35 — the CLI's door — stays open; this host's answer to its `before` question is the one it can reuse.

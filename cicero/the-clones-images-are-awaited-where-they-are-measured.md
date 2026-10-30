# The clones' images are awaited where they are measured

**Status: Decided 2026-09-21, Executed 2026-09-21.** Found the same day as [*an unplaced original is parked, not unassigned*](an-unplaced-original-is-parked-not-unassigned.md), by Caster's own acceptance suite under Chromium 153 — the battery could not see it.

## Context

[*Images are awaited at intake*](images-are-awaited-at-intake.md) settles every `<img>` of the DOCUMENT before the first measure, as a stand-in for the unbuilt late-arriving-truth rim. But the engine does not measure the document's images: it measures CLONES of them, mounted in the measure container page by page (`driver.js`'s `buildFeed`, C5 — the source is never moved). That rested on a premise nobody had written down: HTML's *list of available images*, by which a second `<img>` for an already-fetched URL is `complete` in the turn it is inserted.

**Chromium 153 does not honour it in a document a Service Worker controls.** Measured in the editing tools' pane under both builds, cloning each of the specimen's five loaded images into a hidden box: 150 answers `complete: true` and the real height at once; 153 answers `complete: false`, height 0, and the real height 300 ms later. So under 153 every figure measured nothing. Page two's account read 883 px used and a cut at `[0,3,7,7]` where it had read 885.36 and `[0,3,7,2]`; the presentation, whose images do load, then clipped what the account believed it had placed, and the Caster specimen's Figure 2 and the drawing after it were on no page at all. The CLI's dev server has no worker, paginated identically under both builds, and is what the battery drives — which is why twenty-four gates said nothing. Ruled out on the way, by measurement: the viewport, a font race (`document.fonts.status` IS `loading` when the pane calls `run()`, under both builds, and `awaitFonts` covers it), and an empty computed style.

## Decision

**The premise is checked instead of assumed.** `measure.js`'s `awaitCloneImages(container)` runs after every mount in `paginate`: if any image in the container has not settled it is awaited — through `awaitImages`, which now accepts an element as well as a document — and the container is laid out again before the report is taken. Where a clone IS available synchronously it costs one `querySelectorAll`. It is the same stand-in one step further in, under the same sentence: *a measurement the engine has no way to correct must not be taken early.*

## Consequences

- The pane and the CLI paginate the Caster specimen identically under 153, page for page to the hundredth of a pixel; both of Caster's Cicero acceptances are green.
- `paginate`'s page loop now holds an `await`. It was already inside an `async` function and awaited twice before its first page; the forward build is unchanged.
- **Not covered: `compose-dom.js`'s two `ctx.measure` sites**, which are synchronous and measure text. An inline image inside a composed paragraph, in a worker-controlled document, under 153, would be set against a line measured without it. No document has shown it; it is stated here rather than discovered later.
- **The PRESENTED clones load on their own clock too.** A host that reads geometry the moment `run()` resolves reads it before a fragment's images have sized. Caster's acceptances pass, so the editing tools' order is sufficient today; the rim is what makes it true by construction.

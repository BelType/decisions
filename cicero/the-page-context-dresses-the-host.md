# The page context dresses the host

**Status: Decided 2026-09-04, Executed 2026-09-04.**

## Context

`@page { background-color: … }` did nothing under `--engine cicero`. The finding is [`.claude/NEEDED-FIXES.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/NEEDED-FIXES.md) §2.3 and the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s design opens, cased red by [`cases/20-the-tinted-page`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/20-the-tinted-page/README.md).

The round that authored the case also swept the question the fault sits inside. css-page-3 §6 and Appendix A were read raw: Appendix A is the normative list of CSS 2.1 properties that apply in the page context — about fifty of them, the backgrounds, the borders, `color`, the fonts, `line-height`, the outlines, `quotes`, seven text properties and more — and §6 makes support **obligatory** for a user agent that supports any of them on a block box. Cicero forwarded two, the margins, plus the `size` descriptor css-page-3 adds. Chromium's own print was then measured through pdf.js's operator list, since paint is an operator and the venue's usual reader is a text layer; that table is the checklist's part four.

**A first attempt at the fix read `background-color` and wrote it as an inline literal on the page host.** It was reviewed before it merged and replaced by this entry, because reading one property name is the shape that produces the next report a month later, under a different property, from the same author. Nothing about it landed; this record is the decision that did.

## Decision

**The page context dresses the host, minus what Cicero owns.** The resolved `@page` rule for a page condition is transliterated into ONE constructed `CSSStyleSheet` per distinct page kind, adopted into that page's shadow root:

```
:host                                  every declaration that does NOT reach a child
.margin-cell                           every declaration that does — §6's inheritance into the margin boxes
.margin-cell[data-box="<name>"]        that box's own declarations
```

Declaration order and `!important` are carried as authored, and the rules of a condition's applicable `@page` variants are appended in ascending specificity, so the cascade inside the emitted rule is the author's own and this engine decides none of it. **Cicero learns no property names.** A gradient, a `box-shadow`, a property that does not exist yet — what the engine does not understand rides through, because nothing anywhere asks what a declaration is.

**The firewall is a selector that cannot match.** The flow cell is `.content-area` / `.flow`, and none of the three selectors reaches it. §6 gives the margin boxes the page context to inherit from and gives the document's own content the root element instead, so an inherited page-context declaration must not descend into the flow — and putting `color` on `:host` would have sent it into every paragraph through the flattened tree. A selector the content does not match is a stronger guarantee than a value nobody copied.

**What Cicero owns is a criterion, not a list of properties it supports, and it must stay one.** A declaration inside `@page` is the author's unless it is one of three things: **a property the Chase itself writes** on the page host (its grid, its box model, its print mechanics), **a geometry input the capture already models** (`size` and the margins), or **something measured and not yet modelled**. Nothing else disqualifies a declaration. Rebuild this as a whitelist of understood properties and the rule is gone, and the fault it closes comes back one property at a time.

**`border` and `padding` are the third kind, and they are queued on evidence rather than on caution.** Measured against Chromium's print: both are honoured and **both take room from the page area** — a 5 px border moves the first printed item 5 px, a 30 px padding moves it 30. They are geometry the measure does not know about, so painting them would draw a frame the arithmetic cannot see. A document declaring either lays out today against a measure wrong by it; that is filed, not fixed.

**Inheritance is measured, not tabled.** A declaration goes to the cells if putting it on a parent changes a child's computed value, asked of the browser through a two-child probe and memoized per `(property, value, priority)`. A hard-coded list of inherited properties would be a second CSS database inside this engine, which is the mistake [*page lengths are measured*](page-lengths-are-measured.md) removed when it deleted the unit table. Comparing two children rather than child against parent is what stops a non-inherited property sitting at its initial value from reading as inherited, and it makes the question the one that matters — *does this declaration reach a child* — which answers correctly for `inherit`, `unset` and custom properties without knowing what any of them are.

**Margin-box styling rides the same door**, which was not the point and is the round's dividend: `.margin-cell[data-box="…"]` is (0,2,0) against `.margin-cell`'s (0,1,0), so a box's own `color` beats the page context's on specificity alone, and the standing `margin-box-type` want — *"a folio set in its own face and size: margin-box font descriptors applied, not merely captured"* — is answered by the mechanism that answers the ground. Said plainly rather than left to be discovered.

**Refused: forwarding by inline style on the host.** It cannot express the split at all — an inline declaration is on the host, and the host is what the content inherits through.

**Refused: neutralizing the author's own `@page` background.** `neutralizeMarginBoxes` exists because a renamed page leaves the author's bare rule painting chrome the shadow DOM already delivers. A ground has not got that shape: the host covers the page box, so the author's own rule paints underneath the host's own ink. Adding a second neutralization would be code answering a leak nobody has measured.

**Two properties of the mechanism, both load-bearing and neither arranged.** CSSOM seats an adopted sheet after the shadow root's own `<style>`, so the `#fff` default stands and the author's ground wins a tie with nothing ordered by hand. And `replaceSync` **drops** what it cannot parse rather than throwing, so *the build cannot fail* is structural here rather than careful.

## Predictions

Frozen on write.

1. **No standing number moves, and this is asserted by judgement rather than by the battery** ([cycle.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/cycle.md)'s "skip it, and say so"). `seeds/generate.js` writes `size` and margins into its `@page` rules and nothing else, so every seed's page style is empty, `pageStyleText` returns `''`, and no seed page adopts a sheet at all; and the differential compares cut positions and words, never paint. *Breaks* if any seed page adopts a sheet, which would mean the corpus declares something nobody named.
2. **`cases` is the only gate that moves**, from four failed checks to none. *Breaks* if any other case's checks change, since nothing here touches a cut.

## Verdict

**Prediction 2 held, and both directions were measured.** Against the engine as it stood before this decision, driven by `ENGINE_DIR` at the branch's own merge-base, case 20 fails four checks — every host `rgb(255, 255, 255)`, the gradient absent, the folio cell and the running head both `rgb(0, 0, 0)`. Against this decision it holds: four pages, three grounds and a gradient in their declared positions, folio `rgb(178, 34, 34)`, running head `rgb(26, 82, 118)`, flowed content `rgb(0, 0, 0)`, page for page and word for word with Chromium's own print, in the native and the composed mode alike.

**Prediction 1 stands on the judgement, and a complete battery from earlier the same day corroborates the reasoning one shape back** — 25 gates, exit 0, every standing record reproduced, taken against the superseded colour-only attempt. It is quoted as what it is: evidence about that shape, not about this one. The reasoning that carries both is the same and is checkable in one line: no `@page` rule the corpus generates declares anything outside `size` and the margins.

**One thing neither shape predicted, and the next session will hit it.** The first attempt read the declaration correctly and wrote it on the host correctly, and every page stayed white. A page condition lives in **three** places, not two: what the capture returns, what `driver.js` names into the account entry's `closes`, and what the Chase reads — and `root.js` presents from the *account*, not from the conditions object the driver froze. The projection is right to be a whitelist, because the account crosses a `page.evaluate` boundary in every runner and what is not named there does not survive the trip; the cost is that adding a condition is three edits, and the missing one fails silently with a value that reads exactly like an author who declared nothing.

## Consequences

`capture.js` gains the ownership criterion, a declaration collector, a margin-box declaration collector beside the existing content one, and the inheritance probe; the split runs once per rule set and `pageFor` accumulates. `driver.js` names `pageStyle` in the account's `closes`. `chase.js` gains `dress()`, the three-rule transliteration and a `WeakMap<Document, Map<text, sheet>>` so a sheet is built once per distinct page kind and per realm. `root.js` dresses each page beside applying its conditions.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s part-one line for the page context goes to built and pinned, its design open closes, and part four's table carries the outcome for every row — forwarded, forwarded against the oracle, or queued with its measurement. `.claude/NEEDED-FIXES.md` §2.3 closes into the fixed list. The book's *The page as a box* chapter holds the case; its `the-page-image` want is **retired**, since the image is forwarded like everything else — what survives of it is the recorded divergence, not a gap.

What this does not do: model a page `border` or `padding`, deliver `string()` or `element()` (Chromium implements neither, so there is nothing to read), or make the margin-box *content* channel anything other than the literal it has been since the third round.

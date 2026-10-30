# The page rendering clips at the bleed area

**Status: Decided 2026-09-18, Executed 2026-09-18.** Supersedes [*the clip is a block-axis fact*](the-clip-is-a-block-axis-fact.md), which proposed the same change to the flow and then withdrew it on a reading of css-page-3 that was too narrow. That entry's measurement of Chromium stands and is used here; its conclusion does not. Reported as [beltype#37](https://github.com/egildo/beltype/issues/37).

## Context

The fault is the earlier entry's and is not restated: three `overflow: clip` declarations each clip both axes, so a heading whose `::before` block runs from the paper's edge into the text column loses the block and the first letters of its own text. The report's arithmetic is on the checklist.

**What the earlier round measured is right, and it is the reason this entry has to argue from text rather than from the oracle.** A probe put three boxes to Chromium's own print on one geometry — one wholly inside the text column, one straddling the content edge, one wholly in the page margin — and dumped the operator list: an `eoClip` at the page area exactly, the straddler clipped to the left 22.5 pt of its own path, and **no path at all** for the box in the margin. Chromium's print clips document content at the page area. The venue's own case went red on that column, which is what stopped the round, and stopping was right: a case red on the oracle's column may not enter the suite undeclared.

**What the earlier round read is wrong, and four texts say so.** It concluded that css-page-3 *"declines the question twice"*. It declines a different question.

- **`bleed`** names the clip, and names it once: *"This property specifies the extent of the bleed area outside the page box; in other words the extent beyond the page box at which the page rendering is clipped."* The clip the specification gives the page rendering is the **bleed area**. `auto` computes to 6pt with crop marks and **zero otherwise**, so for a document that asks for neither the clip is the page box — margins included, because the page box includes them.
- **§3.2, content outside the page box**, recommends the opposite of a page-area clip in its own first principle: *"Content should be allowed slightly beyond the page box to allow pages to 'bleed'."* And what it leaves undefined is named exactly: *"This specification does not define how boxes positioned outside the **page box** are handled."* A box hanging into the page margin is **inside** the page box. The undefined clause does not reach it, and the earlier entry's Context read it as though it did.
- **§3.1, painting**, presupposes the overlap a page-area clip would make impossible. Page-margin boxes *"never interleave with parts of the document content or between the content and the canvas. They may only paint in front of the document content or behind the document canvas."* A rule about which of two things is on top is a rule about two things that can occupy one place — and the only place a margin box and document content can share is the margin.
- **CSS 2.1 §9.6.1** is the one place in any of these documents where a clip at the page area is named, and it is named as an exception for one kind of box: *"Boxes with fixed position that are larger than the page area are clipped. Parts of the fixed position box that are not visible in the initial containing block will not print."* An exception stated for fixed boxes is evidence that it is not the general rule; had the general rendering already clipped there, the sentence would say nothing.

**css-page-3 is a Working Draft**, and this entry says so rather than borrowing the authority of a Recommendation: what it offers is a reading of published text, which is still the best authority available here and is the one the venue's own method prefers to a measurement. *The oracle is evidence, not authority.* Chromium is the outlier, and the report's second engine is the check on that claim — the same document under Paged.js, printed through BelType's own `build --pdf`, paints the rectangle where the text says it should be.

## Decision

**The page rendering is clipped at the bleed area, which in this engine is the page box.** Three parts, and the third is the one a later round will want.

**(a) Now — the flow and the slice wrapper clip on the block axis only, and the inline limit is the page box.** `src/chase.js`'s `.content-area` and its `setFlow`, and `src/fragments.js`'s slice wrapper, all become the pair `overflow-x: visible; overflow-y: clip`; `:host` gains `overflow: clip`, so the element that IS the page box is the element that stops the ink. The pair is legal and keeps what `clip` was chosen for: it does not force the other axis to `auto` the way `hidden` would, and it establishes no scroll container, so `stonehand.js`'s monolith predicate reads nothing new at any of the three sites. `display: flow-root` on the slice wrapper **stays** — `clip` establishes no block formatting context, and without it the slice's negative top margin collapses out and drags the wrapper with it. **The slice wrapper is changed for consistency and is not cased**: the case exercises the content area's clip and the flow's, which is what an original and a continuation clone sit under; no document here slices a box whose ink also hangs into the margin.

**(b) A fixed box keeps a page-area clip, on both axes, because CSS 2.1 says so in as many words.** §9.6.1 is quoted above and it is unambiguous. Until now this fell out of `.content-area` clipping both axes, which [*the box on every page*](the-box-on-every-page.md) recorded as the argument for that seat rather than a convenience of it; once the content area stops clipping inline, the fixed box needs a clip of its own or the specification's one explicit page-area rule would be the only thing the change broke. It gets one: a clipping layer inside the content area, holding the per-page clones and nothing else, whose rectangle is the one their offsets already resolve against. **The rectangle may not move**, and that is checked rather than asserted — cases 24, 32 and 46 are the standing records, and the clones' own rects are measured on all three before and after.

**(c) Not now — ink below the page area.** By the same text the block axis should not be clipped at the page area either: `bleed` names one clip and it is the same clip in both directions. It is not changed here, and the reason is a mechanism's rather than the specification's. **The block-axis clip is what hides a continuation clone's tail.** A continuation is a clone of the whole box with the consumed words blanked, so the words this page does not show are still in the tree, below the cut; the clip is what keeps them off the page. [*The ink stops at the fragmentainer*](the-ink-stops-at-the-fragmentainer.md) measured the price of widening it by a sliver — four cases lost words out of the reading, case 07 printing 683 of its 700 — and [*the first fragment is constructed*](the-first-fragment-is-constructed.md) could widen it to the page area only for the pages where the words after the cut had been taken out of the tree. So the block axis is owed to a **fragment expressed as an interval with two ends** rather than as a clone plus a clip, and it can go no earlier: that is the dependency, it is the same one the counters fault and Caster's tail compensation wait on, and it is filed as a design open on the checklist rather than attempted here. **Amended 2026-10-02**: the head of the block axis, which has no cut behind it, closed by [*the page clips at its bleed area on the block axis too*](the-page-clips-at-its-bleed-area-on-the-block-axis-too.md); the foot is the cut and not a page-area clip, so this part's account of the mechanism stands and its conclusion that the foot owes a widened clip does not.

**`bleed` is unmodelled in this engine**, so the limit delivered is the page box and not the bleed area. The capture reads no `bleed` descriptor and the page host is the page box, so any wider rectangle would be arithmetic over a value the engine does not have. **When it is modelled the native door is `overflow-clip-margin`**, which widens a clip by exactly a length and is what `bleed`'s `<length>` becomes; that is named here so the next round does not invent a second mechanism.

**Refused: clipping nowhere at all on the inline axis.** A page is a page box, and §3.2's *slightly beyond* is not *anywhere*. `:host` is the honest limit because it is the page box.

**Refused: reading Chromium's page-area clip as the specification's.** It is one implementation's choice, it is contradicted by another implementation the same product ships, and the method's rule is that the oracle is evidence. What the measurement earns is a **declared divergence** on the case, argued in the case's own declaration — which the venue had no way to spell for a paint claim and now does.

## Predictions

Frozen on write, before anything runs.

1. **The case is red on both Cicero columns before the change and green after**, on both pages: one `fill` of `#c00000`, 45 × 12 pt at 33.75, 30, wholly inside the 90 pt left margin. HOLD on exactly that; BREAK if either column is already green, which would mean the clip is not where this entry says it is.
2. **Chromium's column is red-as-declared throughout — before the change and after it.** The case declares the engine's own paint divergent and asserts that it differs; that assertion passes because Chromium paints no such rectangle, and nothing in this round touches Chromium. BREAK if it ever stops differing, which would mean the oracle moved and the declaration is owed a re-reading rather than a pass.
3. **Cases 24, 32 and 46 do not move**, and the fixed clones' own rectangles do not move either: measured before the change at page-area offsets `7.55, 7.55, 226.77 × 22.67` (case 24, all three pages), `264.53, 0, 113.38 × 529.13` (case 32, both pages) and `99.97, 0, 40 × 20` (case 46, both pages). BREAK on any of the three numbers changing by more than a hundredth of a pixel; a fixed box whose offsets moved would mean the new clipping layer is not the rectangle the old clip was.
4. **Every standing battery record is unmoved.** The corpus writes no negative inline margins and no ink outside the measure, and the change moves no layout at all — inline `overflow` decides what is painted, never where a box is. BREAK on any record moving, and it is a conflict to report rather than a number to edit.
5. **Case 51 and every other paint-claiming case stay green** — 42, 43, 47, 48, 50. None puts ink outside the page area on the inline axis. This is the prediction most likely to break and the reason the whole set is run.
6. **A consequence the change forces, predicted rather than discovered: document content can now reach a margin box's cell, and §3.1 says the margin box paints in front.** Today the content area is the shadow's last child and is positioned, so it would paint ABOVE the margin cells — backwards, and newly reachable. The margin cells and their bands are therefore given a stacking order that puts them in front. BREAK if any margin-box claim moves (cases 12, 15, 16, 17, 31, 36, 37, 38, 39, 40, 41, 50), which would mean the stacking change disturbed the band arithmetic it must not touch.
7. **What this cannot say**, predicted as a limit: nothing here measures a fixed box wider than the page area on the INLINE axis, so part (b) is argued from §9.6.1 and from the measured rectangles, not adjudicated by a document. And nothing measures bleed, which the engine does not model.

## Consequences

- `src/chase.js` (`:host`, `.content-area`, `setFlow`, the furniture layer and its slot), `src/root.js` (the Furniture's second delivery assigns into that slot, and the dressing sheet's note), `src/fragments.js` (the slice wrapper's `cssText`).
- `packages/essay/cases/52-the-ink-in-the-margin`, held by the book's chapter *The page box*, where css-page-3 §3.1 and §3.2 are argued.
- **A new door in the venue's declaration**, and it is the reason the case can exist at all: a `paint` claim had no per-engine divergence, so a case whose oracle column differs had nowhere to say so. It gains one on the exact pattern `marginBoxes: 'divergent'` already sets — the engine's column is ASSERTED to differ, and a `why` carries the argument, so a Chromium that one day paints the margin turns the case red and somebody re-reads the declaration rather than a green quietly meaning something new.
- Three pieces of prose said the old rule and are corrected in place: `src/chase.js`'s header, `src/root.js`'s note that the fixed box's clip *needs no rule at all*, and `docs/architecture.md`'s Chase section in both the mechanics paragraph and the fixed-box paragraph.
- **What this owes**, on the checklist as a design open: the block axis, which the same text reaches and which waits on a fragment being an interval with two ends; and `bleed`, unmodelled, whose door is `overflow-clip-margin`.

## Verdict

**Every prediction held. One wall was unpredicted, and it was a test rather than the engine.**

**Prediction 1 held on both halves.** Before the change, with the case registered and run and nothing under `src/` touched:

```
FAIL [cicero]           page 1: no fill #c00000 at 33.75,30,45,12 — same colour on the page: [none]
FAIL [cicero-composed]  page 1: no fill #c00000 at 33.75,30,45,12 — same colour on the page: [none]
```

After it, both columns carry the declared ink on both pages, and the case holds.

**Prediction 2 held throughout.** Chromium's column reads `ok [chromium] the ink differs from the declaration, as recorded` before the change and after it, printing its argument beside the difference. The door was built for exactly this and it is the half of the case that will age: the day the oracle paints the margin, the assertion fails and somebody reads the declaration again.

**Prediction 3 held to the hundredth of a pixel**, which is what the round was most exposed on. The fixed clones' rectangles, measured against their own page area on every page of all three cases, before the change and after it:

```
24-the-repeated-box          p1 p2 p3   7.55, 7.55, 226.77 × 22.67
32-the-box-that-is-too-tall  p1 p2    264.53, 0,    113.38 × 529.13
46-the-nested-fixed-box      p1 p2     99.97, 0,     40    × 20
```

Identical on both sides. The furniture layer's `position: absolute; inset: 0` makes its padding box the content area's own, so the containing block their offsets resolve against and the rectangle they are clipped at are the ones the shared clip gave them. All three cases hold.

**Predictions 4 and 5 held.** A complete battery — 25 gates in 6.9 minutes, pinned at `005256b` — reproduced **every standing record**, not one number moved: `native` at 163/18/7/11/1, `composed-v1` at 89/8/3, `composed-v2` at 86/10/4, `v3-native` at 43/5/1/1, `v3-composed` at 28/1/1, `v4` at 43/4/2/1, the three view gates at 50, 40 and 30 view-agree, every case, probe and acceptance gate green. Case 51 and the whole paint-claiming set are inside the cases gate and were run individually besides.

**Prediction 6 held, and it is the one asserted by nothing.** The margin cells and their bands were given `position: relative; z-index: 1`, and no margin-box claim moved on any of the twelve cases that make one. But no document here puts a margin box and flowed ink in the same place, so what the three declarations actually deliver — §3.1's *in front of the document content* — is argued and not checked. It is recorded as a consequence rather than a capability, and a case for it is not authored here.

**Prediction 7's limit stands**, unchanged: nothing measures a fixed box wider than the page area on the inline axis, and nothing measures bleed.

**The unpredicted wall was `test/edge.test.js`**, which read the slice wrapper's `overflow` shorthand and asserted `'clip'`. It went red on `'visible clip'` — the pin was stating the spelling rather than the claim. It now names the two axes, and gained the `flow-root` assertion it should always have carried, since that is the property whose absence the wrapper's own comment says collapses the slice. A pin that breaks on a decision it is downstream of is the pin working; a pin that could only have been *relaxed* to pass would have been the venue's oldest scar, and this one could be made to say more instead.

**What was too good to be true.** Not the design — the furniture layer behaved exactly as the arithmetic said, including the pointer-events trap, which was predicted rather than discovered. What was too good to be true was the *writing*: the CSS comments explaining each clip were put inside the shadow `<style>`'s template literal in this file's own house voice, backticks and all, and the backticks closed the literal. The engine stopped parsing, and what reported it was a browser test timing out after thirty seconds on `__beltypeReady` — three steps from the cause. `node --check` found it in a second once asked. **A comment in the house voice is not free inside a template literal**, and nothing in this package would have caught it but a run.

**And one thing was confirmed with pixels rather than argued.** `overflow: clip` on the host does not eat the screen `box-shadow` the root's sheet puts on a page: a six-pixel band captured straight below a page's bottom edge still carries the grey. The host is still `pageH − 1`, so the print-safety inset is untouched. Both were reasoned to be safe — overflow clips descendants, not an element's own decorations — and both were then looked at, because the round had already spent a withdrawal on a claim nobody had measured.

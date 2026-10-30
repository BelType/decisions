# The clip is a block-axis fact

**Status: Decided 2026-09-18, Superseded by the page rendering clips at the bleed area.** **Withdrawn before execution**, on the measurement in the Verdict below: Chromium's own print clips document content at the page area exactly as this engine does, and the specification sections this entry argues from do not say otherwise. Nothing under `src/` was changed and no case was authored. The question is real and is held for a design round with Egildo; what follows is the argument as it was written, kept whole so the verdict has something to disagree with.

## Context

Anything a document pushes sideways out of the page area is cut at the content edge. The report's own idiom is the common print one — a heading number set in a coloured block running from the paper's edge into the text column — and its measurement is the arithmetic to read: a 794 px page whose content area starts 109 px in, a `::before` carrying `margin-left: -108.851px`, the heading's first glyph at 82 px, and nothing at all painted left of 109. The box is gone and so are the first letters of the heading's own text. The same page under Paged.js, and under Chromium's own print, paints the box in the margin.

Three declarations do it, and each clips both axes: `src/chase.js`'s `.content-area` in the shadow `<style>`, the flow in `setFlow`, and `src/fragments.js`'s slice wrapper in `mutateToContinuation`.

**Every one of them was written for fragmentation, and fragmentation is a block-axis fact.** A continuation carries its source's whole tail and must be hidden above the resume point and below the cut; a first fragment carries the box's own overflow content and must be hidden below the boundary the cut drew. That is the entire reason the clip exists — it is what [*the ink stops at the fragmentainer*](the-ink-stops-at-the-fragmentainer.md) argued about at length, and what [*the first fragment is constructed*](the-first-fragment-is-constructed.md) moved to the page area's edge on a straddling page. Nothing in either argument, and nothing in css-break-3, asks for ink to be hidden to the left or to the right. The second axis came along because `overflow` is one property, not because anybody decided it.

The specifications name a clip in a different place. css-page-3 §3.1 makes the page's painting area the bleed area, covering the whole page box, margins included; §3.2 is where content ending up *outside the page box* is discussed. So the boundary the published text draws around a document's ink is the page box, and the page area is where content *flows*, not where it is permitted to be seen. Caster already states the rule that way and has since R5: `clipToPage` answers `{ topPx, bottomPx }` and nothing else, so the printer drops a clipped tail's lines and never ink beside the column. Engine and printer disagreed, and the printer was right.

## Decision

**The fragmentation clip binds the block axis only; the inline limit is the page box.** All three declarations become the pair `overflow-x: visible; overflow-y: clip`, and `:host` in `src/chase.js` gains `overflow: clip` so that the page frame itself is what stops ink — which is the boundary §3.2 talks about, expressed as the one element that actually is the page box.

The pair is legal and it keeps what the original spelling was chosen for. `clip` does not force the other axis to `auto` the way `hidden` would, so `visible` survives beside it; and `clip` still establishes no scroll container, so `stonehand.js`'s monolith predicate — which reads a scroll container as unbreakable — is untouched at every one of the three sites. `display: flow-root` on the slice wrapper **stays**, and its own note stays with it: `clip` does not establish a block formatting context, so without `flow-root` the slice's negative top margin collapses out and drags the wrapper with it.

**The slice wrapper is changed for consistency and is not cased.** Of the three declarations, the case exercises two — the content area's and the flow's, which is what an original on its own page and a continuation clone on the next both sit under. A painted shell's wrapper clips a box that is being sliced down the page, and no document here draws one whose ink also hangs into the margin. Leaving it clipping both axes would mean two spellings of one rule in one engine, differing by nothing anybody could state; changing it is stated here rather than discovered by the next reader.

**Refused: `overflow-clip-margin` in place of the pair.** It would widen the clip by a length, which is a different claim — *ink is allowed this far past the edge* — and it needs a number nobody can derive. The inline axis is not to be clipped at the page area at any distance.

**Refused: clipping at the trim or bleed box.** css-page-3 has `bleed` on `@page` and Caster writes trim and bleed boxes, so the page box is not obviously the outermost honest boundary. But **bleed is unmodelled in Cicero** — the capture reads no `bleed` descriptor and the page host is the page box — so clipping anywhere else would be arithmetic over a value the engine does not have. The page box is the limit the engine can state today, and bleed stays unmodelled and named.

**The consequence, stated rather than discovered: a fixed box wider than the page area is now clipped at the page box on the inline axis, where it was clipped at the page area.** CSS 2.1 §9.6.1's *"boxes with fixed position that are larger than the page area are clipped"* fell out of `.content-area`'s own `overflow: clip`, which [*the box on every page*](the-box-on-every-page.md) recorded as the argument for that seat. On the block axis it still does — `.content-area` keeps `overflow-y: clip`, and the fixed clone's containing block is still the page area — so case 32, *the box that is too tall*, is untouched, and so are cases 24 and 46, all three of which are about the block axis. What changes is the inline axis alone, where §9.6.1's own sentence names the *initial containing block* and css-page-3 §3 makes that the page area: so this is a departure from the narrowest reading of §9.6.1, taken because a rule about a repeated box may not decide where a document's ordinary ink is allowed to be. No case claims otherwise today, and none is authored for it here.

## Predictions

Frozen on write, before anything runs.

1. **Case 52 is red on both Cicero columns and green on Chromium before the change.** Both pages claim one `fill` of `#c00000` at 33.75, 30, 45 × 12 pt — a rectangle lying wholly inside the 90 pt left margin and ending 11.25 pt clear of the text column. (The rectangle was restated here when the case was authored at its final geometry; nothing had run.) The engine's flow clip starts at the content edge, 90 pt, so the path lies wholly outside it and `readPaint` — which reports a painted path intersected with its clip, and nothing at all for a path outside one — reports no such rectangle; Chromium's print, which clips at the page, paints it. HOLD on exactly that split. BREAK if Chromium is red, which would mean the document does not put the question; BREAK if either Cicero column is green, which would mean the clip is not where this entry says it is — the failure mode *the ink stops at the fragmentainer* was written to correct.
2. **Case 52 is green on all three columns after the change**, both pages, both claims. BREAK on either page, and the pair does not compute the way §3 of css-overflow-3 says it does.
3. **Page one exercises an original and page two a continuation clone**, which is what makes the case cover the two declarations rather than one: the first heading is a top-level block presented whole, and the second sits inside a `<section>` that begins on page one and resumes on page two. BREAK if the pages divide any other way — the case would then be one claim written twice.
4. **Case 51 stays green**, and so does every other case that makes a paint claim — 42, 43, 47, 48, 50. None of them puts ink outside the page area on the inline axis, and none of their rectangles is within a point of the content edge on the left or the right. BREAK on any of the six moving; this is the prediction most likely to break and the reason the paint-claiming set is run rather than case 52 alone.
5. **Every standing battery record is unmoved.** The corpus draws no negative inline margins and no ink outside the measure, and the change moves no layout at all — `overflow` on the inline axis decides what is painted, never where a box is. BREAK on any record moving, and the answer is not to edit the record.
6. **What this cannot say**, predicted as a limit: nothing here measures a fixed box wider than the page area, so the stated consequence above is argued from the code and from §9.6.1 and is not adjudicated by any document in the venue. It is stated as a consequence rather than gated, and a case for it is not authored in this round.

## Verdict

**Read this verdict against [*the page rendering clips at the bleed area*](the-page-rendering-clips-at-the-bleed-area.md), which supersedes it: the measurement below stands and the specification reading below does not — `bleed` names the clip as the bleed area, and §3.2's undefined clause reaches only boxes outside the PAGE BOX, which a box in the margin is not.**

**Prediction 1 broke, on its own stated criterion, and what broke it is not what the criterion said it would mean.** The prediction read *BREAK if Chromium is red, which would mean the document does not put the question.* Chromium is red. The document puts the question perfectly well; **the oracle simply answers it the way the engine does.**

The case document was written, registered, and run before any code was touched. All three columns printed two pages, word for word identical, the second opening with *Ink on the next page* exactly as designed — and not one of them carried the rectangle:

```
FAIL [cicero]           page 1: no fill #c00000 at 33.75,30,45,12 — same colour on the page: [none]
FAIL [cicero-composed]  page 1: no fill #c00000 at 33.75,30,45,12 — same colour on the page: [none]
FAIL [chromium]         page 1: no fill #c00000 at 33.75,30,45,12 — same colour on the page: [none]
```

**The reader was asked what it does with a clip before anything was concluded**, which is the one lesson [*the ink stops at the fragmentainer*](the-ink-stops-at-the-fragmentainer.md) bought at full price. A purpose-built probe put three boxes to Chromium's own print on the same geometry — one wholly inside the text column, one straddling the content edge, one wholly in the margin — and the operator list answers without ambiguity:

```
transform  [0.24, 0, 0, -0.24, 0, 240]          the page's own space
eoClip     rect 375,125 → 1125,875              = 90…270 × 30…210 pt: THE PAGE AREA, exactly
save; transform [3.125, 0, 0, 3.125, 375, 125]
fill  #00c000  path 0,0 → 60,16                 wholly inside the column — painted
fill  #0000c0  path -30,16 → 30,32              straddling — painted, read back at x 90, width 22.5
                                                (the path runs 67.5…112.5; the clip takes the left 22.5)
                    …and for the box wholly in the margin, NO PATH AT ALL
```

So Chromium's print emits a clip at the page area and **culls** a path that lies wholly outside it. `readPaint` reported the straddler clipped at 90 pt and the outside box not at all, which is what the page draws. The instrument is honest; the oracle clips both axes.

**And the specification does not say otherwise.** Read rather than recalled, from the committed snapshot. css-page-3 §3.1's sentence about the margins is about the **page background** — *"its background painting area is the bleed area, which covers the entire page box, including its margins"* — and the painting order it opens with lists *document contents* as a separate layer that sentence does not speak for. §3.2 is about content outside the **page box**, not outside the page area, and it declines the question twice: *"A specification for the exact formatting of such elements lies outside the scope of this document"*, and *"This specification does not define how boxes positioned outside the page box are handled. Possibilities include discarding them or creating page boxes for them at the end of the document."* This entry's Context read §3.1 as licensing document ink in the margin. It does not.

**The report's premise is half right, and the half that survives is the interesting one.** The same document under Paged.js, printed through BelType's own `build --pdf`, paints the rectangle at **33.75, 30, 45 × 12 pt on both pages** — precisely the numbers the case claims. So the three engines divide two against one, and the one is Paged.js:

| | the block wholly in the page margin |
| :--- | :--- |
| Paged.js, through `build --pdf` | painted, 45 × 12 pt at 33.75, 30, on both pages |
| Chromium's own print | **not painted** — `eoClip` at the page area, the path culled |
| Cicero | not painted |

Paged.js paints it because its page is a DOM element whose page-area box does not clip on the inline axis — which is the same structural choice this entry proposed for Cicero, arrived at by a different route. Cicero is the engine that agrees with the oracle.

**What this leaves.** Not a conformance repair: the published text is silent, and the oracle clips. What is left is a question with three real pressures and no specification to settle it, which is why it goes to Egildo rather than into `src/`:

- **An author's idiom stops working.** The report is a real document by a real person, and the block-in-the-margin heading is an ordinary print device. Under `--engine pagedjs` it works; under `--engine cicero` it silently does not, and the two are the same product.
- **The printer and the engine already disagree, and that is true whichever way the ruling goes.** Caster's `clipToPage` answers `{ topPx, bottomPx }` and nothing else, so a document Cicero ever prints through Caster would carry ink Cicero's own screen refuses to show. That is an internal inconsistency inside one product, not a conformance matter, and it is the strongest argument in the report.
- **A case cannot adjudicate it.** With the oracle agreeing with the engine, any case claiming the ink is painted is red on all three columns — which is a legitimate genre only where the specification is on the case's side, as in *out of flow*. Here it is not. So a case authored today would assert against the published text and against the oracle at once, and the honest posture is a design open rather than a red claim.

**What was too good to be true.** The round opened on a sentence from the report — *the same page under Paged.js, and under Chromium's own print, paints the box in the margin* — and this entry's whole Context was built on it without measuring the second half. One print of three coloured boxes would have said so at any point. The venue's rule is that the oracle is evidence and not authority; the failure here was the other one, which the rule list does not name as loudly: **a premise about the oracle was taken on report rather than measured**, and the specification it was cross-checked against was cited from memory of what §3.1 says about margins rather than read. Both are cheap to do and neither was done until the case went red on the column that was supposed to be green.

## Consequences

- **Nothing under `src/` changed.** `chase.js`, `fragments.js` and `root.js` are untouched, and so is `docs/architecture.md`'s Chase section, whose account of the clip is correct as it stands.
- **No case.** `52-the-ink-in-the-margin` was written, run, and removed rather than weakened — the wall is the finding, and a case red on all three columns with the specification against it would be a claim nobody could stand behind. Its geometry and its numbers are in this entry, which is where the next round should pick them up.
- The checklist's design open keeps the report's arithmetic and gains this verdict's: the oracle clips at the page area, Paged.js does not, and the question is a design round rather than a repair. Root `.claude/NEEDED-FIXES.md` indexes it in the same words.
- **What a design round would have to settle**, named so it is not re-derived: whether a preview may show ink the print would cull; whether Cicero should instead agree with Caster, which would make the engine's screen and the product's printer say one thing and Chromium's print another; and whether the answer differs for the page box and the bleed area, which Cicero does not model at all.

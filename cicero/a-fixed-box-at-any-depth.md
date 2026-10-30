# A fixed box at any depth

**Status: Decided 2026-09-15, Executed 2026-09-15.**

## Context

[*The box on every page*](the-box-on-every-page.md) built the Furniture's second delivery and refused one thing by name: *"Refused: reaching a nested fixed box. The mechanism carries top-level boxes only. A `position: fixed` element inside a flow block travels with its block and the browser's own print then repeats it against the sheet. Lifting a box out of a clone that the fragment writer builds is a different mechanism from this one and has no customer yet."*

It has one now. P34h measured it and `cases/46-the-nested-fixed-box` was authored for it: a rail declared inside a `<section>` rather than as a child of `<body>` is repeated by Chromium on every page, at the page area's own top-right corner, and appears on **no page at all** through the engine — because `driver.js`'s `fixedBoxes` scans `doc.body.children` and finds nothing, so the box stays in its section, travels with it, and the browser's print repeats it against the **sheet**, where the venue's reader files it as a margin item rather than as words.

CSS 2.1 §9.6.1 says *"for paged media, boxes with fixed positions are repeated on every page"* and says nothing whatever about where in the tree the box was declared. Depth is not in the sentence.

## Decision

**One — `fixedBoxes` walks the document, not its top level.** Every element whose computed `position` is `fixed`, at any depth, excluding engine scaffolding and excluding a fixed box nested inside another fixed box, which its ancestor already carries.

**Two — zero footprint has to mean the same thing at depth, and at depth it costs a removal.** A top-level fixed box gets zero footprint for free: `topLevelBlocks` does not return it, so it is in no word space, no feed and no slot assignment, and the original simply stays unassigned in the light DOM, unrendered, canonical. A nested one is inside a block that IS assigned, so three things have to be said rather than inherited.

- **The word space must not count it.** `indexBlocks` takes the same shape of injected predicate it already takes for `isInline` and skips a fixed subtree whole. This is not optional tidiness: `joinedWords` on the clone side will not see the box, and the two tokenizations *must never disagree* — that is `word-space.js`' own standing rule, and the last time they did, a block's first word printed nowhere.
- **The feed must not measure it.** Every feed item is already a clone, so the removal is one call at clone time, on the clone, and the source is untouched (C5).
- **The presentation must not render it from its source position.** This is the one that costs something. A block holding a nested fixed box is presented as a **clone with the box removed** instead of as the original. Refused alternatives, each for a reason: a rule in the dressing sheet cannot select on computed `position` and the author wrote no handle to match; a structural `:nth-child` path from the root would be a per-page literal that is legal under C5 and unreadable in practice, and it would break the moment a fragment is appended beside it; and leaving the box in place makes the page carry TWO rails — the browser's, repeated against the sheet, and ours, against the page area — which is green on this case and wrong on the page, exactly the divergence *the box on every page* closed for the top level.

The cost is stated where the architecture already states its siblings: a block holding a fixed box is read from a clone rather than from the original, for the same reason a composed block is, and the class of cost is the one that section already owns. It is narrow — the blocks affected are the blocks that declare a fixed box inside themselves.

**Three — delivery is unchanged, and that is the finding rather than a convenience.** One clone per page, `position: absolute` against `.content-area`, so the containing block is the page area (css-page-3 §3's initial containing block) and the clip falls out of it. Nothing about that mechanism knew or cared where the source element sat; the whole of this fix is upstream of it.

**Four — the monolith predicate's third ground becomes unreachable, and it stays.** *The box on every page* gave `isMonolith` the normatively-forbidden ground — §9.3.1's *"UAs must not paginate the content of fixed boxes"* — and noted that only a NESTED fixed box could now reach it. After this, none can: every fixed box leaves the flow before the walk begins, so the prohibition is satisfied by construction rather than by refusal. The predicate keeps the line, because a predicate that is right and unreached is cheaper than one that is absent and wanted.

## Predictions

Frozen on write.

1. **`cases/46-the-nested-fixed-box` goes green on both Cicero columns** — two pages, `RAIL` on both of them positively through `everyPage`, and the partition identical to Chromium's. BREAK on the rail missing from either page, or on the pages dividing anywhere but after the twelfth line.
2. **The flow divides exactly where it would divide with no rail in the document** — twelve lines on page one, eleven on page two. BREAK on eleven and twelve, which would mean the rail still had a footprint, and that is the claim `zero` has to be able to fail.
3. **Only ONE rail is on each page.** The case cannot see this — its totality is off, and a second rail in the sheet's corner reads as a margin item — so it is checked by hand at close, by reading the printed page's margin bands for a rail that should not be there. What an instrument cannot say is the prediction worth freezing.
4. **No other case moves.** `24-the-repeated-box` and `32-the-box-that-is-too-tall` declare top-level fixed boxes, which take the same path they always did — the walk finds them where `doc.body.children` found them, and `topLevelBlocks` still excludes them, so nothing about their delivery changes. BREAK on either, which would mean the document walk is catching something the top-level scan did not.
5. **No seed moves.** The generator draws no out-of-flow box at all, which the part-three read already recorded as one of the corpus's structural blindnesses.
6. **The word-space change is the risk in this fix, not the walk.** `indexBlocks` and `joinedWords` must agree exactly; if they do not, the symptom is not a missing rail but a resume position off by one in a document that has nothing to do with fixed boxes. Nothing in the corpus can produce one, so this is checked by the case suite's totality and by nothing else.

## Consequences

The checklist's part one §1 `position: fixed` line loses its *"**not built** is anything below the top level"* and gains what depth costs; part four's §9.6.1 section records that the repetition is the engine's at any depth.

`architecture.md`'s Furniture section stops saying *"the mechanism carries top-level boxes only, the same limit round 07 left on carried flows"* — the two limits were always independent and only one of them moves here.

Next door, `cases/46-the-nested-fixed-box` closes, and `lib/chapters.js`' chapter thirteen rows stop speaking of the top level.

## Verdict

**Every prediction held, and one wall arrived that none of them named.**

**Predictions 1 and 2 held together.** `cases/46-the-nested-fixed-box` is green on every column: two pages, `RAIL` on both through `everyPage`, and Chromium's partition comparison agreeing page for page and word for word. The division is twelve lines on page one and eleven on page two — read off the printed stream as 49 words and 45, which is `3 Before + 9 After + RAIL` and `11 After + RAIL` — exactly where the twenty-three lines fall with no rail in the document. Zero footprint, and it can now fail.

**Prediction 3 held, checked by hand as it said it would be.** Each printed page carries **one** `RAIL` in its word stream and **nothing at all** in either margin band — so the browser is not repeating a second copy against the sheet, which is what leaving the box in its section would have produced and what no check in the case could have seen.

**Prediction 4 held.** `24`, `32`, `14`, `21`, `04`, `07`, `08`, `09`, `00`, `42`, `43`, `44` and `45` are unmoved — four failures, all of them the two page-one ink claims this round already accounts for. The top-level fixed boxes of cases 24 and 32 take the same path they always did.

**Prediction 5 is carried to the close** with the round's other two; the corpus draws no out-of-flow box.

**Prediction 6 was right to name the word space as the risk, and the wall it hit was one step further on.** The first run threw — *positions: element is not in the index* — from `document-state.js`, not from anything the fix had touched. The counter-and-named-string log walks the whole element tree and asks the index for every element's word position, so the moment `indexBlocks` stopped holding a fixed subtree, the log asked about a box that no longer had a position. The two walks were coupled through the index and nothing said so. The fix is the same sentence one file over — a fixed box has no position in the word space, so the log skips it — and the consequence is worth stating rather than swallowing: **a `counter-increment` or a `string-set` inside a fixed box is unread**, which was already exactly true of a TOP-LEVEL fixed box and is already on the checklist beside it.

**What was too good to be true.** The fix was scoped as *walk deeper*, and walking deeper was four lines. Everything else — three walks that had to agree about what the word space contains, and a fourth that turned out to be reading it — was the actual work, and it was invisible from the brief because zero footprint at the top level costs nothing at all. *Not built is anything below the top level* was a cheap sentence to write and the depth was never the hard part.

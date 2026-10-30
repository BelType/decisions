# The fragment that wraps itself

**Status: Decided 2026-09-15, Executed in part 2026-09-15.** The continuation and the fit arithmetic are built; the first fragment's block-end decoration is withdrawn onto the same design round as §5.3's extension.

## Context

`box-decoration-break` has never been read. `fragments.js` truncates leading decoration on every continuation and trailing decoration on every truncated feed clone, unconditionally, and that is css-break-3 §5.4's `slice` behaviour written as the only behaviour — which the architecture's continuation-dressing bullet says in as many words (*"sliced decoration drops its inner edges while `box-decoration-break: clone` keeps them"*) as something the engine does, and it does not. P34d measured it: under `clone` Cicero's print is identical to its own `slice`. `cases/42-clone-decoration` was authored red for it.

§5.4's `clone`: *"Each box fragment is independently wrapped with the border, padding, and margin … The background is drawn independently in each fragment of the element."* With the note that follows it: *"Cloned margins are truncated on block-level boxes."* And §5.3 above it, which is what makes `clone` cost something rather than merely look different: *"its content box extends to fill any remaining fragmentainer extent (leaving room for any margins/borders/padding applied by `box-decoration-break: clone`)"*.

So the property has three consequences and they belong to three different organs. The continuation keeps its block-start border and padding — the fragment writer's. The first fragment keeps its block-end border and padding, drawn at the fragmentainer's edge — the presentation's. And every fragment is CHARGED for what it clones, so the boundary moves — the Stonehand's. Case 42's own arithmetic: eight of the twelve lines fit page one, `54 + 160 + 14 = 228` of 240, where `slice` fits nine.

## Decision

**One — the property is read from the SOURCE, beside `display`.** `word-space.js` already owns the pattern and the reason: a continuation clone is detached when its words are consumed, and `getComputedStyle` on a detached element answers nothing, so a clone's elements are registered against their sources at clone time and asked through that map. `clonesDecoration(el)` joins `isInlineBox(el)` there rather than starting a second map in `fragments.js`. An element with no registration reads as `slice`, which is both the initial value and what an unmapped element — a `<br>`, the Compositor's filler span — actually wants.

**Two — the continuation keeps its block-start border and padding, and still loses its margin.** `truncateLeadingDecoration` splits: the margin and the text indent go unconditionally, the border and the padding only under `slice`. The margin because §5.4's own note says cloned margins are truncated on block-level boxes, and §5.2 truncates margins adjoining a break in any case; the indent because a box that resumes is not beginning, which is the architecture's continuation dressing and not a decoration question at all. `truncateTrailingDecoration` splits the same way, being the exact mirror — a feed clone truncated at a forced break keeps the decoration a cloned fragment would wrap itself in, so the fit is measured against the room truncation actually yields.

**Three — the fit charges the cut for what it clones.** A candidate at `y` inside a box declaring `clone` needs `y + clonedBlockEnd ≤ limit`, where `clonedBlockEnd` is the sum, over every ancestor **this cut breaks** that declares `clone`, of its bottom border and bottom padding. Which ancestors a cut breaks is already decided by the candidate's own class and needs no new walk: a Class A boundary before a box breaks that box's PARENT and up, since the box itself goes whole to the next page; a Class B between lines, a Class C in an end gap and a Class C in a start gap all break the box the reading was taken from, and its ancestors with it.

The charge rides on the candidate, so it is visible where it is spent, and it narrows `fits` and nothing else. The make-up order is untouched: this is §5.3's arithmetic about how much room a page really offers, not a fourth key — and the round that pruned `DECORATION_TRUNCATION` established exactly that distinction, that decoration governs how a break renders and never which candidate wins.

**Refused: charging the block-start decoration to the page that begins.** A fragment's cloned block-start border and padding are laid out by the browser on the page that carries them, because the continuation clone keeps them and the feed measures that clone. Adding an arithmetic charge beside the real layout would count the same pixels twice, which is how a fact gets two derivations.

**Refused, and this is the round's second withdrawal: the first fragment's block-end decoration.** §5.3's *leaving room* is delivered; the ink that room is left for is not. The first fragment of a straddling box is the ORIGINAL, assigned to the page where it begins and clipped by the flow (the architecture's slot-versus-fragment reconciliation), so its bottom border is wherever the box's own bottom is — hundreds of pixels below — and no clip can move it up, no per-page rule can reach an original's children to clip them above the box's own padding edge, and a separately painted strip would be a second rendering engine. It wants exactly what [*the ink stops at the fragmentainer*](the-ink-stops-at-the-fragmentainer.md) found §5.3's extension wants: **the first fragment constructed**, as `fragments.js` already constructs the continuation at the other end. Same construction, same design round, and the two are recorded as one open rather than as two.

**Refused: §4.4's cloned-decoration truncation.** *"Cloned margins/border/padding at the block-end side are truncated; and if more room is still needed … at the block-start side as well"* is a ROOM-MAKING step in the last-resort sequence, between dropping rules 1/2/4 and breaking anywhere. It is a different job from charging the fit, it is not asked for here, and it stays exactly where the 2026-07-28 narrowing put it: unimplemented, on the checklist, named.

## Predictions

Frozen on write.

1. **Case 42's partition goes green on both Cicero columns** — page two opens with `Line 9 of 12`, eight lines on page one where `slice` fits nine. BREAK on nine or on seven; nine means the charge is not reaching the candidate, seven means it is being counted twice.
2. **Case 42's page-two ink goes green** — the background `105×81pt` at 22.5,22.5 and the border as ONE closed stroke `102×78pt` at 24,24, because the continuation now carries all four borders and Chromium draws a uniform border as a single stroked rectangle. BREAK if the border still reads as three fills, which would mean the top border was still being truncated.
3. **Case 42's page-one ink stays red on both its claims**, blocked on the construction named above. HOLD is the failure; it BREAKS if it goes green, which would mean the first fragment reached the edge by some path this entry did not find.
4. **Chromium's column does not move**, and case 42's partition comparison against it goes green with prediction 1.
5. **No other case moves.** Case 42 is the only document in the venue that declares `clone`; `09`, `43` and `00` declare `slice` explicitly and everything else takes the initial value, so `clonesDecoration` answers false everywhere else and both split functions behave exactly as they did.
6. **No seed moves, and the corpus cannot see this at all.** The generator draws no `box-decoration-break`, so the battery's tallies are structurally blind to every part of this — which is the fourth time the corpus has been blind to a spec rule for a reason that is about how it was grown. Recorded, not fixed here.

## Consequences

The checklist's part one §5 `box-decoration-break` line and part three's §5.4 row stop saying *`clone` unimplemented*: the continuation and the fit arithmetic are built, the first fragment's block-end decoration is the design open, and §4.4's room-making step is untouched and still named.

`architecture.md`'s continuation-dressing bullet stops claiming a behaviour the engine did not have, and says which half of it is real.

Next door, `cases/42-clone-decoration` goes green on its partition and on page two, red on page one, with the reason named in the same place case 43's is.

## Verdict

**Every prediction held, and the two that were predicted to hold as FAILURES are the ones worth reading.**

**Prediction 1 held on the number the case declares.** `cases/42-clone-decoration` partitions eight lines on page one and opens page two with `Line 9 of 12`, on both Cicero columns, where `slice` fit nine. `54 + 160 + 14 = 228` of 240, exactly the arithmetic the case's own stylesheet wrote down before the engine could produce it.

**Prediction 2 held, including the shape of the border.** Page two's ink reads the background `105×81pt` at 22.5,22.5 and the border as **one closed stroke** `102×78pt` at 24,24 — the continuation carries all four sides now, so Chromium draws it as a single stroked rectangle where it drew three separate fills before. That is the clearest single reading of the property being obeyed: the same box, the same page, three fills become one closed rectangle.

**Prediction 3 held, as the failure it was frozen as.** Page one's two claims stay red, at `105×130.5pt` against the claimed 150 and `102×129pt` against 147 — the original clipped at the cut, with no cloned bottom border anywhere on the page. The gap is now 19.5pt where the round opened believing it was zero, and it is the same construction §5.3's extension wants.

**Prediction 4 held.** Chromium's column is unmoved and its partition comparison against Cicero went green with prediction 1 — the two engines divide case 42 identically now.

**Prediction 5 held.** The whole neighbour set — `43`, `44`, `04`, `07`, `08`, `09`, `24`, `32`, `21`, `14`, `00` — is unmoved, with case 43's single §5.3 claim the only failure among them and that one unchanged from before this fix. Case 42 is the only document in the venue that declares `clone`, and `clonesDecoration` answers false everywhere else.

**Prediction 6 is carried, not answered.** The generator draws no `box-decoration-break`, so nothing in the corpus can see any part of this. It is the fourth structural blindness the part-three read's own lesson predicted, and it stays where the others are.

**What was too good to be true.** The fit arithmetic was expected to be the hard half — it was three lines and a helper, because `cost` had a natural seat on the candidate and the make-up order needed no key. The half that did not land is the one the brief called presentation, and it did not land for a reason that had nothing to do with `box-decoration-break` at all: the first fragment is an original under a clip, and every property of a fragment that is not simply *less content* runs into that one fact. Two of this round's four fixes ended at the same sentence, which is worth more than either would have been alone.

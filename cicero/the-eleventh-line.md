# The eleventh line

**Status: Decided 2026-09-10, Executed 2026-09-10.**

## Context

`cases/08-the-monolith` declares six pages and the composed mode presents seven. The finding was recorded on 2026-09-09 as unowned, and its arithmetic was paid on 2026-09-10 (the capability checklist's design opens): measured block by block, in both modes, on the presented pages, **every top-level block is the same height in both except one**. The closing 97-word paragraph is 10 lines and 186.7px when the browser wraps it and 11 lines and 205.4px when the Compositor does. That one line is the whole seventh page — the composed run cuts the paragraph at 147 words and carries 15 onto a page that otherwise would not exist.

The paragraph is ordinary prose; its longest word is `break-inside:`. The browser's ten line widths, in a 306.14px measure, are 282.66, 272.16, **305.66**, 299.14, 286.42, 298.25, 277.05, 298.47, 271.58 and 246.39. The third line fills the measure to within **0.48px**.

That number is why this is a round rather than a note. A total-fit that takes an extra line is lawful — css-text-4 §6.5 leaves the choice of break points to the user agent, and `cases/11`, `27` and `29` already record the composed mode choosing different lines from the browser. But the Compositor's own demerits make an eleventh line expensive: every line costs `(10 + badness)²`, badness rises as the cube of the slack, and an eleventh line makes all eleven slacker. A total-fit with a feasible ten-line chain does not choose eleven here. So the suspicion is not that the DP preferred eleven lines but that **it could not see the ten-line chain at all** — that a line the browser fits with half a pixel to spare measures overfull under the Compositor's own width provider.

If that is what it is, it is not §6.5's licence. It is a sub-pixel measurement disagreement wearing that licence, and it is invisible to every check the venue has: fit-by-construction compares each chosen line to the same `avail` the DP used, and the line-count cross-check measures the hinted clone, which has exactly the lines the hints forced.

**Where a disagreement could come from is already visible in the code.** `compose-dom.js` runs two passes over two different layouts. Pass 1 lays out raw clones and takes `avail` from the block's own content box. Pass 2 lays out `white-space: nowrap; width: max-content` clones and reads every span from that single unbroken line. A width read across one 4000px line is not obliged to equal the same words' width at the head of a 306px one — shaping and sub-pixel accumulation both live in that gap — and the whole apparatus is built on their being equal.

## Decision

**Measure which of the two it is before changing anything, and decide on the number.** The question is closed by one reading: take the browser's own ten break points and ask the Compositor's own width provider what each of those ten lines measures. Either the ten-line chain is feasible under the DP's widths — in which case the eleventh line is a demerits choice, lawful, and the case's declaration is what moves — or one of the ten measures over `avail + EPS`, in which case the DP was never offered the chain the browser took and the fault is in the measurement, not in the choice.

**Nothing about the Compositor's prices is on the table in this round.** `LINE_PENALTY`, the badness cap and the hyphen demerits are the tablet's business and are not touched to make a page count come out; that is the venue's own rule about a gate in conflict, applied to a stylesheet's worth of constants.

## Predictions, frozen on write

1. **The ten-line chain is infeasible under the Compositor's own widths.** At least one of the browser's ten lines measures wider than `avail + EPS` (0.05px) through `makeProvider`'s Range over the nowrap clone. HOLD on any line exceeding; BREAK if all ten fit, which makes this a lawful demerits choice and the case's declaration the thing that moves.
2. **The offending line is the third** — the one the browser fills to within 0.48px. BREAK if it is any other line, which would mean the disagreement is larger than a rounding.
3. **The disagreement is under 2px on that span.** BREAK if it is more: a large one is a different fault (a wrong element, a wrong style context) and not an accumulation.
4. **`avail` is not the culprit.** Pass 1's content-box width equals the browser's own content width for that paragraph to within 0.01px, so the disagreement is on the text side, not the measure side.
5. **The instrument cannot say whether this is widespread, and that is the most valuable prediction here.** No check in the venue can see a composition that is one line too long: fit-by-construction compares to the DP's own `avail`, and the line-count cross-check measures a clone that has the lines the hints forced. So a green battery is consistent with this happening in many paragraphs and being noticed only where a page boundary happened to fall. What is owed at close is a count over a real document, not an assurance.

## Consequences

Whichever way it goes, `08-the-monolith` stops being the case family's one standing failure and `gates/PIN.json` becomes recordable again — it has named an engine two rounds old since these failures appeared, and every figure quoted since has been read by hand off the run that took it.

## Verdict

**Prediction 1 broke, and it broke cleanly.** All ten of the browser's lines fit under the Compositor's own width provider, every one of them with room to spare — the third by 0.484px, the rest by 7px or more. The provider and the browser agree to within **0.016px** on every line of the paragraph, which also settles predictions 2 and 3 by removing what they were about, and confirms prediction 4 from the other side: the two passes' layouts do not disagree, and the nowrap max-content clone is a faithful ruler.

**So the DP saw the ten-line chain and refused it, and it was right to by its own prices.** Measured through the Compositor's own formula on both chains, at `avail` 306.14px, `align: left`, a space of 3.063px:

| | browser's ten lines | the engine's eleven |
| :-- | --: | --: |
| total demerits | **713,141** | **527,269** |
| worst line | 484,277 — 29.1px of rag over 5 gaps | 174,100 — 44.0px over 9 |
| second worst | 184,106 — 34.6px over 7 gaps | 126,120 — 23.1px over 5 |

The eleventh line costs 100 demerits and buys the relief of two catastrophic ones. This is total-fit doing exactly what it is for, and css-text-4 §6.5 leaves the choice of break points to the user agent, so the engine's setting is lawful and the case's declaration is what moves. **No price was touched, as the decision said none would be.**

**Prediction 5 is answered with the count it asked for rather than an assurance.** Across all 35 case documents, comparing every flowed block in both modes, **8 blocks of 431 compose longer than the browser wraps them and 1 composes shorter** — in `00-the-realistic-document` (two), `02`, `07`, `08`, `11`, `18` (one each way) and `27`. Six documents, and only this one puts the extra line where a page boundary falls. Cases 11 and 27 already declare their composed column divergent for exactly this reason. So the phenomenon is neither rare nor rampant, it was always there, and the instrument still cannot see it: no check compares a composition's line count against the browser's, which is why a count had to be taken by hand to say this.

**What was too good to be true.** The suspicion this round was opened on — two passes, two layouts, half a pixel — was a good story built out of reading the code rather than measuring it. The two layouts agree to a sixtieth of a pixel. What made the story attractive is that 0.48px of slack on the browser's third line was sitting right there, and a number that small invites a rounding explanation; the actual explanation was three orders of magnitude away, in the demerits, and would have been visible immediately by printing both chains' totals. **Measure the thing you are about to accuse.**

**And a real finding fell out of it, which is on the checklist rather than in this entry.** The ragged stretch model prices a line's rag by `slack / (gaps × spaceWidth)`, cubed — so the same visual rag costs about ten times more on a line of six words than on a line of twelve. In justified setting that is right, because the gaps are what stretch. In ragged setting nothing stretches: the rag is a property of the line's end, and the number of words behind it is an accident. That is what bought the eleventh line here, and it is a tablet-side question about the price of a line, not a repair.

**The consequence this entry promised is paid.** Every case in the family holds, and the battery ran complete for the first time in three rounds — **25 gates of 25, 5.9 minutes, every standing record reproduced** — so `gates/PIN.json` names a live engine again (`d24fed5`, source tree `9bad381`) where it had named `d5209dc` on `editing-tools-cicero` since 2026-09-03, taken from a dirty tree. The previous run of record took 17.1 minutes; this one 5.9, on the same corpus, with the pool the jobs flag gives it.

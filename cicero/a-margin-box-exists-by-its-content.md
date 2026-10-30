# A margin box exists by its content

**Status: Decided 2026-09-15, Executed 2026-09-15.**

## Context

`.claude/NEEDED-FIXES.md` §2.1 asked whether `capture.js`'s `marginBoxesOf` should record a margin box that declares no `content`, on the grounds that a rule or a ground along the foot would otherwise vanish, and that a capture rule silently dropping what it does not understand gets mistaken for a cascade bug. css-page-3 §5.2 answers it: *a page-margin box is generated if and only if the computed value of its content property is not none*, and `content: normal` computes to none. A box with no content does not exist, and measured on 2026-09-15 neither this engine nor Chromium's print paints one. The capture's content gate is the specification's own condition, and §2.1 is not a defect.

The same measurement found what is. The idiom an author writes for a rule along the foot is `content: ""`, which is not none, so the box is generated — Chromium paints its rule. This engine painted it nowhere. `bandWidths` in `margin-boxes.js` decides whether a box is generated from its intrinsic widths, and an empty-string box measures zero on both, so it was treated as not generated and given no width. `packages/essay/cases/50-the-box-without-content` pins it, authored red.

## Decision

**Whether a margin box is generated is decided by its content, and by nothing measured.** `setMarginBox` already receives the distinction — `resolveContent` returns `null` for `none`, `normal` and an absent declaration, and a string, possibly empty, otherwise — so the cell records it (`data-generated`), `layoutBands` passes it to `bandWidths` beside each box's intrinsic pair, and `pair()` takes the flag when it is given instead of inferring it from a width. The intrinsics cache keys on it, since an empty generated box and an ungenerated one measure the same.

**And a box that is not generated paints nothing.** A cell without `data-generated` is hidden. Today a styled ungenerated box escapes painting only because it happens to get no width in a horizontal band; a corner and the six side boxes have fixed tracks, so a ground declared on one of them with no content would paint where §5.2 says there is no box. The hiding is the same condition applied everywhere, not a second rule.

**The width §5.3.2 gives a lone generated middle box is the specification's, not the oracle's.** With neither side box generated, the imaginary AC box is zero, the flex factors are both assumed to be 1, and the middle box takes half the band, centred. Chromium's print gives it the whole band. The text is unambiguous and is followed; the disagreement is recorded in the case, whose paint claim is loose enough to hold both and pins only that the box is generated.

## Consequences

`.claude/NEEDED-FIXES.md` §2.1 closes as a question answered by the specification, pointing here; the checklist's retraction of 2026-08-25 already said `marginBoxesOf` unions correctly and the content gate stands. `marginBoxStylesOf`'s header, which names §2.1 as the open question behind its separate walk, is corrected to say the separation is §5.2's: styles are read for every box, and applied only to a generated one. **Owed**: the width disagreement with Chromium over a lone middle box has no chapter row; **a margin box's own `border` and `padding` are withheld** by `capture.js`'s owned prefixes, the list that keeps the page context's border off the host, so the rule an author draws along a foot with `content: ""` and a `border-top` is still not drawn — measured on this round's first version of the case, which is why the case asks with a ground; and `marginBoxesOf`'s `cssText` regex fallback — reachable when a rule exposes `cssRules` but no box carries content — is text parsing in the geometry path that *a page rule reads its own declarations* said was gone.

## Predictions

Frozen on write.

1. **Case 50 is red before the engine moves on one claim only** — page two's red rule, absent on both Cicero columns — and Chromium is green throughout. BREAK if any other claim is red.
2. **Case 50 goes green on all three columns after**, this engine's rule measuring about 127.6pt wide at about 106.3pt from the sheet's left edge — half the band, centred — against Chromium's full band. BREAK if the width is the full band, which would mean the arithmetic is not §5.3.2's.
3. **No recorded number moves.** Every case that declares margin boxes gives each one content; no corpus seed draws a margin box at all. BREAK on any tally or case moving.

## Verdict

Built in three commits on the round's own branch: the case authored red with this record, the case changed from a rule to a ground, then the engine.

**1 — Red before, on one claim only. HELD, and it had to be held twice.** Against the unfixed engine both Cicero columns failed on page two's red paint alone, and Chromium held throughout. The document was then changed: its empty box had drawn its red with a `border-top`, and after the generation fix the box existed — measured on the presented page, `data-generated` set, visible, 170px wide — and still drew nothing, because a margin box's `border` is withheld by `capture.js`'s owned prefixes. That is a different question, so the case asks with a ground instead, and the red was re-established against the unfixed engine through `ENGINE_DIR`: the same two failures in the same place.

**2 — Green after, the box half the band. HELD.** Case 50 holds on all three columns; the empty middle box measures 170px, 127.5pt of the band's 255.12, centred — §5.3.2's half — against Chromium's full band, both inside the claim's tolerance.

**3 — No recorded number moves. HELD, and it is the whole battery.** `npm run gates` closed **25 of 25 in 7.5 minutes**, every standing record reproduced and every case holding; the pin names `round-the-box-without-content@c24ba9d`.

**What was too good to be true** is the question the round was opened for. §2.1 asked for a change the specification forbids, and the fault worth fixing was beside it; the border finding is a third thing again, filed on the checklist rather than folded in.

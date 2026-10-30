# Two cases from a second stranger

**Status: Decided 2026-08-26, Executed 2026-08-26.**

## Context

The seam has now met two strangers: ZENTE's `manuali` venue (Cicero enters the seam in beta, the margin box leak earns a case/011) and the essay's own `book/`, seen live for the first time this session. Reading `manuali/src/assets/styles/99-mechanics.css` again — with case 15 already closed and its bug fixed — for dressed-page shapes the two existing cases (12, 15) do not yet cover turned up four candidates, put to Egildo, who chose all four: `string()` running heads, recto/verso mirrored dressing, named pages clearing inherited chrome, and relative units in `@page` margins.

Two of the four are not buildable as cases today, and are filed to their homes rather than forced:

- **`string()` running heads** — the checklist (line 156) already retracted the "merge bug" reading and settled the real one: Chromium itself drops `content: string(docTitle)` as an invalid declaration, so the oracle cannot adjudicate a case built on it — the same shape as the parity-forcing gap. The dressed-page chapter's `wanted` list already carries this (`running-heads`, blocked on "string-set designed, not built"); nothing here changes that entry, it only adds the ZENTE citation to the checklist line that already exists.
- **Relative units in `@page` margins** — `toPx` (`capture.js:11`) throws on any unit outside `px|pt|in|cm|mm|q`, and ZENTE's own folio (`font-size: .88rem`) is cited in the checklist (line 155) as the route that exposed it. Fixing it needs a design decision this venue cannot make for itself — "resolve against the root's computed font size" and "refuse by name, I5-fashion" are not equivalent, and the tablet changes only in a design round with Egildo. Added to the dressed-page chapter's `wanted` list below, as its own entry (`relative-page-margins`), separate from the font-descriptor gap it is not the same fault as.

The other two are buildable now, against capability the checklist already marks **built**: margin-box `content` for counters/literals/none (line 19), `:left`/`:right` parity (line 10), named pages (line 11), and the cross-rule union `pageFor` performs (`capture.js:114-133`, `Object.assign` in ascending specificity order — read directly for this entry rather than taken on the checklist's probe-based word for it, since neither case 12 nor case 15 has yet put two *different* margin-box names into one rule set, or a named page against the base rule's boxes, and the checklist's line 156 "no merge bug" claim was read off a probe over the CSSOM, not off a rendered case).

## Decision

**Author two cases in `packages/essay/cases/`, seated in the dressed-page chapter beside 12 and 15.**

- **`16-the-shared-band`** — an unconditional folio (`@bottom-center`, base rule) sharing the bottom band with a parity-conditional literal in the opposite corner (`@bottom-right` on `:right`, `@bottom-left` on `:left`) — ZENTE's own shape, minus `string()`. Exercises box-name-granular merging across rules of *different* specificity landing in the *same* band, which neither 12 (one band, one rule, `:first` only) nor 15 (one band, one box, parity varying only its own margin) puts together.
- **`17-the-borrowed-dress`** — a named `title` page that clears both bands to `content: normal`, an ordinary run of dressed pages, and a second named `interlude` page that declares *nothing* about either band and must inherit the base rule's dress by the same union. Exercises both directions of the same mechanism the a page rule reads its own declarations fix touched: an explicit override winning over an inherited box, and no override at all still resolving to one.

Both are checked with vocabulary the runner already reads (`folio`, `topBand`, their `absentOn`) — no schema change. Where the schema cannot speak (which corner a box actually rendered in — position, never exclusivity, per the family's standing rule) the README says so rather than implying a check that is not there.

**Refused: claiming anything about margin-box `margin-*`/`font-size` rendering.** `marginBoxesOf` (`capture.js:53-73`) reads only a box's `content`; nothing captures a box's own margin or font size today, so ZENTE's negative `margin-right: -10mm` bleed is decorative in these cases, not exercised — stated honestly rather than dressed up as a claim, the same posture case 12's "recorded gap" note already takes for font descriptors.

**Refused: fixing anything before the cases run.** Case 15's own lesson: a case authored and fixed in one motion is a case nobody watched go red or confirmed green for a reason it can name.

## Predictions

Frozen on write, break-versus-hold decided in advance, grounded in a direct read of `capture.js` rather than the checklist's summary of it.

1. **Both cases render correctly on the first run — no throw, no wrong page count, no missing band.** `marginBoxesOf` only ever reads `content` per rule; `pageFor` merges box names via `Object.assign` in ascending specificity order, so a named page's `content: normal` (a truthy string, captured) overwrites an inherited box's counter, and a named page that sets nothing for a box leaves the base's entry standing. Neither path needs new engine code. *Breaks* if either case throws, mispositions a folio, or shows chrome on `title`/misses it on `interlude`.
2. **Chromium prints both documents without incident**, since every declaration used is ordinary, implemented CSS (no `string()`, nothing conditional beyond `:left`/`:right` and named pages, both already surveyed as viable). *Breaks* if the native print's page count needs either case's design revised.
3. **`native.partition: identical` on both** — nothing in either case gives Chromium and Cicero a legal reason to disagree (no C3 packing freedom is exercised; the prose is ordinary, unforced).
4. **No standing tally moves.** `src/` is untouched by this unit of work; `gates/PIN.json`'s content address does not change, and this entry does not run the full battery — it is a venue-only act, same posture the margin box leak earns a case recorded for its own case-authoring half.

## Verdict

**Prediction 1 held for case 16 and broke for case 17 — and the way it broke is the finding.** `16-the-shared-band` runs green outright, both render modes, page for page and word for word against Chromium: the box-name-granular merge across rules of different specificity, landing several *different* boxes in the *same* band, is sound. `17-the-borrowed-dress` does not hold. Its folio half (`@bottom-center`) is exactly as predicted — absent on both title pages, present and counting everywhere else, in both render modes, matching Chromium's own print word for word (7 pages, `native.partition: identical`). Its running-head half (`@top-center`) is not: `THE BORROWED DRESS` prints on both title pages despite the identical override mechanism that correctly cleared the folio on the same pages.

**Read directly, not taken on the checklist's word, `capture.js` is innocent.** A probe against `readGeometryTable(doc).pageFor({name:'title', first:true, parity:'right'})` on the case's own document returns `{'top-center':'normal','bottom-center':'normal'}` — both boxes correctly resolved to nothing, before `resolveContent` ever runs. The fault is downstream: `root.js`'s per-page `marginBoxesFor`/`setMarginBox` call is the only other place these values pass through, and it treats every box in the loop identically — nothing there explains why one box name honors the override and its sibling, set by the same rule, does not. **Unpredicted, and recorded as such.** Neither prediction 1 nor its reasoning anticipated an asymmetry between two boxes cleared by the same declaration in the same rule; this is a wall the reading of `capture.js` alone could not have shown, since `capture.js` is not where it lives.

**Predictions 2 and 3 held.** Chromium prints both documents without incident (6 and 7 pages respectively, matching each case's own geometry), and both native partitions are `identical` — the divergence in case 17 is a Cicero rendering fact against its own claim, never a native-vs-Cicero disagreement.

**Prediction 4 held.** `src/` is untouched; no gate ran, none was owed.

**Too good to be true, checked.** The first hypothesis — that the browser's own still-linked `@page` rule was independently re-fragmenting Cicero's presented DOM and painting a redundant, unnamed-page-only rendering on top of Cicero's shadow-DOM chrome — does not survive: if that were the mechanism, `@bottom-center` would show the same leak `@top-center` does, since both boxes sit in the same author rule and the browser's own cascade does not distinguish them either. It does not, so the cause is narrower than "the browser's native pagination leaks through" and is left unnamed rather than mis-named.

## Consequences

The dressed-page chapter gains two cases (18 total in the family): `16-the-shared-band`, holding outright, and `17-the-borrowed-dress`, **red by design** — the pin for a genuinely new finding, in the same posture case 15 held between the margin box leak earns a case and a page rule reads its own declarations. Filed to the checklist's frontier: a named page's `content: normal` override does not uniformly win over an inherited margin-box value — confirmed sound for `@bottom-center`, confirmed unsound for `@top-center`, in the one case that has tried it, cause undiagnosed beyond "downstream of `capture.js`, inside `root.js`'s per-page delivery or `chase.js`'s shadow cells." Also filed: one new `wanted` entry (`relative-page-margins`, `toPx` throwing on any unit outside `px|pt|in|cm|mm|q`, cited from the checklist's existing line). `capture.js` and every other engine file are untouched by this entry — this was the venue's half of the cycle alone, same shape the margin box leak earns a case took before a page rule reads its own declarations's fix; whoever opens the fixing entry starts from `root.js`'s `present()` loop (line ~126) and `chase.js`'s `setMarginBox`, not from `capture.js`. The checklist gains the ZENTE citation on its existing `string()` line and one new line for this finding; no line is opened for `string()` or relative units beyond the citation, since both were already recorded there before this session began.

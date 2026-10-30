# Where in the band

**Status: Decided 2026-09-07, Executed 2026-09-07.**

## Context

css-page-3 §6.2 is one sentence and a table of sixteen rows: *"Properties used within page or margin contexts take their initial values from their respective property definitions; however, user agents must behave as though the values in the following table were established by rules in the UA default style sheet"* — and then a `text-align` and a `vertical-align` for each of the sixteen page-margin boxes. The Chase's answer to all sixteen was one rule, `.margin-cell { display: flex; align-items: center; justify-content: center }`.

**The table is not centring, and that is the finding rather than the fix.** Eight of the sixteen are centred horizontally and eight are not: `top-left` and `bottom-left` are `left`, `top-right` and `bottom-right` are `right`, and **the four corners align toward the page area** — `top-left-corner` is `right`, `top-right-corner` is `left` — which puts a corner's content beside the page rather than out at the sheet's edge. The only vertical variation is down the two side bands, where the three boxes take `top`, `middle` and `bottom` in turn.

The venue could not see any of it. The book's chapter ten says so in the row's own words: *"a margin box is checked here for what it says rather than for where in its band it says it — which is the honest reason that row is open rather than divergent."* `readPrinted` joined a band's strings and dropped every coordinate. So this round is two things, and the instrument is the half that took the argument.

## Decision

**Three changes: the table, the translation, and the reader.**

**One — the sixteen boxes become a module, and §6.2's table travels with them.** `src/margin-boxes.js` holds the name, the grid seat and both alignments of each. A module of its own for two reasons and neither is tidiness. **The list of sixteen NAMES was written twice** — once in `chase.js`, which builds the cells, and once in `capture.js`, which decides whether an at-rule inside a `@page` rule is a margin box — and two lists of the same sixteen things is the fork the 2026-08-04 account ruling forbids everywhere else. And **a table transcribed from a specification is data worth checking without a browser**, which `chase.js` can never be imported into: defining a custom element needs `HTMLElement` to exist.

**Two — the defaults are UA-sheet rules, and the cascade does the rest.** Sixteen `[data-box]` rules in the page frame's own shadow `<style>`, at (0,2,0). A margin box's OWN declaration beats them, because the page-context sheet is adopted and CSSOM seats an adopted sheet after the shadow root's own style at equal specificity. What a box would INHERIT from the page context does not beat them, because a UA-sheet declaration outranks inheritance — which is exactly what §6.2 asks for, and it is arranged by nothing: `@page { text-align: right }` reaches `.margin-cell` at (0,1,0) and loses, `@bottom-left { text-align: right }` reaches `.margin-cell[data-box="bottom-left"]` at (0,2,0) later in order and wins.

**Three — two properties are translated, and that stays inside the criterion rather than beside it.** A margin cell is a flex container holding one text node, so the text node is an anonymous flex item exactly as wide as its own content: `text-align` on the container moves nothing, and `vertical-align` does not apply to a flex container at all. So both the table and an author's own declarations are expressed through `justify-content` and `align-items`. *The page context dresses the host* withholds a declaration on three grounds and the first is *a property the Chase itself writes*; these are that, in the strictest form. The Chase's cell is a flex box because a flex box is what centres one string in a rectangle, and translating the two properties the specification writes its table in is the price of having chosen the mechanism. **The original is kept beside the translation** rather than replaced by it — `text-align` still governs text inside a box wide enough for more than one line — and a value neither table names rides through untranslated, where the browser will ignore it on a flex container. That is a truthful outcome rather than a silent one.

**Refused: teaching the engine which of Appendix A's fifty properties it supports.** That is the alternative the criterion exists to refuse, and naming two properties the Chase's own mechanism consumes is not a step toward it.

**Four — the print reader carries a band item's extent.** `readPrinted` returns `marginItems: { top, bottom }` with `{ str, x, width }` per item, in points, **beside** the joined strings every existing claim reads. One walk, two readings, which is the discipline `lib/extract.js` already states about its own string path. P30 is why the numbers are trusted: positions in that reader's own source are deterministic across two prints of the same bytes, and a declared margin measures back exact.

**Five — the claim a case may make is a flush EDGE, and it is about the BAND.** `bandX` declares `start`, `center` or `end` rather than a coordinate, and compares against the band's own edges. Two reasons, and both are about what a claim survives. A coordinate would move with the face a machine happens to have installed; **a flush edge would not**, because a string's width changes and where its left edge lands does not. And a claim about a box's own CELL would be a claim about §5.3's sizing algorithm, which is a different section and the one place a grid of equal thirds and the specification genuinely part — whereas with three boxes generated on one band, both models put the first box's cell at the band's left edge and the last box's at its right, so *flush with the band* is a claim both answer the same way.

**Refused: checking `bandX` on Chromium's column.** The runner's rule is that document-level claims are about the engine under study and Chromium's column is evidence rather than a subject; changing that is a venue-contract question and not this round's. Chromium's own behaviour was measured directly instead, and the numbers are in the verdict.

**Refused: the vertical half, and it is refused for want of an instrument rather than of interest.** `left-top`, `left-middle` and `left-bottom` differ from one another only in `vertical-align`, and they sit in the page's SIDE margins, which the print reader does not divide into bands at all — their content would land in the word stream. The engine implements all sixteen rows; four of them are unpinned, and that is filed as an instrument owed rather than approximated.

**Refused: laws.** None moves. This is I4 in its ordinary shape — chrome resolved and delivered as literals, now placed where the specification places it.

## Predictions

Frozen on write.

1. **Chromium honours the table.** *Breaks* if its print centres a `@top-left`, which would make the row a divergence rather than a gap and would want reading the specification again before anything else.
2. **A new case declaring three boxes on each horizontal band goes green on the two flush claims after the change and red on them before it**, with the two centred claims green in both runs. *Breaks* if the centred claims move — that would mean the change reached something other than alignment.
3. **Every existing case is unmoved.** Six of them draw margin boxes, and every claim they make is about a band's text rather than its position. *Breaks* on any case whose result differs, and case 12's letter-spaced top band is the one to watch: its string is wide, its cell may be narrower, and a box that stops being centred is clipped at a different end.
4. **`cases/acceptance.js` keeps its pinned 12 pages in both modes.**
5. **The DOM-free suite gains pins for the table's shape rather than a second transcription of it.** *Breaks* if the only pin anyone can write is the table typed twice.

## Verdict

**Prediction 1 held, and the measurement is exact.** Chromium's print of the new case, on a 340.08pt page with a 28.35pt margin — band from 28.35 to 311.73: `ALEPH` starts at **28.3**, `GIMEL` ends at **312.0**, `BETH` centres at **170.2** against the band's centre of 170.04. The bottom band the same. The table is honoured to a tenth of a point.

**Prediction 2 held exactly.** `cases/31-where-in-the-band` holds on both Cicero columns after the change. Run against the pre-round source through `ENGINE_DIR`, it fails on **four** claims and passes on two: `ALEPH` start 61.9pt against 28.4 wanted, `GIMEL` end 278.0 against 311.7, `DALETH` start 58.6 against 28.4, `WAW` end 274.8 against 311.7 — and `BETH` and `HE`, the controls, green in both runs. Four red and two green is the shape the prediction was frozen against, and it is what makes the two controls worth declaring.

**Prediction 3 held.** The whole case suite was run and diffed against the run taken at the close of the previous round: **identical, line for line, with one line added** — case 31's own heading. 27 checks failing before and after, the same thirteen cases. Case 12's letter-spaced band did not move, which is worth naming since it was the one named in advance.

**Prediction 4 held.** 12 pages presented and printed, native and `--composed` alike.

**Prediction 5 held.** 78 tests to **84**, six in a new `test/margin-boxes.test.js`, and not one of them retypes the table: sixteen boxes each once with a distinct grid seat; **eight centred horizontally and three distinct alignments, not one**, which is the claim the previous implementation violated; the four corners aligning toward the page area; the vertical variation confined to the two side bands; the translation carrying the priority with it, so an author's `!important` does not stop applying; and an untranslatable value riding through rather than being guessed at.

**Too good to be true, checked.** Case 31 went green on its first run against the changed engine, which is unusual enough to be worth distrusting — and the run against the pre-round source is what settles it: the same document, the same reader, four claims red. A green first run against a new check is only evidence when the check has been seen to fail.

**One thing was found and corrected against the assessment that convened this round.** It reads *"only six of sixteen centred horizontally"*, and the chapter's standing row said the same. The table has **eight** centred horizontally: `top-center` and `bottom-center`, and all six boxes down the two side bands. The row now says eight, and the engine's own pin asserts it — a number in a standing row that nobody had counted is exactly the kind of claim this venue exists to stop carrying.

**Two things are owed and named rather than approximated.** The vertical half of the table needs a print reader that divides the SIDE margins into bands, which it does not; and `three-boxes-one-band`, the wanted example for §5.3.2's sizing algorithm, was blocked on this instrument and is not blocked on it any more — its blocker is now the algorithm itself, which is unbuilt, so its `wanted` entry says that instead.

**The battery ran at the close of the rounds (2026-09-07), and no standing number moved for this round — checked by a counterfactual rather than by a tally.** The three gates whose tallies the run disagrees with — `native` (0–199), `composed-v2` (200–299 `--composed`) and `v3-native` (400–449) — were each run a second time against the **pre-round `src/`**, the tree at `1cce345` reached through `ENGINE_DIR`, and the two runs' reports are **identical seed for seed**: 164/18/11/7 native, 84/12/4 composed-v2, 42/6/1/1 v3-native. So the argument above is measured rather than argued: the corpus's generated documents declare `@page { size; margin }` and no margin boxes at all, so no seed generates a cell for this table to align anything in, and the additive reader change reaches no gate's token stream. **The three disagreements with `gates/records.js` are identical before and after these rounds and are therefore not the engine's**; they are the machine's, the record is left standing, and the account is in the repo [CHANGELOG](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/CHANGELOG.md) and in the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) §7. The pin is not rewritten — only a complete run with every gate green may write one, and `cases` and `suite` are red here on a font substitution.

## Consequences

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) does not move.

[`architecture.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md)'s The Chase records that the sixteen boxes and §6.2's table live in one module, and why the cascade rather than an ordering delivers the three-way precedence the section asks for.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s part one §2 records the table as built, with the four unpinned rows named.

Next door: `lib/engines/read-print.js` carries a band item's extent; `cases/runner.js` gains the `bandX` check and `cases/expect-schema.js` its shape; [`cases/31-where-in-the-band`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/31-where-in-the-band/README.md) is authored and held by chapter ten, whose §6.2 row goes from `open` to `settled`, whose `three-boxes-one-band` blocker is rewritten, and which gains a `wanted` entry for the vertical half.

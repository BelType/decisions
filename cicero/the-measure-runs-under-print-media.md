# The measure runs under print media

**Status: Decided 2026-10-06, Executed 2026-10-06.** Egildo's ruling, in the design round that read the seven cases authored from the Vivliostyle probes on 2026-10-05; the build is a fix round of its own, and this entry freezes what it must show.

## Context

The checklist carried two findings read off the source on 2026-09-27 and run on 2026-10-05: *`@page` inside any group rule is never read* and *the measure runs under screen media*. Each now has a case, red in both modes (`packages/essay/cases/86-the-page-rule-inside-the-media-rule`, `packages/essay/cases/89-the-print-rule-that-changes-a-line`). The second case measured the cost. A paragraph a print-only rule narrows is cut on the screen's two-word lines; the print of those pages then applies the rule inside each page, sets the paragraph one word to a line under a flow clipped at the height the cut used, and fifteen of thirty words are on no printed page, with no word said. The composed mode keeps its words only because it writes its lines into the paragraph.

The engine lays the document out on screen because that is where a live browser lays it out; the paper the pages are for is print. The law that a break decision is valid only under render-identical conditions was written against this exact gap, and read either way: make the measure match the print, or make the print match the measure.

## Decision

**The document is measured and cut under print media.** A paged engine is a print user agent; css-page-3 maps the page box to a print surface; Chromium's print, Vivliostyle and WeasyPrint all lay the document out for the paper. So an author's `@media print` block applies to the lines the pages are cut from and to the page rules the geometry is read from, and an `@media screen` block applies to neither.

**The mechanism is the seam's rewrite**, the one source-text pass that already turns what the browser's parser drops into forms it keeps ([*the host rewrites what the parser drops*](the-host-rewrites-what-the-parser-drops.md)): a group rule whose media list is `print` or `all`, with no feature, is opened and its rules stand at its level; a group rule whose media list is `screen` is removed; a list naming both, or carrying a feature — `print and (min-width: …)` — is left as it is, so nothing the browser can decide is decided twice. The rewrite reaches the document's own stylesheets and style elements only, never the engine's interface sheet nor the dressing and press sheets, which say `@media screen` and `@media print` on purpose and must go on saying it. With print blocks opened, the capture reads `@page` where it already reads it — a group rule inside `@supports` or `@layer` stays unread, which is the narrower finding that remains.

**Refused.** *Freezing the screen's lines into every mode's print*, as the composed mode does, would keep the pages whole and leave an author's print rule never printing — a rule the author wrote for exactly this paper. *Refusing a sheet that carries `@media print`* is the honest cheap door the engine takes for geometry it cannot honour, but it would close the door on every real stylesheet, and the fix is one rewrite away. *Walking group rules in the capture alone* would read the page geometry and still cut the lines under the wrong media.

**Left out, named.** Viewport units resolve against the window, and the initial containing block is not the page area; both stay as the checklist records them, outside this ruling.

## Consequences

- The two cases' claims stand as written: the print rule's margin reaches the page, and the narrowed paragraph is cut where its printed lines fall.
- `seam/rewrite.js` grows one more rewrite; `seam/rewrite-document.js` applies it to the document's sheets; the essay's client and the editing tools' dresser take it through the same call and need nothing of their own.
- The checklist's two entries point here; the one on screen media keeps its viewport-unit half open.

## Predictions, frozen on write

1. Case 86 holds in both modes: two pages, the first line of each page starting at 37.5pt, page two opening on `p0w020`, Chromium identical. **Breaks** if either page's first line still starts at 22.5pt.
2. Case 89 holds in both modes: three pages, page two opening on `p0w012`, every word printed once, Chromium identical. **Breaks** if the first mode still prints two pages or loses a word.
3. No other case moves, and the battery's standing records reproduce. **Breaks** on any gate but `cases`, and on any case other than the five red by design (83, 84, 85 and these two) going red.
4. The manual under `--engine cicero` paginates to the same page count as before the build, since BelType's own sheets write no `@media print` block that changes a line. **Breaks** if the count moves; the cause is then a sheet of BelType's, and it is named.

## Verdict

**Prediction 1 held.** Case 86 holds on `cicero` and `cicero-composed` and on Chromium's column: two pages of 150×225pt, the declared first lines of both pages at 37.5pt, page two opening on `p0w020`, every word printed once, and the print identical to the engines' pages.

**Prediction 2 held.** Case 89 holds on both Cicero columns and Chromium's: three pages presented and three printed, page two opening on `p0w012`, every word printed once in order, and the print identical to Chromium's. The first mode no longer loses fifteen of thirty words, because its lines are the print's.

**Prediction 3 held, exactly as written.** The whole case runner reads 90 cases and 87 holding; the three red are 83, 84 and 85, red by design on this branch, and no other case moved. The battery, run on the committed change: the nine tally gates reproduce (`native` 163 agree, 18 legal-divergence, 7 theirs-illegal, 11 unclassified, 1 reference-invalid; `composed-v1` 89, 8, 3; `composed-v2` 86, 10, 4; `v3-native` 43, 5, 1 unclassified, 1; `v3-composed` 28, 1, 1; `v4` 43, 4, 2 unclassified, 1; the three view gates 50, 40 and 30 view-agree), both acceptances, all fifteen probe gates, the browser-backed suites and the engine's own suite are ok, and `cases` is the one gate that fails, on 83, 84 and 85 alone. The long run was stopped once by the shell's own background time limit after `probe-rungs`; the nine gates after it were run in a second invocation with `--only`, so no single run wrote `gates/PIN.json`, which is left as the last complete battery recorded it.

**Prediction 4 held.** The manual under `--engine cicero`, read off `window.__beltypeCicero.last` in the pinned Chromium, is 272 pages in 4.2 s before the change and 272 pages in 4.2 s after, 86 508 flow words accounted both times. The prediction's premise was wrong in one particular and its conclusion stands: the manual does carry a print block, BelType's own — the shell's mechanics sheet writes `@media print { .no-print { display: none !important; } }` (`packages/core/src/shell.js`) — and the console says it opened, *1 @media print/all opened*. It changes no line, since the manual has no `.no-print` element.

**What was not predicted.** The engine's own interface sheet is a `<link>` in the document like any other, and `rewriteDocumentSheets` selected it: written as the record says, the rewrite would have taken the screen backdrop off the screen and put the print surround on it, in every BelType document, silently, with no case to say so. The head fragment now marks the interface sheet and the I5 provision with `data-beltype`, and the walker skips any node carrying it and any node whose id begins `__beltype` (the press sheet's, written under that family of ids); the dressing sheet is adopted and was never a node. The record's own sentence *check how the rewrite selects what it rewrites* was the one that found it, and `test/rewrite.test.js` proves it with the real file: rewritten as a plain sheet the interface text changes, and through the document walk it is not even fetched.

**Two scars of the arrangement, stated.** Removal keeps the newlines of what it removes and opening deletes only the wrapper, so every rule is on the line the author wrote it on and the editing tools' provenance, minted over the rewritten text, still names the author's line; and the pass runs first and its result is what the renames read, so a `string-set` inside a print block is renamed once opened. And the pass leaves alone what the record leaves alone and no more: a `media` attribute on a `<link>` or `<style>`, and an `@import` carrying a media list, are not group rules, so a sheet linked with `media="screen"` still applies while the measure runs, and is not in this verdict's claim.


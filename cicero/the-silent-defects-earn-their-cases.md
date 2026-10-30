# The silent defects earn their cases

**Status: Decided 2026-09-09, Executed 2026-09-09.**

## Context

Three findings sit open on the [capability checklist's](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) design opens, indexed in the repository's [.claude/NEEDED-FIXES.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/NEEDED-FIXES.md), and none of them has a case. They were convened together because they share the property that makes them expensive: **each one produces a wrong result without producing a complaint.** They are unrelated in mechanism and that is not a problem — what a round of this shape is for is the family of faults nothing in the suite can currently see.

- **Two margin boxes on one `@page` kill the Chromium renderer**, found 2026-09-07 by the Caster round. One box paginates; a second, in the same grid row or a different one, ends the tab. There is no console output before it and no exception in the page. It is Cicero's: the identical stylesheet over the identical document survives under `--engine site` and under `--engine pagedjs`. Its live cost is recorded — Caster's own specimen wanted a running head and a folio on one `@page` and declares one box instead, with the reason written into its stylesheet.
- **`@page { margin: var(--outer) }` lays out against a silent zero**, found 2026-08-28. CSS's pending-substitution rule leaves the longhands empty while the shorthand carries the variable, [*a page rule reads its own declarations*](a-page-rule-reads-its-own-declarations.md) reads longhands only, and the margin therefore reads as absent. Chromium's own print honours the same declaration at 34.02pt.
- **A whitespace-free element seam can lose a word**, measured 2026-09-02 with a two-line reproducer. A C10 violation, unaccompanied by any check that goes red for it.

A fourth thing is in the same walk as the first and is a design question rather than a defect: `marginBoxesOf` records a margin box only when it declares `content`, so a box carrying presentation and no content does not exist as far as the geometry table is concerned. Its cost is already on the record — it produced a false diagnosis on 2026-08-25, retracted in `cc721bb`, because **a capture rule that silently drops what it does not understand is indistinguishable from a cascade bug seen from outside.**

## Decision

**Author a case for each of the three before touching `src/`**, by this venue's cycle and on the precedent of [*the margin-box leak earns a case*](the-margin-box-leak-earns-a-case.md). The shapes:

- **The two-box page.** One `@page` declaring a running head and a folio — the shape Caster's specimen wanted and could not have. What it claims is that the document paginates at all, and then that its partition matches Chromium's own print; a renderer that is gone cannot produce either, so the case is red in the plainest possible way while the defect stands.
- **The margin the CSSOM cannot expand.** `@page { margin: var(--outer) }` with the variable declared on the root. The oracle has an opinion here, which is what makes it worth a case rather than a pin: Chromium prints the declared margin, so `pages` and an identical partition pin the content box exactly as they do in *the margin-box leak earns a case*.
- **The seam with no whitespace in it.** The two-line reproducer grown into a document whose every word must appear exactly once and in order — the totality claim, not the page count, since a lost word need not move a boundary.

**And record every margin box the CSSOM presents, with its declarations, letting the consumers decide what a box with no content means.** This is decided here rather than left to the fix because it is a decision and not a repair: the alternative — keep the content-only condition and teach each consumer to ask for what it needs — was refused for the reason the false diagnosis demonstrated, that a table which drops what it cannot use will be read as a table that never received it.

**What is not decided here** is where each fault lives or how it is repaired. The predictions below say what this round expects to find, and the mechanism decisions each get their own entry if they turn out to be decisions at all.

## Predictions

Frozen on write, before anything was run.

1. **The crash still reproduces at HEAD**, on the minimal reproducer recorded in NEEDED-FIXES. *Breaks* if it does not — `src/` has moved since 2026-09-07, and a fault that healed by accident is a finding of its own.
2. **It dies in the capture walk, before any page is composed.** *Breaks* if capture completes and the renderer survives into `chase.js`'s `setMarginBox` or `root.js`'s `#setMarginBoxes`, which would move the suspect from what is read to what is built.
3. **The `var()` case reads Cicero at 0 and Chromium at 34.02pt.** *Breaks* if either number differs — the second would mean the oracle reading was mis-taken, the first that the fault is not the one recorded.
4. **The lost word is visible on the printed page**, not only in a tally. *Breaks* if the page is whole and only the ledger disagrees, which would make it an instrument fault rather than an engine one.
5. **The instrument cannot say *this case crashed the renderer*.** `cases/runner.js` gained a per-case `catch` in [*a page too small to be a page*](a-page-too-small-to-be-a-page.md), and a dead renderer is not a throw: every subsequent CDP call fails with `TargetCloseError`, so the cases after the crashing one die with it. *Breaks* if the runner isolates the crash and reports one case failed with the rest of the run intact — which would be the better world, and would mean the containment is stronger than its author knew.

Prediction 5 is the one the round is most likely to be worth: if it holds, the harness needs a crash path before any fix to the first defect can be trusted, because a green run after the fix would otherwise be green for a reason nobody can name.

## What this decision displaces

The three NEEDED-FIXES entries stop being findings without owners; each gains a case, which is a home that can fail. The checklist's design opens lose their capture-geometry and seam entries as this round closes them, or gain the arithmetic of why they could not be closed.

The margin-box decision displaces the content-only condition in `capture.js` and owes its consumers a reading: `chase.js` and `root.js` currently receive only boxes that have content, and a box carrying a rule along the foot and nothing else must not become a box that prints an empty string.

It owes the book nothing yet. A row moves to `settled` when a case draws it, not when a fix lands.

## Verdict

**Two of the three closed, the third became a bigger finding, and the round's most useful hour was spent on a prediction that broke.**

**Prediction 1 broke: the crash is gone.** Two margin boxes on one `@page` do not kill the renderer at HEAD, in any shape the finding named — one box, two in a grid row, two in different rows, three on a band, boxes carrying `font-family`, `font-size` and `counter(page)`, and all sixteen at once over thirteen pages, every cell filled on every page. Caster's own specimen with its `@top-center` restored paginates to seven pages. It was already closed when it was written down: `cases/31-where-in-the-band` declares six boxes on one rule and has held page for page with Chromium's print since [*where in the band*](where-in-the-band.md) landed on 2026-09-07 — the same day as the measurement, after it. Prediction 2 is unresolvable in consequence, and prediction 5 with it: there is no crash to find out whether the runner can survive.

**What the first defect cost is not the crash.** Its status line named the checklist's design opens as its authority and **the checklist never carried it**, so a finding lived only in the index whose own header says it is never an authority — and went on being quoted as a live blocker in Caster's specimen stylesheet for two days after the suite had begun disproving it. `cycle.md` gives an unfinished finding two homes because both are read by something that can fail; this one was in neither, and nothing failed.

**Prediction 3 half held, and the correction is worth more than the prediction.** Chromium reads the shorthand and prints four pages, as predicted. Cicero read no margin, as predicted. What it laid out against was **not zero**: measured through BelType's own CLI, `@page { margin: var(--outer) }` with `--outer: 12mm` composed against **20mm, the default page rule BelType's own shell inlines** — while a bare document, with no shell and no default, gets the 0 the entry recorded. Both are wrong and only one of them is visible: a zero would have been seen the first time anybody looked at a page, and twenty millimetres is what a careful author might have written. `cases/33-the-shorthand-the-cssom-cannot-expand` was authored red — Chromium four pages, Cicero three, page two opening at Block four rather than Block three, so the count and the word moved together — and holds in all three columns with an identical partition. `src/box-shorthand.js` expands the one-to-four grammar and nothing else; the door opens only where every longhand is empty, which is the pending-substitution state and no other.

**Prediction 4 is unresolved, and the case written to resolve it found something else.** The seam did not reproduce. A sentinel grid — Courier at 12px on a 20px line, five words to a line — set as a thirty-word paragraph and a fifteen-word one inside one section, with no whitespace at the seam, loses fifteen words in the middle of the FIRST paragraph, nowhere near the seam. **The control with a newline between the tags fails identically**, which is what settles it. Nor is it the units (`pt` for `px`, same words lost), nor the measure (doubling the width changes which words go, not that half of them do), nor fragmentation (the widest reproduction is a single page the engine never cut, printing twenty-four of forty-five words where Chromium prints all of them). What is left is on the checklist's frontier as its own entry: **a page filled to its last line prints about half of itself, while agreeing with Chromium about where the boundary falls.** Partition agreement and totality are not the same claim, which is this venue's own standing scar arriving on schedule.

The reproduction is held out of the tree deliberately. In `cases/` it would turn the battery red and it belongs to the round that diagnoses it — the case is what tells a fix that it worked, and a case authored in the fixing round only tells the fix that it agrees with itself. It rebuilds from one rule: thirty words `p0w000`…`p0w029` and fifteen `p1w000`…`p1w014`, one space between each, inside `<section><p>…</p><p>…</p></section>`, under `html { font-family: Courier, monospace; font-size: 12px; line-height: 20px }`, `@page { size: 290px 140px; margin: 20px }`, every margin zero.

**And a third finding arrived from simply running the whole suite**, which nothing in the round set out to do: `08-the-monolith` presents and prints seven pages in the composed mode against a declared six, recorded nowhere. Both it and case 12's known instrument fault **reproduce identically against the pre-round source through `ENGINE_DIR`**, so neither is this round's — measured rather than argued, which is the only reason that sentence is allowed to stand.

**The battery was not run, and here is the judgement.** The only source change is `capture.js`'s margin read, and it fires exclusively where all four longhands come back empty. Every seed and every case declares its page margins in literal lengths, which the CSSOM expands, so no existing document can reach the new branch — and the whole case family was run to confirm it, with the three failures above accounted for on both sides of the change. The pin will read stale until a round that genuinely proves something re-records it.

## Consequences

The `margin` shorthand is read where the browser could not expand it, one level deep: `border: 5px var(--style)` leaves `border-width` empty too and stays unread, named in the code rather than widened.

Three entries stand on the checklist's frontier that were not there this morning — the half-printed page, the composed mode's seventh page, and `run()`'s second call emptying every margin box. Each is a finding in a home that can fail, which is what the first defect's history says is worth the paperwork.

`.claude/NEEDED-FIXES.md` loses its §1.4 to a closure and keeps its §1.3 as fixed. What it has not lost is the property that made §1.4 expensive, and no mechanism here prevents the next entry from claiming an authority that never received it.

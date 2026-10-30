# The composed mode reaches the operator

**Status: Decided 2026-09-10, Executed 2026-09-10.**

## Context

Cicero has two modes. In the native one the browser breaks the lines and the engine reads what it produced; in the **composed** one the Compositor owns every line — Knuth–Plass-shaped total-fit over the paragraph's own candidates, Liang hyphenation computed decision-side, css-text-4 §6.3.2's `hyphenate-character`, §6.3.4's `hyphenate-limit-chars` and §6.4's `overflow-wrap` all read as real inputs, and the chosen lines materialised as forced hints (architecture, The Compositor).

**The second mode has never been reachable from a document.** `paginate`'s `composed` defaults to false (`src/driver.js`), and `seam/client.js`'s `run()` — the only door a served BelType document has — passes nothing. So `--engine cicero` is the native mode and has never been anything else. The composed mode is exercised in exactly one place: `packages/essay`'s own `lib/client.js`, for the differential and the view gate.

That is the wrong side of the line this project draws. **The engine holds what is true and the venue holds how we know**, and today the venue holds a *product path* — the twenty lines that compose a document per page width and hand the result to `present()` live only in the harness. A capability the harness can reach and a document cannot is not a beta feature; it is a feature that exists for its tests.

## Decision

**The composed mode becomes an argument to the engine's own door, and the editing tools carry the switch.**

`run({ composed })` on `window.__beltypeCicero`. Default false, so every existing caller — the shell's bootstrap included — keeps the mode it has today and nothing about `--engine cicero` changes without somebody asking.

**The presentation preparation moves from the venue into the engine.** `composeDocument` already lives in `src/compose-dom.js`; what lived in the harness was the per-page-width grouping around it — blocks by effective page name, one measure context per distinct content width, the resolved records keyed by that width for `present()`. That is engine work by every rule this project keeps, and having it in two places would be the drift its own headers warn about. One exported function, called by the seam's client and by the venue's.

**The editing tools' switch reloads the frame rather than re-running.** `run()` adopts destructively and is not re-entrant — a filed finding, and the tools already know it: a text-resource edit reloads the preview frame for exactly this reason. The mode toggle takes the same road, so this decision needs nothing from the re-entrancy question and does not pretend to answer it.

**Refused for now: a CLI flag.** `beltype --engine cicero --composed` is the obvious next step and it is not this round's. Run behaviour is not configuration ([run-options-are-flags](../project/run-options-are-flags.md)), so a flag would have to cross as `Pipeline`'s `amend` and be spelled at the seam's bootstrap — a real piece of work with its own decision to make about whether an engine option belongs in the run parser at all. Until then the door is open to anyone who calls it: `__beltypeCicero.run({ composed: true })` from the console of any Cicero preview.

**What this does not claim.** The composed mode stays beta with the rest of Cicero, and its standing limits ride with it — chiefly that a block laid out beside a float is not composed at all, and says so on the console every run.

## Predictions, frozen on write

1. **A real BelType document composes.** `test/specimen.md` through the seam with `composed: true` presents pages and prints a page count. BREAK on a throw — the composed path has only ever been fed corpus-shaped and case-shaped documents, and a belt-produced one is neither.
2. **The page count changes, and by little.** Composed lines differ from the browser's, so the count should move; predict within two pages of the native count. A larger move means something other than line choice is different between the paths.
3. **The venue is unaffected.** `packages/essay`'s suites and the whole battery reproduce every standing record, because the function it now imports is the one it used to hold.
4. **The switch survives a toggle both ways.** Composed on, composed off, composed on again in one editing session, each with a correct page count — the frame reload is what makes that true, and if it is not, the re-entrancy finding is the reason and this prediction is how it shows.
5. **The instrument cannot say whether the composed mode is any GOOD on a real document.** Nothing here measures a line's quality, and the venue's own corpus is generated. A page count and an absence of throws is the whole of what a green run says; whether an operator would prefer the result is a judgement nobody in this repository can take for them. What is owed at close is that sentence and a screenshot's worth of honesty, not a claim.

## Consequences

The venue stops holding a path the product needs. The checklist's Compositor rows gain a reachability line — *built* has meant *built and unreachable* for as long as the mode has existed, which is the same shape as the `:blank` row's, and it should read the way that one does.

## Verdict

**Prediction 1 held.** `test/specimen.md` through the seam with `composed: true` presents nine pages and throws nothing — and it is doing the work rather than falling through: nine `__beltype-break` hints in the presented DOM where the native run has none.

**Prediction 2 broke on its number, and the number is the useful part.** It said the page count would move by at most two. The specimen does not move at all — nine pages either way — and `docs/index.md` moves **five**: 139 native pages against 134 composed. A hundred-and-thirty-nine-page document accumulates line differences a nine-page one cannot, and the prediction was written without asking how the two scale. Nothing else differs between the paths; the count moved because the lines did.

**And it cost what the prediction never asked about: 2.1 seconds native against 38.6 seconds composed**, on the same document. That is the fact that shaped the tools' side of this — a mode that expensive is a button an operator presses, not a default and not a setting that persists into tomorrow.

**Prediction 3 held.** The battery ran complete, **25 gates of 25**, every standing record reproduced: the venue imports the function it used to hold and nothing about what it measures changed.

**Prediction 4 held, and it was worth checking rather than reasoning about.** Composed on, off, on in one editing session, nine pages each time — and the check that matters is not the count, which stays truthful even when the engine has been re-entered: after three toggles **every page still carries its running head and its folio**. The frame reload is what makes that true, and the re-entrancy finding stays exactly where it was.

**Prediction 5 stands as written, and this is the sentence it asked for.** Nothing in this repository can say whether the composed mode is any *better* on a document somebody wrote. The corpus is generated, the case family is engineered, and the rag statistics the previous round took are the closest thing to a quality measure anywhere here — they say the arithmetic is sound, not that a reader would prefer the page. A green run says the pages come out, the words are all there, and the hints are real. Whether to leave the switch pressed is the operator's judgement, and there is no instrument here that can take it from them.

**What was too good to be true.** Nothing in the build — but the round's first measurement of the specimen reported *1 page, 22 flow words*, and the cause was a dev server left running on that port by an earlier probe in this same session, serving a different document entirely. Two minutes of believing the engine had broken, spent on a number that was about somebody else's page. The instrument's own address is part of the instrument.

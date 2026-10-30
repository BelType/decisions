# The conditions are the sheets of the document

**Status: Decided 2026-10-22, Executed 2026-10-22.** Convened by a finding of the round [*a resumed run keeps its reads*](a-resumed-run-keeps-its-reads.md), measured the same day on the manual under the editing tools: in a chapter with diagrams, every edit after the first runs whole. Ruled by Egildo on 2026-10-22.

## Context

A resume is taken only under the conditions the prior run ran under, and the conditions key (`seam/client.js`, `conditionsKey`) is the viewport, the pixel ratio, the colour scheme, the count of faces that arrived, and the text of every stylesheet the document wears, `document.styleSheets` less the engine's own litter plus the adopted sheets less the dressing and delivery sheets. A sheet that moved refuses the resume and the run is whole, and the console says which sheet ([*the run resumes from an entry*](the-run-resumes-from-an-entry.md), Decision one).

`document.styleSheets` lists every `<style>` element in the light DOM, and that includes a `<style>` inside an inline `<svg>`. A diagram rendered in the tab (mermaid, drawn after load) carries its own `<style>` inside its `<svg>`, so the key gains a sheet after the first presentation. The engine's copies of a block holding such a diagram, the fragments and composed clones in the root's light DOM, each carry a copy of that `<style>`, so the key moves again whenever a page is built or unbuilt, which windowing does on every scroll. The key never settles, and the resume is refused on every edit for a reason that is not a condition of the document at all.

A diagram's sheet is scoped to its diagram by construction: its rules reach the `<svg>`'s own subtree and nothing outside it. What it changes is one box's extent, and a box's extent is what the rim hears ([*a box announces its own size*](a-box-announces-its-own-size.md), [*a fragment announces its own size*](a-fragment-announces-its-own-size.md)).

## Decision

**The conditions key counts the document's sheets: a sheet whose owner is the document's own, never one inside an `<svg>` and never one inside a copy the engine made.** Two rulings.

1. **A sheet inside an `<svg>` is the diagram's, not the document's.** It is left out of the key and out of the sentence that names a moved sheet. What it changes is the diagram's box, and the size ear hears that where it is drawn. The same holds for a `<style>` inside any element the engine copies: the copy's sheet is a duplicate of the original's and says nothing new.
2. **An author's `<style>` in the body stays a sheet of the document.** The HTML lane admits one, its rules reach the whole document, and a change to it is a change of conditions as before. The line is the owner's place: inside an `<svg>` or inside a fragment, the box's; anywhere else in the light DOM, or linked, or adopted, the document's.

**Refused.** Keying by the count of sheets instead of their text (a sheet whose text moved is a moved condition, and the count would miss it). Leaving out every `<style>` in the body (an author's is a condition). A flag on diagrams (the owner's place already says it, and a diagram library writes no flag).

## Predictions, frozen on write

Judged at the round's close in the Verdict.

1. **Red first.** A pin in `packages/essay/test/` on a document of several pages with an inline `<svg>` on page two that gains a `<style>` after the first run, as a diagram drawn late does: before the fold a patch of a paragraph on page four is refused (`resumed` null, `why` naming a sheet), after it the resume is taken and its Ledger equals a fresh run's; and with the document windowed, pages built and unbuilt by scrolling, the key does not move between two edits. Both modes.
2. **An author's `<style>` in the body still counts.** The same pin changes the text of a `<style>` element in the body between two runs; the resume is refused and `why` names it, before and after the fold.
3. **The manual's chapter with diagrams resumes.** Under the editing tools, two edits in succession in `docs/architecture.md` both resume, measured by the frame's `resumed`; before the fold the second runs whole.
4. **Every standing battery record reproduces**, and the editing-tools suite is green; `resume-converges`, `resume-patch` and `preview-resumes` pass unchanged.

## Verdict

Executed 2026-10-22 on `round/the-conditions-are-the-documents-sheets`. The fold is one filter in `seam/client.js`: `wornSheets`, and through it the key and `sheetLabels`, leaves out a sheet whose owner stands inside `svg, [data-beltype~="fragment"]`. The copy is found by the fragment word because the word is true by construction: `data-beltype.js` defines `fragment` as the root of every copy the engine appends to `<beltype-root>`, and every site that appends one writes it; the other spelling, any element under the root that is not an original, would need the intake's lists beside every owner and say the same thing.

1. **Red first: held.** `packages/essay/test/conditions-sheets.test.js`, written and committed before the fold. A `<svg>` on page two gaining a `<style>` after the run refused the patch on page four in both modes (*the document wore 2 stylesheets and now wears 3*); with 400 paragraphs, 137 pages built only near the reader, the reader at the end for the first edit and back at the diagram for the second, both edits were refused in both modes, the second by the copies (*3 and now 4*). After the fold all four resume, and the first's Ledger is byte-equal to a fresh frame's over the same document.
2. **An author's `<style>` in the body still counts: held.** The same pin changes the text of `<style id="author">` between two runs; the resume is refused and `why` names `#author`, before the fold and after, in both modes.
3. **The manual's chapter with diagrams resumes: held.** `docs/architecture.md` under the editing tools (root `.`, Cicero's pane, 24 `<style>` elements inside `<svg>`s at load), three edits in succession through `setDoc`, the frame scrolled to the end, to the top and to the end before each. Before the fold the first resumed (145 ms) and the second and third ran whole (268 and 259 ms; *29 stylesheets and now 30*, *20 and now 30*); after it all three resume, pages 1 to 2, 1 to 2 and 2 to 3, in 148, 139 and 127 ms.
4. **Every standing record reproduces: held.** 26 gates of 26 in 7.9 minutes against `f86e2fc`, the pin standing; root `npm test` 411 of 411, `npm run check` green, the essay's suite 211 of 211, the editing tools' 105 of 105; `resume-converges`, `resume-patch` and `preview-resumes` unchanged and green.

**What the record did not foresee.** On the manual the diagrams are drawn before Cicero's first run, so no sheet arrives late: the key moved only by the copies, as windowing built and unbuilt the diagrams' pages under a reader who scrolled, and a session of edits with the reader standing still resumed on `main` as well. The fault the record convened on is the windowing half; the late-drawn half is the pin's first test.

## Consequences

- **Displaced**: a diagram's sheet in the key; the whole runs it caused.
- **Owed**: the owner test in `wornSheets` and `sheetLabels`; the pin; the client's header sentence on the key; the resume record's Verdict gains one sentence pointing here; the checklist's resumable-run entry where it lists the roads that still run whole; the CHANGELOG under this date.
- **Not owed here**: hearing a diagram that renders late (the rim's element and size kinds already do); the composed mode's presentation index.
- **Where the content lives**: the mechanism in `seam/client.js`, the proof in `packages/essay/test/`, the status in the checklist, the story in the CHANGELOG.

# The engine asks the document for its sheets

**Status: Decided 2026-10-20, Executed 2026-10-20.**

## Context

The editing tools can keep their print frame between exports and re-seat it on a new copy of the document with `document.open()`, which keeps the `Window`, the `Document` object and the module map (*the fonts stage, measured*, [Caster's DESIGN.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/caster/DESIGN.md) S87). The host empties the document's `adoptedStyleSheets` on each re-seat, because the first dressing's sheets left in place made the second run cut two pages differently. Under Paged.js the second print in a kept frame was the first one operator for operator; under Cicero seven pages moved. The question put to this record was whether something of a first run outlives the re-seat in the engine's shared modules, and whether the engine should offer a door to take a new document in one realm, or say that one realm serves one document.

The hunt measured the answer (*a kept frame gives back the same file*, Caster's DESIGN.md S89). Two causes, each removed alone and then together over the specimen: with neither fix pages 1, 2, 4, 5, 6, 7 and 9 move, with only the first 1 and 2, with only the second 4, 5, 6, 7 and 9, with both none.

- **The engine's.** `root.js` made its dressing sheet and its breaks sheet once per realm, adopted them, and kept only the memory that it had: `ensureDressingSheet` returned at once when the sheet existed. After the host emptied `adoptedStyleSheets` the second run went without both. Of the dressing sheet's rules, `${RESUMED}::first-letter { all: unset }` alone accounts for the five pages, measured rule by rule: its presence makes Blink build a first-letter box on every piece that resumes, which moves the justified gaps of the first line by one layout unit.
- **The host's.** The editing tools call Caster's `prepare()` before Cicero's `run()`, right after the dressing, which re-creates the document's `FontFace` objects. The preparation measures a shape marker's ascent in the marker's own face, and the faces stood `unloaded`: the six discs of pages 1 and 2 took a fallback face's ascent, 13 px for Crimson Text's 14. A new frame's capability load, about 40 ms, had always given the faces time by accident; a kept frame's took 1.6 ms.

## Decision

**The engine asks the document whether it wears the engine's sheets, every run, and offers no reset.** `ensureDressingSheet` re-adopts both sheets when the document no longer carries them, which is what `reads.js` already did for its delivery and hiding sheets. The sheets themselves stay one per realm: a constructed sheet is bound to its realm, and the document they are adopted into is the same `Document` object after `document.open()`.

**Refused: a reset door** (a `reset()` on the engine's handle, or a per-run state the client owns). The one state that changed the file was not a cache of the first document but a memory of an act on it, and a memory of an act is answered by looking at the document, not by forgetting. A door would also be one more thing every host must know to call, and the host that needed it is the one that removed the sheets.

**Refused: one realm, one document.** Every other realm-level state the survey read either is keyed by the measurement's own inputs (the margin boxes' intrinsic widths, the hyphenation tries, the rewrite's table of argument hashes), keyed by nodes the new document does not share, or registers a custom property with the definition every document gets. None of it moved a word or a gap, and the kept frame's saving is the realm.

**The studio's use is untouched.** It runs one document in one realm with `run()` and `run({ resumeAt })` and never removes an adopted sheet, so the early return is the path it always takes. Neither of its two recorded divergences between a resumed run and a whole run is explained by this hunt.

## Consequences

- `src/root.js`'s `ensureDressingSheet` carries the check and cites this record; Caster's `test/kept-frame.test.js` asserts every content stream under both engines where it held a `todo` for Cicero.
- The editing tools' `printOnce` forces a layout and awaits `document.fonts.ready` before the preparation, under both engines. That is the host's half and is recorded in S89, not here.
- **The same fault, unmeasured, in two seats of `dressing.js`**: `ensureDressing` answers its remembered record, so the words sheet (seated only where the provision does not carry the rules) and the values sheet (only once a stylesheet names `--beltype-slice`) are not re-adopted after a host empties the sheets. BelType's provision carries the rules and the specimen names no value property, so no case is red. Filed in `.claude/NEEDED-FIXES.md`, to be fixed when a case makes it red.
- **Read, not measured:** a re-seat leaves the old client's listeners in place, the rim's `loadingdone` on the shared `FontFaceSet` and its `beltype:change` on the shared `Document`; their default action calls `window.__beltypeCicero`, which is the new client's handle, so the worst is a redundant run. And the rim's record of announced faces is realm-wide, so a face the first document loaded is not news to the second: a second run that began before such a face loaded would not be re-run for it. The host's font wait covers the print; the preview pane does not re-seat.

# A facsimile with no alt warns for an editor

**Status: Decided 2026-11-08, Executed 2026-11-08.** One of Egildo's rulings of the day covered three quick-rulings rows at once, *critic1-fault-isolation*, *new-facsimile-intake* and *new-wait-timeouts*: a missing alt warns in the editor by figure and the print refuses as today, and the editor's image and font waits race a timeout, the page accounted provisional and redrawn on late truth. This record is the engine's half; the timeouts are the host's and are recorded in its CHANGELOG ([prosemirror-beltype](https://codeberg.org/BelType/prosemirror-beltype/src/commit/3eef7f4c77a21dce66ecc2c245539197404413dc/CHANGELOG.md)). Built on Cicero's `fix/facsimile-warns-in-editor`, released in 0.1.10; SPEC XIII.2 names the option.

## Context

`install(doc, present)` in `seam/facsimile.ts` refused a PDF embed whose fallback image has no `alt` by throwing at intake, so an editor built on the engine failed every page of a document that held one: an author who had not yet written the alternative text had no pages to write it beside. The refusal exists for the print, where Caster's structure walk refuses a figure with no description under PDF/UA-2 by name, and the intake had been made to agree with the print in advance.

## Decision

**The intake warns where the print refuses, when the host asks for it.** `install` takes a third argument, `{ missingAlt?: 'refuse' | 'warn' }`, default `'refuse'`, which keeps the throw and its wording. Under `'warn'` each such source is told once by `console.warn`, by its `data` URL, naming the element as the throw does, keyed as a drawing failure is told, so a host's copies and per-slice installs add no warning. Its copy carries no `role` and no `aria-label`, so Caster's walk refuses it at print by name as before: the fault is isolated to the print, where it belongs, and the editor shows the pages.

**Refused.** Warning by default: a host that prints and never edits wants the refusal where it is. Inventing an alternative text for the copy: a description the author did not write is a claim the file would make in the author's name.

## Consequences

- `seam/facsimile.ts` takes the option; SPEC XIII.2 names it. `test/browser/facsimile.browser.ts` holds both modes, and a fifth case holds that one source told once stays told across copies.
- prosemirror-beltype's `takeFacsimile` passes `'warn'`; its test skipped under Cicero 0.1.9 and runs under the 0.1.10 pin.
- Caster's side of the same day: under `standard: 'none'` a missing description is a warning and the figure prints with no `/Alt`; under `'ua-2'` the refusal is unchanged ([*PDF/UA-2 is a flag, not a given*](../project/pdf-ua-2-is-a-flag-not-a-given.md), amended).

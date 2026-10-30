# The printer guesses, says so, and withdraws the claim

**Status: Decided 2026-10-20, Executed 2026-10-20.** Amended 2026-10-20: the default flipped to `'infer'` the same day, at Egildo's call once the determina printed; `'refuse'` stays as the strict mode. Decided with Egildo after the bench's determina specimen was refused; built the same day. The measurements and the rule are *the printer guesses, says so, and withdraws the claim* (`packages/caster/DESIGN.md` S90).

## Context

Caster writes a tagged PDF and stamps it PDF/UA-2 in the XMP. Its walker's one rule is that a tag is a claim about meaning, and guessing is the failure mode the design refuses, so every custom element was an `UnknownElementError`. The bench (a sibling folder that compares paginators on fixed specimens) carries a determina from the ADM2 project whose `<dm-variable>` elements are custom elements with no meaning a tag could name, and Caster alone of the four engines could not print it. ARIA roles were read in three places only (a layout table, a labelled background, an inline SVG), and `aria-hidden="true"`, which the refusal offered as the way to declare an element decorative, was honoured on `<svg>` alone.

## Measured

- The determina carries six `<dm-variable>`; two sit in the running header, which Cicero lifts into the margin as artifact copies, and the walk meets four: three inline in paragraphs and one grid item, blockified, holding direct text.
- Under `infer` it prints four pages with four guesses and no `pdfuaid` in the XMP. veraPDF 1.30.2 forced to its PDF/UA-2 profile passes 1 726 rules and fails one, ISO 14289-2 clause 5 t1, the missing identification.
- No belt plugin, no Caster or editing tools fixture and no engine writes a `role` today. Cicero writes `aria-hidden="true"` on every continuation and every repeated copy.

## Decision

**A flag, `unknownElements: 'refuse' | 'infer'`, default `'infer'`** (decided `'refuse'`, flipped the same day)**.** Under `'infer'` the printer guesses only where told: a custom element with no role is walked as CSS laid it out, the `<span>` rule inline and the `<div>` rule as a block, the one guess the walk already trusts for elements with no meaning of their own. It says so for every guess, in `report.inferred` and one warning each, and it withdraws the claim: `report.conformance` is `'tagged'` and the XMP carries no PDF/UA-2 identification. A file with a guess in it is a tagged PDF with declared uncertainty, not a PDF/UA file.

**ARIA roles with a standard PDF mapping are honoured in both modes, on every element, native ones included**, since ARIA's own rule is that a role overrides native semantics. A declared role is a declaration, not a guess. A role that leaves out what the tag needs (`heading` without `aria-level`, `img` without `aria-label`, `listitem` outside a list) refuses naming the attribute; a role with no mapping is a warning.

**`bt-` and `beltype-` elements are never inferred**: the engine's marks and the editing tools' chrome inside a printed document are a defect of the host, not a vocabulary gap.

**`aria-hidden="true"` is an artifact on any element.**

## Consequences

A document that prints today prints the same unless an author wrote one of the mapped roles or `aria-hidden`, and then it prints as the role says: the outline can grow. A document a custom element refused prints under the default, its guesses declared and the PDF/UA-2 claim withdrawn; `'refuse'` keeps the old strictness. Every host that shows Caster's warnings shows the guesses with no work of its own; the editing tools' panel and the studio's pane each carry the flag's row, and the studio's print check pins its pane to Caster's table.

## Refused

- Inferring lists and tables. A custom element laid out as `list-item` or `table-cell` prints as a block, and its warning names the display.
- Keeping the PDF/UA-2 stamp on a file with a guess in it. The stamp is the claim the guess cannot support.
- ARIA's default `aria-level` of 2 for a heading role with none. The level places the heading in the outline, and the printer does not supply one.

## Open

- The CLI's `--printer caster` takes no Caster option, so the flag reaches a print only through a host that calls `print()` itself.

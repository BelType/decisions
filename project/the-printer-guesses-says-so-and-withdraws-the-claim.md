# The printer guesses, says so, and withdraws the claim

**Status: Decided 2026-10-20, Executed 2026-10-20.** Amended 2026-10-20: the default flipped to `'infer'` the same day, at Egildo's call once the determina printed; `'refuse'` stays as the strict mode. Decided with Egildo after the bench's determina specimen was refused; built the same day. The measurements and the rule are *the printer guesses, says so, and withdraws the claim* (`packages/caster/DESIGN.md` S90). Amended 2026-11-08 under Consequences: the report confesses where, and the CLI's check excuses a tile only inside a confession.

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

**Amended 2026-11-08: the report confesses where, and the CLI's check is a gate that excuses a tile only inside a confession.** Three of Egildo's rulings of the day, on the quick-rulings rows *check-wording-and-gate*, *check-tile-gate* and *check-deliberate-differences*; built on Caster's `fix/report-confesses-where` (released in 0.2.4, [`CHANGELOG.md`](https://codeberg.org/BelType/caster/src/commit/fc6b20bc200204508ff32f1c9af5417b3bae690b/CHANGELOG.md), S90 amended) and the CLI's `fix/check-gate` (merged, [`CHANGELOG.md`](https://codeberg.org/BelType/cli/src/commit/9a4afbbc5b9aafcfdfda1322c567561296ba9cd8/CHANGELOG.md), unreleased). **The report.** A new list, `confessions`, holds one entry per transform or guess, `{ page, kind, rect, element, note }`, the region in CSS px of the presented page's own frame. The kinds: `black-text`, `cmyk-text`, `cmyk-shading` (a gradient painted from its `--pdf-background` hint's `device-cmyk()` stops), `cmyk-image`, `undecodable-image`, `raster-shadow`, `raster`, `blend` and `opacity`. No corpus file moved; each recorded report gained the field. **The gate.** `beltype print --check` compares the file with the pages Cicero presented in the same run, the proof that the printer drew what the engine cut, and fails the run after the report: a page whose share of differing pixels crosses 3.5 %, whose worst 24 px tile crosses 40 %, or a page count that differs. Both floors were measured on Caster's corpus, sixteen documents and 37 pages: the share's median 0.73 %, the highest text page 1.76 %, the floor about twice that, a page drawn blank reading 5 %; the tile's highest clean text page 19.6 % and picture page 17.7 %, so both kinds take 40 %, and the acceptance suite's 120 by 30 px block covers at least 62.5 % of some tile wherever it falls. Five picture pages read 44 to 100 % and each was a real disagreement, black text, a CMYK JPEG's band, a JPEG the browser cannot decode, a shadow drawn as a raster, a blend. `--check=report` keeps the report alone, and a bled page is aligned on its trim before the diff. **The excuse.** A tile over its floor passes where the report confessed a region over it: each region, grown by one pixel of slip, covers the screenshot's pixels, and a tile is excused when what differs outside every cover, counted against what lies outside, is at or under the floor; a tile wholly inside is excused, one straddling an edge only when its outside part would pass alone. The page's line names the confession, `check.json` carries the excused tiles with their kind and element, and the share is never excused. Against Caster 0.2.4: roads, images and arithmetic pass with their tiles excused by `black-text`, `cmyk-image` and `undecodable-image`; vector-roads' page 2 has 28 tiles excused by `opacity` and `blend` and its CMYK shading confessed last. The block painted outside every region still fails. The CLI's pinned Caster 0.1.7 confesses nothing, so nothing is excused until its pin moves. The Open item below stands: the CLI's `--printer caster` still takes no Caster option.

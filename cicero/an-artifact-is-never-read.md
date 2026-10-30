# An artifact is never read

**Status: Decided 2026-10-17, Executed 2026-10-17.** Ruled by Egildo on 2026-10-17, in a design conversation about repeating and moving content across pages. It settles what the `artifact` word means, which [*the header repeats*](the-header-repeats.md) introduced and left with two readers that disagree. The round that builds it is `.claude/plans/an-artifact-is-never-read/plan.md`.

## Context

The engine repeats four kinds of copy: a running element's copy in a margin cell, a fixed box's copy on every page, a divided table's header and footer groups, and a divided block's continuation. Two signals say which copy a reader reads, and they are set in five places with five rules.

- **`aria-hidden`, for a screen reader on screen.** `root.js` hides a running element's copy after page one, a fixed box's copy after page one, every carried float's continuation, and a divided block's continuation unless the page before showed a constructed first fragment. A table group's copy is not hidden by its own rule.
- **`artifact`, for the PDF.** Written on every running element copy (page one's included), on a fixed box's copy after page one, and on every table group copy (`fragments.js`'s `putAway`).

Read side by side, they disagree in two places. **A running element's copy on page one** is an artifact, so Caster prints it as pagination and leaves it out of the structure tree, while a screen reader on screen reads it. **A fixed box's copy after page one** wears `artifact`, but Caster's interval reader excludes it (`[data-beltype~="artifact"]:not([data-beltype~="fixed"])` in `packages/caster/src/adapters/intervals.js`), with a comment calling it "a repeat of a source already presented, not furniture". That exclusion is not a second meaning of the word. It is a deferral: Caster's DESIGN.md S77 kept fixed copies on their old path so its PDFs would stay byte-identical, and S76 just before it records the result as a defect, a `P` of content on every page after the first. .claude/NEEDED-FIXES.md carries it as a finding.

In conversation the alternative was a second word, `repeat`, for content shown again but read elsewhere. Reading Caster's record removed the reason for it.

## Decision

**Everything the author wrote is read exactly once. Every other copy wears `artifact`, and the word means what PDF means by it (ISO 32000-2 §14.8.2.2: content that is not part of the authored content, pagination furniture among it) and nothing else.** Three rulings follow.

1. **One meaning, one word.** No `repeat` word is added. Caster reads `artifact` on a fixed box's copies like any other, and its carve-out goes.
2. **An artifact is never read on screen either.** Every element wearing `artifact` is also `aria-hidden`. The rule runs one way only: a continuation stays `aria-hidden` without being an artifact. On screen the original is read whole on its first page and clipped by the flow, while in the PDF each piece is content and Caster partitions the words among them, so the two readers are right to differ there.
3. **A running element is furniture on every page, page one included.** Its copy on page one becomes `aria-hidden` like the rest. PDF/UA treats a running head as pagination, Caster already prints it so, and the Paged.js adapter does the same (Caster's S60). The cost is owned: content an author moves into a margin with `position: running()` is in no reading order, on screen or in the PDF, because the author chose the margin for it.

**What stays as it is.** A fixed box's copy on page one is the reading copy: content, not hidden. A table group's source is read once, where Caster's S78 already places it in the structure tree, and every copy is an artifact. A constructed first fragment is the reading copy of its block.

**Refused:** a second word for "a repeat of content read elsewhere", since every case it would name is pagination furniture to PDF; reading a running element's copy on page one as content, the way a fixed box's is, because a running head is the standard's own example of a pagination artifact.

## Predictions

Frozen on write, judged at the round's close.

- **No cut moves.** `aria-hidden` is not a layout input, so the battery's every recorded number stands and `npm run pin` reports no change. Break: any page count, partition or tally differs.
- **Caster's printed fixtures are byte-identical except where a fixed box repeats.** The specimen under both engines, the margins fixture under both and the table-repeat fixture print the same PDFs before and after. Break: any of them differs.
- **Where a fixed box repeats, it leaves the structure tree after page one.** Its words appear once under `Document` and as a Pagination artifact on every later page, with the conservation of words (Caster's DESIGN.md S61) satisfied. Break: a `P` for the box on any page after the first, or a refusal.

## Consequences

- `root.js`'s running element copy is `aria-hidden` on every page. A table group copy that `putAway` keeps is `aria-hidden` too.
- `data-beltype.js`'s entry for `artifact`, and the table in `docs/reference.md` that mirrors it, state the one meaning and that it implies `aria-hidden`.
- One check holds the rule: every element wearing `artifact` in a presentation is `aria-hidden` or inside an element that is.
- Caster's carve-out goes, and a fixed box's copy after page one is printed as a Pagination artifact with no subtype. Its entry is Caster's DESIGN.md S82.
- The finding in .claude/NEEDED-FIXES.md that a repeated fixed box is tagged as content points here.
- Left standing: under Paged.js the preview's running element copies are Paged.js's own DOM and are not hidden from a screen reader there. Owed to the studio from *the header repeats*, unchanged: its caret and selection skip `artifact`.

## Verdict

Judged 2026-10-17 against the predictions as frozen. Numbers are in `.claude/plans/an-artifact-is-never-read/results.md`.

- **No cut moves: held.** The battery ran complete, 26 gates of 26 ok in 7.8 minutes, and `npm run pin` says the records stand for the branch's tree. The only lines of `packages/essay/RESULTS.md` that changed are the pin block's provenance (branch, commit, tree, duration); no recorded number moved.
- **Caster's printed fixtures are byte-identical except where a fixed box repeats: held, on the dumps.** The specimen under Cicero and under Paged.js (the editing tools' print panel and the CLI door), the margins fixture under both engines and the table-repeat fixture have identical decoded content streams and structure trees before and after. The files themselves differ between two prints of one build, so the dumps are what could be compared. Two outputs moved, both fixed-box repeats: the new fixture's, and the pairing fixture's nested fixed box, whose rail on page two left the tree for a Pagination artifact. The plan had listed the second among the unchanged files; the prediction's own exception covers it.
- **Where a fixed box repeats, it leaves the structure tree after page one: held.** The new fixture has 45 `P` elements (44 lines and the notice once) against 47 before; pages two and three each draw `/Artifact <</Type /Pagination>> BDC` and page one draws none; the export reports no error, so the conservation of words held.

What the prediction did not foresee: the walk looks through an element the engine marks (`fixed` is one) before it asks for an artifact kind, so stamping the copy was not enough, and the adapter's transparency answer had to exclude a stamped copy. Caster's DESIGN.md S82 records it.

# The outer display decides

**Status: Decided 2026-09-29, Executed 2026-09-29.** Convened by the fix round for case 72 (`cicero/outer-display-decides`), one of three parallel branches cut from `c6c198b`; the rivals were read before any source changed, and the computed displays below were measured in the runner's Chromium before the rule was written.

## Context

`word-space.js`' `isInlineBox` answered the procession's one question — is this box inline-level? — by asking whether its computed `display` begins with `inline`. CSS Display §2.1 writes `display` as an outer and an inner type, and a computed value serializes in its shortest form, so an inline-level box need not be spelled `inline-*`. *[The procession stops at an atom](the-procession-stops-at-an-atom.md)* measured the consequence and filed it: an inline `<math>` computes `math`, the prefix test reads it as block-level, and the formula — an atom since that round, so never entered — was still seated as one block child of its paragraph. The paragraph was then a composite with no line stack.

[`packages/essay/cases/72-the-formula-in-the-divided-paragraph`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/72-the-formula-in-the-divided-paragraph/README.md) draws it on case 70's page: a paragraph of thirteen words with a 112.8×7.7px formula alone on its line nine, straddling the foot. Chromium divides it after line twelve and opens page two on `p1w008`. Both of the engine's modes offered only the paragraph's end gap, `class C, pos 32, path [1], word null, 60px remaining`: page two opened under a 60px blank shell and `p1w008` to `p1w012` were on no page. The case's second half, a three-row `<math display="block">` across the next foot, was green, and by the same prefix test: `'block math'.startsWith('inline')` is false too. So the fix had to read `math` as inline-level and keep reading `block math` as block-level; a test that asked whether the display *mentions* `math` turns the green half red.

**Measured in the runner's Chromium, 153.0.8010.12**, a scratch document, deleted after:

| Element or declared value | Computed `display` |
| :-- | :-- |
| an inline `<math>`; `display: inline math` on it | `math` |
| `<math display="block">`; every `<mi>` and `<mo>`, inline formula or not | `block math` |
| `<ruby>`; `display: inline ruby` | `ruby` |
| `<rt>` | `ruby-text` |
| `display: block ruby` | `block ruby` |
| an inline `<svg>`; its `<text>` | `inline`; `block` |
| `display: inline flow-root` / `block flow-root` / `block flow` | `inline-block` / `flow-root` / `block` |
| `display: inline flex` / `block flex` | `inline-flex` / `flex` |
| `display: inline list-item` / `flow-root list-item` / `inline flow-root list-item` | each as written |
| `display: -webkit-box` / `-webkit-inline-box` | each as written |
| `display: math` or `inline math` on an HTML `<span>` | `inline` (and `block math` there computes `block`) |
| `display: run-in`, `ruby-base`, `grid-lanes`, `masonry` | invalid; the span keeps `inline` |

Three readings of the table decide the shape of the rule. Chromium serializes the outer keyword first whenever it writes two, so a multi-keyword value is inline-level exactly when one keyword is `inline`. A single keyword is either an `inline-*` legacy value, a pure outer (`block`), or an inner type standing alone, whose outer type §2.1 supplies. And two values a list of block-level displays would have to remember — `-webkit-box`, which every line-clamp recipe writes, and `flow-root list-item` — are block-level and not spelled `block`.

## What the rivals do

Read before designing; case 72's README ran fragmentainers on the case and read the other three.

**fragmentainers** (0.0.7, `package/src/layout/layout-node.js`), and **pagedNG** through it, answers the question twice. `classifyNode` is a fixed `BLOCK_DISPLAYS` list — `block`, `flow-root`, `flex`, `grid`, `table`, `list-item`, `flow-root list-item` and the table parts — with *everything else inline*; `isInlineFormattingContext` is a fixed `INLINE_DISPLAYS` list, `inline` and the four `inline-*`, with everything else block content. The two lists disagree about `math`, `ruby`, `block math`, `block ruby` and `-webkit-box`, and on case 72 the disagreement dropped the paragraph's text and printed only its formula, thirteen words on no page. **Taken: ONE predicate**, which every reader here now asks. **Refused: the block list with inline as the default.** Its own comment cites Display §2.5 for `flow-root`, and it still reads `block math` and `block ruby` as inline-level and `-webkit-box` as inline — the list has to grow by one entry every time a value is spelled a new way, and the default it falls to is the wrong one.

**WeasyPrint** (`weasyprint/css/validation/properties.py`, `display`) parses a value into its keywords and fills the missing ones with §2.1's defaults, `outside = outside or 'block'` and `inside = inside or 'flow'`, so every reader downstream asks the outer keyword of a tuple. **Taken: the rule itself** — the outer display is the keyword that says so, and where none does it is `block`. It has no MathML and no ruby: its validator rejects `math` and `ruby`, so a `<math>` stays `inline` and its formula is text of its paragraph. Nothing to take there.

**Paged.js classic** never reads a display to decide a break: `chunker/layout.js`'s `findOverflow` compares rectangles, so an inline formula is a rectangle on a line like any other. Nothing to take or refuse.

**Chromium** computes `<mi>` and `<mo>` inside an inline formula as `block math`, so any reading that descends into a formula sees block-level boxes. What keeps the procession out is the atom clause, not this predicate: `blockChildrenOf` asks `isAtom` before it asks `isInlineBox`, and never enters an atom whichever face it has.

## Decision

**The outer display decides, in one predicate.** `word-space.js`' `isInlineLevel(display)` reads a computed value: a value of two or more keywords is inline-level exactly when one of them is `inline`; a value of one keyword is inline-level when it is an `inline-*` value, the legacy `-webkit-inline-box`, or one of the two inner types whose outer default is inline — `ruby` with its internal `ruby-*` boxes (CSS Display §2.1: *"except for ruby, which defaults to inline"*; the internal ruby types, §2.4) and `math` (MathML Core's `display: math`, the same default). **Everything else is block-level**, which is §2.1's default for an inner type standing alone: `block`, `flow-root`, `flex`, `grid`, `table`, `list-item`, `flow-root list-item`, `-webkit-box`, `block math`, `block ruby`, and the table's internal boxes (§2.4), which the procession has always read as non-inline. `none` and `contents` answer false, as they always did; `blockChildrenOf` skips both before it asks (§2.5), and the tokenizations treat them as a word boundary exactly as before.

The brief proposed the mirror — an explicit block-level set with everything else inline — and the round took the other side for the two values measured above: `-webkit-box` and `flow-root list-item` are block-level and would have been misread, and a display Chromium ships next is block-level by §2.1 unless it says `inline`.

`isInlineBox` asks it of the element's computed display, through the source map as before. **Every reader asks it**:

1. `blockChildrenOf`, through `isInlineBox`, the default of its `isInline` parameter;
2. `isAtom`, whose display clause is now *inline-level and not laid out on the holder's lines*: `isInlineLevel` minus `inline`, `inline list-item` and the ruby family. That set is `inline-block`, `inline-table`, `inline-flex`, `inline-grid`, and newly `-webkit-inline-box`, `inline flow-root list-item` and `math`. **A formula is caught by the namespace clause, not this one**: every `<math>` is a MathML element and `isAtom` answers by namespace first. The display clause never sees `math` on an HTML element either, since Chromium computes `display: math` there as `inline`; it names `math` so the two clauses say the same thing about the same box;
3. the four tokenizations, through `isInlineBox` (the audit below);
4. the Gauge's two callers, through `isInlineBox` (the audit below);
5. `compose-dom.js`' `isComposable`, which asked a second copy of the prefix test of each child and now asks `isInlineBox`. With `math` read as inline, the formula's paragraph is a paragraph the Compositor composes: `collectWords` makes the `<math>` one U+FFFC word, an atom, and never enters it (*the paragraph is what the browser breaks*, clause three).

## The audit

**The four tokenizations** — `positions.js`' `indexBlocks` and `wordsBeforeChar`, `fragments.js`' `joinedWords`, and the Gauge's `textNodesOf` — each descend into every element and end a word at both edges of a box `isInlineBox` calls non-inline. What changes for an inline formula is one thing: its own two edges are no longer word boundaries. **And no word moves**, because a formula's text lies only inside its token elements, and those compute `block math` (measured for `<mi>` and `<mo>`, the two the case writes), so each still ends a word at both its edges. Even a formula written flush against a word, `x<math><mi>y</mi></math>`, keeps `x` and `y` apart: the run crosses the `<math>` edge now and stops at the `<mi>` edge, as css-text-4 §6.5's soft wrap opportunity before an atomic inline would want. The block formula is untouched: `block math` is block-level, as before.

Measured by a scratch script in the runner's Chromium on the case documents, live (deleted after), each tokenization's words against the runner's own source stream (`document.body.textContent` split at whitespace, compared as a character stream with whitespace removed):

| Case | runner tokens | `indexBlocks` | `wordsBeforeChar` (whole blocks) | `joinedWords` | the Gauge's words | streams |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 72, after | 51 | 55 `[14,18,4,12,3,4]` | 55 `[14,18,4,12,3,4]` | 55 | 55 | equal, in order |
| 72, before | 51 | 55 `[14,18,4,12,3,4]` | 55 `[14,18,4,12,3,4]` | 55 | 42 | the Gauge's short by thirteen |
| 70, after and before | 33 | 33 `[14,15,4]` | 33 `[14,15,4]` | 33 | 33 | equal, in order |

The four agree with each other on 55 words for case 72, and with the runner's stream character for character; they count four more words than the runner because the source writes the inline formula with no whitespace inside it, one runner token, `m0w0+m0w1=m0w2`, which the engine counts as five — `m0w0`, `+`, `m0w1`, `=`, `m0w2`, the five items pdf.js reads off the print. `joinedWords`' second paragraph reads `p1w000 p1w001 m0w0 + m0w1 = m0w2 p1w002 …`, the order the page shows. **Before the fix the Gauge counted 42**: the paragraph was a composite, `blockChildrenOf` read `[math]` for it, and `wordsOf` answers nothing for a box with block children, so the formula's five words were counted as a box of their own and the paragraph's own thirteen by nobody — 55 less 13. That missing line stack is the fault; the tokenizations themselves agreed before and after.

**The Gauge's two callers of `isInlineBox`, read and left unchanged.** The box walk (`takeReport`) gives each box an `inline` flag: the inline formula is now `inline: true`, so `blockChildren` is not built for it (it is an atom and never entered anyway), the Stonehand offers no boundary at it (`box.inline` is the first refusal of its Class A walk), and a line lookup climbs past it to its paragraph. `textNodesOf` asks it at every element edge, which is the tokenization above; its words inside the formula are read at the atom's box, all five on line nine. No edit was needed in `gauge.js`.

**Also read, not mine to change, and consistent.** `stonehand.js`' `notYetDivided` recognises an *inline block container* by its own regex, `^inline-(block|flex|grid|table)$`, and `neverCutInside` its table, flex and grid displays by another. Neither decides inline-ness: both run after `isMonolith`, whose first clause is `isAtom`, so a `-webkit-inline-box` or a formula is a monolith before either is asked. The regex is a second spelling of the atomic set and could ask `isAtom` instead; left to the Stonehand's owner and reported.

**The block formula.** `blockChildrenOf(body)` reads `p, p, p, p, math, p`: the block `<math>` is one block child, and it is never entered because `isAtom` answers by namespace before the walk descends; `isMonolith` asks `isAtom` first. Its seat is exactly as before.

## Measured

`node cases/runner.js 72` after the change: all eighteen checks green in all three columns — three pages, `p0w000`, `p1w008` and `m1w0` opening them, every declared line, every word printed once in order, and Chromium's partition identical to the first mode's. The composed column is green on the same claims, line nine the formula alone at 22.5 to 107.1pt included: `isComposable` answered `false` for the formula's paragraph before and `true` after, and `collectWords` reads it `p1w000, p1w001, ATOM<math>, p1w002 … p1w012`, fourteen words with the formula one of them and nothing inside it. The neighbours hold: 34, 44, 54, 63, 67, 68, 70, and every case holding an inline-block, a table, an image or a drawing — 04, 25, 51, 53, 55, 56, 58, 65, 66, 69. The engine's DOM-free suites carry one new test, `isInlineLevel` over every value in the table above. The full runner over every case: 72 of 76 hold, and the four red ones — 71, 73, 74 and 75, authored red at `c6c198b` for their own filed faults and owned by the other two branches of this round — print the same 80 check lines, ok and FAIL alike, before the change and after it.

## Consequences, and what it leaves standing

- **A paragraph holding an inline formula is divided between its lines, in both modes**, and composed in the second.
- **Ruby is inline-level now** — `<ruby>` computes `ruby` and `<rt>` `ruby-text`, and both used to be read as block-level, so a paragraph holding ruby was a composite exactly as one holding a formula was. **Stated rather than measured**: no case draws ruby, and an annotation stands above its base inside one line box, so how the Gauge's line recovery reads a ruby line is its own question.
- **`-webkit-inline-box` is an atom, and `inline flow-root list-item` too.** Both lay their content out in a formatting context of their own; neither appears in the corpus.
- **Left standing**: `display: contents` still ends a word at both its edges in the tokenizations, as it did before — it generates no box, so a run should cross it, but the procession skips it and no case draws one; and `stonehand.js`' `notYetDivided` keeps its own spelling of the atomic set, harmless while `isMonolith` asks `isAtom` first, reported to the Stonehand's owner rather than edited here.
- The tablet is untouched: the Cut already divides a paragraph between its lines; this says which boxes are a paragraph's.

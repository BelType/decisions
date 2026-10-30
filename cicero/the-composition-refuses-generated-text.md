# The composition refuses generated text

**Status: Decided 2026-10-03, Executed 2026-10-03.** Found by the case round of [*a pointer is a read*](a-pointer-is-a-read.md) on case 82's twin, established and decided in the round that built the reads (`cicero/the-reads-are-built`), as the smallest true path the brief allowed: a refusal, not a Compositor that measures generated text. Decided in the build, for the coordinator to confirm.

## Context

The composed mode gives a paragraph's lines to the Compositor, which composes them from the paragraph's own words — `compose-dom.js`'s `collectWords` walks text nodes — and pins each chosen line with an inline `white-space: nowrap` and a forced `<br>`. A `::before` or `::after` is not a text node. Where it is inline it is text in the same lines, and the Compositor neither measures it nor lets it wrap.

The case round measured it on case 82's twin, the document with the four contents numbers written as literals and no read at all (`[href="#t"]::after { content: " 11" }`), and this round measured it again on a scratch copy of the twin and on the smallest document that shows it, both deleted after:

- **The twin.** Chromium and the first mode print eleven pages, the two-digit number wrapping onto its own line and pushing `t0w000` to page eleven; the composed mode printed ten, page two opening on `f1w014`, the no-wrap layout: the `li` carried the Compositor's `nowrap` over `c4w00 c4w01 c4w02` and the number stayed on that line.
- **The smallest document.** One paragraph of twenty-two six-character words, eleven lines on the venue's small page, with `.g::after { content: " 777777" }`, which does not fit on the eleventh line and wraps to a twelfth; then a two-word paragraph. Chromium and the first mode put the second paragraph on page two (twelve lines fill page one); the composed mode printed one page, `presented 1, printed 1`, the second paragraph on page one's twelfth line.

So it is a pre-existing limit of the composed mode with any generated inline content, independent of the reads, and it would have left case 82's composed column red after a delivery that worked.

## What the rivals do

None composes a paragraph outside the layout it is printed by. **WeasyPrint** builds a `::before` or `::after` into text boxes of its own (`formatting_structure/build.py`'s `before_after_to_box` and `content_to_boxes`), which its inline layout then breaks together with the element's words, so generated text is measured like any text. **Paged.js** leaves every line to the browser, which does the same. pagedNG and fragmentainers were not read for this; nothing here depends on them.

## Decision

**A paragraph whose lines carry generated text keeps the browser's lines.** `isComposable` gains a fifth clause: no inline-level `::before` or `::after` with content, on the paragraph or on any inline inside it. "With content" is a computed `content` other than `none` and `normal`; "inline-level" is the pseudo-element's outer display by `word-space.js`'s `isInlineLevel`, since a `display: block` pseudo-element stands outside the lines and the Compositor's lines are unaffected by it. The refusal is silent, as every refusal of a block the browser lays out alone is: the browser's lines are the only lines the generated text was measured in.

**Which of two refusals, measured.** The brief offered "any block with generated inline content" or "only a block holding a read". Both were built and put to the composed column of the whole case suite (`node cases/runner.js --engines cicero-composed`, with the twin and the smallest document added as scratch cases):

- **Any generated inline content**: every case holds, the twin and the smallest document included.
- **Only a block holding a read**: every case holds, cases 79 to 82 included, and the twin and the smallest document stay red — eleven pages against ten, two against one — because they write their numbers as literals.

Neither moved a check of any other case. The first was taken: it refuses exactly the thing the Compositor cannot measure, so it is right for a document that writes its numbers as literals or its labels as `counter()`, and it needs nothing from the reads. The second would have tied a line-breaking question to a delivery mechanism and left the twin wrong.

## Consequences

- **Case 82 holds in the composed mode**, eleven pages, page two opening on `f1w012` and page eleven on `t0w000`, the numbers 1, 4, 9 and 11.
- **What the composed mode no longer composes.** The suite has three cases with generated content beside a paragraph's text: case 00's `.chapter h2::before { content: counter(chapter) ". " }` is inline, so its numbered headings keep the browser's lines in the composed mode; case 47's `.chunk::after` and case 52's `.hang::before` are `display: block` and refuse nothing. Their composed columns held. In BelType's documents a figure caption, whose label is the addendum's inline `figcaption::before`, and a paragraph holding a cross-reference (`.xref::before` and `::after`) keep the browser's lines; read off `beltype-ua.css` and the shell, not counted.
- **The cost**, stated beside the code: two pseudo-element style reads per element of every candidate paragraph, a `ponytail` note in `holdsGeneratedText` naming the cheaper selector-side test if it ever shows in a profile. The manual under the composed mode paginates in 8.2 s (275 pages), measured once and not compared.
- **What closes it**: the Compositor measuring generated text as part of its line — the pseudo-element's string, its own font, its place before or after the words — which is a round of its own and not this one.

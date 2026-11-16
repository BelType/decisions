# Bare body content is refused by name

**Status: Decided 2026-11-14, Executed 2026-11-14.** Egildo's ruling of the day, "refuse now", on three options laid before him, and his ruling of 2026-11-15 on the line break. Built on Cicero's main and released in 0.1.14 ([`CHANGELOG.md`](https://codeberg.org/BelType/cicero/src/commit/75795acc1e437eb8ed142edac70fe1b662ab7d3d/CHANGELOG.md)); the CLI carries it from 0.1.11.

## Context

The intake reads the body's element children and cuts each one as a block ([*the intake passes over machinery*](the-intake-passes-over-machinery.md) says which children it takes). Two kinds of content standing directly in the body are not blocks, and each was lost with no message.

- **Text between two blocks.** A text node is no element, so the intake never saw it: it stayed on screen and reached no page.
- **An inline-level box.** A `<span>`, an `<a>`, an `<img>`, an inline `<svg>` or an `inline-block` box was taken as a block and cut as one. Measured 2026-11-14: it prints rightly in the middle of a page and is drawn on no page wherever a page ends at it. A box with `display: contents` fails the same way, since it has no box of its own and what it holds was drawn on no page where a page ended at it.

The canon is CSS 2.1 §9.2.1.1: inline-level content beside block-level siblings in a block container is wrapped in an anonymous block box, which is how a browser lays such a body out on screen. The engine builds no anonymous boxes; its unit is the element.

Three options were laid out.

- **Wrap.** Put each run of bare content inside an element the engine makes. Refused: the wrapper is an element the author did not write, it moves every selector that counts or neighbours the body's children (`body > :first-child`, `p + p`, `:nth-child`), and the document that is printed is no longer the document that was written.
- **Teach.** Make the intake read anonymous block boxes as CSS defines them, so a run of bare content is a block with an address. The right end, and a round of its own: the address, the word space and every reader of the body's children would learn a box that is no element.
- **Refuse.** Say at intake what stands in the body and how to write it.

## Decision

**What draws and is not a block, standing directly in the body, is refused by name; what draws nothing is passed over.** The run stops at intake, before any page is cut, and the message names the thing and the remedy.

- **Text**: named by its first forty characters, with the remedy to put it inside a block element.
- **An inline-level box**, one whose computed `display` begins with `inline`: named by its tag and its computed `display`, with the remedy to put it inside a block element or give it `display: block`.
- **A box with `display: contents`**: named, with the remedy to give it `display: block` or to put what it holds directly in the body.

**Passed over**: white space, a comment, a box with `display: none`, and a line break.

**The line break is passed over on purpose** (ruled 2026-11-15). A `<br>` between two blocks draws nothing; it is space, and it behaves as space does at a page break: in the middle of a page it prints as the browser lays it out, and where a page ends at it the blank line is dropped, as CSS Fragmentation drops a margin that adjoins a break. A `<wbr>` likewise. Refusing a document over a blank line would cost more than the fault, and keeping the blank line at the top of a page would be the teaching round under another name, for a result the margin rule forbids.

**A host that hands the run its own boxes is not asked.** The refusal reads the body only when the run read the blocks itself; an editor built on the engine answers for what it supplies.

**Narrowed 2026-11-16.** An inline-level box that holds atoms and no word, an `<img>`, an inline `<svg>`, an `inline-block` box, a `<picture>` or an `<a>` around an image, is no longer refused: [*an atom in the body is a line of the body*](an-atom-in-the-body-is-a-line-of-the-body.md) reads it as one unit of the flow. Text, a box with `display: contents` and an inline-level box holding a word are refused as this record says.

The refusal is `refuseBareContent` in `src/scope.ts`, called by the seam's intake and by the run when it reads the body, and the cases are `test/scope.test.ts` and `test/browser/scope.browser.ts`.

## Consequences

**A loss with no message became a refusal with one.** No document that printed whole before prints differently now; a document that lost content silently now stops and says where.

**The conformance record pays for it, and says so honestly.** The essay's run of the web platform tests under Cicero 0.1.14 and Caster 0.2.7 carries the refusal on 76 tests, which write text directly in the body as test pages do. Under Chromium's printer, against the record of Cicero 0.1.12: css-break went from 21 pass, 26 fail and 17 refused of 64 to 19, 24 and 21; css-page from 82, 70 and 61 of 213 to 62, 32 and 119. Twenty-two passes and forty fails became refusals. Under Caster: css-break from 21, 12 and 31 to 20, 12 and 32; css-page from 50, 25 and 138 to 47, 25 and 141. A pass on a page whose bare text reached no page was a pass by the reference's leave, not the engine's work.

**Known edges, left as they are.**

- A body whose root is `display: none` is still refused for its text, though nothing of it would draw.
- A text node holding only a no-break space is refused and quoted as an empty string, since a no-break space is not white space to the test and is trimmed in the message.
- A line break at the top of a page leaves no blank line, by the ruling above.

**What it leaves open.** Teaching the intake anonymous block boxes is the road that lifts the refusal, and it is not scheduled. When it is built, this record is superseded by its own.

**What it touches on the tablet.** Nothing new: a refusal by name where the engine cannot keep every word is *the conservation of words* applied at the door, before a page exists to lose one from.

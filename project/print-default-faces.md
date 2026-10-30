# Print default faces

**Status: Decided 2026-09-14, Executed 2026-09-14.** Closes M7 and M8 of [`packages/caster/DESIGN.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/caster/DESIGN.md)'s manual list; recorded there as S46.

## Context

BelType's own printer embeds font PROGRAMS. That is not an implementation choice it could trade away: a PDF carries the bytes of every face it shows, and a browser tab is not allowed to read the bytes behind `sans-serif`. So `packages/caster` refused, by name and by design, any cluster whose stack fell through to a generic family — and the addendum ended its default stack in one. The consequence had been true since the printer's first round and was stated in its README as the first refusal: **a document that declared no `@font-face` of its own could not be printed at all.**

That is a strange thing for a tool whose deliverable is a printed page. It made the default state of BelType unprintable, made the manual — the stretch fixture the printer is proved on — unprintable, and pushed a vendoring problem onto every author before they could produce anything. The stretch fixture's list recorded it as M7 (the font wall) and M8 (emoji) and left both standing, M8 explicitly as a design question with three answers and no authority to pick one.

## Decision

**BelType ships print default faces. A document that declares no `@font-face` of its own prints, and the screen shows the same faces the file embeds — one look, and what you see is what prints.**

Four families, vendored under `packages/core/assets/fonts/`, declared by the addendum (`packages/core/assets/beltype-ua.css`) and served through the compiler's `/_beltype/` table at `vendor/beltype-fonts/`:

| role | family | axes |
| :--- | :--- | :--- |
| serif | Source Serif 4 | `wght` 200–900, `opsz` 8–60 |
| sans-serif | Source Sans 3 | `wght` 200–900 |
| monospace | Source Code Pro | `wght` 200–900 |
| emoji | Noto Emoji, the MONOCHROME build | `wght` 300–700 |

All SIL OFL 1.1; all VARIABLE; all TrueType (`glyf`) outlines; all the Google Fonts builds with nothing changed but the container. `packages/core/assets/fonts/PROVENANCE.md` names every source URL, the upstream commit, and the SHA-256 of both the vendored file and the TTF it came from.

**The container is WOFF2, and it cost a decoder round.** Caster listed WOFF2 as a refusal because `wawoff2` imports in a browser and the promise it returns never settles. The cause turned out to be the same Emscripten shape `scripts/bundle-vendor.js` already patched around for harfbuzzjs and lcms-wasm — the glue exports its Module only inside `ENVIRONMENT_IS_NODE` — and appending that one assignment unconditionally is the whole fix. Measured in headless Chromium: 89 652 B of WOFF2 to 214 196 B of SFNT in 41 ms. WOFF was the recorded fallback and was not needed. The difference is not cosmetic: **2 300 124 B as WOFF2 against 5 476 440 B as TTF**, in a package every install carries.

**The stacks name the faces first and the emoji face before the generic**, so a pictographic cluster reaches bytes rather than the system's emoji face. The generic still terminates every stack: it is what a browser with no network shows, and naming it is honest about where the printer's refusal lives.

**The body is set in the serif — Egildo's call, the same day, reversing the round's first cut.** The addendum's body had always been a sans; it is `'Source Serif 4', 'Noto Emoji', serif` now, because a document that declares nothing is a document to be read on paper and paper reads serif. Code keeps its mono. No `font-family` was added to the headings, because a rule there would quietly take inheritance away from every document that styles only `body`: headings are the serif by inheritance, and sans headings are one author rule. Source Sans 3 ships declared and reachable by name and seats nothing by default. The default look of every document that styles nothing changes with this, and that is the decision.

### Refused, each with its reason

**CFF2 outlines.** The variable-CFF2 road is proven in the experiments but not measured in this printer, and a default face is the worst possible place to discover a gap. `glyf` is what the subsetter, the instancer and the embedder are exercised on today, and Google Fonts distributes exactly these builds. A CFF2 default is a later round with a measurement in it, not a preference expressed now.

**Venue-only faces — "every project vendors its own".** This is what the printer's refusal already asked for, and it is the status quo whose cost this entry exists to remove: it leaves every default document unprintable, and makes the first thing a new author must do a font-vendoring task rather than writing.

**Print-only seating — faces injected at print time and not on screen.** Two looks, and the one the author never sees is the one that ships. The whole claim of a live preview is that it is the document; a print that quietly substitutes faces would make every line break in the pane a lie.

**Colour emoji (Noto Color Emoji).** The printer paints no COLR or CBDT table — a `/FontFile2` is outlines, and a CIDFontType2 shows one of them in one colour — so a colour face is not embeddable as a font at all, and the alternative road (E12A's raster) turns a glyph into pixels. The colour build is also roughly nine megabytes. The monochrome face shapes, subsets, instances and embeds through exactly the road a letter does, which is both the cheaper and the more honest answer.

## Consequences

**`@egildo/beltype-core` grows by 2 318 055 B** — 2 300 124 B of faces and 17 931 B of licence text — in a package every install carries, whether or not the author ever prints. That is the price and it is stated rather than amortised away. The reversal, if the size ever becomes the problem, is a separate package the addendum names, and it would reintroduce exactly the refusal this entry removes for anyone who did not install it.

**The refusal that became the exception.** `packages/caster`'s README listed "a face with no bytes" first among what it refuses; it still refuses that, but it is no longer the refusal every default document hits. What refuses now is a stack an author ends somewhere unembeddable by naming a system family, or a character none of the declared faces covers — and exactly one such character exists in BelType's own manual, `∪` U+222A, found by walking every codepoint of the six chapters against all four programs.

**The addendum gained one rule beyond the faces**: `pre` joins the `code` family rule, because the BROWSER's own user agent sheet gives a `<pre>` the bare `monospace` generic and nothing else did.

**BelType's own documents had to stop naming faces nobody can embed.** `docs/assets/syntax.css` set the manual in Georgia and Helvetica Neue and `assets/route.svg` set its labels in `system-ui`; they name the shipped faces now, which is the first demonstration of the point — a venue no longer vendors anything to be printable.

**An optical-size axis is paid for per size.** Source Serif 4's `opsz` is pinned by Chromium to the used font size, and the printer freezes the instance at the coordinate the browser painted, so a document with a dozen type sizes embeds a dozen subsets of one programme. The manual embeds fourteen. That is the axis being honest, and it is the cost of choosing a face that has one.

**The site engine still sets its own system stack** (`packages/engine-site/assets/site-interface.css`), unlayered, so it wins. The website lane is not the print lane and nothing refuses there; whether the two should agree is a look question for a later round.

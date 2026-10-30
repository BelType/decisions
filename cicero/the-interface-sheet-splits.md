# The interface sheet splits: a conformance provision and a chrome sheet

**Status: Decided 2026-08-27, Executed 2026-08-27.**

## Context

BelType is building `packages/editing-tools` (Phase 1): a package that stands up its own web server and **runs the belt in a browser tab**, compiling a venue client-side and rendering it in an iframe under `site` or `cicero`, switching between them without a restart. The browser proof it rests on (`test/browser/`, and `test/browser-core.test.js` which keeps it green in headless Chromium) has existed since 2026-08-14 with no consumer.

The rule that round settles, and which this entry serves: **the tab may call `headHtml()` and `bootstrapJs()`, and must never call `vendorAssets()`.** The asset table's values are the host's business — a disk path means nothing in a tab, and `new URL(…, import.meta.url)` evaluated there yields an `http:` URL that bypasses `/_beltype/` and the closure scanner entirely. So the server composes the table and the tab composes the head, from **one module imported on both sides** — never a second implementation of one adapter, which is the drift a monorepo exists to prevent.

That makes `seam/index.js` importable-in-a-tab a requirement, and today it is not, for two reasons:

1. `const __dirname = path.dirname(fileURLToPath(import.meta.url))` at module scope. `fileURLToPath` throws on a non-`file:` URL, and in a tab `import.meta.url` is `http:`. This one is incidental — the expression is only ever needed by `vendorAssets()`, which the tab must not call.
2. `interfaceCss()`, an `fs.readFileSync` reached from `headHtml()` — the sheet is **inlined** as a `<style>` block (the lean-seam round, 2026-08-12, whose motive is recorded in `engine-pagedjs/src/index.js`'s header: a self-contained head contribution, one fewer file in every export, exactly two things handed to an HTML-lane document). This one is not incidental: `headHtml()` is precisely what a tab must call, and there is no synchronous file read in a browser.

The sheet is not one thing. `seam/cicero-interface.css` opens with **I5's second half, satisfied in the one place that can satisfy it** — `:root { line-height: 1.65 }`, whose own comment says "without this rule every BelType document would refuse" — and then, under `@media screen`, the engine's screen chrome: the backdrop, the intake surround. A conformance provision and a decoration, in one file, for no reason except that both are CSS.

## Decision

**Split the sheet along the line that was already there.**

- The I5 provision becomes a **string literal inside `seam/index.js`**, emitted by `headHtml()` as a small `<style>` block. It cannot 404, cannot be omitted from a table, and cannot arrive late.
- The **screen chrome** becomes an ordinary `vendorAssets()` `files` entry and is **linked** — flat, as `cicero-interface.css`, beside the `cicero/` prefix that `dirs` already owns rather than inside it, so the two tables never disagree about who owns that path.
- `__dirname` moves **inside** `vendorAssets()`; `fs` leaves the file.

**Why the provision is not simply linked with the rest.** A missing linked sheet — a table entry lost in a refactor, a server restarted mid-edit, a host that composed the head without the table — would surface as `I5 (DPR ruling): explicit line-height required, document root computes 'normal'`. A law refusing on a typographic claim when the actual fault is a missing file is worse than a crash: it sends the reader to their stylesheet. Cicero's refusals are load-bearing precisely because they are true, and a refusal that names the wrong thing spends that.

**`engine-pagedjs` is not touched.** It inlines for the same 2026-08-12 reason and stays as it is: it cannot be imported into a tab at all (`fs`, `http`, `createRequire` and `browser-chromium` at module scope), so the editing tools refuse it by name rather than offering it silently, and `test/export.test.js`'s pin that the inlined sheet is never a file stays green. The split is Cicero's because Cicero is the engine that has to travel.

## Predictions

Frozen on write, break-versus-hold decided in advance.

1. **The paginated result is unchanged** — the same page count and the same cuts, before and after, on the repo's paged-media specimen under `--engine cicero`. The provision's text is identical and its cascade position (before author sheets, losing every tie) is identical; only its delivery changes. *Breaks* if any page count or any cut moves.
2. **`seam/index.js` reaches no node capability afterwards.** `fs` is gone; `url` remains, for `fileURLToPath` inside `vendorAssets()` alone, where only a host with a filesystem arrives. *Breaks* if any `fs` reach survives anywhere in `seam/`.
3. **No standing gate tally moves.** `src/` is untouched, and the venue reads `src/` off the filesystem (`ENGINE_DIR`), not `seam/`. *Breaks* on any change in `gates/records.js`, and the pin should not even go red — this entry's work does not move the engine's source tree.
4. **The root suite stays green with one file more in a cicero export.** `--engine cicero` refuses `renderPdf`, so no export assertion covers it today. *Breaks* if any root test reddens.
5. **No third node-only reach exists.** After 1 and 2, `seam/index.js` and `seam/client.js` import cleanly in a browser tab over an import map carrying `node:path`, `node:os` and `node:url` algebra shims. This is the prediction most worth making because it is the one the reading cannot settle: it claims an absence. *Breaks* if the tab's import fails on anything other than these two causes.

## Verdict

**Prediction 1 held.** The specimen renders identically through the split adapter. Seven `<beltype-page>` elements in `<beltype-root>`'s shadow tree, three reloads in a row, same count each time, with the same flow-word accounting (`583 flow words accounted`) — the provision's text and its cascade position are unchanged, and only its delivery moved.

**Prediction 2 held.** `seam/index.js` imports `url` and `@egildo/beltype-common` and nothing else; `fs` and `path` are both gone from the file. `interfaceCss()` went with them.

**Prediction 3 held, and needed no interpretation.** `src/` was never touched — `git status` on it is empty — so the venue's pin was never even at risk. The full battery: 25 gates in 19.9 min, 25 ok, every standing record reproduced, pinned to `beltype@526aadb`, with the pin naming its own situation exactly (*the engine tree was not pristine, but its `src/` was committed — the pin stands, and names it*). No tally moved anywhere.

**Prediction 4 held.** The root suite is green (381 tests). `--engine cicero` still refuses `renderPdf`, so no export assertion covers the one extra file the table now carries.

**Prediction 5 held, and it was the one worth making.** `seam/index.js` and `seam/client.js` import cleanly in a browser tab over an import map carrying the `node:path`, `node:os` and `node:url` algebra shims — no third node-only reach existed. The proof is not a reading: `packages/editing-tools`' acceptance test loads the adapter in headless Chromium, composes the head fragment there, and asserts seven pages and a `px` root line-height, with `pageerror` empty.

**Too good to be true, checked.** Two things.

First, the `url` shim is a real widening of the browser surface and it was worth arguing rather than assuming. `fileURLToPath` is string algebra, so the shim is lawful under the rule `node:path` already lives by — but the shim REFUSES a non-`file:` URL rather than inventing a plausible answer, and that refusal is what keeps the rule honest: if anything on the assembler's browser surface ever asks an engine for a disk path, it fails loudly instead of receiving a path the browser made up.

Second, and recorded as a limitation rather than smoothed over: a 404 on the linked chrome sheet is now an ordinary missing-stylesheet fault, which is the whole point — but nothing yet TESTS that the chrome sheet arrived. The acceptance test asserts the link element exists, not that the response was 200. The provision is safe by construction; the chrome is safe by the asset table being right, which is the same guarantee every other table entry has and no more.

## Consequences

`seam/cicero-interface.css` loses its opening rule and gains a header saying where it went. `seam/index.js` loses `interfaceCss()`, the `fs` and `path` imports, and its module-scope `__dirname`; it gains `I5_PROVISION` as a literal, a `<link>` in `headHtml()`, a third `files` entry in `vendorAssets()` (`cicero-interface.css`, flat, deliberately outside the `cicero/` prefix `dirs` owns), and lazy path computation inside that method. `engine-pagedjs` is untouched and keeps inlining. The package's CLAUDE.md is corrected in two places where it described the sheet as carrying the provision.

The engine is now importable by a host with no filesystem, which is what `packages/editing-tools` needed and what makes Cicero the first engine a person can put beside another on one screen, on their own document, live. Every export under `--engine cicero` carries one more small file.

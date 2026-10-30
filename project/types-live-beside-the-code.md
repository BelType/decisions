# Types live beside the code

**Status: Decided 2026-09-21.** The floor executed the same day on `ts/floor`; the port, package by package, follows on the `round/typescript` branch. Generalizes [`packages/caster/DESIGN.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/caster/DESIGN.md) S5, which had run this mode alone since Caster's first round.

## Context

BelType is eleven packages of plain JavaScript whose contracts were prose. The engine seam was four members described in three file headers and pinned by tests that call them; the host was a seven-line table in a comment; the resolved document was a list in `pipeline.js`'s header. Every one of those held, and every one was checkable only by running something. Caster was the exception — `checkJs`, strict, zero errors over 102 files — and paid for it with four hand-written `.d.ts` stubs of its siblings, one of which had already drifted (`isWithin`'s arguments, reversed; see `.claude/TS-FIXES-FOUND.md`).

The question put to the round was whether BelType becomes a TypeScript project. Five facts about how the code is RUN answered most of it before taste was consulted.

## Decision

**BelType adopts the TypeScript checker and not the `.ts` extension. Source stays `.js`; types are written in doc comments; `tsc --noEmit` enforces them. There is no `.ts` file, no emit, no `dist/` and no build step, in any package.**

The measured reasons, each a way a compile step or a `.ts` source would break something that works today:

- **The browser loads package source as it stands.** The editing tools' tab imports `core`, `common`, an engine's seam and Cicero's `src/` over an import map, file by file, from the checkout. A `.ts` file is not a module a browser evaluates.
- **Node refuses to strip types under `node_modules`.** A published package, and the Homebrew tap's install, run from there. Type stripping is for an application's own files.
- **`packages/essay` reads `packages/engine-cicero/src` by path at run time, and its pin hashes that tree.** An emitted tree is a second tree, and the pin would hash the wrong one or both.
- **[`repos.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/docs/repos.md) already refuses a compile step at install.** It weighed "a `prepare` script compiling TypeScript inside the Cellar at every install" for Cascata and refused it — Cascata arrives as a submodule with its `dist/` built — and the pug bundle is committed for the same reason: the tap installs from a clone and compiles nothing.
- **Caster already runs this mode, strict and clean.** The mode was not a proposal; it was a precedent with a customer.

Six rulings shape how it lands (Egildo, 2026-09-21):

1. **The `Engine` seam type lives in `packages/common`** (`src/engine.js`), because an engine depends on common and never on core.
2. **A shared type is a `@typedef` in the `.js` module that owns the concept**, or in a types-only `.js` module ending in `export {}` where no module owns it — `packages/caster/src/adapters/strip.js` is the precedent, `editing-tools/src/protocol.js` the second instance (`common/src/engine.js` was the second until the fixes round gave it one runtime table, `PRINTERS`). **A `.d.ts` is allowed only for what JSDoc cannot say**: a global augmentation, or a `declare module` stub. **Never a `foo.d.ts` beside a `foo.js`** — it shadows the `.js`, which then goes unchecked while looking typed.
3. **The rollout is per file.** The base config says `checkJs: false`; a file opts in with `// @ts-check` as its first line when it is ported. `tsc` follows a workspace symlink into a sibling's SOURCE, so a global `checkJs` would make an unported upstream's errors its consumer's. Per file, an unported file is inferred and not reported. Caster stays `checkJs: true`.
4. Cicero's timing is its own round's.
5. **The port is comment-only.** A behaviour fix the checker suggests is not made; it is written to `.claude/TS-FIXES-FOUND.md`. `scripts/zero-diff.sh` is the proof: both sides of every changed file minified by esbuild with comments dropped, compared byte for byte.
6. **TypeScript 7.0.2, pinned exact, at the root and nowhere else.**

### What the floor measured

**TypeScript 7 against 5.9.3, on Caster's 102 files:** the same verdict, 0 errors, in 0.45 s against 1.66 s wall. Under a global `--checkJs`, as a census and never as a gate: `common` 27 errors, `core` 469, the CLI's program 753 (it reaches core), the editing tools' server 1 019 and its tab 1 033. **The known cost of 7** is that `baseUrl` is gone and a `paths` value must begin with `./` (TS5090) — Caster's config was the one that used either.

**`module` and `moduleResolution` are `nodenext`.** Measured against `esnext` + `bundler` over all twelve programs under global `--checkJs`: the error counts are IDENTICAL in eleven, resolution-class errors included, and differ in one file — `test/browser/demo.js`, which has no `import` and a top-level `await`. `bundler` reads a file with no import as a script and reports the `await`; `nodenext` reads `"type": "module"` from the nearest `package.json`, as Node does, and reads it correctly. Every package here is `"type": "module"`, none declares `exports`, and `nodenext` enforces the `.js` extension on a relative import, which is already a house rule. So the stricter pair costs nothing and states what is true.

**A file named `jsconfig.json` carries an implicit `maxNodeModuleJsDepth: 2` that BEATS a value inherited through `extends`** — measured under 5.9.3 and 7.0.2 alike, with `--showConfig`; the same file named `tsconfig.json` inherits the base's `0`. With the default in force Caster's clean check reports 1 690 errors out of `node_modules`. So every `jsconfig.json` states `maxNodeModuleJsDepth: 0` itself, and the line in the base is documentation.

**A checked file is checked in EVERY program that reaches it.** `// @ts-check` on `core/src/closure.js` reports the same 45 errors in core's program and in the CLI's. Two consequences. A port is done when the file is clean in its consumers' programs, not only its own — root `npm run check` is the test. And an ambient stub that one `jsconfig` includes is a stub the other programs lack: `types/css-tree-subpaths.d.ts` is therefore reached by a `/// <reference path>` directive in the importing file, which is a comment, travels with the file, and reads `same` under zero-diff.

**`common` and `core` are refused node's types, and the refusal needed an answer for `path`.** Both import bare `path` (common, `os` too) and both run in a tab, where the editing tools' import map answers with `assets/shims/{path,os}.js`. `types: ["node"]` would satisfy the import and hand both packages `fs`, `process` and `Buffer` — the leak the realm declaration exists to catch, and for core a second guard on the sweep in `test/host.test.js`. `packages/common/types/algebra.d.ts` declares `path` and `os` as exactly what the shims supply, so a checked file reaching for `path.parse` fails at the desk and not in a tab; `every-realm.d.ts` declares the three globals every realm has and `lib: ["es2023"]` does not (`console`, `TextEncoder`, `TextDecoder`). The tab's program includes the first and not the second, since `dom` already declares those.

**The DOM half of that guard is closed** (2026-09-22). `highlight.js`'s declarations carry `/// <reference lib="dom" />`, which is program-wide, so every program reaching them through `rehype-highlight` and `lowlight` accepted `document` (measured 2026-09-21). `tsconfig.base.json`'s `paths` maps `highlight.js` to `types/highlight-js.d.ts`, which declares only `LanguageFn` — all lowlight imports — and the tab's `assets/jsconfig.json` merges the same entry. The code that had leaned on the leak is now checked in the realm it runs in: `core/src/pug-lane.js` asks `'document' in globalThis`; the Caster route's in-page function is `engine-pagedjs/src/cast-in-page.js`, checked by `jsconfig.page.json`; tests that run tab code under node are checked by `editing-tools/jsconfig.tab-tests.json` and `test/jsconfig.playwright.json` (dom + node); and `test/browser/demo.js`, which runs only in a tab, by `test/browser/jsconfig.json`. A `document` probe fails in every node program, and `process` still fails in the tab. The upstream fix belongs in highlight.js.

**Inference from an unported upstream is weaker than its contract.** `createNodeHost()` infers `read` as `Promise<{ ok: boolean, … }>`, which is not assignable to `Host`; Paged.js's `vendorAssets()` infers `null` from `let vendorCache = null`. Neither is a contract mismatch, and each goes away when the factory states its return type — which is why a seam-facing factory is the first thing a port annotates.

### Refused, each with its reason

**`.ts` sources with an emit step.** The four bullets above: a browser that loads source, a Node that will not strip under `node_modules`, a pin that hashes a tree, an install that may not compile.

**Node's type stripping, with no emit.** It would serve the CLI from a checkout and nothing else — not a published install, not the tap, not the tab.

**Serving stripped `.ts` from the editing server.** It makes the editing tools' server a compiler for the packages it serves, which is a build step that runs on every request and only in one of the three places the code runs.

**Project references and `composite`.** They exist to order emits between projects. There is no emit, and a reference would require declaration output that nothing consumes.

**Branded unit types** (an absolute path, a URL path, a CSS pixel). The distinctions are real and the brand is unenforceable in JSDoc without a cast at every construction site, which is a runtime-shaped change in a comment-only port. The prose on the member carries the unit.

**`eslint-plugin-tsdoc`, a `tsdoc.json`, custom TSDoc tags.** A linter for comments is a second toolchain for a convention eleven packages can hold by reading one paragraph of `CLAUDE.md`. Citations are fixed greppable phrases — `DESIGN.md S61`, `Measured 2026-09-14:` — because `grep` is the consumer.

**TypeDoc and api-extractor.** `docs/reference.md` owns signatures. One authority per question; a generated reference is a second one that nobody edits and everyone trusts.

**A barrel `types` package.** No barrel files, and a type that lives away from its concept is how Caster's `isWithin` stub came to disagree with the function.

## Consequences

`tsconfig.base.json` at the root; one `jsconfig.json` per package declaring its realm, the editing tools carrying three (the server under node, the tab under `dom`, `sw.js` alone under `webworker`); `test/jsconfig.json` for the root suite, looser on implicit `any`. Each package has a `check` script, the root's runs them all, and `check` stays out of `npm test` — a type error is not a red suite, and the suite's own time is not the checker's to spend. One exception, ruled by Egildo 2026-09-21: `packages/caster/test/check.test.js` runs caster's own `check` inside caster's `npm test`, because caster was strict and clean before the round began (PLAN.md D3) and a regression there is a red suite by the package's own standard; it skips when `typescript` is absent, as under the tap's `--omit=dev`. Another package earns the same only by being clean first. `engine-cicero` and `essay` have no config yet, by ruling 4.

Caster keeps its four sibling stubs until each upstream is ported; each port deletes the stub it makes redundant, which is the pruning this decision owes.

The tap is unaffected: `npm ci --omit=dev` never installs TypeScript, and nothing at run time imports it.

**If `.ts` ever becomes viable** — a browser that strips, a Node that strips everywhere — the migration is mechanical: a JSDoc type is a TypeScript type in a comment, `@typedef` becomes `type`, `@param {T} x` becomes `x: T`, and the prose does not move. Nothing decided here forecloses it; everything decided here is what makes it cheap.

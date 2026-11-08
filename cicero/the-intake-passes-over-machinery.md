# The intake passes over machinery

**Status: Decided 2026-11-08, Executed 2026-11-08.** Egildo's ruling of the day on the quick-rulings row *host-machinery-intake*. Built on Cicero's `fix/intake-skips-machinery`, released in 0.1.10 ([`CHANGELOG.md`](https://codeberg.org/BelType/cicero/src/commit/b08c06ddd43655b2a7e4f7b2b1644ac0b9e49c5f/CHANGELOG.md)); SPEC VI.2.5 names the word.

## Context

`topLevelBoxes` in `src/driver.ts` took every element child of the root but the engine's own scaffolding, `STYLE` and `SCRIPT`, so a hidden `<iframe>`, a `<template>`, a `<link>` or a `<noscript>` a host left in the body was a block of the document: it got an address and shifted every address after it, and a `<noscript>`'s text was counted as words. An editor built on the engine ([prosemirror-beltype](https://codeberg.org/BelType/prosemirror-beltype/src/commit/3eef7f4c77a21dce66ecc2c245539197404413dc/README.md)) keeps its own machinery in the page, and `seam/client.ts` kept a second copy of the filter's one line, so the two could drift.

## Decision

**The intake passes over what never renders and over a host's own machinery, through one filter.** `topLevelBoxes` also passes over `TEMPLATE`, `LINK`, `META`, `BASE`, `TITLE`, `HEAD` and `NOSCRIPT`, a closed list named in its TSDoc, and over any element carrying the `host` word on `data-beltype` (`HOST` in `src/data-beltype.ts`, a flag a host writes on an element that is its own and not the document's). The filter is exported from the driver and the client imports it, so there is one.

**The `root` option stays the first door.** A host that holds the document in an element of its own names it with `root` first; the `host` word is for machinery a host must leave beside the document, not a second way to point at the document.

**Refused.** Passing over anything hidden by style: `display: none` on an author's element is the author's and may change, and a box the sheets hide is still a box with an address. Guessing machinery by tag beyond the closed list: a tag that renders is content until a host says otherwise.

## Consequences

- `src/driver.ts` exports `topLevelBoxes`; `seam/client.ts` imports it; `HOST` joins the `data-beltype` registry, SPEC VI.2.5.
- `test/browser/intake.browser.ts` holds the four elements between two paragraphs: the driver's top-level blocks are the paragraphs alone, and through the client the addresses and the words on each page equal the clean document's, red before. `test/data-beltype.test.ts` pins the word.
- The essay battery is unmoved. The one filter later carried the same day's un-lifting ([*a fixed box refuses only its own block*](a-fixed-box-refuses-only-its-own-block.md), amended): the intake adopts the top-level boxes it answers, and nothing else.

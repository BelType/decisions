# Decisions — BelType

One decision per file, named for what it decided, never rewritten. A reversal is a new file saying what it supersedes.

**This record is the project's.** How the repository is shaped, how the documents are kept, how a round runs, what the book is for. Decisions about *what pagination is* live with the engine, in [`.claude/decisions/cicero/`](../cicero/README.md) — that record is strictly scoped to a hard problem and stays separate on purpose.

## The entries

- [One repository](one-repository.md) — the venue and its book fold back into the monorepo; the shared Chromium module; the pin kept, its justification demoted.
- [The record is what a test can check](the-record-is-what-a-test-can-check.md) — the ceremony cut, the round documents demoted to citation targets, the record's own genre asserted by a suite.
- [The book is a gallery of questions](the-book-is-a-gallery-of-questions.md) — the book's unit is one question, with a standing anatomy.
- [The book has no PDF](the-book-has-no-pdf.md) — the medium and the arc; the print story reserved entire for Cicero through the seam.
- [Cascata owns the cascade](cascata-owns-the-cascade.md) — `config-loader.js` and `config-schema.js` deleted; Cascata's `load()` answers, BelType keeps only the venue probe and a refusal list.
- [A venue is a schema](a-venue-is-a-schema.md) — `beltype.config.yaml` becomes a schema a document adopts, not a settings file; heavier for the simple case, and what molds always wanted.
- [Run options are flags](run-options-are-flags.md) — `port`, `target`, `watch`, `open`, `engine`, `out`, `pdf` leave the cascade for the CLI; the territory matrix dissolves into one refusal list over the projected value.
- [The keyscope is not the cascade](the-keyscope-is-not-the-cascade.md) — a refusal: `@include`'s value scoping stays outside Cascata, a different question wearing the cascade's surface shape.
- [Frontmatter as a redaction](frontmatter-as-a-redaction.md) — the document's frontmatter revealed in place, both fences blanked, so a diagnostic names the author's own line with no arithmetic.
- [The alias is the mount](the-alias-is-the-mount.md) — `rewrites` is one author-named table and the alias is the URL prefix; `/_inc/N` and `/_spec/N` are gone, and nothing is minted per render.
- [The URL root is the venue](the-url-root-is-the-venue.md) — `/` names the venue directory; a ref still resolves on disk beside whoever declared it, and only what `/` names moved.
- [The MVP cut](the-mvp-cut.md) — export, fingerprint, vendoring, init and the home rung cut to a rendering MVP; the reinstatement order and its preconditions recorded whole.
- [The command line is a layer](the-command-line-is-a-layer.md) — `$flags` refused; `-c` and `--set` are Cascata overrides, config layers ranked after the frontmatter and governed like it, never a merge over the answer.
- [The generation stays in the tab](the-generation-stays-in-the-tab.md) — the editing tools cut to one engine; the server probes a venue and holds a tree, the tab holds the generation and drives the engine. Its one-engine clause superseded by *Paged.js returns in its own window*, its read-set door and lists by *The render reads through the session*.
- [Paged.js returns in its own window](paged-js-returns-in-its-own-window.md) — the editing tools' second engine, one at a time, in a window of its own: linked rather than dressed, prepared so its pages are the printed ones; supersedes the Cicero cut's one-engine clause. Two of its clauses superseded by *the seat is not the engine*.
- [The seat is not the engine](the-seat-is-not-the-engine.md) — in the editing tools the engine (`cicero` or `pagedjs`) decides what is composed, dressed and printed, the seat (pane or window) only where it is shown; all four combinations work, and Paged.js is dressed through its own Polisher.
- [Print default faces](print-default-faces.md) — four OFL variable faces vendored and declared, so a document with no `@font-face` of its own prints; the WOFF2 refusal answered with a decoder, colour emoji refused.
- [Types live beside the code](types-live-beside-the-code.md) — the TypeScript checker adopted and the `.ts` extension refused: source stays `.js`, types in doc comments, `tsc --noEmit` per realm, the port comment-only and proven by `scripts/zero-diff.sh`.
- [Provenance watches the files](provenance-watches-the-files.md) — one Provenance session over FILES replaces both chokidar watchers; a change is a change of bytes; a file nothing names yet went unnoticed, accepted until reads went through the session. Its watch sets superseded by the next entry.
- [The render reads through the session](the-render-reads-through-the-session.md) — every dev-time read goes through a Provenance read pass (`render`, `closure`, `cascade` in the CLI; `render` and `closure` held by the editing server for the tab); what a pass read or missed is what is watched and what opens the write door; core's read-set is deleted, and the two-clock discriminator is which pass did the reading.
- [The manual is written in four kinds](the-manual-is-written-in-four-kinds.md) — tutorial, how-to, reference and explanation, one kind to a page; capitals in comments are names, a citation is name first and number beside, a header keeps only what binds; the rules cached in [`docs/style.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/docs/style.md).
- [The ink is read, not borrowed](the-ink-is-read-not-borrowed.md) — Caster keeps deriving ink from computed style in the tab; Chromium's own print measured as an ink layer (geometry within half a point, ink separable, colour unrecoverable) and refused, since no browser lets a page read its print and the premise is the tab.
- [The printer guesses, says so, and withdraws the claim](the-printer-guesses-says-so-and-withdraws-the-claim.md) — Caster's `unknownElements` flag: a custom element is printed by its layout under `infer`, the default, every guess listed and the PDF/UA-2 claim withdrawn, and refuses by name under `refuse`; ARIA roles honoured on every element in both modes; `aria-hidden` an artifact anywhere.
- [The engine knows no view](the-engine-knows-no-view.md) — Cicero stays a function from a document and its sheets to cuts, with no editor state and the root as its presenter; the ProseMirror adapter is a separate package, `prosemirror-beltype`, consuming the engine's objects through three doors (a page takes content directly, ops over supplied readers, reads over an abstract chain); the proof is the CLI round and the fragmented view agreeing on the same cuts.
- [The same list prints the same bytes](the-same-list-prints-the-same-bytes.md) — Caster's display list closed: the writer is a function of the list alone (widths, date, tree, images and options in it; no DOM, clock or browser API in reach) and returns typed records; the corpus committed in Caster, replayed in node byte for byte; the door for a Rust writer.
- [A release moves three remotes at once](a-release-moves-three-remotes-at-once.md) — Codeberg is the source, `github.com/BelType` its mirror by two push URLs, `@beltype` on npm published only by GitHub's trusted publishing; a tag is the release, Egildo's yes for each, and every repository is public from 2026-10-30.

## The genre

**Status** — `**Status: Decided YYYY-MM-DD.**`, gaining `, Executed YYYY-MM-DD` when built and `, Superseded by <name>` when replaced. **Context** — what convened it, citing rather than restating. **Decision** — what was decided and the reasoning that survives; refusals named with their reason, because a refusal is a decision too. **Consequences** — what it displaces, what it owes, where the content now lives.

Work that runs against evidence also carries **predictions frozen on write**, each with break-versus-hold criteria decided in advance, and gains its **verdict** at close — including what was too good to be true.

## Names, not numbers

A file is named for what it decided, and that name is how the decision is referred to forever after. Numbers encode position, which moves; names encode identity, which does not. A number must also be looked up before a sentence containing it means anything.

This is about identity, not arithmetic. **A measured value is not a name** — page counts, durations, byte sizes and tallies belong in these entries exactly as measured.

## What an entry is not

Not a second authority: it records the moment and points at the document that carries the content. Not a teaching layer: the book teaches the argument. Not a parking lot: an entry is written at the moment of decision, never to hold a finding somebody should act on.

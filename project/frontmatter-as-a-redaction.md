# Frontmatter as a redaction

**Status: Decided 2026-09-02.** Part of the BelType-on-Cascata round, under [cascata-owns-the-cascade](cascata-owns-the-cascade.md); written after the mechanism had run for a round, because it decided something the code alone states only in passing.

## Context

[Cascata owns the cascade](cascata-owns-the-cascade.md) hands configuration to a library that reads every rung as a **location** — a string its host answers with bytes — and diagnoses every refusal at a file, a line and a column. That error contract was a large part of the argument for the move. BelType's lowest rung is not a file: it is a Markdown document's YAML frontmatter, a block fenced by `---` some way into a file whose remaining thousands of lines are prose, and Cascata has no vocabulary for *part of* a location.

The obvious answer is to hand over the block's own text — the bytes between the fences, which the one frontmatter regex already captures. It works, and it lies. Every line number a diagnostic reported would be short by the opening fence, every column right and every byte offset short by four more, so a refusal about a document's own `styles:` would name a line the author does not have and could not find. Fixing that at the seam means arithmetic — add the fence back, add the offset back, at every diagnostic, in every host — and arithmetic about positions is a thing to get wrong once and then never notice, because a line number that is merely *near* the truth still reads as a line number.

## Decision

**The frontmatter is not extracted. It is REVEALED, in place.** `redactFrontmatter` returns the whole file with every byte outside the block replaced by a space and every newline kept, so the YAML sits at exactly the offsets it occupies in the file the author edits. Same length, same line breaks in the same places, every column preserved. There is no arithmetic anywhere and therefore none to get wrong, and a diagnostic names the author's own file at the author's own line for free — measured live, and worth quoting as the whole point of the mechanism:

> `index.md:4:9 — key 'styles' is under 'cascade: append' but this value is not a sequence`

**Both fences are blanked, not only the prose around them**, and this is the scar rather than a tidiness. A surviving closing `---` after the block makes a second YAML document, and a parser that respects the standard refuses the pair as `multiple-documents` — so a redaction that blanked only the body would have turned a perfectly valid file into an unreadable one, at exactly the moment the author most needs a useful message. The opening fence goes with it for symmetry, and because a leading `---` is a document marker too.

**The location's suffix is `.yaml`, and that is load-bearing rather than decorative.** The virtual location is `<file>#frontmatter.yaml`, because Cascata selects its parser by extension — the same compound-extension rule its own archive host uses for `.packet.json`. A fragment spelled `#frontmatter` would arrive at a parser chosen by the document's own `.md`, which is not a configuration format at all. The suffix is what makes the virtual location self-describing.

**A document with no frontmatter reads as `{}`** — an empty mapping, two bytes, one line. Not the empty string, which is a valid YAML document whose value is null; and not the file blanked entire, which would be a mapping-shaped hole a diagnostic could point into. There is nothing here for a diagnostic to be about, so there is nowhere for one to point.

**Where a document writes the `beltype:` namespace, the revealed window narrows to that mapping's own bytes.** Frontmatter is a shared surface, and the namespace is how a document says which subtree is BelType's; what the cascade must be handed is that subtree, at its own offsets, and nothing beside it. Narrowing the window is the whole mechanism, and it works because YAML admits an indented root: a block whose surroundings are blanked parses to exactly the mapping the author wrote, at exactly the lines and columns they wrote it on — measured, the one-line flow form `beltype: { title: x }` included, whose range is the braces. Extracting and de-indenting would work and would lie, which is the same argument the fence blanking makes one level up.

## Consequences

The meaning lives in `core/src/host.js`, where `readText` answers the virtual location, and the minting lives in `frontmatter.js` beside the regex it shares with the ordinary parse — so the bytes read as YAML and the bytes removed from the body can never drift apart. Every host inherits the behaviour without knowing about it, which is what makes the CLI's diagnostics and the editing tools' tab report the same position for the same document. The frontmatter fragment is BelType's own machinery and has no business inside a sentence about someone's file, so `cascade.js` strips it from a diagnostic's position *and* from its message text before either reaches an author. The cost is that a document's frontmatter is now read by handing a whole file's worth of spaces to a YAML parser once per render; that is the price of never doing position arithmetic, and it has not been felt.

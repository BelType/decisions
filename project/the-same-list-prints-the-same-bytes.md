# The same list prints the same bytes

**Status: Decided 2026-11-02, Executed 2026-11-02.** Executed in Caster on the branch `round/close-the-list`, 42 commits, merged into main the same day; Caster's record of it is proposition S102 of [`DESIGN.md`](https://codeberg.org/BelType/caster/src/commit/b4ceec706d9e5b427a3d1b58efc91e0c0ddb523c/DESIGN.md), which carries the measured numbers. Builds on Caster's *the writer reads only the display list* (S94) and *the display list, version 2* (S96), and amends *the widths are HarfBuzz's, the shaper's own* (S99).

## Context

Caster prints a page the browser laid out into a tagged PDF 2.0, and since 2026-10-29 its writer reads a display list, a plain-data page in the shape of Typst's frame, instead of the measurement and the walk. Two surveys of 2026-11-01 (krilla, then pdf-writer with subsetter and skrifa) asked whether a second writer in Rust, compiled to WebAssembly, could consume the same list and write the same file, and found the crates able but the list not yet closed: the writer was still handed a HarfBuzz registry for the font widths, the options bag, a base URI, a clock, the browser's image decoders and the structure tree's rules, and asked `print()` for what the report needed. A foreign writer could read the list and still not write the file.

An instancing trial the same day found fontations one font unit off HarfBuzz on 3 of 250 332 advances (fixed-point against float rounding of one width adjustment), which Caster's exact-equality check would fail; the question of whose widths are the authority was open.

## Decision

**A display list is closed when the writer is a function of it: the same list gives the same file on any machine, with no DOM, no measurement, no clock and no browser API in reach, and the writer returns only what it chose.** Egildo's rulings for the round, 2026-11-02:

1. **The corpus is committed in Caster.** The display lists, their blob pool keyed by SHA-256 and the files the page printed from them are fixtures in Caster's own repository; the identity gate replays them with no browser. Caster gets no print door of its own: recording borrows the CLI's, and checking and replaying need only the fixtures.
2. **The builder resolves the structure tree.** The list carries a finished tree, elements by index in allocation order, pruning done, the children in `/K` order, destinations resolved; the writer numbers the marked content and inherits no rule.
3. **The list's widths are the authority.** The builder asks HarfBuzz for each font instance's unkerned advances and writes them into the list; the writer's `/W` is those widths, and any writer's embedded font carries an `hmtx` equal to them, patching the table where its own subsetter rounds differently. The file then agrees with itself and with Blink, and a foreign writer needs no HarfBuzz. S99 is amended, not overturned: HarfBuzz still answers, the builder asks.
4. **The creation date is data in the list.** `print()` writes the wall clock into `info.created`, and the identity harness sets that field before the write instead of masking bytes afterwards; the writer reads no clock and a real PDF keeps its real date.
5. **Image streams are deflated by a library, re-recorded once.** The platform's `CompressionStream` leaves the image roads for pdf-lib's own pako, so the page and node write the same bytes by construction; the one re-record shows its first difference as its proof.
6. **The browser's decoders run before the list.** WebP, AVIF and GIF decoding and the opaque-photo rule happen in the page before the list is built; an image source in the list is a file passed through, decoded samples or the rule's JPEG, each a blob.
7. **The writer returns typed records, plain data, split into chosen and derivable.** What the writer chose (the marked-content numbers, the pen before each text segment, resource names, subset statistics) it returns; what follows from the list and those choices a pure `recordsOf` derives; `print()` joins the measurement by page and item itself. Nothing beside the list reaches the writer.
8. **Order is data in the list's arrays and in none of its objects**, so a reader that keeps its own key order writes the same file; the writer writes attribute keys in the schema's order.

Refused: a door of Caster's own for printing the corpus (one more copy of the CLI's road); regenerating the fixtures from the monorepo at test time (a gate standing on a repository planned to go); keeping HarfBuzz's rounding as something a foreign writer must reproduce (the widths are data instead); declaring pako as a dependency while pdf-lib already supplies it.

## Consequences

The gates, each of which the round holds: the identity check on eight documents (the paper specimen, two cast documents, a roads document covering what the paper never takes, a facsimile, a WebP, an arithmetic JPEG and an opaque photo), exact bytes and the report snapshots, with no mask; replay in node with nothing beside the list, byte-identical on all eight; the records test, that `recordsOf` over the writer's records rebuilds every decided member of each snapshot, also from records sent through JSON; the guard on the writer's import closure, thirty modules by name and no line naming the DOM, a clock, chance or the environment, five clocks excused with printed reasons; the determinism test, that each list written twice gives one file, with every order that is not data reversed the same file, and with every order that is reordered another.

Two re-records were made in the round, each alone with its first difference as proof: a link's URI that a space had reached as `%2520` (the parser's `%20` encoded again), now encoded once; and two image streams 97 and 44 bytes smaller under pako. Every other file of the corpus stayed byte for byte what it was at Caster 0.1.4.

What a foreign writer reads: the schema in one file, `src/displayList.ts`, which imports nothing; what it returns in `src/displayList/contract.ts`; `validateList`, which refuses a list the writer could not write, with a sentence per refusal; and the committed lists, their pool and their files as the examples. It is held to the same readers on the same list, not to this writer's bytes, which carry object numbering and number formatting a second writer has no reason to share.

Not done, named in S102: the vector rows stay one whole writer record; the pruning rule runs under no corpus document and is proved only by a hand-made test; the colour-cluster branch is dormant; the 500 kB target of S96 is untested on the BelType specimen, which cannot be printed in Caster's repository; the facsimile is still reopened by pdf-lib inside the writer; the records' timing members are clocks that no byte reads. A `<canvas>` figure, which the builder refuses with "no bytes registered", is queued as its own fix, not this round's.

What it owes: the Rust writer's round, which starts from the committed lists and the two contract files, and whose first measurement is the widths patch against fontations' rounding.

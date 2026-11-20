# A union joins display lists, never finished files

**Status: Decided 2026-11-20.** Egildo's ruling of 2026-11-20, on the request that also convened [a foreign contract lives in a shim](a-foreign-contract-lives-in-a-shim.md): several documents printed into one file, in the order given, each laid out by itself with its own CSS, `@page` rules and orientation, and the file as conforming as a single print. He said "so we have to first solve well the union of several PDFs", asked for the display list to be checked first, and the shape below was laid before him on what the check found. Nothing is built.

## Context

Two roads were laid before him. The first prints each piece as today and stitches the finished files, as qpdf and pdfcpu do. That is cheap for plain files and is where conformance breaks: two structure trees, two role maps, two XMP packets and output intents, the same font subset twice and colliding identifiers, all to be repaired after the fact and validated again.

The second joins before writing. Caster's display list is already a whole document as plain data (*the same list prints the same bytes*, Caster's DESIGN.md S102): a writer handed the list and nothing else writes the file, `print()` hands the list back beside the bytes, and every reference inside it is an index or a key. Read on 2026-11-20 at Caster 0.2.13, display list version 8:

- pages are an array, and every reference to a page is its index: a tagged sequence's `{ page, item }`, a link's destination, an outline entry, a page-label run;
- the structure tree is an array whose element 0 is the root `Document`, and every reference to an element is its index: children, `refs`, a content tag's `element`, a link's owner and its destination's element, an outline entry;
- links carry an `order` over the document;
- blobs are keyed by their SHA-256, so a font or picture two pieces share is held once;
- fonts are an array of instances by key, each with the widths of the glyphs its text shows;
- images, forms, raster fallbacks and emoji are keyed by each document's own index;
- `info` and `writing` are the document's: its language, title, claims, page count, creation date, font profile and colour story.

## Decision

1. **Several documents print into one file by joining their display lists into one list**, which forme or the TypeScript writer writes as it writes any list.
2. **Each piece is cut and walked in its own page**, as a single print is: *the printer runs in the realm it prints* (Caster's DESIGN.md S20) holds for each piece, and only the writing is shared.
3. **The join is a function from lists to a list.** It concatenates the pages and moves every page and element index by what precedes it; renumbers the links' `order`; keeps blobs by their key; joins font instances by key and merges their widths; gives each piece's images, forms, raster fallbacks and emoji keys of their own; and writes one `info`, its page count the sum, its date and title the request's or the first piece's.
4. **The joined tree has one root `Document`**, and each piece's root becomes a `DocumentFragment` under it in a PDF 2.0 file, a `Part` in a PDF 1.7 file. A piece's language goes on its fragment.
5. **Page labels follow the numbering**: where each piece numbers its own pages, each piece opens a run at 1, so a viewer's page numbers are the printed ones.

Refused: joining finished files.

## Consequences

- `print()` writes each piece's bytes today, which a union throws away; it needs a way to stop at the list.
- The two decisions the join cannot make mechanically have their own records: [a union has one colour story](a-union-has-one-colour-story.md) and [a union keeps its weakest claim](a-union-keeps-its-weakest-claim.md). Numbering the pages across the pieces is Cicero's: *the host names the first page number and the total*, in Cicero's record.
- **Not checked:** that either writer accepts a `DocumentFragment` element. Neither names it today, and the list's validation was not found to hold a list of allowed types; a test will say.
- What a union's request to `serve` looks like, in `serve`'s own words, is not ruled.
- A union's pieces are cut in order, so one union does not spread across `serve`'s workers.

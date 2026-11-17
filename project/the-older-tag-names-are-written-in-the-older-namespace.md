# The older tag names are written in the older namespace

**Status: Decided 2026-11-17.** Egildo's rulings of the day. On the tags of the PDF standards Caster is to offer: "we should have well picked fallbacks in both cases". And of two orders laid before him, PDF/A-4 first or the tags first, described to him as restoring code, quotations, the contents and the footnote's links under the PDF/UA-2 claim Caster already makes: "Tags first". The picks below are the survey's of the same day, each run through veraPDF 1.30.4 and run again by the session that wrote this. Builds on [PDF/UA-2 is a flag, not a given](pdf-ua-2-is-a-flag-not-a-given.md) and on [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md), and corrects a finding both writers were built on.

## Context

Caster's tag table flattens four things. A `<blockquote>` is a `Div`, a `<code>` and a `<q>` are a `Span`, and a table of contents is a `Div` around its lists. The reason is written beside each in `src/walk/structure.ts`: `BlockQuote`, `Code`, `Quote`, `TOC` and `TOCI` are structure types of PDF 1.7 that PDF 2.0 left out of its own namespace, a type the 2.0 namespace does not hold fails veraPDF under ISO 14289-2, 8.2.4, and a `/RoleMap` does not rescue it. So the writers put every element in the one namespace, `http://iso.org/pdf2/ssn`, and chose the nearest type it holds.

The finding was half of the rule. Read 2026-11-17 in the texts themselves (ISO 14289-2:2024, ISO/TS 32005:2023, ISO 32000-2):

- A PDF 2.0 file may use the PDF 1.7 types, in the PDF 1.7 namespace, `http://iso.org/pdf/ssn`. ISO/TS 32005 says which 1.7 type may stand inside which 2.0 type, and PDF/UA-2 requires a file to keep to it (6.2).
- PDF/UA-2 does not merely permit them. A block quotation "shall" be a `BlockQuote` (8.2.5.7), an inline one a `Quote` (8.2.5.18), a fragment of computer code a `Code` (8.2.5.32), and a table of contents a `TOC` of `TOCI`, each `TOCI` naming its target with a `Ref` entry on itself or on a child such as a `Reference` (8.2.5.8).
- Content that refers to a footnote "shall" carry a `Ref` to the `FENote`, the `FENote` a `Ref` back to every citation, and a reference that is a link points at the note by a structure destination (8.2.5.14). The `NoteType` attribute "should" say which kind of note it is.

veraPDF checks the namespace and the containment and none of these four "shall"s, which is why every file of both writers passes while breaking them.

**Measured 2026-11-17**, on hand-made files of one page with no text, under veraPDF's `ua2` profile. `BlockQuote` passes in the 1.7 namespace and fails in the 2.0 one. `Code` inside a `P`, `Code` directly in a `Sect`, `Quote` inside a `P` and `Art` pass in the 1.7 namespace. A `TOC` of `TOCI` holding a `Reference` with a `Ref` passes, and the same with no `Ref` fails. An `FENote` with `Ref` both ways and `NoteType /Footnote` passes, a `Ref` one way only fails, and a note with no `Ref` and nothing referring to it passes. `Note` fails in a 2.0 file whatever its namespace.

## Decision

**A structure type that PDF 2.0 dropped is written under its own name in the PDF 1.7 namespace, wherever PDF/UA-2 asks for it. Flattening it to a type of the 2.0 namespace was the wrong cure and is withdrawn.**

- **The table, for a PDF 2.0 file.** `<blockquote>` is a `BlockQuote`. `<code>` is a `Code`, and a `<pre>` stays the `P` it is, so a fenced block is a `P` holding a `Code`. `<q>` is a `Quote`. All three in the 1.7 namespace; every other element stays where it is, in the 2.0 one.
- **A table of contents** is a `TOC`, each of its entries a `TOCI`, and the entry's link a `Reference` carrying a `Ref` to the structure element of its target. A list nested in an entry is a `TOC` nested in the `TOCI`. What marks a table of contents is the author's declaration, `role="doc-toc"` of the Digital Publishing ARIA module, read by the walk as it reads every declared role; the Markdown belt's own `nav.toc-page` counts as the same declaration.
- **A footnote and its call.** Where the page holds a call to a note, the call carries a `Ref` to the `FENote`, the `FENote` a `Ref` to each of its calls, and the call's link names the note by a structure destination. Where a note stands in the text with nothing referring to it, it carries no `Ref`. A footnote's `FENote` carries `NoteType /Footnote`.
- **A link inside the document is a `Reference`**, in the 1.7 namespace, and a link out of it stays a `Link`. Ruled later the same day, 2026-11-17, on the question left open when this record was first written: PDF/UA-2 says the `Reference` type "should be used for intra-document targets" (8.2.5.20), and asked whether to follow it Egildo answered "Yes, Reference". Inside means what the standard means, the target and not the spelling: a link whose address resolves to a place in this document.
- **The display list carries it.** An element of the list names its namespace where it is not the 2.0 one, and the elements it refers to. Both writers write what the list says: a second `Namespace` object only in a file that uses a 1.7 type, a `Ref` array only on an element that has one. A file that holds none of these constructs is byte for byte what it was.
- **The other direction is the same table read backwards**, and is built with the PDF 1.7 family, not now: in a 1.7 file `Em`, `Strong` and `Aside` are custom names role-mapped to `Span`, `Span` and `Div`, a footnote is a `Note` with its own `/ID`, and the types above need no namespace at all.

**Why not role-map instead.** A custom name mapped to `Div` would pass the validator too, and would tell a reader the same nothing `Div` tells it now. The standard has the name, the reader's software knows the name, and the file is allowed to say it.

## Consequences

**The bytes of a file holding a quotation, code, a table of contents, a footnote with a call or a link inside the document change**, under both writers, and the two writers' files must stay equal byte for byte. Its pages do not change: the tags are not drawn.

**What a reader's software gains.** A screen reader can announce a quotation and code as such, and can follow a contents entry to its heading and a call to its note and back.

**What it leaves open.**

- Mathematics as MathML (8.2.5.29), which waits on the feature for carrying an attached file.
- GitHub-flavoured Markdown's notes, a list at the document's end with a link back from each: they are endnotes by the same clause and are not touched by this ruling.
- `<kbd>` and `<samp>`, which stay a `Span`: the standard leaves "what is considered as code" to the author, and a key to press is not a fragment of a program.
- `<article>` as `Art`, measured to pass and asked for by nobody.

**What it touches on the tablet.** A refusal by name stays the answer where the printer cannot say what a thing is. Here it could, and said less than it knew.

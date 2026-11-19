# Caster knows the invoice it carries

**Status: Decided 2026-11-19.** Egildo's ruling of 2026-11-19, one of seven on attachments, each laid before him with two options and my pick first; asked whether he took the first on all seven, he answered "a to all". Nothing is built, and the specification this rules about was not read by the session that wrote it: see *Not read*.

## Context

An electronic invoice in the French and German form is a PDF a person reads with the same invoice inside as XML a machine reads: Factur-X in France, ZUGFeRD in Germany, one specification under two names. The file is PDF/A-3, the XML is attached under a name the specification fixes, and the file's metadata says it is such an invoice and at which profile, from MINIMUM to EXTENDED.

How the other tools do it, read on the day from their documentation: Gotenberg has a route of its own that takes a PDF and the XML, attaches it as `factur-x.xml` whatever it was called, writes the metadata and converts to PDF/A-3; Typst and WeasyPrint attach the file and leave the invoice's metadata to the author or to a second tool.

Two shapes were laid before him: Caster knows the invoice, as one more value on its list, or it only attaches and a second tool adds the invoice's metadata afterwards.

**Not read:** the Factur-X specification, which is not on the machine. What is said of it here is from secondary sources found by search on the day: the current text is Factur-X 1.09.2, the same as ZUGFeRD 2.5.2, published in August 2026; the profiles are MINIMUM, BASIC WL, BASIC, EN 16931 and EXTENDED; the attached file is `factur-x.xml`. **Not settled, and the build's first step once the text is read:** which relationship the invoice file is written with, where the French and the German convention are reported to differ (data or source against alternative, and data for the two profiles that are not a whole invoice); whether the specification admits PDF/A-4f beside PDF/A-3, which one vendor's page says and the rest do not; the exact metadata the specification demands.

## Decision

1. **`standard` gains a value for the invoice**, `factur-x`. It asks for a PDF/A-3 member beside it, and takes `a-3b` where the list names none.
2. **The document attaches the invoice as it attaches any file** ([a document names what it attaches](a-document-names-what-it-attaches.md)), under the name the specification fixes. Under `factur-x` a document that attaches no such file is refused by name.
3. **The profile is read from the XML's own declaration of it**, not said a second time in a flag or an attribute. An XML that declares no profile the specification names refuses the print.
4. **Caster writes what the specification demands of the PDF**: the attached file's relationship and the invoice's metadata.
5. **Caster never writes the XML, and never checks it against the page.** The host makes the invoice's XML, as it makes the document; that its amounts are the ones the page shows is the host's to hold.

Refused: attaching only. A BelType invoice would then need a second tool after the print, which rewrites the file Caster wrote, its identifier and its claims with it.

## Consequences

- The specification is to be on the machine before anything is built, and a validator for the invoice beside veraPDF; Mustang is the one the sources name. Neither is there.
- **A note on where this serves.** Factur-X and ZUGFeRD are the French and German form. In Italy the invoice of record is the FatturaPA XML sent through the exchange system, and a PDF with that XML inside is a courtesy copy, which the attachment rulings of the same day already serve without this one. Said to Egildo with the rulings; he ruled this one in with the rest.

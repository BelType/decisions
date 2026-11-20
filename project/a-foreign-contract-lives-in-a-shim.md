# A foreign contract lives in a shim

**Status: Decided 2026-11-20.** Egildo's ruling of 2026-11-20, "we speak OUR words", on the same request as [the print server fetches only from the hosts the operator lists](the-print-server-fetches-only-from-the-hosts-the-operator-lists.md): a document-management system that prints through WeasyPrint's HTTP service and wants to change only its address and its PDF variant's name. Nothing is built.

## Context

The request asked for WeasyPrint's contract: `POST /convert/html` with the HTML as the body and its options in the query (`base_url`, `pdf_variant`, `media_type`, `file_name`), an `X-API-Key` header, WeasyPrint's status codes and its `/health` and `/version` answers.

`beltype serve` has its own: `POST /print` as a multipart form, its flags as `<owner>.<name>` fields, `caster.standard` for the claims, `422` for a refused document, `504` past the time limit, `413` past the upload limit, `X-Beltype-*` headers and its own `/health`. Gotenberg, whose shape `serve` took, kept a contract of its own and copied no other tool's.

Two shapes were laid before him: `serve` speaks WeasyPrint's words, or `serve` grows the abilities in its own words and the foreign names live in a shim.

## Decision

1. **`serve`'s routes, fields, headers and status codes are BelType's.** No route, field or code is named for another tool's contract.
2. **A foreign contract is translated in a shim outside BelType**, owned by the host that needs it.
3. **What a foreign contract needs and `serve` cannot do is added to `serve` in its own words**, as the fetch from listed hosts and the base URL were.

Refused: `serve` speaking WeasyPrint's words. Each foreign contract would become a second door to keep in step, with its own vocabulary inside BelType's.

## Consequences

- The shim for the request that convened this is small: the path and query names, a table from `pdf_variant` to `caster.standard` (`pdf/ua-2`, `pdf/a-4` and the PDF 1.7 family's `pdf/ua-1`, `pdf/a-2b`, `pdf/a-2u`, `pdf/a-2a+ua-1` map one to one; PDF/A-1 and PDF/A-3 have no member yet and are refused), the API key, the removal of the document's own scripts (it calls Paged.js), and the status codes: `422` becomes `500` and `504` becomes `503`.
- `serve` names none of its own versions today, nor Caster's or Cicero's, which the request asks for in headers and in `/version`. Adding them is a small change in `serve`'s words, not yet ruled.
- Whether `serve` ever refuses a full queue with `503` was not checked; today prints wait their turn.
- Printing several documents into one file, the request's `/combine`, is not a translation: it is [a union joins display lists, never finished files](a-union-joins-display-lists-never-finished-files.md).

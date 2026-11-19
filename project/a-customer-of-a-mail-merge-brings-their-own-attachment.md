# A customer of a mail merge brings their own attachment

**Status: Decided 2026-11-19.** Egildo's ruling of 2026-11-19, one of seven on attachments, each laid before him with two options and my pick first; asked whether he took the first on all seven, he answered "a to all". Nothing is built.

## Context

`beltype serve` prints a mail merge two ways: a folder per customer, or a template sent once and each customer after it as JSON, their values and their rows, merged in the tab ([a mail merge seats the template for every customer](a-mail-merge-seats-the-template-for-every-customer.md)). A document names the file it attaches in its head ([a document names what it attaches](a-document-names-what-it-attaches.md)), and the file comes from the document's folder. A template's folder is one for every customer, and an invoice's XML is a different file for each: the bill specimen is exactly that case.

Two shapes were laid before him: the customer's JSON carries the file, or the data road carries no attachment of a customer's own and such a run goes by a folder per customer.

## Decision

1. **A customer's JSON may carry files**: `"attachments": { "<name>": "<text>" }` beside `values` and `rows`. A name is the file the template's link names; the customer's file stands in its place for that one print.
2. **A link whose file neither the template's folder nor the customer supplies refuses that customer's print by name**, as a missing file does.
3. **A file the customer sends that no link of the template names refuses the print**: the template says what its documents carry.

Refused: leaving the data road without attachments. It is the road a server is asked for when it prints many, and an invoice run is many.

## Consequences

- The text of a file is carried as a JSON string. A file that is not text needs an encoding beside it; which is the build's to settle, and nothing asks for one yet.
- Under the default road the template is written anew for every customer, so no customer's file is the one before's by construction; under `--merge-road kept` the build must show it.
- **Not built, not measured.**

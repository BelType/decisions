# The print server fetches only from the hosts the operator lists

**Status: Decided 2026-11-20.** Egildo's ruling of 2026-11-20, "yes, operator's list only", on a request to put BelType behind a document-management system that prints today through WeasyPrint's HTTP service and posts a document with a base URL rather than its files. Amends [a print server keeps the writer warm](a-print-server-keeps-the-writer-warm.md), whose fourth point said nothing is fetched from a network. Nothing is built.

## Context

`beltype serve` answers a page's every request from the files posted with it and the companions' built files, and refuses anything else by name: the context's route in the CLI's `run.ts` aborts the request and the print fails naming it. A document that asks for anything on a network prints nothing.

A host that keeps its documents' stylesheets, fonts and pictures on its own web server cannot post them as files without walking the document itself: stylesheets, `@import`, nested `url()`, `srcset`, `<object data>`, and rewriting every absolute address it finds into a relative path. The request that convened this ruling asked a service in front of `serve` to do exactly that walk.

Chromium already walks the document. Every reference it resolves arrives at `serve`'s route, so the route is the one place that has to change, and nothing is downloaded ahead of the print or rewritten in the document.

Two shapes were laid before him: hosts the operator lists when the server starts, or hosts the request names.

## Decision

1. **The server fetches only from hosts the operator lists when it starts.** A request to a listed host is fetched and handed to the page; a request to any other host is refused by name, as every request is today. A document, a form field or a request never adds a host.
2. **A print may give its document a base URL**, against which the document's relative references resolve. The files posted with the print still answer first; the network answers only what they do not hold.
3. **A resource that cannot be fetched fails the print, naming it**, as a missing file does today. Nothing is dropped from a print in silence.
4. **With no list, nothing changes**: the server answers from the posted files alone.

Refused: hosts named by the request. Any page that can reach the server could then make it fetch from anywhere.

## Consequences

- The working name of the startup flag is `--fetch-hosts`. It cannot be `--allowed-hosts`, which already names the `Host` values the server answers to. The base URL's working name is a form field in `serve`'s `<owner>.<name>` spelling, `beltype.base`. Neither name is ruled.
- The listed hosts are the operator's to trust: a listed host that serves a script or a stylesheet decides what is printed. A document with a script of its own still takes the fresh road, a page of its own.
- The limit `serve`'s README already names stays: a document's dedicated or shared worker passes no route, so what a worker fetches is neither refused nor listed.
- A font fetched from a listed host is still a font Caster embeds, and the kept page's rule for a font address whose bytes changed applies to it as to a posted one.
- What `beltype print` does on the command line is not touched by this ruling.

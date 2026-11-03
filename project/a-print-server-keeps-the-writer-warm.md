# A print server keeps the writer warm

**Status: Decided 2026-11-03.** Amends [*a writer in a worker holds no frame*](a-writer-in-a-worker-holds-no-frame.md): a host may keep one writer worker alive and shared. The plan and its measurements are the monorepo's `.claude/plans/print-server/plan-print-server.md`; the measurements that convened it are `.claude/plans/the-rust-writer/results-cli-performance-rust-writer.md`.

## Context

A CLI print with forme, the Rust writer, was slower than with the TypeScript writer (the paper specimen: 732 ms against 701), and only because every print starts a new Chromium, so forme's WebAssembly runs cold on every write: 111 ms cold, 30 ms warm, 10 ms native. Five spikes on 2026-11-03 asked how to keep it warm. A new page is cold even in a running browser; Chromium's code cache does not fill under Playwright's routing and does not help when it does; a native write in the CLI costs more to reach (the list's 2.7 MB of blobs, two thirds of them made in the page, take 80 to 240 ms to leave it) than it saves. A shared worker, opened by a page that stays and reached by each document's page in the same browser context, stays warm across pages: the paper's write 116 ms the first time, then 34 to 37 ms, the list handed over in 3 to 6 ms.

## Decision

**`beltype serve` keeps one Chromium and one shared writer worker warm, and prints each posted document in a page of its own.** Egildo's seven rulings of 2026-11-03, all as recommended:

1. **A verb of the CLI**, `beltype serve`, beside `beltype print` and sharing its code; no repository of its own.
2. **Its own small API, Gotenberg's shape**: `POST /print`, a multipart form with `index.html` and its assets as files and the flags as form fields, the PDF back; `GET /health`. Gotenberg's own path waits for a client that asks.
3. **The writer may be a shared worker.** The walk still runs in the document's own page and builds the list there (*the printer runs in the realm it prints*, Caster's DESIGN S20, which binds the walk and the measurement); the writer, a function of the list (*the same list prints the same bytes*), writes it wherever it is handed. Each write still makes its own `Writer` and frees it, a page that cannot reach a worker is still refused by name, and nothing is written on the main thread. What a long-lived worker keeps between writes is its compiled code and its memory's size, never a document's data.
4. **One browser context for every document**, since the shared worker lives in one: each document its own page and its own routing, answering only from its own posted files and the companions' built files, nothing fetched from a network. A context per document would make every write cold again.
5. **One print at a time, queued**, as Gotenberg starts.
6. **Local by default**: `127.0.0.1`, with `--host` and `--port`; an upload limit of 50 MB and a time limit of 60 s a print, both flags. A wider exposure, a Docker image among it, waits for a customer.
7. **The default writer stays `pdf-lib`**, as everywhere until the flip; a request asks for forme with `caster.writer=forme`.

Refused: Chromium's code cache (measured not to help); a native write in the CLI (measured slower to reach than to write); a context per document (cold writes).

## Consequences

The plan's four stages: Caster first (a host may hand `print()` a writer port, and without one nothing changes), then `beltype serve`, then the warm-up, restarts and limits, then the measurements and the manual's page. Its gates: the server's file equals `beltype print`'s for the same document and flags with the date fixed, under both writers; a print survives a forced Chromium crash; a print over a limit is refused by name.

# One repository

**Status: Decided 2026-08-26, Executed 2026-08-26.** Reverses the split decided 2026-07-29 and reaffirmed 2026-08-19, which this entry carries as its own context (formerly the entries numbered 001 and 012).

## Context

**The split, and why it was made.** The engine package's rule is zero dependencies, but proving that it renders needs Chromium, Puppeteer and a corpus — a battery whose weight would poison the package that carries the truth. So the venue was split out on 2026-07-29 under the trigger the repo document names: *a test/tooling footprint that dwarfs the host.* The engine held what is true; the venue held how we know. The venue read the engine's `src/` off the filesystem at run time, so no dependency edge existed in either direction and `git switch` in the engine changed what was under test with no install step. The coupling was the pin, content-addressed on the engine's source tree below commit granularity. The streamline round reopened the question deliberately on 2026-08-19 and closed it the same way.

**What changed is not the ratio.** The venue grew further — the book joined it as a nested project — and stood at roughly 193 files and 18,000 lines against a much smaller `src/`. The ratio the split was named for got worse, not better.

What changed is the cost the boundary was charging for a property that one repository provides for free: *the venue can independently know which engine state a battery run was taken against.* This session paid that cost directly — a battery run failed its own pin gate purely because a fix had not yet been committed to the engine repo, wasting roughly twenty minutes on a claim that could not have been true yet. And Egildo's framing, convening the round: the project has matured past its first envisioning phase, and the *it uses itself in its docs* trick is now more powerful — the venue's own visual-proof machinery is worth using more, not walling off further.

## Decision

**The venue and its book fold into the monorepo as one workspace package, `packages/essay`.** Two names — "battleground" for the testing machinery, "book" for the demonstration — become one, chosen for its better fit as a chat-legible identifier. The book's chapters, not a separate preview server, become the primary visual-proof surface over the machinery they already draw their evidence from.

**The division of labour survives the move untouched: the engine holds what is true, the venue holds how we know.** So does the filesystem read — the venue still resolves `src/` at run time rather than importing it, because that was never really about the repo boundary. It is what keeps `src/` genuinely dependency-free even from its own test harness.

Three parts, each with its reason:

- **A shared, exactly version-pinned Chromium module.** Before this entry, the PDF export and the proof battery each launched Puppeteer independently under the same `^25.3.0` range and had already silently drifted: this repo's install resolved 25.3.0 — Chrome 150.0.7871.24 — and the venue's separate install resolved 25.4.0. Two different Chromium builds underwriting two different sets of claims, discovered by direct measurement while executing this entry, not assumed. The new package exact-pins one version, exports the launch pair (merging both existing shapes; the two print protocols stay separate thin callers rather than being forced into one over-parameterized function) and a battery-time baseline check, which extends *green must be green for a reason somebody can name* to the browser binary itself.
- **The pin is kept, its justification demoted.** Content-addressing on the engine's source tree existed to let two separate repositories agree on what a run was taken against. That need disappears in one repo — but the mechanism had already caught a real defect this session, crying wolf over a clean `src/` because it conflated one dirtiness with another, so it survives as a cheap local sanity check rather than being retired outright.
- **The private deployment is retired, not carried over.** The book was built by the *released* CLI and deployed privately, deliberately decoupled from a possibly mid-edit checkout in a separate repo. That isolation stops being coherent once the CLI is an ordinary workspace sibling — `beltype` now resolves to this checkout's own binary, which is what makes previewing the book under the Cicero engine possible for the first time, since an unpublished package was never reachable from a globally installed release. The book is read in-repo through its own launch seat, like every other document.

**Migration mechanics.** History was rewritten under `packages/essay/` with `git filter-repo` rather than `git subtree`, for a resulting history where `git log` on the path reads naturally back through the original commits; already-dead paths were dropped first. 82 of 90 original commits survived — the other 8 touched only dropped paths. Merged with `--allow-unrelated-histories` onto a feature branch, never onto main directly.

**Refused:**

- **Retiring the pin entirely.** Considered and declined; it had earned its keep once already.
- **A partial topology change.** The venue's size relative to its siblings is real and stays real after the move. It is not treated as a defect: the acyclic-package framing is about import-graph shape, not line count, and a test and demonstration venue is orthogonal to that framing by nature. The repo document gains one sentence saying so, rather than leaving a future reader to wonder whether the 2026-07-29 *dwarfs the host* language still silently applies.
- **Reopening the engine's own PDF refusal.** The shared Chromium module makes it possible in principle, but this entry does not decide it — that stays a design round with Egildo, not a side effect of a packaging move.

## Predictions

*Frozen on write, before the full battery or the PDF comparison had completed. Carried verbatim.*

1. **The venue's records file stays byte-for-byte identical to its pre-move state after a complete fresh battery.** Confirmed already that no edit in this migration touched the file; the fresh run is the proof that nothing the battery actually measures moved either. *Breaks* on any diff.
2. **The pin goes green, naming the same engine source-tree hash the venue carried before the move.** Nothing in this migration touches the engine's `src/`. *Breaks* if the check reports a different tree, or reports stale for any reason other than the pin file being regenerated by this run.
3. **The Chromium baseline check passes inside the real battery run**, not just the isolated smoke test already run by hand. *Breaks* if the battery reports a mismatch — which would mean the pinned version does not resolve consistently under the battery's own process spawn shape.
4. **The battery's duration stays in the same order of magnitude as this session's own pre-move baseline** of roughly twenty minutes. *Breaks* on a large deviation, which would suggest the new shared-module indirection or workspace resolution added meaningful overhead.
5. **The PDF export produces structurally identical output before and after the shared-launch refactor** — same page count, same per-page text, same page-box dimensions. PDFs need not be byte-identical; timestamps and font-embedding order vary honestly. *Breaks* if any structural property differs, which would mean the shared module's deterministic launch flags are not in fact harmless to a plain render, contrary to this entry's own claim.

## Verdict

**All five predictions held.**

**One.** The records file diffs to zero lines against the merge commit after a complete fresh battery.

**Two.** The pin went green naming the same source tree. The dirtiness distinction fixed a day earlier continued working in its new context: the battery correctly reported that the engine tree was not pristine but its `src/` was committed, so the pin stood and named it.

**Three.** The baseline check passed inside the real battery. The complete twenty-five-gate run exited clean with no mismatch.

**Four.** Duration stayed in the same order — 25.9 minutes against a 19.8-minute baseline for a comparable complete run, and this one reprinted every case from scratch, so the difference is well within what reprinting explains rather than evidence of new overhead.

**Five.** The PDF export produced structurally identical output. Built the same document twice — once with the pre-refactor module checked out into the working tree, once refactored — and compared: 11 pages both times, 1,863 characters of extracted text both times, and 594.96 × 841.92 pt on the first and last page both times. The two files even matched at 234,796 bytes, though not byte-for-byte, which is expected of PDF metadata and timestamps. The deterministic launch flags predicted harmless were confirmed harmless, not assumed.

**Unpredicted, and caught before it shipped.** The root suite — which this entry's predictions did not cover — broke immediately with a clear error naming a missing export: `test/contracts.test.js` imported the launch function from the old module's own export, deleted by this refactor. The deeper issue it exposed: the original function took its Puppeteer module as an injectable argument specifically so that test could exercise the error-translation path against a fake object with no real browser, and the new shared version had hidden the loader inside itself, losing that seam. Fixed by giving the shared function an optional override — real callers omit it and get the production path, the test supplies a fake and gets the injectability the original design had. Root suite 391/391, unchanged in count and pass rate from before the session began; the workspace suites green at 45/45 and 78/78.

**Too good to be true, checked rather than trusted.** A migration this large producing zero movement in every standing number could mean the proof itself moved with it, unnoticed. It did not: the one thing that *did* move moved because a real interface changed and a real test caught it, which is the shape of failure this project trusts. The four battery predictions holding is unsurprising on reflection — the engine's `src/` was never touched, only the venue's own files moved, and the launch call sites were audited one by one rather than assumed identical. The one thing genuinely at risk of silent drift, the PDF output now flowing through a new launch path, was the one prediction backed by a real measurement rather than by *the code looks equivalent.*

## Consequences

The repo document gains rows for both new packages and the sentence on size asymmetry. The process document's two-repo choreography — the branch-pairing step, the two-repos section header — is rewritten to *the engine and the venue*, a within-repo distinction rather than a boundary; frozen predictions and the record-plus-changelog spine survive untouched, since they were never about the boundary. The harness contract's placement section is amended the same way, its law-versus-instrument split kept as real content that outlives the merge it coincided with. Both packages' orientation files lose their sibling-repo framing throughout. The two old launch entries become one. The bespoke preview site is retired, its one live utility surviving in a new module. The root package gains a workspace-wide test script, an explicit opt-in that stays distinct from the fast root suite and from the long battery.

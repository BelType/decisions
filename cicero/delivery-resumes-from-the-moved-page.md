# Delivery resumes from the moved page

**Status: Decided 2026-10-21, Executed 2026-10-21.** Egildo's ruling of 2026-10-21, on the reads loop as [*a pointer is a read*](a-pointer-is-a-read.md) built it and the resumable run as [*the run resumes from an entry*](the-run-resumes-from-an-entry.md) built it.

## Context

The reads loop reserves a forward page read, runs, delivers the true values and measures again the blocks that hold the sites whose value changed; [*a pointer is a read*](a-pointer-is-a-read.md) then says that "only a block whose lines moved sends the run again", and its Consequences say what "again" means: "a re-run is the whole run again". Since 2026-10-21 a flow site that reads a page fact joins the same check ([*the page carries its conditions*](the-page-carries-its-conditions.md)). The whole run was the only verb the engine had when the loop was built. Five days later [*the run resumes from an entry*](the-run-resumes-from-an-entry.md) gave it a second one, `run({ resumeAt })`: the run restarts one page before the page holding an edited box, re-cuts, and stops at the first page whose closing entry has the key a prior page's entry had and whose addresses lie clear of the edit, keeping the prior pages after it.

The loop never used that verb. A delivered value that wraps a line on page nine of twelve re-cuts pages one to eight, whose cuts it cannot reach, and the cost of the second pass is the cost of a fresh run (the manual's run is about 2.6 s, *a pointer is a read*'s Measured).

## Decision

**A delivered value that moves a line is an edit at the site's page, and the Ledger already has the verb for an edit.** When the check after delivery finds moved lines, the run is not sent whole again. It resumes from the run it just checked, with the boxes whose lines moved as the edited boxes, so it restarts one page before the first page that holds one of them (the earliest in document order), with the delivered values standing, and convergence stops it past the last of them. The three-run budget becomes a budget on resumes, the same number. A whole run stays only where the moved box has no resumable entry before it (page one) or where the resume refuses.

Nothing else in the loop changes: the reservation, the warm start, the page sites' facts, the console's final word on what still moves.

**Refused: a smarter three-run loop that still re-cuts page one.** Narrowing what the check measures, or pricing the second run better, leaves the second run cutting every page before the moved one, and those pages are a function of addresses no delivered value reached. The verb that knows which pages an edit can reach exists, is fuzzed (*the run resumes from an entry*, build two: 2 400 edits against fresh runs), and is what an edit in the editing tools already takes; a second answer to the same question would be the drift the record genre exists to stop.

## Predictions, frozen on write

Break-versus-hold decided here; judged at the round's close in the Verdict.

1. **Case 82 and case 116 hold in both modes with the same page counts and the same numbers, and the second pass is a resume**: `cicero:reads-check` or a new measure records the restart page, and the pages before it are not re-cut (their entries byte-equal, read off the account). Break: a page count, a number, or a second pass that reports no restart page.
2. **The manual settles in one run as before**: no resume issued, 191 numbers. Break: a second pass.
3. **Every standing battery record reproduces** (26 of 26). Break: any record moving.
4. **On a document where delivery moves a line late in the book** (a scratch document on case 82's pattern with the moving entry on page nine of twelve), the resumed pass cuts fewer pages than a whole run; the count of pages re-cut and the time of the second pass are measured before and after, and the numbers stated. Break: the resumed pass cuts as many pages as a whole run.
5. **Expected unmeasurable**: a delivered value that moves a line on a page BEFORE the site's own page cannot happen, since a site reads forward or local, so no case can show the resume starting too late. Stated, not measured.

## Consequences

- **Displaced**: the reads record's "a re-run is the whole run again", and the driver's whole run on an attempt after the first, which becomes the reason a resume gives only when it refuses.
- **Owed**: `settleReads` hands its `run` callback the run it just checked and the addresses of the moved boxes; the driver resumes from them on an attempt after the first as it resumes from an edit on the first; the result's `resumed` stays relative to the call's own prior, so the presentation of a host that resumed is still correct when the loop resumed again inside the call; `reads.js`'s header, the checklist's cross-reference row and the CHANGELOG under this date.
- **Not touched**: the Gauge, the Stonehand, the cut, the key and the convergence clause, which are *the run resumes from an entry*'s.
- **Where the content lives**: the mechanism in `reads.js`'s `settleReads` and `driver.js`'s resume section, the arithmetic of composing two resumes in `resume.js`, the story in the CHANGELOG.

## Verdict

Executed 2026-10-21 on `round/delivery-resumes-from-the-moved-page`, the build `492d3d21`. Measured with a scratch Playwright script over the venue's server, three runs each way, the second pass read off the `cicero:adjudicate` measures after the first `cicero:reads-check` and off the new `cicero:reads-run`; "before" is the engine at `c4c7ccaa`, the record's own commit.

1. **Cases 82 and 116 hold in both modes, and the second pass is a resume — HELD.** Case 82: eleven pages, 1, 4, 9 and 11, both modes; `cicero:reads-run` reports `from 1, to 11, shift 1, converged`. Its moving entry stands on page one, so the restart is page one and no page stands before it: the claim holds there only vacuously. Case 116: eleven pages both modes; the second pass restarts at page 9 and cuts 9 to 11 where it cut 1 to 11, 4–5 ms against 10 (default) and 6 ms (composed). The final Ledger is byte-equal to the whole run's on both cases and on the scratch document, so the eight kept pages of case 116 are the entries a whole run writes.
2. **The manual settles in one run — HELD, with 198 numbers.** The manual has grown since the reads record counted 191: 301 pages default and 307 composed, 198 contents numbers all shown, one check (198 changed, 0 moved), no resume issued.
3. **Every standing battery record reproduces — HELD.** 26 of 26 gates in 9.9 min, pinned at `492d3d21`: native 163/18/7/11/1, composed-v1 89/8/3, composed-v2 86/10/4, v3 43/5/1/1 and 28/1/1, v4 43/4/2/1, the view gates 50, 40 and 30. Root `npm test` 411 of 411, `npm run check` green, the engine 346, the essay 193, the editing tools 105.
4. **A late moved line re-cuts fewer pages — HELD.** The scratch document (twelve pages, contents on page nine, `10` wrapping and settling at `11`): the second pass cuts pages 8 to 12, five pages, where it cut all twelve; it takes 6 ms against 12 (default) and 7–8 ms against 21–22 (composed). It converges only at the document's end, because the wrap moves every later line by one.
5. **A resume starting too late — UNMEASURABLE, as expected.** Stated, not measured.

**What the record did not predict.**

- **Page one is a resume, not a whole run.** The record kept a whole run "where the moved box has no resumable entry before it (page one)". The verb restarts at page one and may still converge and keep the pages after, as it does for a host's edit on page one, so the result reports `from 1` (case 82) rather than a whole run. The cuts are the same either way.
- **The host's own resume and the loop's resume compose.** An edit in the editing tools or the rim is attempt one's resume from the call's prior. A loop resume inside the same call is relative to attempt one's layout, so the call's `resumed` composes the two, and the presentation keeps reading it against its own prior. Checked on case 82 in a live frame, with 28 words cut from the second filler so the target falls to page nine and `9` unwraps the entry. Before, the second layout ran whole (`resumed` null, its `why` the moved page number). After, `resumed` is `from 1, to 9, shift -2`, and the Ledger and every presented page's text equal a fresh frame's, in both modes.
- **Two fixed points, found and not caused.** With 24 words cut instead, both `9` (nine pages) and `10` (ten pages) are fixed points. The resumed frame starts from the warm start's `11`, reaches `10` and ten pages in one layout, and a fresh frame reaches `9` and nine. The engine at `c4c7ccaa` does exactly the same, since no second layout runs there. It is the warm start's (*a resumed run starts from the numbers it left*) and is filed here for that record's owner, not fixed.

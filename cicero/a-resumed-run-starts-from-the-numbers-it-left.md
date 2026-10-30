# A resumed run starts from the numbers it left

**Status: Decided 2026-10-08, Executed 2026-10-08.** Decided in the `cicero-optimisation` round, on a measurement of the editing loop; it amends the reservation policy of [*a pointer is a read*](a-pointer-is-a-read.md) for a run that resumes, and changes nothing a fresh run does.

## Context

*[A pointer is a read](a-pointer-is-a-read.md)* reserves every forward page read at `"0"` for the first run, delivers the true pages after it and measures again the box each changed site stands in. *[The run resumes from an entry](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/rounds/cicero/the-run-resumes-from-an-entry.md)* then made an edit a run of two or three pages. The two compose badly: a resumed run is handed the same reservation, so every page read is a changed one, and the check measures every reference's box even when no page number moved. On the BGD manual (123 pages, 39 page reads, one edit recutting two pages) that check was 66–102 ms of a pagination of 152–180 ms, and it measured nothing that had changed.

A second cost sat beside it. The search for references and the wait for images both asked the whole document, and a presented document carries a copy of every box on every page: 78 references for 39 real ones on every resumed run, and `document.images` met 19 468 pictures for 157 under a deep-copy condition.

And a resumed run that was in fact whole (another mode, other conditions, a block count that moved, a reference whose number moved a line) said nothing; the first edit after a load once ran whole for no reason anybody could name.

## Decision

**A resumed run's references start from the numbers the run before it left** (LaTeX's `.aux` file; Typst's convergence loop). `paginate` hands `settleReads` the prior run's `delivered` table when it is given `prior` and `dirtyAt`; every page read the prior run knew starts at its value there, a new reference at the reservation. The loop is otherwise unchanged: it stops on a layout whose delivered numbers are its own, runs three at most, and leaves the true numbers standing. An edit that moves no page checks nothing; one that shifts pages checks exactly the references whose page moved.

**The `delivered` a run returns is the table the layout is valid under.** It is the table the layout was cut under, except where the loop ended on a layout the true numbers do not move a line of: then it is the true numbers, because the lines are what a cut reads and the check had just shown them equal. Without this the first run of nearly every document ended on the reservation as its `delivered`, and the warm start would have been the reservation again.

**The searches read the originals.** `findSites` and `awaitImages` are handed the intake's top-level boxes (`originals`: the blocks, the fixed boxes and the running elements) by a host that has presented, and ask each of them; a first run, which has no copies, asks the document as before.

**A run says why it was whole.** The result of `run()` carries `why`, a plain sentence, set exactly when `resumed` is `null`: the first run on a frame, no `resumeAt`, the other mode, conditions that moved and which part (the viewport, the pixel ratio, the colour scheme, a stylesheet by its address), a block count that moved, a reference whose number moved its own line and so laid the run out again, or a previous run that left nothing. The host asked to resume and did not get one: the console line says so, and `__beltypeCicero.last.why` is there for a host to print.

Refused: a warm start for a run that does not resume (a whole run stays a function of the document alone, so that a fresh run and a resumed one compare, as `resume-converges` compares them); searching originals through the page's `[data-beltype-fragment]` marker (it still walks every copy to skip it).

## Consequences

Measured on the BGD manual, five edits of the same paragraphs before and after, in headless Chromium at a visible page: the resumed `run.paginate` median 168 ms to 89 ms, `run.reads-check` 75 ms to 0, references read per run 78 to 39, every cut the same (`pageOf` of 4 446 elements, per edit, equal). The plain-long document, which declares no reference, ran the same pagination in the same time with the same cuts. Cases 79 to 82 resumed after an edit of one, thirty and four hundred words are byte-equal to a fresh run of the edited document; case 82, whose number moves its own line and needs two runs fresh, settles in one when resumed from the numbers its first run left.

Owed to the host, not here: the editing tools print `why` in the edit line. A reference whose true number was never checked against a moved line stays as before (the check still runs for the references whose page changed). Nothing in the tablet moves.

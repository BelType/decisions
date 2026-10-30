# A box is not its first child

**Status: Decided 2026-09-26, Executed 2026-09-26.**

## Context

*[The page asks the index](the-page-asks-the-index.md)* found, writing its worked example, that the grab spends a first child's `break-after` again on every page inside its parent, and kept the reading because a mechanism round moves no number. The checklist filed it under Design opens; [`packages/essay/cases/64-the-first-child-spent-twice`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/64-the-first-child-spent-twice/README.md) reproduced it on 2026-09-26 and was merged red, on the precedent of *[forcing under sections earns a case](forcing-under-sections-earns-a-case.md)*: a `main` whose first child is `h1 { break-after: page }`, then three two-line paragraphs on a thirteen-line page. css-break-3 §4.3 and Chromium's print give two pages; the engine prints four in both modes, one paragraph a page after the title. Every BelType document has this shape, since the belt makes the `h1` a section's first child.

The cause is one test in `forcingIndexOf`'s `find` in `src/driver.js`. To say what `break-after` is pending into the first event `s` strictly after the cursor, `find` collects, for every prefix of the cursor's path, the events at that address whose subtree ended at or before `s` (`events[j].after && events[j].end <= s`), through a `byAddress` map. The prefix stands for *the cursor lies inside this box*, and it cannot say that: a bare path drops its trailing zeros, because before a first child is the same place as before its parent, so a first child's address is its parent's and the list at the parent's address holds the parent and its whole first-child chain. The first child then passes the test for every cursor inside the parent, and `end <= s` admits a subtree that closed pages ago.

## Decision

**A box carries a pending `break-after` into an event only if its subtree closes exactly in front of that event: `events[j].end === s`.** That is the address-free statement of *the cursor lies inside this box, and the box ends before the event begins*: `s` is the first event strictly after the cursor, so a box whose last descendant event lies before `s` and whose end is `s` is the box the cursor is in, or one it is at the start of, closing just as the found event opens. A box that closed earlier, as the heading in case 64 did, has an end smaller than `s` and carries nothing. It needs no address at all, and the list it needs already exists: `closing[s]` is the parity of every forced `break-after` whose subtree closes at `s`, combined deepest first so an outer container's parity replaces an inner one's, and it is what the `nextForced` path already reads for later events. So `find`'s pending is `closing[s]`, and `byAddress` and the prefix loop go.

A `break-after` names one boundary, the one after its own box (§4.3). It is spent there, and the index should not remember it on the next page; the prefix rule did because it asked the address a question the address cannot answer.

### The grab's pending parity, worked again

The two trees are *the page asks the index*'s. The first is the one the prefix rule was written for, and its answers do not move. **A** `{ break-after: right }` holds **B** and **C** `{ break-after: left }`; **D** follows A. C and A both close in front of D, C first, so A's right replaces C's left.

| Cursor | The prefix rule | The subtree rule |
| :-- | :-- | :-- |
| A's start, `[0]` | D, right | D, right |
| inside C, `[0, 1]` word 3 | D, right | D, right |

The second tree is case 64's shape with a parity. **A** `{ break-after: page }` holds **B** `{ break-after: left }`, **C** and **E**; **D** follows A. B closes in front of C; A closes in front of D; nothing closes in front of E.

| Cursor | The prefix rule | The subtree rule, and what css-break-3 wants |
| :-- | :-- | :-- |
| A's start, `[0]` | C, left | C, left — B's own break, spent where it falls |
| C's start, `[0, 1]` — the page that break began | E, left | D, no parity — A's `page` |
| inside E, `[0, 2]` word 4 | D, left | D, no parity |
| D's start, `[1]` | none | none |

Those are the answers `test/driver.test.js`'s worked-example tests assert: six cursors, two in the first tree and four in the second, each answered with an event and a parity (the brief that convened this round counted eight; there are six cursors in the two tables, and all six are asserted). Its second-tree expectations pinned the defect, and are rewritten rather than the tree.

**What the subtree rule reads differently, stated rather than discovered.** It differs from *the cursor is inside the box* in one place: a cursor that lies after a box ends and before the next event begins, without being inside the box — which only anonymous content can hold, text following a block child inside the same parent, since an event is an element. There the box's pending `break-after` rides to the next event, which is where the engine already places that break (an event is the start of the box that resumes, and anonymous content is not one), and it is spent the moment a page begins at or after that event. The prefix rule dropped it on such a page instead. No document in the corpus, the cases or the probes draws a forced `break-after` followed by anonymous content in its parent.

### Checked against the tablet

C1 is unchanged: *forcing belongs to the forward grab*, and it still does — the grab reads it from the index as before, and only which box a pending `break-after` belongs to changes. The four pages were not a C1 violation, since every forced entry was consumed by the grab; they were the grab consuming a force the author never gave, and the tablet does not speak to which box a pending break belongs to, which is css-break-3 §4.3's question. Nothing else in the tablet speaks.

## Predictions, frozen on write

1. **Case 64 goes green under Cicero, in both modes**: two pages, the heading opening page one and `p0w000` page two, and Chromium's partition identical to the engine's. BREAK if either mode prints anything but two pages, or the partition diverges.
2. **The `cases` gate goes green, and no other gate moves.** Every case that declares a forced `break-after` was read for the shape. Cases 37, 39, 40 and 41 put theirs on top-level leaves, children of the body, which is not an event, so no parent shares their address. Case 00's `.titlepage` is a body child too. Case 06's `.force-after` is a body child, and case 19's sits in the middle of its section, neither first. Probe P26's carriers are a body child and a last child. Seeds draw `.force-after` only on top-level paragraphs. Cases 49, 53 and 62 declare no `break-after` at all (a `break-before`, a named page, a parity), so nothing pending reaches them. **Case 36 is the one standing document that exercises a first-child forced `break-after`** — each `section`'s first `.leaf` — and it is predicted not to move: every event the prefix rule wrongly made pending in it is already forced by something else (the name switch from `front` to the unnamed page, or the following leaf's own `break-after`), and no leaf carries a parity, so the event found and its parity are the same under both rules. BREAK on any record that moves in any gate other than `cases`, in either mode, or on case 36 moving.
3. **The fix is a handful of lines in `find`, and deletes more than it adds.** BREAK if anything outside `find` in `src/` changes, the comment on `forcingIndexOf` apart.
4. **What the instrument cannot say.** The corpus draws no forced `break-after` followed by anonymous content, so the one place the subtree rule reads differently from *the cursor is inside the box* is not exercised by any gate, and a green battery says nothing about it. Its reading stands on the paragraph above, not on a run.

## Consequences

The architecture's grab paragraph says the rule is the subtree, cites case 64 and drops the first-child caveat. The checklist's Design opens entry closes; `.claude/NEEDED-FIXES.md`'s row goes. The book's *Forced breaks* chapter keeps its first standing row as written — *a break-after is carried forward and spent on the box that resumes*, **settled** — because this fix makes it true again: it was untrue for a first child from the day the grab descended until this round, and case 64 is the example that says so.

## Verdict

**Prediction 1 held.** `node cases/runner.js 64` after the change: *ok [cicero] 2 pages, presented and printed — presented 2, printed 2*, the same in the composed mode, the heading and `p0w000` opening pages one and two, and *ok [chromium] page for page and word for word with cicero* — thirteen checks, all green, where the case was merged with three red.

**Prediction 2 held.** The complete battery ran once, alone, after `src/` was committed at `96d432f`: 25 gates in 7.2 minutes, 25 ok, every standing record reproduced, the pin re-recorded. The `cases` gate, red on main from the moment case 64 was merged, is green, and it asserts case 36's five pages, its page names, its margin boxes and its partition against Chromium, so the one standing first-child carrier held where it was predicted to. Every tally — the six differential gates, the three view gates — reproduced its record; `gates/records.js` is untouched and no standing number moved.

**Prediction 3 held.** The change is one line of code and one of comment against sixteen removed: the prefix loop with its sort is gone from `find`, and the pending break is `closing[s]`. The `byAddress` map it read is deleted with it — built in `forcingIndexOf`'s body, beside `closing`, rather than in `find`, but read by `find` alone, so it went with its one reader. The only other lines under `src/` that moved are two paragraphs of the comment on `forcingIndexOf`, which described the prefix rule.

**Prediction 4 stands as written.** No gate draws a forced `break-after` followed by anonymous content in its parent, so the one place the rule reads differently from *the cursor is inside the box* is argued above and exercised by nothing.

**What was too good to be true was how little there was to write.** The previous round built `closing` for the next forcing event and built a second structure, `byAddress`, to answer the pending question with a different rule, because it was reproducing a walk that asked the address. The right answer had been sitting in the first structure all along: what closes in front of the event is what is pending into it, whichever event it is. The defect was never in the index's mechanism but in the question it had been told to reproduce, and the fix is deleting the second question. And the book's *Forced breaks* chapter kept its first standing row — *a break-after is carried forward and spent on the box that resumes*, **settled** — through the whole time it was untrue for a first child; it is left as written, because this fix makes it true again.

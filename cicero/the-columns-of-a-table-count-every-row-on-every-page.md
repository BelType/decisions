# The columns of a table count every row on every page

**Status: Decided 2026-11-16, Executed 2026-11-16.** Egildo's ruling of the day, "reopen it", on a finding of 2026-11-15 and the reading of the canon he asked for. It reopens one refused alternative of [*the fragment lays out under the feeds' conditions*](the-fragment-lays-out-under-the-feeds-conditions.md), "a cache of widths across pages", and leaves the rest of that record standing. Built on Cicero's main the same day ([`CHANGELOG.md`](https://codeberg.org/BelType/cicero/src/commit/da8e2edcba9bb32b0e89cbab9e90c29291532fbe/CHANGELOG.md)), not yet released; the verdict is at the foot.

## Context

*The fragment lays out under the feeds' conditions* writes on each piece of a divided table the column widths its own page's feed measured, and keeps the feed whole inside a table because "the feed is the one that matches the browser's print, which lays the whole table out". That holds on the page where a table starts and on no later one. A later page's feed begins at the cut, the rows already printed are put away, and a put-away row sizes nothing (that record measured it: `display: none` on a hollow row removes it from the column sizing). So a later page measures the table without its printed rows and may get other columns.

**Measured 2026-11-15.** A table of 70 rows and two columns on A5, the first cell of row 1 a long unbreakable word and every second cell a sentence that wraps. Chromium's printer: 6 pages, the second column starting at 199.07 pt on every page, every row three lines. Cicero 0.1.15, in the CLI round and in `prosemirror-beltype`'s view alike: 5 pages, page 1 as Chromium prints it (the table's piece 610.3 px for 11 rows), and from page 2 the first column narrow again and every row two lines (657.1 px for 17 rows), page 3 opening at row 29 where Chromium's opens at row 24. Read from the rows' heights and the words' places, not from the cells' widths.

**Measured 2026-11-16, a first page of another width.** The same table with `@page :first { size: A5 landscape }`. Chromium's printer: 7 pages; on the landscape page the second column starts at 217.29 pt, and on every portrait page at 199.07 pt, the place it has when the whole table is portrait, although row 1 stands on no portrait page. Chromium shares the widths out again for the page's width and still counts the row it has already printed.

**The canon.** CSS Fragmentation Level 3, §5.1, *Breaking into Varying-size Fragmentainers* (Candidate Recommendation, 4 December 2018), read 2026-11-16: layout is done again in each fragmentainer with that fragmentainer's size, and intrinsic sizes are calculated and maintained across the whole element. Its informative notes name tables: one that fills the available width, or is sized by percentage, may change its inline size across pages, and one sized by its content or by an absolute length keeps it. CSS 2.1 §17.5.2 derives an automatic table's columns from every cell's minimum and maximum content widths and from the width available. The text names no column widths at a break; the reading here is that a cell's two widths are intrinsic sizes, kept for the whole table, and the sharing-out is layout, done per page. Chromium's print agrees with that reading on both probes.

**What convened it.** `prosemirror-beltype` fills every page of a table again when one row is edited, since a page's decision reads to the table's end. The repair needs the columns to be a fact of the table that an edit either moves or does not, and under widths per piece there is no such fact.

## Decision

**A divided table's columns are computed from all its rows on every page, at that page's width.** A row already printed, and a row not yet reached, count toward the columns of every piece. On pages of one content width a table therefore has one set of column widths; on a page of another content width it has the widths the whole table takes at that width.

**The refusal of "a cache of widths across pages" is lifted, in these terms**: a table's measured columns are kept per table and per content width, and are measured again where the content width changes. The reason given for the refusal, that a width change suspends the lemma about runs of equal content width, is kept as the cache's key.

**What stands of the earlier record.** The literals: a piece is still written its widths on the cells of its first displayed row, with `table-layout: fixed` and the table's width, and no element enters the author's tree. The feed is still whole inside a table from its cursor on. What changes is where a later page's numbers come from: the whole table at that page's width, never the table less its printed rows.

**The mechanism is the round's to find and the verdict's to state.** Two things it must answer: how the whole table is laid out at a width when the page that needs it starts mid-table (the page where the table starts has it for nothing; a page of another width does not), and whether the feed of a later page is itself pinned to those widths, which the earlier record refused for the first page as circular and which is no longer circular once the numbers come from another layout.

**Not in this ruling.** A grid's tracks on a later page, which may forget the items already printed by the same cause: not measured. A table with no row that has every column once, which the engine already declines to pin. A flex row, by the earlier ruling.

## Predictions, frozen on write

1. **The first probe prints 6 pages**, every row three lines, the second column at one place on every page, page for page and word for word with Chromium's print. *Breaks* if the widths agree and a break still differs: the cause is then not the columns.
2. **The second probe prints 7 pages**, the second column on the portrait pages where it stands when the whole table is portrait. *Breaks* if the engine cannot lay the whole table out at a width no page that holds its start has.
3. **Cases 90 and 94 stay green in both modes**, and the manual's routes table keeps its columns: on a table whose widest cells are not all printed before a cut, the two rules give the same numbers.
4. **No essay claim moves** on a chapter whose tables keep their widest cells past the first cut. A claim that moves is a table this record corrects, and is named in the verdict.

## Consequences

**What it displaces.** One refused alternative of *the fragment lays out under the feeds' conditions*, and that record's sentence "a continuation always equals the feed that decided its own page", which stays true and stops being enough: the feed itself must be measured with every row counted.

**What it buys the editor.** With the columns a fact of the table per content width, `prosemirror-beltype` can ask after an edit whether that fact moved, and refill one page where it did not. That repair is the view's and is no part of this record.

**What it owes.** A case, red first, for each probe; the round; the verdict; a dated line on the earlier record, written with this one.

**What it touches on the tablet.** *The Oracle*: where the text names no column widths at a break, Chromium's print is evidence, and here it agrees with the one reading the text allows.

## Verdict, 2026-11-16

**Built, and the two questions answered.**

- **How the whole table is laid out at a width.** No page's feed holds a table whole, the first page's included: a feed is cut at a bound past the page's end, and the rows past the bound are put away like the rows already printed. The Context's sentence that the page where a table starts "has it for nothing" was wrong; that page was right on the probe only because the wide cell stood in its first row. So the engine lays out the whole top-level block that holds a table, deep and with no interval, once per content width, in the page's own measure context, and reads every table's columns off it. The numbers are kept for the run, by block and by content width (`columnsOf` in [`src/driver.ts`](https://codeberg.org/BelType/cicero/src/commit/da8e2edcba9bb32b0e89cbab9e90c29291532fbe/src/driver.ts)).
- **Whether a later page's feed is itself pinned.** Yes, and every page's: each table a feed shows is written the whole table's columns before the feed is laid out, divided or not, since which table a page will divide is not known until it is. The page is then decided under the widths its fragment is written, and the fragments take the same numbers by the path they always had.

**The predictions.**

1. **Held.** The first probe is cut in 6 pages, the rows Chromium's print holds on each, the second column at one place on every page (258.08 px against Chromium's 258.41, inside the case's half pixel).
2. **Held in substance, and its count was wrong.** As a case the second probe prints 6 pages in Chromium and in the engine, not 7: the case's cells carry a bold token the probe of the Context lacked, and the rows moved. The second column stands at 281.61 px on the landscape page and 258.08 on every portrait page, against Chromium's 282.00 and 258.41.
3. **Held as far as it was run.** The essay's claims are all green and unchanged. The manual's routes table was not looked at.
4. **Held.** The essay's battery reads the same on Cicero's main before the merge and on the branch: every claim, every page count, and every verdict of the web platform tests under both printers. The page pictures were not compared, since the essay holds no goldens for Cicero 0.1.15.

**What the round found beside.**

- **A pinned cell changed its box sizing, and with it its height.** The earlier record writes `box-sizing: border-box` on each pinned cell, which also turns a declared `height` into a border box: the first row of every fragment stood shorter by its padding and borders than the row the page was decided on (a 40 px header cell with 1 px borders: 40 px presented, 42 measured). With the feed pinned too, six cases of rows of declared height moved off Chromium's cuts. The whole layout now reads what each content-box cell's padding and borders take, and the width is written in the cell's own sizing; a cell nobody read is written as before. The earlier record carries a dated line.
- **Composed mode was wrong on the first page too**, by another cause this mechanism also removes: the Compositor's line hints stand in the feed, and a column sized over hinted lines is narrower (303.28 px against 258.41).
- **The body's own margin is not on the engine's pages.** Chromium's print keeps the default 8 px inside the page area and the engine's pages hold the body's children directly, so a table that fills the width is 15.5 px wider in the engine. The cases zero the margin; the finding is open and is no part of this record.

**The cases.** Five shapes, each in both modes, in [`test/browser/table-continuation.browser.ts`](https://codeberg.org/BelType/cicero/src/commit/da8e2edcba9bb32b0e89cbab9e90c29291532fbe/test/browser/table-continuation.browser.ts): the two probes, and three written 2026-11-09 on the left edge of a continuation, which waited on this ruling.

**Not measured.** What the extra layout costs on a long table. One run of the essay printed in 24.2 s against 17.0 s, on a loaded machine; a timing is owed before a release.

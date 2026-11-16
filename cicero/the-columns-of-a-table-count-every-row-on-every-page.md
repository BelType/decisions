# The columns of a table count every row on every page

**Status: Decided 2026-11-16.** Egildo's ruling of the day, "reopen it", on a finding of 2026-11-15 and the reading of the canon he asked for. It reopens one refused alternative of [*the fragment lays out under the feeds' conditions*](the-fragment-lays-out-under-the-feeds-conditions.md), "a cache of widths across pages", and leaves the rest of that record standing. Not built.

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

# Decisions

The BelType organization's decision records: one ruling per file, named for what it decided, with its reasoning attached. A record is never rewritten; a reversal is a new file that says what it supersedes.

There are two records:

- [**project**](project/README.md) holds how the work is shaped, kept and run, across the organization's repositories.
- [**cicero**](cicero/README.md) holds what pagination is. It is Cicero's, and strictly scoped to that problem.

## The genre, checked

`npm test` asserts the mechanical half of the genre on every entry:

- the filename matches the header, and no entry is numbered;
- the status line follows its one grammar;
- a supersession names an entry that exists;
- each entry has Context, Decision and Consequences, and a Verdict wherever frozen predictions were executed;
- every relative link resolves, and every link out of this repository is pinned to a commit.

## Where the records came from

They left the BelType monorepo (`github.com/egildo/beltype`, `.claude/decisions/`) on 2026-10-30, copied at commit [`42b348b5`](https://github.com/egildo/beltype/tree/42b348b547d269a217a7f193042fe216386a4650/.claude/decisions). A record's links into that repository now point at the same commit, so each one cites the code and the documents as they stood when it was copied. Apart from those links, the text of every record is unchanged.

Until the port to the organization's repositories is finished, the monorepo keeps its own copy and its own citations. A new ruling is written here first.

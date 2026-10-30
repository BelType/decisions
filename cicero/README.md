# Decisions — Cicero

One decision per file, named for what it decided, never rewritten. A reversal is a new file saying what it supersedes.

**This record is strictly pagination.** Decisions about the project as a whole — how it is documented, how a round runs, how the repository is shaped — live in the repo's own [`.claude/decisions/project/`](../project/README.md). The line is the same one the packages draw: the engine holds what is true, so a decision about *what pagination is* belongs here, and everything else belongs there.

## The genre

An entry carries four things, a page at most:

- **Status** — one grammar, machine-checked: `**Status: Decided YYYY-MM-DD.**` gaining `, Executed YYYY-MM-DD` when built and `, Superseded by <name>` when replaced, free prose allowed only after the closing bold. A decided entry's decision text never changes; corrections come as a new entry.
- **Context** — what convened it, citing the finding where it was recorded rather than restating it.
- **Decision** — what was decided, with the reasoning that survives. Alternatives refused are named with the reason, because a refusal is a decision too.
- **Consequences** — what it displaces, what it owes, and where the content now lives.

For work that will run the battery, the entry also carries **predictions, frozen on write** — each with break-versus-hold criteria decided in advance — and gains its **verdict** at close, including what was too good to be true. A wall nobody predicted is recorded as unpredicted.

## Names, not numbers

A file is named for what it decided — `page-lengths-are-measured.md`, `the-interface-sheet-splits.md` — and that name is how the decision is referred to forever after, in the documents and in conversation alike. Numbers encode position, and position moves; names encode identity, and identity does not. A number also has to be looked up before a sentence containing it means anything.

This is about identity, not arithmetic. **A measured value is not a name.** Page counts, durations, byte sizes and tallies belong in these entries exactly as measured — a verdict that says *structurally identical output* without the numbers behind it is asking to be trusted rather than checked.

## What an entry is not

- **Not a second authority.** The tablet holds the laws, the architecture the shapes, the checklist the honest status. An entry records the *moment* and points; when an entry and one of those disagree, the entry is the older document and says so by pointing.
- **Not a teaching layer.** The compound is: the record keeps the moment, the book teaches the argument, the checklist holds the status. An entry never grows a teaching paragraph the book already carries — it points.
- **Not a parking lot.** An entry is written at the moment of decision or at the opening of work, never to hold a finding somebody should act on. Unfinished findings go to the checklist's frontier or a chapter's `wanted` list, the two homes checked by something that can fail. The rule and its price are in [cycle.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/cycle.md).

## The check

The mechanical half of this genre is asserted by `test/decisions.test.js`: filenames matching their headers, the status grammar, supersession links resolving, Context/Decision/Consequences present, a verdict wherever frozen predictions ran, and every relative link resolving on disk. What no test can check — one decision per entry, the reasoning surviving — stays this README's to demand and a reader's to enforce.

# Working on the decision records

Read the [README](README.md) first. The two folders' own READMEs say what belongs in each and index their entries.

- **One ruling per file**, named for what it decided, never numbered. The filename is the identifier, and the header slugifies to it.
- **Never rewrite a record.** A correction of fact is said in place and dated. A reversal is a new entry whose status line says `Superseded by <name>` on the old one.
- **The status line has one grammar**: `**Status: Decided YYYY-MM-DD.**`, optionally `, Executed …`, optionally `, Superseded by <name>`.
- **A link out of this repository names a commit**, never a branch. An issue or a pull request link is fine as it is.
- **Cite a record by name**, never by number: *the cut resumes at the box*, not a code.
- **No hard-wrapping**: one paragraph is one line.
- `npm test` must stay green. Node 22 or later, no dependencies.

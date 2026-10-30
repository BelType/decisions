# The manual is written in four kinds

**Status: Decided 2026-10-17.** The first step of [the docs overhaul plan](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/plans/docs-overhaul/plan.md); the rules it decides are kept in [the house style](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/docs/style.md).

## Context

The round convened after reading the four manuals Egildo keeps as the canon: Diátaxis, Google's developer documentation guide, the Microsoft Writing Style Guide and the Write the Docs guide. The plan reduces them to what binds here. Four kinds, never mixed on one page. Small and fresh beats large and stale. Fewer words, the point first. Wrong is worse than missing, and a style guide is a decision cache adapted from an existing one.

The repository already held most of this. One authority per question is a standing rule, a package's README is its chapter, the decision records are archives by construction, `manual.test.js` is a docs-as-code gate, and the TSDoc convention separates the summary from `@remarks`. The round corrects; it does not rebuild.

The plan records the measurements (main 6213365, 2026-10-17) and this record cites them rather than restating them. Three convened the decision. The guide carries 46 sentences over forty words and the editing tools' chapter 30, measured over prose alone; the reference chapter, which must be austere, is at 19.6 words a sentence already. The comments hold 1 619 runs of three or more capitalised words and 620 numbered citations, so a run of capitals no longer marks a name and a number often stands alone. And the manual has no how-to chapter: one heading in it begins "How to", while the `beltype-author` skill's trigger list reads as a how-to backlog.

## Decision

**The manual is written in the four kinds Diátaxis names, one kind to a page. A page that mixes them is fixed by cutting and linking, never by deleting.**

Which chapter is which:

- **Tutorial**: `guide.md`. It keeps its voice, the tern included.
- **How-to**: a new chapter, `how-to.md`, included between the syntax and the reference. Each entry is titled as its goal and begins "How to".
- **Reference**: `syntax.md` and `reference.md`. The syntax chapter's explanation moves to the architecture chapter.
- **Explanation**: `architecture.md`, `configuration.md` and `repos.md`.
- **A package README** is a chapter that says what the package is and lists its members. It mixes two kinds by design, and each section leads with its point.
- **CLAUDE.md** is agent orientation and stands outside the four kinds. Its compression is deliberate, and it points at the chapters rather than restating them.

The decision records, the CHANGELOG and the essay venue keep their own genres; the plan's "Cut from this round" names them.

Three rulings shape how it lands (Egildo, 2026-10-17):

1. **Capitals in comments are names, not emphasis.** A run of capitals survives only as the proper name of a seam, from the roster the style page lists, at its definition site and its first mention in a file. A capitalised name is the one thing plain prose cannot do, since `grep` finds the definition and nothing else; capitalised emphasis buys nothing and costs the name its signal.
2. **A number is a lookup, never alone.** The two DESIGN.md ledgers and the probe battery keep their numbers, and a citation carries the name first with the number beside it: *the conservation of words* (S61). A ledger's position is its identity and an amendment needs the order, but a bare number means nothing until somebody looks it up, which is the rule this record already keeps for itself.
3. **A header loses nothing, and keeps only what binds.** A header says what the module is, which members are the API, and the rationale that still binds, in `@remarks`. History moves to the CHANGELOG under its date or to the decision record that owns it, and a dated citation stays behind. The types port needed a header kept whole because its pass was mechanical, while this pass moves reasoning on purpose; nothing leaves a header before it has landed somewhere `grep` reaches.

**The style page is the decision cache.** [`docs/style.md`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/docs/style.md) holds the rules: voice per kind, the sentence ceiling, the words, headings and links, names and numbers, the capitals roster, what a comment may hold, and what enforces each. This record holds why; the page holds what, under a page and with no table of contents.

### Refused

**A second manual for agents.** CLAUDE.md and the `beltype-author` skill are compressions on purpose. The canon's rule against duplication is answered by pointing, not by a third copy.

**A style page that needs a table of contents.** A style guide that needs one is a second manual.

## Consequences

It displaces the TSDoc convention's "a file header stays whole" bullet in CLAUDE.md. The plan's CLAUDE.md step (step 9) amends it; until then the round's comment steps follow the third ruling, as the plan's spine-comments step (step 6) states.

It owes two things. The how-to chapter (step 3), seeded from the skill's references, which then shrink by what moved. And the Vale gate (step 8), `npm run prose`, whose rule list must equal the one in `docs/style.md`.

Where the content lives: the kinds and the rulings here; the rules in `docs/style.md`; the measurements in the plan, and the per-page audit beside it in `.claude/plans/docs-overhaul/audit.md` once the audit step lands. History moved out of a header lands in the CHANGELOG under its date, or in the decision record that owns it, in the same commit.

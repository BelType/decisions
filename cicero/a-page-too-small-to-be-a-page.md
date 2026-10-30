# A page too small to be a page

**Status: Decided 2026-09-07, Executed 2026-09-07.**

## Context

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s design opens has carried this since 2026-08-25, found by `cases/15-the-margin-box` and recorded as **unpredicted**: *"Fed an 8 pt page whose declared margins make the content box negative, the driver does not throw: it presents twenty-three intervals and prints twenty-nine pages of scraps, reporting no page error."* C2 exists to notice a walk that fails to advance and it does not fire, because the walk *does* advance — one fragment per page, indefinitely.

The entry separates two things and both are the round's. **The engine has no floor under a geometry it cannot honour**, where css-break-3 §4 supplies the number: *"To guarantee progress, fragmentainers are assumed to have a minimum block size of 1px regardless of their used size."* Cicero reaches termination another way, so it has never needed the assumption and has never had the floor either. And **a defect that produces confetti is harder to diagnose than one that produces an exception** — every check in case 15 failed and not one of them named the page size.

The assessment that convened these rounds names two prerequisites the venue owes before the engine may refuse anything at all, and both had been paid for in blood by the time this round opened. `cases/runner.js` has no per-case `catch` ([NEEDED-FIXES](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/NEEDED-FIXES.md) §4.1), so **any** throw takes the whole battery: the parallel-flow round lost the run that would have told it which cases its change had moved, and the fixed-box round lost two — one to a stray backtick inside a template literal, one to a counterfactual whose engine was one export short. And a refusal arriving out of a `page.evaluate` reads as *the case threw* rather than as *the engine said this*.

## Decision

**The venue's two prerequisites first, then the floor. In that order, because a refusal nobody can read is worse than none.**

**One — one case's failure is one case's.** `cases/runner.js` gains a `catch` beside its `finally`. A throw is a case failing, which the file already knows how to say; what it must not be is a reason to stop asking the others. The whole battery had been one uncaught exception away from silence, and every case after the failing one went unrun and unreported — which reads exactly like a suite that has nothing to say about them.

**Two — a refusal is a reported page error.** The Cicero engine door catches what the screen read throws, puts the message into `errors`, and returns with no pages. The runner already reports `errors` first, so a refused document says *why* on one line and then fails every claim the case declares beneath it. **The print is skipped deliberately**: printing a document the engine declined to paginate prints the raw source, and a page count taken from that is a number about nothing.

**Refused: putting this in `lib/client.js#view`**, which the assessment proposed. `view` returning an error object rather than throwing would make every caller responsible for checking, and the caller that matters already has an `errors` list built for exactly this. The door is where the refusal belongs.

**Three — the floor, at intake, by name.** `assertPageArea` refuses a condition whose page area is at or below one pixel in either dimension. §4's sentence gives the number for the block size, and the same number is taken for the inline size, since a page area a pixel wide holds no line box either — stated rather than derived, because the specification does not say it.

It fires inside `pageFor`, which means it fires in `readGeometryTable`'s intake sweep, which reaches every condition a document can produce: so a named page nobody has flowed onto yet still refuses before the first measure rather than pages in. That is the discipline [*page lengths are measured*](page-lengths-are-measured.md) established for every other refusal in the file, and the floor is a better fit for it than the length refusals were — it fires on a condition whose lengths all resolved and whose arithmetic then came out at nothing, which is a document that is wrong rather than a page nobody reached.

The message names the page rule, the sentence, and what to look at, and it says the thing worth saying about the old behaviour: *this engine would not fail on it, which is worse.*

**Refused: making the engine cope.** A content box of zero or less is not a layout problem to try harder at. It is a declaration to refuse, in the voice I5 refuses an unstated line-height — which is the checklist entry's own framing and is what makes the floor a two-line function rather than a policy.

**Refused: a case that asserts the refusal.** The venue has no vocabulary for declaring a document the engine must decline: every `expect.json` says *how many pages and which words*, and `pages` is required. Building one is a real extension worth having and is a wider change than this round — so it is filed as a want on the chapter that holds §4's row, with the blocker named, and the floor is pinned DOM-free instead. What the round did do is measure the whole mechanism end to end on a scratch document and then remove it, which is recorded in the verdict rather than left in the tree.

**Refused: laws.** None moves. C2 is untouched — it was never violated here, which is the interesting part: the walk advanced every time.

## Predictions

Frozen on write.

1. **An absurd page refuses at intake, and the refusal reaches the operator as a named page error rather than as a stack trace.** *Breaks* if the message arrives as *the case threw*, which would mean the door change did not take.
2. **The battery completes.** A refusing case fails and the cases after it still run. *Breaks* on a run that ends early, which is what every run before this round did.
3. **Every existing case is unmoved.** No case and no seed declares a page area anywhere near a pixel. *Breaks* on any case whose result differs from the previous round's run.
4. **The DOM-free suite gains pins for the floor and stays green.**

## Verdict

**Predictions 1 and 2 held, measured together on a scratch case.** A copy of `31-where-in-the-band` with its `size` changed to `8pt 8pt` was placed in the suite and the whole suite was run. The report reads:

```
── 99-scratch-absurd
   FAIL [cicero] no page errors — @page '(default)' leaves a page area -64.92px wide and -64.92px tall — css-break-3 §4 assumes a fragmentainer of at least 1px, and a page area at or below that cannot be laid out at all. This engine would not fail on it, which is worse: it would paginate scraps indefinitely. Check the declared size against the margins, borders and paddings that apply to this page.
   FAIL [cicero] 2 pages, presented and printed — presented null, printed 0
```

and **the run reached the end**: 31 checks failed, the 27 environmental ones and this case's four. Before this round the same document would have printed twenty-nine pages of scraps with no error at all, and before the `catch` any throw at all would have ended the run where it stood. The scratch case was removed afterwards; it is not in the tree.

**One defect was found by that run and fixed in it.** The new `bandX` check read the page width out of `pages[0]`, which does not exist on a run that produced no pages, so it threw — and the per-case catch caught it, reported *the case ran — threw: Cannot read properties of undefined*, and carried on. That is the containment working on its own author, one commit after being written. The check reads each page's own width now, which is also the right answer for a document whose pages differ in size.

**Prediction 3 held.** The whole case suite was run and diffed against the previous round's: identical, line for line. 27 checks failing, the same thirteen cases.

**Prediction 4 held.** 84 tests to **87**: the floor over the four shapes that matter — negative in both dimensions, zero in each alone, and exactly at the floor rather than merely below it — the refusal's message naming the rule, the sentence and what to look at, and an ordinary page area passing untouched, with a page area a hundredth of a pixel above the floor passing too, because a floor is a floor and not a minimum-size policy.

**Too good to be true, checked.** The floor firing inside `pageFor` rather than in a separate sweep pass looked like a shortcut and is the opposite: the sweep exists precisely so that every reachable condition is resolved at intake, so a check inside the function the sweep calls is checked over the same set by construction — and the per-page calls that come later hit a memoized answer or a condition the sweep did not know was reachable, which is the case that most wants the refusal.

**What is owed and named rather than approximated.** The venue cannot declare a document the engine must refuse: `pages` is required and every claim is about a rendering. That is a want on the chapter holding §4's row now, and it is what a permanent pin for this floor is waiting on.

**The battery ran at the close of the rounds (2026-09-07), and no standing number moved for this round — checked by a counterfactual rather than by a tally.** The three gates whose tallies the run disagrees with — `native` (0–199), `composed-v2` (200–299 `--composed`) and `v3-native` (400–449) — were each run a second time against the **pre-round `src/`**, the tree at `1cce345` reached through `ENGINE_DIR`, and the two runs' reports are **identical seed for seed**: 164/18/11/7 native, 84/12/4 composed-v2, 42/6/1/1 v3-native. So the argument above is measured rather than argued: the corpus writes page geometries in the hundreds of pixels against a one-pixel floor, `assertPageArea` returns on every seed before its first comparison, and the venue-side changes reach a gate no more than they reached a case — a `catch` no throw arrives at, and a door that returns unchanged when the screen read succeeds. **The three disagreements with `gates/records.js` are identical before and after these rounds and are therefore not the engine's**; they are the machine's, the record is left standing, and the account is in the repo [CHANGELOG](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/CHANGELOG.md) and in the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) §7. The pin is not rewritten — only a complete run with every gate green may write one, and `cases` and `suite` are red here on a font substitution.

## Consequences

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) does not move.

The [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md) moves in two: the *absurd geometry* design open closes, and part three's §4 row stops saying the 1px assumption is unmodelled — it is modelled as a refusal rather than as a floor the walk lays out against, which is a different thing and is said as one.

At the repo root, [NEEDED-FIXES](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/NEEDED-FIXES.md) §4.1 is struck.

Next door: `cases/runner.js` gains the `catch` and its `bandX` check stops reaching into `pages[0]`; `lib/engines/cicero.js` turns a refusal into a reported page error; `lib/chapters.js`' §4 row records the refusal and the chapter gains a want for the vocabulary a case would need.

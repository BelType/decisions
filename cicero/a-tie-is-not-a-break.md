# A tie is not a break

**Status: Decided 2026-09-11, Executed 2026-09-11.** Reported as [beltype#30](https://github.com/egildo/beltype/issues/30), first half only.

## Context

THE word space is built on maximal non-whitespace runs, and every tokenizer in this package spelled that with JavaScript's `\s` — which matches U+00A0. So a NO-BREAK SPACE was read as an ordinary word boundary: `indexBlocks` counted two words where the author wrote one, `joinedWords` consumed two, `measureWords` ordered two, and the Compositor was handed a break candidate at exactly the place the character exists to forbid. Measured on the report's own sentence, monospaced at a thirty-four character measure, the DP took it — `il gatto nero dorme e` / `riposa tranquillo`, with the tie divided.

That makes it a regression rather than only a gap. `&nbsp;` is what the manual and every author reach for, the browser honours it, so the native mode was always right; it went silently ineffective the moment somebody pressed the composed switch, which as of [*the composed mode reaches the operator*](the-composed-mode-reaches-the-operator.md) is a button in `beltype edit`.

The prior art is TeX's tie, `~`. Knuth treats it as **legality** and not as price — the break opportunity is simply not there — which is the honest shape here too: css-text-4 §6.5 says outright that CSS defines no prioritization of soft wrap opportunities, so an author has no property that means *do not end a line here* and the tie is the whole vocabulary they have. A refusal is exact where a price is a guess, which is the same distinction the tolerance-versus-cap question on the checklist is about.

## Decision

**U+00A0 is part of the word, not a boundary between two.** With it go U+202F NARROW NO-BREAK SPACE and U+FEFF ZERO WIDTH NO-BREAK SPACE, which carry the same instruction and which `\s` matches for the same historical reason. Every other character `\s` matches still divides.

The rule is ONE character class, `BREAKING_SPACE`, beside `isInlineBox` in `src/word-space.js` — the module that already exists because these tokenizers must never disagree ([*a word stops at a block boundary*](a-word-stops-at-a-block-boundary.md)) — plus `wordRuns()` for the one site that wants maximal runs rather than a per-character test. It is applied at every site:

- `positions.js` — `indexBlocks` and `wordsBeforeChar`, the source side;
- `fragments.js` — `joinedWords`, the clone side;
- `compose-dom.js` — `collectWords`, the Compositor's own feed;
- `gauge.js` — `measureWords`, whose word order is what a Class B cut's `rel` counts into.

Fixing fewer than all four would be worse than fixing none, for the reason that record states: a cut priced in one space and paid in another is a defect the tokenization did not have before.

**Nothing in the Compositor changed, and that is the point.** It mints candidates from the word list alone — one node between consecutive words, plus the hyphenation offsets inside a word — so removing the boundary removes the candidate. Nothing inside a tied word can mint one either: `hyphenationOffsets` refuses any word that is not letters end to end, which a tie makes it.

**Left as it stands: §6.4's emergency break.** Under `overflow-wrap: anywhere` a word too long for a line of its own is divided at a code-point boundary, tie included. That path exists only where there is no acceptable break anywhere in the line, which is a last resort by construction; refusing there would be refusing the refusal.

**`wordRuns()` is a factory rather than a constant.** A `g` flag carries `lastIndex`, and a shared regex would be state travelling between two tokenizers whose whole contract is that they answer the same number.

**Out of scope, deliberately: the one-letter-word rule.** The report's second half — *a line may not end on a one-letter word, nor perhaps on a two-letter preposition, per the document's own language* — is a design round: whether it is a legality or a price, whether two letters is in, what happens when honouring it is impossible, and whether an author gets a switch. This record decides nothing about it.

## Consequences

An author's `&nbsp;` means in the composed mode what it means everywhere else. `packages/caster`'s `measureSvgText` tokenizes with `/\S+/gu` and has the same property; it is a different package with its own word space and is left alone.

## Verdict

Pinned DOM-free by `test/word-space.test.js`: the character class itself, the run rule the Gauge shares, `indexBlocks` counting six words and not seven, `joinedWords` joining the same six across an inline seam, and the two compositions side by side — the divided tokenization strands the article at a 230-unit measure, the tied one sets `il gatto nero dorme` / `e riposa tranquillo`. Two of the five were red before the change, in the one exact way: seven words for six, and `['dorme', 'e', 'riposa', 'tranquillo']` for `['dorme', 'e riposa', 'tranquillo']`. The package's own suite is 106 of 106. The venue's pin is checked and reported beside this record; no gate number is expected to move, because the fuzzed corpus writes ordinary spaces.

# Questions and solvers

**Status: Decided 2026-08-19.**

## Context

The engine ran under a native/composed mode binary — two hardcoded solver-assignment tables pretending to be identities. The streamline round asked what the engine *is* once the binary is refused.

## Decision

**The engine is a set of questions, each definable in general terms, and for each question a solver — our algorithm or the browser. We own every question; the browser keeps one only where it is correct and dependable enough.** "Dependable enough" is an empirical, per-question verdict, and the battleground is the instrument that issues it: measurement earned the browser's trust (pinned render conditions, the rect-reading rules); line breaking earned the opposite verdict (the wrap-divergence floor only our own breaker closes). The differential's job description under this framing: adjudicate which solver holds each question.

**Parked**: a preference cascade over solvers. It earns a design pass when some question actually has two dependable solvers; today none does.

## Consequences

The native/composed vocabulary survives as gate names and history, not as identities. The essay's structure mirrors this cut — see [the book is a gallery of questions](../project/the-book-is-a-gallery-of-questions.md).

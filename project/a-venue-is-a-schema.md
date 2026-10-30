# A venue is a schema

**Status: Decided 2026-09-02.** Follows [cascata-owns-the-cascade](cascata-owns-the-cascade.md); part of the BelType-on-Cascata round.

## Context

[Cascata owns the cascade](cascata-owns-the-cascade.md) hands the whole configuration question to a library whose only vocabulary for a document is `$schema:` naming a schema and plain values obeying it, and whose only vocabulary for a schema is `keys.<name>.demand` and `keys.<name>.provide`. Cascata has no second kind of document that merely *offers defaults* the way `beltype.config.yaml` used to — a config that wants to state "chapters under me get `styles: [./house.css]` unless they say otherwise" has exactly one way to say it: be a schema, and `provide` the value. `docs/configuration.md`'s old model — every key has one owner, ownership is per key not per file — was already halfway to this: a venue and a mold both stated defaults a document could override, and the 2026-08-25 hardening round had already found that a mold's two faces, what a document comes *with* and what it must *satisfy*, were one DOCTYPE rather than two keys. Cascata's schema is that DOCTYPE, formalized, with a proof (monotonicity) BelType's mold round reasoned toward but could not check.

## Decision

**`beltype.config.yaml` changes genre: it governs documents rather than holding settings.** Where it used to say

```yaml
styles: [./house.css]
```

it now says

```yaml
$adopts: beltype:document
keys:
  styles:
    provide: [./house.css]
```

`$adopts: beltype:document` is not decoration — it is what makes the venue a schema at all rather than an orphaned mapping, adopting BelType's own root schema (the Cascata-native replacement for the old `config-schema.js` manifest, now written in Cascata's vocabulary instead of BelType's own) the way every schema in a pedigree adopts a parent. **This is what molds always wanted and never fully got**: a mold could carry defaults but its `schema:` key, however displacement-governed, was a second, bolted-on mechanism for the other half — demanding something of a chapter. A venue that is itself a schema can `demand` in the same table it `provide`s, so "every chapter under me supplies `owner`" is one line in `keys.owner.demand`, not a separate key merging by a separate rule. Templates, house looks and starters converge on the same construct one rung up: a template *is* a schema a document adopts and satisfies; a house look *is* a schema whose `keys` mostly `provide`; a starter, if it returns at all, is a schema a fresh document names and nothing more. Where BelType had `spec`, `schema`, and — before the 2026-08-25 hardening round folded them — two competing merge algebras for the two, there is now one mechanism, because Cascata never split them to begin with.

**The cost is real and worth stating plainly rather than discovering.** The simple case is heavier: a bare `styles: [./house.css]` becomes four lines nested under `$adopts` and `keys.styles.provide`, and every venue, however small, now authors in the schema register rather than the settings register. `VISION.md`'s "minimal usage is a value in itself — a single Markdown file of one paragraph, with every default accepted, renders" survives this only because Cascata's Host Boundary carries an escape built for exactly this shape: the **launching schema**. A document naming no `$schema` of its own may still be governed — the embedder (BelType's Node host) passes `schema: beltype:document` in the one `load()` call, resolved as if the entry had written `$schema: beltype:document` itself. A folder with no `beltype.config.yaml` at all is not a hole in the cascade; it is a document whose entire pedigree is BelType's own root schema, supplying every default `beltype:document` provides. The zero-config path costs nothing new; the venue-authoring path costs the nesting above, and that price is not refunded by anything else this entry does.

A second cost, less visible until it is paid: keys that used to accumulate for free — `styles`, `components` — because `config-schema.js`'s `APPEND_KEYS` derived it once from one manifest cell, now need `cascade: append` spelled per schema, per key, by whoever writes the venue. Cascata's own worked cascade example demonstrates the exact shape a venue's `styles` entry needs and shows the cost is not hypothetical: a schema that forgets `cascade: append` on `styles` silently reverts to `replace`, and a venue's one tweak sheet destroys the spec it just adopted. What used to be a manifest cell no author could get wrong is now a line an author must remember. *(Measured 2026-09-24, and not true for these two keys as built: the root schema declares `cascade: append` on `styles` and `components`, every adopting schema inherits it, and a descendant cannot weaken it to `replace` — Cascata refuses the attempt. The line an author must remember is left only for a list key a house schema introduces itself.)* In exchange, a venue gains something the old manifest structurally could not offer at all: the power to *demand*, not merely default, a value of every document beneath it, sealed if it chooses, narrowed but never reopened by anything nearer.

## Consequences

A house schema — what used to be `spec:`, addressed by path, singular, displacing whole — is now an ordinary schema in a pedigree, adopted by `$adopts` and resolved by Cascata's own graph-build stage; the mold round's "a nearer mold displaces a farther one's whole" is now literally the pedigree's substitutability, not a bespoke rule `config-schema.js` had to state and enforce by hand. `beltype init`'s starters, if they return, are schemas a fresh document names rather than files `scaffold.js` copies — [the MVP cut](the-mvp-cut.md) parks that question rather than deciding it here. Every existing venue's `beltype.config.yaml` needs rewriting to this shape; none of that migration is this entry's to perform, only to have made necessary.

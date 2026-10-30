# The URL root is the venue

**Status: Decided 2026-09-03.** Part of the BelType-on-Cascata round, beside [the alias is the mount](the-alias-is-the-mount.md), which is the other half of the same table.

## Context

Every ref a document carries has to become a URL, and a URL needs a root — the directory `/` names. BelType's root was the **entry document's own directory**, and the venue, the folder holding `beltype.config.yaml`, was mounted at a generated `/_venue` beside it. That inversion is what forced most of the mount law: a venue's own stylesheet, listed in the venue's own config, could not be expressed at `/` because `/` belonged to a document that might sit two folders down, so the venue got a minted label like any out-of-tree stranger. [The alias is the mount](the-alias-is-the-mount.md) deletes minted labels; the question this entry answers is what `/` names once nothing is minted for the venue.

The answer is not obvious, because there is a second question wearing the same words. *Which directory does `/` name* and *which directory does a ref resolve against* sound like one question and are two, and they have been collapsed by mistake twice in this codebase's history.

## Decision

**`/` names the venue directory when there is one, else the document's own** (`config.urlRoot`; `rootDir` is `dirname(target)` and remains so). A venue standing above its documents serves its own sheet at `/`, with nothing generated for it and nothing to keep in step with a render.

**The venue is still not `rootDir`, and only what `/` names moved.** A ref still resolves **on disk against the directory of the file that declared it** — the venue's `styles` entry beside the venue, a chapter's image beside the chapter, the document's own beside the document — and is only then *expressed* against the root. Since the cascade became Cascata's, the declaring directory is not threaded by hand any more but read from the merged tree's own provenance (`span.origin.id`), so an accumulated `styles` list anchors item by item rather than all against one guess. Anchoring and expression are two steps, and this entry moves exactly one of them.

**That distinction has been reopened twice by mistake, and saying so is part of the decision.** Both times the collapse looked like a simplification — one directory instead of two — and both times it produced a document whose included chapters resolved their own images against someone else's folder. The two names exist because the two facts differ; a session that finds itself about to unify them should read this paragraph as the third warning rather than a discovery.

## Consequences

`plugins/assets.js` is gone, absorbed rather than ported: it anchored the entry document's refs alone, which was correct only while `/` meant the entry's own directory. With the root at the venue the entry document needs anchoring exactly like any included chapter, so `include.js`'s `rebaseAssets` stopped skipping it and the standalone pass went with the exception it existed to carry. The Pug fence keeps its equivalence principle — behaving exactly as HTML written at that site — by anchoring its own output, which the plugin's position in the chain used to buy for free. `/_venue` is gone with `/_inc/N` and `/_spec/N`. What a document without a venue gets is unchanged: `rootDir` is the root, the document's own folder is `/`, and nothing about the zero-config path costs anything new. A ref that lands outside whichever directory `/` names, under no alias, is refused naming `rewrites` — [the alias is the mount](the-alias-is-the-mount.md) carries that half.

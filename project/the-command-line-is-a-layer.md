# The command line is a layer

**Status: Decided 2026-09-07, Executed 2026-09-07.** Follows [run options are flags](run-options-are-flags.md) and [cascata owns the cascade](cascata-owns-the-cascade.md). The consumer half of Cascata's v1.6 milestone, *overrides* (`specs/014-overrides/` in that repository), which was built for this round.

## Context

The proposal (2026-09-06) was a reserved `$flags` key, legal at any rung, so that any capability — font subsetting, a devtools library — would be configured through the cascade like everything else, and a command-line syntax through which anything could be passed as a flag or as any other configuration parameter, for scripting. The mental model behind it was already BelType's since [run options are flags](run-options-are-flags.md): a schema owns every key a verb needs, frontmatter is the one value rung, delegation reaches any YAML Cascata can name, and the root schema is the fallback that makes an empty folder render. What the proposal added was the command line as a source of *document* keys, and a bag to keep them in.

The bag failed the tablet three times, and the door was real. Those are two decisions, recorded here together because they arrived together.

**Measured before building.** Cascata v1.5 had exactly one config-role layer, the entry document, ranked highest; `deriveLayers` pushed it and nothing else. Delegation grafts a fragment into its parent's own layer and forbids `$`-keys in it, and "delegate and start a layer" is a keyword Cascata's spec reserves with laws still unwritten. So a layer nearer than the frontmatter had no seat in the library BelType stands on, and the door needed a Cascata addition before it needed a BelType flag.

## Decision

**`$flags` is refused.** *Reserved names have a criterion*: the belt reserves a name only when the rendering needs something only the belt holds, and a namespace for switches holds nothing of the kind. *A key declares the register of its value*: `$flags.x: true` tells a reader nothing about what `x` governs — the orphaned fragment the rule forbids. And `$` is Cascata's own register, the six reserved directives that never enter the data plane; a BelType `$flags` would be a seventh claiming to be data. The trade word carries the wrong problem too: a feature flag is a rollout mechanism for shipping code to a fraction of users and turning it off without a deploy, and BelType has no fleet. A capability is an ordinary declared key — `fonts: { subset: true }` the day a customer appears — typed, demandable and provenance-tracked by Cascata for free.

**The command line is a config layer, not a merge.** Two flags, `-c <file>` and `--set key.path=value`, each one Cascata *override*: a config document read after the frontmatter's chain and ranked after it in command-line order, the last highest of all. An override is governed exactly as the frontmatter is: a venue's demand refuses `--set toc.depth=9` naming the venue's line and the flag, a key the house sealed `final` holds, a key under `append` accumulates the operator's items after the document's, and `why()` names the flag. That is the whole reason to do it inside the cascade rather than beside it. **Rejected on the way, and it was BelType's working code:** merging the operator's values over the projected value after `load()` returned — `Pipeline`'s `amend` — sees no demand, holds no `final`, and leaves `why()` naming the document that lost. `amend` stays, for the three run facts the Shell needs (`port`, `engine`, `print`), which are not configuration. Also rejected: the command line as the *entry* document with the frontmatter demoted to a schema rung, which would force `title: X` into `keys.title.provide: X` and turn a shared surface into a governed one, leaving another tool's `date:` nowhere to ride.

**The mint.** A `--set` is one document: `key.path=value` spelled as a nested block mapping, the value the YAML scalar text as typed, at the virtual location `<cwd>/#set-<n>.yaml` — the fragment convention `<file>#frontmatter.yaml` already uses, so it can never name a real file. Its directory is the shell's, which is where a ref the operator typed means what it says (`--set 'styles=[./x.css]'` resolves against the shell, not the document). Meaning is core's, so the mint lives in `cascade.js`; the process's node host is seeded with the bytes and answers them like any location (`createNodeHost({ documents })`). A diagnostic reads `--set #2:1:9`. Two flags setting the same root key are two layers and merge as layers do, so there is no duplicate-key refusal and no syntax for combining them. A `-c file` is resolved against the shell's directory and passed as it is: it is a file, so it joined the read-set and an edit to it live-reloads the cascade; a minted document is not a file and never reached the read-set. (Core keeps no read-set since 2026-09-24: the dev server's `cascade` read pass records the `-c` file, and the host serves a minted document before any pass is asked — [the render reads through the session](the-render-reads-through-the-session.md).)

**Run options stay flags.** `--set port=4000` is refused by the standing list, naming `--port`, and that is the list doing its job one seam later.

**Values substitute; nothing computes** holds on the command line as everywhere: a value is a YAML scalar, and a value the shell mangled is a Cascata diagnostic naming the flag, not a guess.

## Consequences

Cascata gained `overrides` at v1.6, an addition under its freeze rule, and BelType's pin moved to it. `args.js` collects both flags in one ordered list; the orchestrator mints and seeds; `resolveConfig` and `Pipeline` take `overrides` as an argument no config file can reach; the reference and the configuration chapter carry the door; the authoring skill's configuration section names it. `edit` does not take the flags yet: the tab runs its own cascade over an HTTP host, so the minted documents would have to cross the wire as a session fact — recorded, not built, no customer. The option-level pin — the embedder pinning what its option names, `-c ci.yaml` byte-exact across machines — is deferred in Cascata's own record with its shape, together with pinning the launching schema, until a consumer ships such a file.

Worked example, run against the real cascade in `test/cascade.test.js` and `test/orchestrator.test.js`:

```
beltype build report.md --pdf -c ci.yaml --set toc.depth=2 --set title="Draft 3"
```

Layers, root to leaf: BelType's root schema, the venue, the frontmatter, `ci.yaml`, the first `--set`, the second. `why(title)` names the second `--set`. Were the venue to demand `toc.depth` at most 3, `--set toc.depth=9` would fail the build naming the venue's line and `--set #1`.

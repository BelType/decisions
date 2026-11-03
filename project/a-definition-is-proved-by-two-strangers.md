# A definition is proved by two strangers

**Status: Decided 2026-11-03.** Decided by Egildo on the plan of the same day for the display list as a common definition, in two sets of rulings: the nine he took whole when the plan was read, and the five he took after the trial of the schema; the sequencing ruling followed with them. Stages that build on this record execute it, in `codeberg.org/BelType/common` first, then in Caster and forme. Amends [the same list prints the same bytes](the-same-list-prints-the-same-bytes.md), whose first ruling it supersedes, and touches [a release moves three remotes at once](a-release-moves-three-remotes-at-once.md) in how a tag names a package.

## Context

Caster's display list, the plain-data page both writers read, is defined today inside Caster. Its schema is a TypeScript file, its rules are a validator in the same folder, and its corpus of lists, blobs and reference files is committed in Caster's fixtures. The second writer, forme, therefore reads a sibling checkout of its rival to find out what it must accept. The reading of 2026-11-03 found four consequences of that arrangement.

The shape of a list is checked on one side only: the TypeScript validator checks references, counts and the tree, and trusts the compiler for the shape, which no longer exists at run time, while forme's hand-written reader refuses an unknown key, a duplicate key and a wrong type and names the place. So the two writers are not held to the same list, and the Rust one is held harder.

The refusal cases are written twice as code, as closures in Caster's tests and again in forme's, with the expected sentences copied as strings; a third writer would write them a third time. The comparator is not symmetric either: it replays the TypeScript writer live for the oracle's records and maps CIDs back to glyph ids only for forme's file, so which glyph rule a file follows is known from the side of the comparison it sits on and not from data. And the corpus, 10 MB of lists and blobs, lives in the repository of one of the two writers it is meant to judge.

Interchange formats that last are proved one way. test262 proves JavaScript and the Web Platform Tests prove the web: one language-neutral definition, one shared conformance suite, and at least two independent consumers that pass it knowing nothing of each other. The definition is not an implementation, so a reference validator may ship beside it but the normative text is the schema and the rules. The suite holds a consumer to expectations committed in the suite and never to another consumer run live beside it. A consumer's known gaps are its own metadata, an expectation file in its own repository, and never a branch in the suite. BelType has the two consumers already, Caster's TypeScript writer, the oracle since 2026-10-29, and forme, Rust compiled to WebAssembly.

## Decision

**The display list becomes a definition of its own, proved by a shared corpus and a shared suite that two writers pass as equals.** `common`, the repository of the shared floor, becomes a workspace of four packages, and the definition lives there. Egildo's rulings, 2026-11-03.

The first nine, on the plan:

1. **Names.** The packages are `@beltype/display-list`, `@beltype/display-list-corpus` and `@beltype/display-list-conformance`, and this record is named *a definition is proved by two strangers*.
2. **Three packages.** The definition is small and a run-time dependency of Caster's print frame; the corpus is published as data, as `@beltype/specimens` is, so Caster's tests stay self-contained; the runner is private and holds mupdf, whose AGPL licence then reaches nobody who installs from npm.
3. **The types are generated from the schema.** The schema is written by hand, and the TypeScript types are generated from it into the package, one source, on the condition that Caster's emitted code stays byte for byte what it was; if that condition fails, the types are written by hand beside the schema with a type-level equality check.
4. **Attribute objects are closed in the schema**, as the types close them, so a stray key is a shape refusal and the stray-key check leaves both validators.
5. **Refusal sentences are normative to the character**, compared after each writer's own prefix.
6. **The definition's and the corpus's major version is the list's version**, 6.0.0, so the version a writer reads is the version it pins.
7. **forme pins `common` as a sibling checkout** held to a lock file that names the corpus manifest's hash, as it already pins Caster and the CLI, with no duplicate of 10 MB and no git submodule.
8. **Caster's `round/rust-writer` is merged into Caster's `main`** once the vector-roads round is committed, the writer still defaulting to `pdf-lib`, and the stage that moves the definition into Caster branches from `main`.
9. **The oracle's number formatting, rounding and MCID numbering are part of the definition**, written in its `SPEC.md` as the readers already enforce them, so a content stream is compared exactly and a third writer knows what it owes.

The five after the trial of the schema, which showed that the schema says what the types say and that the zero-diff gate passes:

10. **Six facts of the list that only the writers refuse today become rules of `validateList`, in the same sentences**: a malformed `info.created`, two elements with one `/ID`, print marks with no colour story, one colourant with two alternates, a raster fallback with no pixels, and a gradient with fewer than two stops.
11. **The samples' colour space and bits per component leave `checkSamples` for the schema**, as the attribute keys did: an attribute's values move with its keys.
12. **A blob whose bytes are not its name is refused by each writer's pool reader.**
13. **A writer's refusal carries its own name as its only prefix**, `caster:` or `forme:`; the module prefixes such as `colorResources:`, `vectorEmit:` and `shading:` go, and the sentence after the prefix is normative.
14. **`json-schema-to-typescript` is not fetched**, because the house emitter passed the gate.

And the sequencing: **the image-handling round lands before the definition moves into Caster.** It adds a report entry and a CMYK samples colour space, so the definition moves at the version that round leaves, and the first bump of the definition has nothing left to carry.

The shape of the work: the schema is JSON Schema 2020-12 and describes the wire form, the JSON with the pool of blobs left out; the schema says what the types say, the rules say what `validateList` says, one layer each. The corpus gains the reference records, so no run of the suite calls the oracle live, and the refusal cases become data, each a base list, an RFC 6902 patch and the expected refusal. Each face in the writer's records gains a CID-to-glyph map, so the content reader maps through data and never through which writer made the file. A writer is a command with two verbs, `validate` and `write`, and the runner knows no writer by name.

### Refused

- **A single package.** The definition would carry 10 MB of data and the AGPL runner into Caster's print frame.
- **Corpus and runner together, private.** Caster's tests would need a sibling checkout of `common`, which the corpus published as data spares them.
- **Hand-written types**, unless the zero-diff gate fails: two sources of one shape drift, and the generated one cannot.
- **Open attribute objects.** The shape layer would refuse first and the stray-key sentence could never be reached by a writer that checks shape first.
- **A tolerance in the content reader.** It would free a third writer and lose the exact pen, which is the check that catches a writer that drifts by a rounding.
- **0.1.0 versions**, the house's way for a new package: a writer then pins a number that does not say which list it reads.
- **A git submodule for forme.** A pinned checkout and a lock file cost the same and need no submodule machinery in a Cargo repository.

## Consequences

The four packages, and who depends on each:

- `@beltype/common` (`packages/common`) is moved, not changed, and stays the floor: Caster, the CLI, Cicero, testbench and the definition depend on it.
- `@beltype/display-list` holds the schema, the records' normative core, the generated types, `validateList` and its `SPEC.md`: Caster depends on it at run time, and forme's tests read its two schema files.
- `@beltype/display-list-corpus` holds the lists, the pool, the reference files and records, the refusal cases and the manifest: Caster's tests depend on it as a development dependency, and forme's tests read it from the pinned checkout.
- `@beltype/display-list-conformance` is private and holds the runner and the readers: both writers reach it by a checkout.

The gates, one line each:

- **Common becomes a workspace:** the tarball of `@beltype/common` is the published one with every built file byte-identical and only `repository.directory` added, and the four consumers are unchanged.
- **The definition:** Caster's emitted code is byte-identical but for the files the new dependency changes, each named, and the identity check differs only by the new CID map in the report snapshots.
- **The corpus moves:** every corpus file is byte-identical to Caster's committed one by the manifest, and both writers give exactly the sentences and items the closures assert today.
- **The runner:** both writers pass with no unexpected result, the suite fails a writer perturbed in one content number, one pen, one MCID, one tree child and one image byte at the reader that owns each, and nothing in the runner's source names a writer.
- **Held to the list, and the browser:** the readers that need no reference file pass both writers on every list, and the browser comparison passes both on the vector-roads document.

A tag names a package from now on: `common-v0.1.3`, `display-list-v6.0.0`; the three existing `v0.1.x` tags stay as the history of `common`, and the private package is refused by the workflow. *A release moves three remotes at once* is otherwise as it was.

What waits on Egildo: the first version of each new package published by hand, as that record rules; the trusted publisher of each package set on npm, just before its first release through the workflow; every push, tag and merge, since the stages leave their branches unpushed; and Caster's branch not merged into `main` before its pins to the new packages are exact versions, since a link to a sibling workspace does not resolve in a fresh clone.

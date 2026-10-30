# A release moves three remotes at once

**Status: Decided 2026-10-30.**

## Context

BelType left the monorepo for standalone repositories in the Codeberg organization `BelType` (`codeberg.org/BelType`). The companions so far are `common`, `cicero`, `caster`, `cli` and this record. Each is private, tagged on Codeberg, and reaches its siblings by git URL. Nothing is published anywhere yet. Egildo ruled the house style for remotes and publishing on 2026-10-30; this entry is that ruling, written once so every repository follows the same one.

Three names look alike and are not the same thing. They are listed here because confusing them is the likeliest mistake:

- `codeberg.org/BelType` — the Codeberg organization. The source of truth.
- `github.com/BelType` — the GitHub organization. A mirror, and the seat of the publishing workflow. **Not** `github.com/egildo`, Egildo's personal account, where the monorepo lives.
- `@beltype` on npmjs.com — the npm organization, Egildo's. **Not** `@egildo`, and not GitHub Packages, where the monorepo's packages went.

## Decision

**Codeberg is the source.** Every commit and every tag is pushed to `codeberg.org/BelType/<name>` first. Issues and pull requests live there. Nothing is ever committed on GitHub, through its web interface or otherwise.

**GitHub mirrors Codeberg, repository for repository, under the same name.** `github.com/BelType/<name>` holds exactly what Codeberg holds. The mechanism is two push URLs on one remote, set once per checkout, so a single `git push` reaches both and no token is stored anywhere:

```bash
git remote set-url --add --push origin ssh://git@codeberg.org/BelType/<name>.git
git remote set-url --add --push origin git@github.com:BelType/<name>.git
```

Codeberg is listed first, so a refused push stops before GitHub moves. A Codeberg push mirror (sync on commit) is the upgrade if work ever lands on Codeberg from somewhere other than this machine; it needs a GitHub token pasted into Codeberg by Egildo, which is why it is not the default. On GitHub, issues, the wiki and projects are turned off, and the description says it is a mirror and points to Codeberg.

**npm publishes only from GitHub, by trusted publishing.** A package `@beltype/<name>` is published by the workflow `.github/workflows/release.yml` in `github.com/BelType/<name>`, through npm's trusted publishing (OpenID Connect, no token), with provenance. Never from a laptop, never with a token, never `npm publish` by hand. Each package's trusted publisher on npmjs.com names the organization `BelType`, the repository and that workflow file. Corrected 2026-10-30: npm checks provenance against `repository.url` in `package.json`, which must therefore name `github.com/BelType/<name>`; Codeberg, the source, is named by `homepage` and `bugs`. An unpublished package has no settings page on npmjs.com, so its trusted publisher can be set only after a first version exists (measured 2026-10-30: `npmjs.com/package/@beltype/common/access` answers Not Found).

**A release is one act: a tag.** The version in `package.json`, the tag `vX.Y.Z` and the heading in `CHANGELOG.md` agree, and the workflow refuses when they do not. Pushing the tag is the release: it lands on Codeberg, the mirror carries it to GitHub, the workflow publishes to npm. Each release needs Egildo's yes, given for that version. A version is never moved or reused; a mistake is fixed by the next patch.

**Everything is public, from now on.** Every repository of the organization is public on Codeberg and on GitHub from 2026-10-30, released or not, and every package is public on npm. A new repository is created public. Before a repository first goes public, its whole history is searched for secrets.

**Siblings meet by version once published.** A git URL between companions (`git+ssh://…codeberg.org/BelType/…#vX.Y.Z`) is replaced by an exact npm version when the sibling is published. The order of first release follows the dependency graph: `common`, then `cicero` and `caster`, then `cli`. This record is a repository, not a package, and is never published to npm.

**The web interfaces are run by a secretary.** Acts that only a forge's or npm's web interface can do — visibility, repository settings, organization membership, trusted publisher configuration, reading a workflow run — are done by a companion agent driving Egildo's Chrome, on the working session's instruction and nothing else. The secretary never types a token or a password; any secret is entered by Egildo. It reports what it saw and what it changed.

### Refused

- **Publishing from the laptop.** A token on disk and an unsigned package, for no gain: the workflow is as fast and leaves provenance.
- **GitHub Packages.** The monorepo used it, and it forced a scope line in every consumer's `.npmrc`. npmjs.com needs none.
- **GitHub as the source.** The organization moved to Codeberg on purpose; GitHub is the reach, not the home.

## Consequences

- Each repository owes: the second push URL; `.github/workflows/release.yml`, the same file in every package repository; the trusted publisher on npmjs.com; the mirror's settings on GitHub.
- The first version of each package is published by hand by Egildo, `npm publish --access public` from a clean checkout of its tag, signed in with his security key, without provenance (his ruling, 2026-10-30); every later version goes through the workflow. Since npm drops a trusted publisher that has not published within 2 days, the secretary sets a package's trusted publisher (GitHub Actions, `BelType/<name>`, `release.yml`, `npm publish` allowed and nothing else) only just before that package's first release through the workflow, never ahead. A token is not used even once.
- The standing rule that the Codeberg repositories stay private is withdrawn. The five histories were searched for tokens, keys and credential files on 2026-10-30 and held none.
- The links in this record pinned to `github.com/egildo/beltype` point at a private repository, and read as dead links to anyone else until that repository is public or the records are re-pinned.

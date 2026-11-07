# A release moves three remotes at once

**Status: Decided 2026-10-30.** Amended 2026-11-07, morning: npm is published by hand. Amended again the same evening: the token workflow stands, and the morning's amendment is withdrawn. Amended a third time, late that evening: `specimens` joins, and the way to bring a repository in is written down (both below).

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

## Amended 2026-11-07 — npm is published by hand

Egildo ruled trusted publishing out on 2026-11-07: it is a nightmare to run. The record asked for a trusted publisher set by hand in npm's web interface just before each package's release, which npm drops after 2 days unused, and a workflow in a mirror's repository to act on it. What happened instead: every release workflow but `specimens`' moved to a token the record refused, a granular token of 90 days per repository; the workflow never published Caster or the CLI, and its last Caster run took a public tag `v0.2.0` to an `E404` with nothing on npm behind it, so that version number is spent. npm shows attestations only on common 0.1.1 and 0.1.2 and fragview 0.1.1, read on 2026-11-07. The rule had stopped describing what happens.

**Every version is published as the first one always was.** Egildo runs `sh scripts/release.sh`, signed in to npm with his security key. An agent does not publish. The script takes a clean checkout of HEAD, installs from the lockfile, runs the tests, publishes with `npm publish --access public`, and only then tags and pushes. No token is written anywhere, since the security key is the door.

**The tag comes last.** A tag is still never moved or reused, and the version in `package.json`, the tag and the heading in `CHANGELOG.md` still agree, now checked by the script. Publishing before tagging means a failed publish leaves nothing public, which is the failure that spent `v0.2.0`. A failed push leaves a version on npm with no public tag, and the script says the command that finishes it.

**What falls.** The ruling *npm publishes only from GitHub, by trusted publishing*; *a release is one act: a tag*, whose act is now the script; `.github/workflows/release.yml` in every package repository; the `NPM_TOKEN` secrets; the secretary's work on trusted publishers; the refusal of publishing from the laptop, whose grounds were a token on disk and an unsigned package. The clause on trusted publishers in *a definition is proved by two strangers* falls with it, and a new package's first version goes the same way as every other.

**What stands.** Codeberg as the source, GitHub as a mirror by two push URLs, `@beltype` on npm and not GitHub Packages, Egildo's yes for each version, everything public, siblings meeting by exact version.

**The cost is said here.** A package on npm carries no attestation, so a pinned version proves its source only through the tag that names it, which is what the integration review asked about. A reader who needs more can compare the tarball with a checkout of the tag. This returns if a customer asks for attestations, by the same workflow, and not before.

## Amended 2026-11-07, evening — the token workflow stands

Egildo ruled the same evening, after another session renewed the token: the morning's amendment is withdrawn. Caster 0.2.0 had been published at 16:26 through the token workflow, from a tag whose tree still held it, with provenance; that is the organisation that worked, and it is the one that stands.

**A release is a tag, and the workflow publishes.** Egildo bumps `package.json`, adds the `## X.Y.Z` heading to `CHANGELOG.md` and commits. `sh scripts/release.sh` refuses a dirty tree, a missing heading, an existing tag or a version already on npm, and otherwise tags `vX.Y.Z` and pushes, Codeberg first, then GitHub. `.github/workflows/release.yml` fires on the tag, checks that the tag, `package.json` and the CHANGELOG agree, and runs `npm publish --provenance`. In `common` the tag is `common-vX.Y.Z` and the script takes the package directory.

**One token, `beltype-ci`.** A granular npm token covering the `@beltype` scope, `prosemirror-beltype` and `prosemirror-fragview`, read and write, direct publishing, bypass 2FA, set as the `NPM_TOKEN` secret in the six package repositories (`cicero`, `caster`, `cli`, `common`, `prosemirror-beltype`, `prosemirror-fragview`), used only on tag pushes and only in the publish step. It expires 2027-02-05. `specimens` has no secret and its workflow was the trusted-publishing one: it publishes by hand or gets the secret and the same workflow.

**Why not trusted publishing**, in Egildo's words: an unvalidated trusted publisher expires after 48 hours, and cicero's disappeared even after a successful publish; registering one costs a passkey tap each time; npm 12.2.2 broke the trust command's positional argument. The registration step is gone from the script.

**A deadline.** npm ends direct publishing for bypass-2FA tokens in January 2027. Before then: back to trusted publishing, or staged publishing where a passkey approves each release.

**What returns.** `.github/workflows/release.yml` and the check-only `scripts/release.sh` in the six repositories, restored on 2026-11-07 by reverting the morning's commit; the `NPM_TOKEN` secrets; provenance. What the morning said about the laptop as a door, about the tag coming last and about the cost of no attestation falls with it.

## Amended 2026-11-07, late evening — `specimens` joins, and how a repository is brought in

`specimens` took the same workflow and script, and published 0.1.1 through them with provenance. Its secret is a second token, `beltype-ci-specimens-2`: the first one's value was never captured, and an npm token's value is shown once, at creation, so the existing `beltype-ci` could not be copied into a new repository, and could not be deleted without breaking the six that use it. It covers the `@beltype` scope only, bypass 2FA, read and write, and expires 2027-02-05 like the other. The unused first token was deleted. Names of tokens must be unique.

**To bring a repository in**, which is a matter of minutes:

1. Copy `.github/workflows/release.yml` and `scripts/release.sh` from a finished repository. `release.sh` is edited nowhere. In the workflow, the `pnpm install` step goes if the repository has no build.
2. `package.json` carries `name`, `version`, `license`, `repository` (the GitHub URL, which provenance is checked against), `publishConfig.access: public` and a `files` list.
3. `CHANGELOG.md` has a `## X.Y.Z` heading for each release, or the workflow refuses the tag.
4. The remote has two push URLs, Codeberg first and GitHub second, as under the decision above. Adding the first one replaces the default, so Codeberg is added explicitly, and `git remote -v` is read afterwards.
5. The `NPM_TOKEN` secret is set from a token that covers the package: `@beltype` covers every scoped package; an unscoped name must be listed on the token. The token is checked first with `npm whoami --//registry.npmjs.org/:_authToken="$(pbpaste)"` and its length is 40 (`pbpaste | wc -c`), then stored with `pbpaste | gh secret set NPM_TOKEN -R <org>/<repo>`, then the clipboard is cleared with `pbcopy < /dev/null`.
6. A release is the version bump, the CHANGELOG heading and the commit, then `sh scripts/release.sh` (in `common`, `sh scripts/release.sh common`).

**Handling the token.** It is never pasted into chat, and the page that shows it is never photographed. npm's copy icon often leaves the wrong text on the clipboard (measured twice on 2026-11-07, 6 characters); a script on the page that calls `navigator.clipboard.writeText` and returns only the length works, and keeps the value out of the transcript. The secret is used only in the publish step and only on tag pushes.

**The deadline stands.** Both tokens expire 2027-02-05, and npm ends direct publishing for bypass-2FA tokens in January 2027. The choice between trusted publishing again and staged publishing with a passkey for each release is owed before then, and the date to act is about 2027-01-25.

/**
 * The decision record's genre, asserted — DOM-free, dependency-free.
 *
 * The record's README promises a genre, and until this suite nothing could fail it: seven entries in, the status line already spoke four grammars. What is asserted here is the mechanical half of the promise — the filename matching its header, the status grammar, supersession links, the required sections, a verdict wherever frozen predictions ran, and every relative link resolving. What no test can check — one decision per entry, the reasoning surviving — stays the README's to demand.
 *
 * It guards BOTH records: this package's, which is strictly pagination, and the repo's own, which is the project's. They are separate on purpose and hold the same genre, so one suite is enough and a drift in either fails here.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RECORDS = [
  { label: 'cicero', dir: path.resolve(HERE, '..', 'cicero') },
  { label: 'project', dir: path.resolve(HERE, '..', 'project') },
];

/** Every entry in both records, as `{ record, file, abs, slug, text }`. README is not an entry. */
const entries = RECORDS.flatMap(({ label, dir }) =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort()
    .map((f) => ({ record: label, file: `${label}/${f}`, abs: path.join(dir, f), slug: f.replace(/\.md$/, ''), text: fs.readFileSync(path.join(dir, f), 'utf8') })),
);

/** Both READMEs, checked for links like everything else. */
const readmes = RECORDS.map(({ label, dir }) => ({ record: label, file: `${label}/README.md`, abs: path.join(dir, 'README.md'), text: fs.readFileSync(path.join(dir, 'README.md'), 'utf8') }));

/** A slug turned into the title a header would carry: `page-lengths-are-measured` → `page lengths are measured`. */
const words = (slug) => slug.replace(/-/g, ' ');

test('both records hold entries, and no entry is numbered', () => {
  for (const { label } of RECORDS) {
    assert.ok(entries.some((e) => e.record === label), `the ${label} record is empty — it cannot be, while this suite cites it`);
  }
  for (const e of entries) {
    assert.doesNotMatch(e.slug, /^\d/, `${e.file}: a filename opening with a number — decisions are named for what they decided, never numbered, because position moves and identity does not`);
  }
});

test("each entry's header names the same decision as its filename", () => {
  for (const e of entries) {
    const header = e.text.split('\n')[0];
    assert.match(header, /^# \S.*/, `${e.file}: the first line must be the header, '# Title'`);
    assert.doesNotMatch(header, /^# \d+ — /, `${e.file}: the header still carries a number — the title is the decision, not its position`);
    const slugify = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const title = header.replace(/^# /, '').split(':')[0];
    assert.equal(slugify(title), e.slug, `${e.file}: header '${header}' slugifies to '${slugify(title)}', not '${e.slug}' — the filename IS the identifier, so the two may not drift`);
  }
});

test('the status line speaks the one grammar', () => {
  const GRAMMAR = /^\*\*Status: Decided \d{4}-\d{2}-\d{2}(, [Ee]xecuted[^,.*]*)?(, Superseded by [a-z][a-z0-9 -]*)?\.\*\*( \S.*)?$/;
  for (const e of entries) {
    const status = e.text.split('\n').find((l) => l.startsWith('**Status:'));
    assert.ok(status, `${e.file}: no status line — an entry without a status is a claim without a state`);
    assert.match(status, GRAMMAR, `${e.file}: status line '${status}' breaks the grammar — Decided YYYY-MM-DD, optionally ', Executed …', optionally ', Superseded by <name>', closing '.**', free prose only after`);
  }
});

test('a supersession names an entry that exists', () => {
  const known = new Set(entries.map((e) => words(e.slug).toLowerCase()));
  for (const e of entries) {
    for (const [, named] of e.text.matchAll(/Superseded by ([a-z][a-z0-9 -]*)\./g)) {
      assert.ok(known.has(named.trim().toLowerCase()), `${e.file}: 'Superseded by ${named.trim()}' names no entry in either record — a supersession pointing at nothing un-supersedes silently`);
    }
  }
});

test('every entry carries Context, Decision, and Consequences', () => {
  for (const e of entries) {
    for (const h of ['## Context', '## Decision', '## Consequences']) {
      assert.ok(new RegExp(`^${h}`, 'm').test(e.text), `${e.file}: missing '${h}' — the genre is four things a page at most, and this is one of them`);
    }
  }
});

test('frozen predictions on an executed entry demand a verdict', () => {
  for (const e of entries) {
    const executed = /^\*\*Status: Decided \d{4}-\d{2}-\d{2}, [Ee]xecuted/m.test(e.text);
    if (/^## Predictions/m.test(e.text) && executed) {
      assert.ok(/^## Verdict/m.test(e.text), `${e.file}: executed with frozen predictions but no '## Verdict' — a prediction nobody closes is a claim nobody can check`);
    }
  }
});

test('every relative link an entry makes resolves on disk', () => {
  for (const e of [...entries, ...readmes]) {
    for (const [, target] of e.text.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^[a-z]+:/.test(target)) continue; // absolute URLs are not this suite's to vouch for
      const clean = target.split('#')[0];
      if (!clean) continue; // pure fragment
      assert.ok(fs.existsSync(path.resolve(path.dirname(e.abs), clean)), `${e.file}: link '${target}' resolves to nothing — a citation that cannot be followed is prose with brackets`);
    }
  }
});

test('no entry refers to a decision by number', () => {
  for (const e of [...entries, ...readmes]) {
    assert.doesNotMatch(e.text, /\bADR-\d+/, `${e.file}: an 'ADR-NNN' reference survives — decisions are cited by name, and a number has to be looked up before the sentence means anything`);
  }
});

test('every link out of the records is pinned to a commit', () => {
  // The records left the monorepo on 2026-10-30; what a ruling cites there is cited as it stood, so a link that leaves this repository names a commit, never a branch.
  for (const e of [...entries, ...readmes]) {
    for (const [, target] of e.text.matchAll(/\]\((https:\/\/(?:github\.com|codeberg\.org)\/(?:egildo|BelType)\/[^)]+)\)/g)) {
      if (/\/(?:issues|pulls?)\/\d+/.test(target)) continue; // an issue or a pull request is an identity already, not a file that moves
      assert.match(target, /\/(?:blob|tree|src\/commit)\/[0-9a-f]{40}\//, `${e.file}: link '${target}' leaves the records without naming a commit — a citation that moves with a branch cites nothing in particular`);
    }
  }
});

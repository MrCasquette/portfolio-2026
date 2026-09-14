/**
 * Rich text cannot inject markup — and we are the ones rendering, so we check it.
 *
 * Two halves to the guarantee. The parser refuses HTML at the source: `htmlFlow`
 * and `htmlText` are disabled in the tokenizer of `atelier-prose`, so a `<script>`
 * written in a field becomes *text*. And the renderer never hands a string to the
 * DOM: Astro escapes every interpolation, which only holds as long as nothing
 * reaches for `set:html`.
 *
 * The second half is the one that can rot in this repository, so it is the one
 * worth a test here.
 */
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';
import { parseProse } from '@axiome-apps/atelier-prose';

test('un script écrit dans un champ ressort en texte, jamais en balise', () => {
  const tree = parseProse('Avant <script>alert(1)</script> après.');
  const [block] = tree.children;

  assert.equal(block?.type, 'paragraph');
  const values = block.children.map(node => (node.type === 'text' ? node.value : node.type));
  assert.ok(
    values.every(value => value !== 'html'),
    `aucun nœud HTML attendu, vu : ${values.join(' | ')}`,
  );
  assert.ok(values.join('').includes('<script>'), 'le texte littéral est conservé');
});

test('un lien en javascript: est refusé par safeUrl, et sa phrase survit', async () => {
  const { safeUrl } = await import('@axiome-apps/atelier-prose');
  assert.equal(safeUrl('javascript:alert(1)'), null);
  assert.equal(safeUrl('https://example.com/a'), 'https://example.com/a');
});

/** Every file under `src/`, so the guarantee cannot be escaped in a new one. */
const sourceFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = entries.map(async entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
  return (await Promise.all(nested)).flat();
};

test('rien dans src/ ne rend du HTML brut', async () => {
  const files = await sourceFiles(new URL('../..', import.meta.url).pathname);
  const offenders: string[] = [];

  for (const file of files) {
    if (!/\.(astro|ts|tsx)$/.test(file) || file.endsWith('escaping.test.ts')) continue;
    const text = await readFile(file, 'utf8');
    if (text.includes('set:html') || text.includes('innerHTML')) offenders.push(file);
  }

  assert.deepEqual(offenders, [], 'un rendu de HTML brut annulerait tout le raisonnement');
});

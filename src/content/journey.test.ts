/**
 * The journey, checked against the map it is supposed to draw.
 *
 * `docs/architecture/parcours.md` describes the shape and insists that none of
 * its numbers is written anywhere. This file is where the current shape — the
 * chapters and the depth each one goes to — is actually held, and that is what
 * proves the claim: they are recomputed from the content alone.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chaptersOf, journeyOf } from './journey.ts';
import { loadPage } from './load.ts';
import { yamlSource } from './provider/yaml/index.ts';

const source = yamlSource(new URL('../../content', import.meta.url).pathname);
const steps = async () => journeyOf(await loadPage(source, 'home'));

test('les chapitres du parcours, et la profondeur de chacun', async () => {
  const chapters = chaptersOf(await steps());
  assert.deepEqual(
    chapters.map(chapter => chapter.label),
    ['Accueil', 'Profil', 'Réalisations', 'Projet 01', 'Projet 02', 'Projet 03', 'Contact'],
  );

  const placed = await steps();
  const depths = chapters.map(chapter => placed.find(step => step.id === chapter.id)?.chapterDepth);
  assert.deepEqual(depths, [0, 0, 0, 2, 4, 5, 0]);
});

test('le chemin n’entre nulle part au début et ne sort nulle part à la fin', async () => {
  const placed = await steps();
  assert.equal(placed[0]?.enters, null);
  assert.equal(placed.at(-1)?.leaves, null);
});

test('deux pas consécutifs diffèrent d’une cellule sur un seul axe', async () => {
  const placed = await steps();
  for (const [index, step] of placed.entries()) {
    if (index === 0) continue;
    const before = placed[index - 1];
    if (!before) continue;
    const moved = Math.abs(step.col - before.col) + Math.abs(step.row - before.row);
    assert.equal(moved, 1, `le pas « ${step.id} » saute`);
  }
});

test('une descente est entrée vers le bas, un chapitre vers la droite', async () => {
  const placed = await steps();
  const arbitrations = placed.filter(step => step.content.kind === 'arbitration');
  assert.ok(arbitrations.length > 0);
  for (const step of arbitrations) assert.equal(step.enters, 'down');
  for (const step of placed.filter(s => s.depth === 0).slice(1)) assert.equal(step.enters, 'right');
});

test('les ancres des projets sont leurs slugs — elles survivront aux UUID de Prisme', async () => {
  const placed = await steps();
  assert.deepEqual(
    placed.filter(step => step.content.kind === 'project').map(step => step.id),
    ['atelier', 'plume', 'serveur'],
  );
});

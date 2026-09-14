/**
 * The two rules a field cannot carry: the shape of an arbitration, and whether a
 * reference resolves.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { z } from 'zod';
import { arbitration, project } from '../definitions/entities.ts';
import { descent, index } from '../definitions/sections.ts';
import { definitionToZod } from './fields-to-zod.ts';
import { arbitrationShape, referencesOf, unresolved } from './rules.ts';

const settled = {
  project: 'atelier',
  stakes: 'La question.',
  date: '2026-04-12',
  status: 'settled' as const,
  decided: 'Ce qui a été décidé.',
  consequence: 'Ce qu’on a observé.',
  rejected: [{ option: 'L’autre voie', reason: 'Pourquoi pas elle.' }],
};

const open = {
  project: 'atelier',
  stakes: 'La question.',
  date: '2026-04-12',
  status: 'open' as const,
  options: [{ label: 'Une voie' }, { label: 'Une autre' }],
  opening: 'Ce qui reste à trancher.',
};

const check = (value: unknown) => {
  const schema = definitionToZod(arbitration).superRefine(arbitrationShape);
  return schema.safeParse(value);
};

const pathsOf = (result: z.ZodSafeParseResult<unknown>) =>
  result.success ? [] : result.error.issues.map(issue => issue.path.join('.'));

test('les deux formes complètes passent', () => {
  assert.ok(check(settled).success);
  assert.ok(check(open).success);
});

test('tranché sans conséquence observée : refusé', () => {
  const { consequence, ...without } = settled;
  assert.deepEqual(pathsOf(check(without)), ['consequence']);
});

test('tranché sans décision ni options écartées : refusé, champ par champ', () => {
  const { decided, rejected, ...without } = settled;
  assert.deepEqual(pathsOf(check(without)).sort(), ['decided', 'rejected']);
});

test('ouvert sans ouverture : refusé', () => {
  const { opening, ...without } = open;
  assert.deepEqual(pathsOf(check(without)), ['opening']);
});

test('ouvert sans rien d’écarté : accepté — il peut n’avoir rien éliminé', () => {
  assert.ok(check(open).success);
});

test('ouvert avec une option écartée : accepté aussi', () => {
  assert.ok(check({ ...open, rejected: [{ option: 'Écartée', reason: 'Pourquoi.' }] }).success);
});

test('les références sont lues sur la déclaration, avec leur chemin', () => {
  const found = referencesOf(descent.fields, {
    project: 'atelier',
    arbitrations: [{ arbitration: 'a-un' }, { arbitration: 'a-deux' }],
    incident: 'un-incident',
  });

  assert.deepEqual(found, [
    { field: 'project', to: 'project', id: 'atelier' },
    { field: 'arbitrations[0].arbitration', to: 'arbitration', id: 'a-un' },
    { field: 'arbitrations[1].arbitration', to: 'arbitration', id: 'a-deux' },
    { field: 'incident', to: 'incident', id: 'un-incident' },
  ]);
});

test('une référence nichée dans un composant est trouvée', () => {
  const found = referencesOf(index.fields, {
    title: 'Trois pièces',
    entries: [{ project: 'plume', proves: 'Ce que les autres ne prouvent pas.' }],
  });
  assert.deepEqual(found, [{ field: 'entries[0].project', to: 'project', id: 'plume' }]);
});

test('un champ absent ne produit pas de référence', () => {
  assert.deepEqual(referencesOf(descent.fields, { project: 'atelier', arbitrations: [] }), [
    { field: 'project', to: 'project', id: 'atelier' },
  ]);
});

test('aucune référence dans une entité qui n’en déclare pas au-delà de son parent', () => {
  const found = referencesOf(project.fields, {
    moment: 'design',
    name: 'Atelier',
    state: 'in-progress',
    stakes: 'Ce dont il répond.',
    facts: [{ value: '2', label: 'briques' }],
    source: { href: 'https://example.com/r/1', label: 'Le dépôt' },
  });
  assert.deepEqual(found, []);
});

test('ce à quoi rien ne répond est signalé, le reste non', () => {
  const references = referencesOf(descent.fields, {
    project: 'atelier',
    arbitrations: [{ arbitration: 'connu' }, { arbitration: 'fantome' }],
  });
  const known = new Map([
    ['project', new Set(['atelier'])],
    ['arbitration', new Set(['connu'])],
  ]);
  assert.deepEqual(unresolved(references, known), [
    { field: 'arbitrations[1].arbitration', to: 'arbitration', id: 'fantome' },
  ]);
});

test('une cible jamais chargée rend toutes ses références non résolues', () => {
  const references = referencesOf(descent.fields, { project: 'atelier', arbitrations: [] });
  assert.deepEqual(unresolved(references, new Map()), [
    { field: 'project', to: 'project', id: 'atelier' },
  ]);
});

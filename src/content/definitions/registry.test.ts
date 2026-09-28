/**
 * The accord with Prisme, checked without a network.
 *
 * `serialize()` produces exactly the body `PUT /content/registry` expects, so if
 * this passes, the declaration the portfolio renders from is the one Prisme's
 * admin would edit. It is the test that proves the v1 has not drifted away from
 * the target shape while nobody was pushing to it.
 *
 * `checkRegistry()` is deliberately not used here: it takes an `apiUrl` and an
 * `apiKey` and talks to the API, which has no surface yet. `serialize` is the
 * whole of what can be verified offline — and it is the part that can drift.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { serialize } from '@axiome-apps/atelier-content';
import { content } from './index.ts';

const registry = serialize(content);

test('le registre sérialisé a la forme que l’API attend', () => {
  assert.equal(registry.version, 1);
  assert.deepEqual(Object.keys(registry.sections).sort(), [
    'contact',
    'descent',
    'index',
    'statement',
    'thesis',
  ]);
  assert.deepEqual(Object.keys(registry.entities ?? {}).sort(), [
    'arbitration',
    'excerpt',
    'identity',
    'incident',
    'project',
  ]);
});

test('les composants sont collectés tout seuls, en suivant les références', () => {
  /* Aucun n'est listé dans `defineContent` : la CLI les trouve en marchant les
     sections et les entités. S'ils manquaient, le registre poussé décrirait des
     champs dont l'admin ne saurait pas quoi faire. */
  const components = Object.keys(registry.components).sort();
  assert.deepEqual(components, [
    'arbitrationRef',
    'callToAction',
    'channel',
    'coveredFunction',
    'fact',
    'indexEntry',
    'liveOption',
    'momentCost',
    'rejectedOption',
    'revision',
    'source',
    'timelineEntry',
  ]);
});

test('les champs sont une séquence, et la position porte l’ordre déclaré', () => {
  /* ADR-0049 : ni `jsonb` ni JavaScript ne garantissent l'ordre des clés d'un
     objet, un tableau si. C'est l'ordre du formulaire d'administration. */
  const statement = registry.sections.statement;
  assert.ok(Array.isArray(statement?.fields));
  assert.deepEqual(
    statement.fields.map(field => field.name),
    ['name', 'role', 'description', 'availability', 'actions'],
  );
});

test('un composant imbriqué se sérialise en référence, pas en copie', () => {
  const source = registry.entities?.project?.fields.find(field => field.name === 'source');

  assert.equal(source?.kind, 'component');
  /* `of` porte un NOM, pas la définition recopiée : c'est ce qui fait qu'un
     composant corrigé l'est partout où il est cité. */
  assert.equal(source && 'of' in source ? source.of : undefined, 'source');

  /* Les emplacements de méta existent depuis `f.component`, à `undefined` quand
     rien n'est dit. Invisible sur le fil — `JSON.stringify` les retire — donc on
     vérifie l'absence de valeur, pas l'absence de clé. */
  assert.equal(JSON.parse(JSON.stringify(source)).required, undefined);
});

test('une entité qui ne se visite pas ne déclare aucun lien', () => {
  /* ADR-0032, opt-in strict : ce qui rend une entité référençable, c'est d'avoir
     une URL. L'identité du site n'en a pas. */
  assert.equal(registry.entities?.identity?.link, undefined);
  assert.equal(registry.entities?.identity?.singleton, true);
  assert.deepEqual(registry.entities?.project?.link, { mode: 'route', route: '/#:slug' });
});

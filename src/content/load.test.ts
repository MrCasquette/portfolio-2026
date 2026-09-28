/**
 * The boundary, put to work on the real content.
 *
 * This is the test the plan calls the proof on real content: the folder under
 * `content/` must parse, and every reference in it must land. It is also what
 * catches a YAML coercion — a figure written `2` instead of `"2"` fails here,
 * naming the field, rather than rendering as something odd.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadPage } from './load.ts';
import { pendingOf } from './pending.ts';
import { yamlSource } from './provider/yaml/index.ts';

const source = yamlSource(new URL('../../content', import.meta.url).pathname);

test('le contenu réel franchit la frontière', async () => {
  const page = await loadPage(source, 'home');

  assert.equal(page.slug, 'home');
  assert.deepEqual(
    page.sections.map(section => section.type),
    ['statement', 'thesis', 'index', 'descent', 'descent', 'descent', 'contact'],
  );
  assert.deepEqual([...page.projects.keys()], ['atelier', 'plume', 'serveur']);
  assert.equal(page.arbitrations.size, 8);
  assert.equal(page.incidents.size, 1);
  assert.equal(page.excerpts.size, 2);
});

test('la descente de chaque projet garde l’ordre du fichier', async () => {
  const { sections } = await loadPage(source, 'home');
  const descents = sections.filter(section => section.type === 'descent');

  assert.deepEqual(
    descents.map(({ data }) => [data.project, data.arbitrations.map(step => step.arbitration)]),
    [
      ['atelier', ['atelier-socle-partage', 'atelier-perimetre-socle']],
      [
        'plume',
        ['plume-socle-applicatif', 'plume-frontiere-validation', 'plume-autorisation-declarative'],
      ],
      [
        'serveur',
        ['serveur-bare-metal', 'serveur-ansible-ssot', 'serveur-restauration-trimestrielle'],
      ],
    ],
  );
});

test('les deux formes d’arbitrage cohabitent dans le contenu réel', async () => {
  const { arbitrations } = await loadPage(source, 'home');
  const open = [...arbitrations.values()].filter(a => a.status === 'open');
  const settled = [...arbitrations.values()].filter(a => a.status === 'settled');

  assert.equal(open.length, 1, 'un arbitrage ouvert porte le registre à lui seul');
  assert.equal(settled.length, 7);
  /* docs/BACKLOG.md : l'arbitrage non tranché est une piste pour le second appui
     d'identité. S'il disparaissait du contenu, c'est cette piste qui tomberait. */
  assert.ok(open[0]?.opening);
});

test('une référence qui ne mène à rien est refusée, avec son chemin', async () => {
  const broken = {
    ...source,
    page: async () => ({
      slug: 'home',
      title: 'Essai',
      sections: [
        {
          id: 'descent-0',
          type: 'descent',
          data: { project: 'atelier', arbitrations: [{ arbitration: 'fantome' }] },
        },
      ],
    }),
  };

  await assert.rejects(() => loadPage(broken, 'home'), /arbitrations\[0\]\.arbitration.*fantome/s);
});

test('une section inconnue du registre nomme ce que le registre déclare', async () => {
  const broken = {
    ...source,
    page: async () => ({
      slug: 'home',
      title: 'Essai',
      sections: [{ id: 'hero-0', type: 'hero', data: {} }],
    }),
  };

  await assert.rejects(() => loadPage(broken, 'home'), /section inconnue.*hero.*statement/s);
});

test('les trous restent dénombrables, et aucun n’a été comblé par du plausible', async () => {
  const page = await loadPage(source, 'home');
  const pending = pendingOf(page);

  /* Le décompte est le verrou : s'il baisse, un trou a été rempli par quelque
     chose de vraisemblable ; s'il monte, la migration a perdu du contenu. */
  assert.equal(pending.length, 34, pending.join('\n'));
});

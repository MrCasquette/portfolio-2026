/**
 * Entities — content that is data, in the sense of `defineEntity`.
 *
 * The split against sections follows Prisme's founding arbitration (ADR-0026):
 * *the storage follows the nature of the thing*. An arbitration keeps all its
 * meaning outside this portfolio — it is the mirror of an ADR of the repository,
 * which `docs/decisions/README.md` anticipated — so it is data, with real
 * columns, and not the payload of a presentation block.
 *
 * Each entity carries a `link`, and that is not cosmetic: an entity enters the
 * reference registry only if it says how it produces a URL (ADR-0032). Without
 * it, nothing could point at it, and the index and the descents do exactly that.
 *
 * `id` and `slug` are never declared: `InferEntity` adds them, because they are
 * the identity columns the platform imposes.
 *
 * A nested component is written `f.component(of)`, uniform with every other field,
 * and it may carry `required` like any of them. The bare form — the definition
 * standing as the value — remains valid and means *always optional*; it is not used
 * here, so that optionality is something said rather than something inherited.
 */
import { defineEntity, f } from '@axiome-apps/atelier-content';
import {
  coveredFunction,
  fact,
  liveOption,
  rejectedOption,
  revision,
  source,
  timelineEntry,
} from './components.ts';
import { ARBITRATION_STATUSES, EXCERPT_LANGUAGES, MOMENTS, PROJECT_STATES } from './vocabulary.ts';

/**
 * A project — the landing of a descent.
 *
 * Depth is deliberately absent: it is the length of the descent, and the descent
 * is walked from the content (`docs/architecture/parcours.md`). A hand-kept counter drifts
 * on the first arbitration added.
 */
export const project = defineEntity('project', {
  label: 'Projet',
  link: { mode: 'route', route: '/#:slug' },
  fields: {
    moment: f.enum({ required: true, options: MOMENTS }),
    name: f.text({ required: true }),
    state: f.enum({ required: true, options: PROJECT_STATES }),
    stakes: f.richText({ required: true, hint: 'Ce dont le projet répond' }),
    facts: f.list(fact, { required: true, min: 2, max: 3 }),
    coveredFunctions: f.list(coveredFunction, {
      min: 2,
      hint: 'Rôles réellement tenus — pas un catalogue de maîtrise',
    }),
    source: f.component(source),
  },
});

/**
 * One step of a descent.
 *
 * `settled` and `open` are two shapes, not one shape missing fields — but the
 * field grammar has no union-of-shapes. The declaration therefore holds every
 * field of both shapes, all optional beyond the common trunk, and
 * `../parse/rules.ts` rebuilds the two shapes at the boundary. That is the one
 * place the declaration is knowingly looser than the contract.
 */
export const arbitration = defineEntity('arbitration', {
  label: 'Arbitrage',
  link: { mode: 'anchor', parent: 'project' },
  fields: {
    project: f.ref({ required: true, to: 'project' }),
    stakes: f.richText({ required: true, hint: 'La question, pas la décision' }),
    date: f.date({ required: true, hint: 'Jamais optionnel : une décision non datée est un avis' }),
    status: f.enum({ required: true, options: ARBITRATION_STATUSES }),

    // ── Propre à `settled` ──────────────────────────────────────────────────
    decided: f.richText({ hint: 'Requis si tranché' }),
    consequence: f.richText({ hint: 'Observée, jamais prédite. Requis si tranché' }),

    // ── Propre à `open` ─────────────────────────────────────────────────────
    options: f.list(liveOption, {
      min: 2,
      max: 3,
      hint: 'Les branches encore vivantes. Requis si ouvert',
    }),

    // ── Commun aux deux, mais pas aux mêmes conditions ───────────────────────
    // `rejected` est dû par `settled` et seulement facultatif pour `open` : un
    // arbitrage peut être ouvert sans avoir encore rien éliminé, et en exiger un
    // en fabriquerait un.
    rejected: f.list(rejectedOption, { min: 1, max: 2 }),
    // Facultatif pour `settled` (ce que la décision a laissé ouvert), dû par
    // `open` (ce qui reste à trancher, et ce qui le trancherait).
    opening: f.richText(),

    revises: f.component(revision),
    source: f.component(source),
  },
});

/** A step only an operated system can carry. */
export const incident = defineEntity('incident', {
  label: 'Incident',
  link: { mode: 'anchor', parent: 'project' },
  fields: {
    project: f.ref({ required: true, to: 'project' }),
    title: f.text({ required: true }),
    stakes: f.richText({ required: true, hint: 'Ce qui était réellement en jeu' }),
    timeline: f.list(timelineEntry, {
      required: true,
      min: 2,
      hint: 'Détection à résolution. Deux entrées minimum, sinon c’est une anecdote',
    }),
    resolution: f.richText({ required: true }),
    lesson: f.richText({
      hint: 'Ce qui a changé dans le système ensuite, si quelque chose a changé',
    }),
    source: f.component(source),
  },
});

/** The last step of a descent: what prose could not prove. */
export const excerpt = defineEntity('excerpt', {
  label: 'Extrait de code',
  link: { mode: 'anchor', parent: 'project' },
  fields: {
    project: f.ref({ required: true, to: 'project' }),
    shows: f.richText({
      required: true,
      hint: 'Ce que ce code prouve et que la prose ne pouvait pas',
    }),
    path: f.text({ required: true, hint: 'Chemin réel dans le dépôt réel' }),
    language: f.enum({ required: true, options: EXCERPT_LANGUAGES }),
    // `text` et non `richText` : du code n'est pas de la prose, et le faire
    // passer par le parseur de Markdown le mutilerait.
    code: f.text({ required: true }),
    source: f.component(source),
  },
});

/**
 * Who the site belongs to.
 *
 * A singleton: its identity is its name, not a slug (ADR-0039). It declares no
 * `link` either, and that silence is meaningful — what makes an entity
 * referenceable is having a URL, and this one has none (ADR-0032).
 */
export const identity = defineEntity('identity', {
  label: 'Identité',
  singleton: true,
  fields: {
    name: f.text({ required: true }),
    tagline: f.text({ required: true }),
  },
});

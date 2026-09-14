/**
 * Components — reusable field groups, in the sense of `defineComponent`.
 *
 * A component is an atom or a molecule: it is never inserted alone in a page, it
 * nests. `atelier-content` collects them automatically by walking the references
 * of the sections and entities, so none of them is listed in `defineContent`.
 *
 * Every `hint` here is addressed to whoever fills the form — it is the admin
 * surface that shows it, never the visitor.
 */
import { defineComponent, f } from '@axiome-apps/atelier-content';
import { MOMENTS } from './vocabulary.ts';

/**
 * The verifiable end of an assertion.
 *
 * That the URL must land on a record rather than on the root of a site is said
 * by `format: 'deepLink'`, resolved in `../parse/formats.ts`. The rule therefore
 * travels with the field, and Prisme carries the same string through untouched.
 */
export const source = defineComponent('source', {
  label: 'Source',
  fields: {
    href: f.text({
      required: true,
      format: 'deepLink',
      hint: 'Lien profond — jamais la racine d’un site',
    }),
    label: f.text({ required: true, hint: 'Ce sur quoi le lecteur va atterrir' }),
  },
});

/** A figure, quoted exactly. Rounding a number is already an argument. */
export const fact = defineComponent('fact', {
  label: 'Chiffre',
  fields: {
    value: f.text({ required: true, hint: 'Le chiffre lui-même, exact — jamais arrondi' }),
    label: f.text({ required: true, hint: 'Ce que le chiffre compte' }),
  },
});

/** An option that was eliminated, and why. */
export const rejectedOption = defineComponent('rejectedOption', {
  label: 'Option écartée',
  fields: {
    option: f.text({ required: true }),
    reason: f.richText({
      required: true,
      hint: 'La raison appartient à l’option qu’elle écarte, jamais à l’ensemble',
    }),
  },
});

/** One entry of an incident timeline. */
export const timelineEntry = defineComponent('timelineEntry', {
  label: 'Étape',
  fields: {
    at: f.text({ required: true, hint: 'Quand, tel que lu sur la trace' }),
    label: f.text({ required: true }),
  },
});

/** A way to be reached. */
export const channel = defineComponent('channel', {
  label: 'Canal',
  fields: {
    label: f.text({ required: true }),
    href: f.text({ required: true, format: 'uri' }),
  },
});

/** What breaks when nobody holds one of the three moments. */
export const momentCost = defineComponent('momentCost', {
  label: 'Coût d’absence',
  fields: {
    moment: f.enum({ required: true, options: MOMENTS }),
    costAbsence: f.richText({
      required: true,
      hint: 'Ce qui casse quand personne ne tient ce moment',
    }),
  },
});

/**
 * One of the three proofs the index announces.
 *
 * It points at the project rather than restating its name and state. The old
 * contract held both and needed a root `superRefine` to keep them in step; a
 * reference cannot drift from what it points at, so that whole class of check
 * disappears instead of moving.
 */
export const indexEntry = defineComponent('indexEntry', {
  label: 'Entrée de l’index',
  fields: {
    project: f.ref({ required: true, to: 'project' }),
    proves: f.richText({ required: true, hint: 'Ce que les deux autres ne prouvent pas' }),
  },
});

/**
 * What an arbitration revises, when it revises one.
 *
 * The past is not rewritten: the earlier decision stays, and what it loses is
 * said here.
 */
export const revision = defineComponent('revision', {
  label: 'Révision',
  fields: {
    arbitration: f.ref({ required: true, to: 'arbitration' }),
    whatFalls: f.richText({ required: true, hint: 'Ce que la décision antérieure perd' }),
  },
});

/**
 * One reference inside an ordered sequence.
 *
 * A bare `ref` cannot be repeated — `f.ref` yields one target, not a list — so an
 * ordered series of references is a `repeater` of this. The wrapper exists for
 * the order, and for nothing else.
 */
export const arbitrationRef = defineComponent('arbitrationRef', {
  label: 'Arbitrage',
  fields: {
    arbitration: f.ref({ required: true, to: 'arbitration' }),
  },
});

/** A role actually held on a project — not a catalogue of mastery. */
export const coveredFunction = defineComponent('coveredFunction', {
  label: 'Fonction couverte',
  fields: {
    label: f.text({ required: true }),
  },
});

/** A branch still live in an open arbitration. */
export const liveOption = defineComponent('liveOption', {
  label: 'Option ouverte',
  fields: {
    label: f.text({ required: true }),
  },
});

/**
 * Sections — content that is presentation, in the sense of `defineSection`.
 *
 * A section's schema is a contract with a component of this front (ADR-0026):
 * it is what the editor drops into a page, in the order they choose. It carries
 * no layout — where a section lands on the journey is derived, and
 * `docs/architecture/parcours.md` insists no coordinate is ever written in the content.
 *
 * Anything typographic — line breaks, where the accent falls, the ordering of
 * visual rows — belongs to the design system. A rich text field says what is
 * emphasised by naming a directive, never by carrying a class.
 */
import { defineSection, f } from '@axiome-apps/atelier-content';
import { arbitrationRef, channel, indexEntry, momentCost } from './components.ts';

/**
 * The first step. No destination, no count, nothing has backed it yet.
 *
 * It is the only place allowed to speak before proving, because the reader has
 * not yet been given anything to verify.
 *
 * `title` is a rich text so the accent can be a directive — `je :highlight[décide]`
 * — instead of a second field the renderer has to match against the first. The
 * old contract paid for that with an `emphasis` field and a refinement checking
 * `title.includes(emphasis)`; the accent is now a named semantic the design
 * system owns.
 */
export const statement = defineSection('statement', {
  label: 'Affirmation',
  fields: {
    title: f.richText({
      required: true,
      hint: 'L’affirmation. L’accent se pose avec :highlight[…]',
    }),
    description: f.richText({ required: true }),
    identification: f.text({ required: true, hint: 'Statut et lieu, délibérément au second rang' }),
    availability: f.text(),
  },
});

/**
 * The only unproven section: no source, no figure.
 *
 * It states a posture, and the projects are what answers for it. Do not
 * propagate the exception — every other definition pays for what it claims.
 */
export const thesis = defineSection('thesis', {
  label: 'Thèse',
  fields: {
    since: f.text({
      required: true,
      format: 'year',
      hint: 'Une année, jamais une durée : « 2008 » vieillit juste tout seul',
    }),
    produced: f.richText({ required: true, hint: 'Ce que les années ont réellement produit' }),
    moments: f.list(momentCost, { required: true, min: 3, max: 3 }),
    clause: f.richText({
      required: true,
      hint: 'La réserve. Toujours en dernier — c’est elle qui rend le reste crédible',
    }),
  },
});

/**
 * The proofs announced.
 *
 * The old contract locked this to exactly three entries, and called the lock
 * editorial rather than mechanical. It is no longer mechanical at all: an index
 * of one announces nothing, so two is the floor, and the ceiling is the
 * editor's business.
 */
export const index = defineSection('index', {
  label: 'Index des preuves',
  fields: {
    title: f.text({ required: true }),
    entries: f.list(indexEntry, { required: true, min: 2 }),
  },
});

/**
 * A project landing, and the order of its descent.
 *
 * The order lives here and not in the entities, and that is forced rather than
 * chosen: Prisme gives entity rows no rank at all — `listEntityRows()` sorts on
 * `date_created` — while the sections of a page carry a `sort`. A page is
 * therefore the only place an ordered reading can be stated.
 *
 * The three kinds of step are three fields rather than one heterogeneous list,
 * because `f.ref` names a single target: a list mixing arbitrations, an incident
 * and an excerpt cannot be expressed. Their relative order — arbitrations, then
 * the incident, then the excerpt — is a rendering rule, not content.
 */
export const descent = defineSection('descent', {
  label: 'Descente de projet',
  fields: {
    project: f.ref({ required: true, to: 'project' }),
    arbitrations: f.list(arbitrationRef, {
      required: true,
      min: 1,
      hint: 'Dans l’ordre de lecture de la descente',
    }),
    incident: f.ref({ to: 'incident' }),
    excerpt: f.ref({ to: 'excerpt' }),
  },
});

/** The last step of the journey. */
export const contact = defineSection('contact', {
  label: 'Contact',
  fields: {
    title: f.text({ required: true }),
    invitation: f.richText({ required: true }),
    availability: f.text(),
    channels: f.list(channel, { required: true, min: 1 }),
  },
});

/**
 * The closed vocabularies the content shares.
 *
 * Declared here rather than inline in each definition: `moment` and `state` are
 * read by a section and by an entity, and an enum that drifts between two
 * declarations is an enum that no longer means anything.
 */

/**
 * The three moments of responsibility over a system. They are an ordered
 * reading, not a taxonomy: each one proves what the other two cannot.
 */
export const MOMENTS = ['design', 'build', 'operate'] as const;
export type Moment = (typeof MOMENTS)[number];

/** Where a project stands. Orthogonal to its moment. */
export const PROJECT_STATES = ['in-progress', 'shipped', 'in-production'] as const;
export type ProjectState = (typeof PROJECT_STATES)[number];

/**
 * What each state is called to the visitor.
 *
 * Kept beside the vocabulary it names rather than in the component that shows it:
 * two components showing the same state must not be able to call it two things.
 */
export const PROJECT_STATE_LABELS: Record<ProjectState, string> = {
  'in-progress': 'En chantier',
  shipped: 'Livré',
  'in-production': 'En production',
};

/** What each moment is called to the visitor. */
export const MOMENT_LABELS: Record<Moment, string> = {
  design: 'Concevoir',
  build: 'Construire',
  operate: 'Exploiter',
};

/**
 * Whether an arbitration is closed or still live.
 *
 * The grammar of `@repo/fields` has no union-of-shapes, so this is declared as a
 * plain enum and the two *shapes* are rebuilt at the parsing boundary
 * (`../parse/rules.ts`). The declaration is therefore looser than the contract,
 * deliberately: it describes the admin form, not what the site may serve.
 */
export const ARBITRATION_STATUSES = ['settled', 'open'] as const;
export type ArbitrationStatus = (typeof ARBITRATION_STATUSES)[number];

/**
 * Languages an excerpt may be written in — the set Shiki is given.
 *
 * Closed on purpose: `CodeExcerpt.astro` used to pay for an open string with a
 * `lang={… as never}` cast, which `typescript.md` §1 forbids.
 */
export const EXCERPT_LANGUAGES = [
  'typescript',
  'tsx',
  'javascript',
  'astro',
  'css',
  'html',
  'sql',
  'yaml',
  'json',
  'bash',
  'rust',
  'python',
  'dockerfile',
] as const;
export type ExcerptLanguage = (typeof EXCERPT_LANGUAGES)[number];

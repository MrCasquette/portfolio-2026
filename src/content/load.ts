/**
 * The boundary.
 *
 * One place parses; everything downstream trusts it (philosophy §5). What it
 * parses is whatever a provider read — today a folder of YAML files, which
 * nothing validated on write. That is the whole reason this module exists:
 * `asSections()` of `atelier-content` makes the same promise without checking it,
 * and it is right to, because the API it was written for validates on write. A
 * file on disk does not.
 *
 * So this module goes away with the provider it protects, not with the contract.
 *
 * Two passes, and the order is the point. Each section and each row is validated
 * against the schema derived from its own declaration; only once everything is in
 * hand are references resolved, because nothing short of the assembled page can
 * see whether a reference lands.
 */
import type { Definition, Entity, Fields, InferSections } from '@axiome-apps/atelier-content';
import { z } from 'zod';
import { arbitration, excerpt, identity, incident, project } from './definitions/entities.ts';
import { content } from './definitions/index.ts';
import { definitionToZod, type EntityFields } from './parse/fields-to-zod.ts';
import { slug as slugFormat } from './parse/formats.ts';
import { arbitrationShape, type Reference, referencesOf, unresolved } from './parse/rules.ts';
import type { ContentSource } from './provider/source.ts';

/** A section of this site, discriminated on `type`. */
export type Section = InferSections<typeof content>;

/** The identity the platform owns, never written in a file. */
type Identity = { readonly id: string; readonly slug: string };

export type Project = Identity & EntityFields<typeof project>;
export type Arbitration = Identity & EntityFields<typeof arbitration>;
export type Incident = Identity & EntityFields<typeof incident>;
export type Excerpt = Identity & EntityFields<typeof excerpt>;
export type SiteIdentity = Identity & EntityFields<typeof identity>;

/**
 * What was loaded, ready to render.
 *
 * Entities come back as lookups rather than lists: a page states the order it
 * wants, and handing over a list would invite a second one.
 */
export interface LoadedPage {
  readonly slug: string;
  readonly title: string;
  readonly identity: SiteIdentity;
  readonly sections: readonly Section[];
  readonly projects: ReadonlyMap<string, Project>;
  readonly arbitrations: ReadonlyMap<string, Arbitration>;
  readonly incidents: ReadonlyMap<string, Incident>;
  readonly excerpts: ReadonlyMap<string, Excerpt>;
}

/**
 * The rules that are not a property of one field.
 *
 * Keyed by definition name, and holding exactly one entry: everything a single
 * field can say is said on the field, through `format` (`./parse/formats.ts`).
 * Adding a line here is what declaring a cross-field invariant looks like.
 */
const SHAPE_RULES: Readonly<Record<string, (value: unknown, ctx: z.RefinementCtx) => void>> = {
  arbitration: arbitrationShape,
};

/** The derived schema of a declaration, carrying its own cross-field rule. */
const shapeOf = (declared: { readonly name: string; readonly fields: Fields }) => {
  const derived = definitionToZod(declared);
  const rule = SHAPE_RULES[declared.name];
  return rule ? derived.superRefine(rule) : derived;
};

/**
 * Every section the registry knows, as one schema discriminated on `type`.
 *
 * Discriminated rather than a plain union so that a faulty `statement` reports
 * what is wrong with a statement, instead of reporting why it is not each of the
 * other four. The `pipe` then carries the inferred union out without an
 * assertion — the members did the validating, and their issues keep their paths.
 */
const [firstSection, ...otherSections] = content.sections.map(definition =>
  z.object({
    id: z.string().min(1),
    type: z.literal(definition.name),
    data: shapeOf(definition),
  }),
);

/* Destructured rather than passed as an array: a discriminated union needs at
   least one member, and proving it this way costs no assertion. An empty registry
   renders nothing, so it is a fault of the declaration, not of a page. */
if (!firstSection) throw new Error('Le registre ne déclare aucune section.');

const sectionSchema = z
  .discriminatedUnion('type', [firstSection, ...otherSections])
  .pipe(z.custom<Section>());

/** The declarations, by the name a file writes in `type`. */
const sectionsByName = new Map<string, Definition>(
  content.sections.map(definition => [definition.name, definition]),
);

/** Says which file is wrong, and where in it. */
const fault = (what: string, error: z.ZodError): Error =>
  new Error(
    `${what} ne respecte pas le contrat :\n${error.issues
      .map(issue => `  · ${issue.path.join('.') || '(racine)'} — ${issue.message}`)
      .join('\n')}`,
  );

/** One entity's occurrences, validated and keyed by slug. */
const loadRows = async <E extends Entity>(
  source: ContentSource,
  entity: E,
): Promise<ReadonlyMap<string, Identity & EntityFields<E>>> => {
  const schema = shapeOf(entity).pipe(z.custom<EntityFields<E>>());
  const loaded = new Map<string, Identity & EntityFields<E>>();

  for (const row of await source.rows(entity.name)) {
    const named = slugFormat.safeParse(row.slug);
    if (!named.success) {
      throw fault(`Le nom de fichier « ${row.slug} » de « ${entity.name} »`, named.error);
    }

    const fields = schema.safeParse(row.data);
    if (!fields.success) {
      throw fault(`« ${entity.name}/${row.slug} »`, fields.error);
    }

    /* `id` and `slug` coincide here and will not under Prisme, where the id is a
       UUID. Both are carried so nothing downstream has to care which it holds. */
    loaded.set(row.slug, { ...fields.data, id: row.slug, slug: row.slug });
  }

  return loaded;
};

/** The page, its sections, and everything they point at. */
export const loadPage = async (source: ContentSource, pageSlug: string): Promise<LoadedPage> => {
  const page = await source.page(pageSlug);

  const [projects, arbitrations, incidents, excerpts, identities] = await Promise.all([
    loadRows(source, project),
    loadRows(source, arbitration),
    loadRows(source, incident),
    loadRows(source, excerpt),
    loadRows(source, identity),
  ]);

  /* A singleton is one row or it is a fault: its identity is its name, so two of
     them would leave nothing to choose between. */
  const [site] = identities.values();
  if (!site || identities.size !== 1) {
    throw new Error(`« identity » est un singleton, et ${identities.size} fichiers le déclarent.`);
  }

  const sections: Section[] = [];
  const references: Reference[] = [];

  for (const raw of page.sections) {
    const definition = sectionsByName.get(raw.type);
    if (!definition) {
      throw new Error(
        `La page « ${pageSlug} » emploie une section inconnue : « ${raw.type} ». ` +
          `Le registre déclare ${[...sectionsByName.keys()].join(', ')}.`,
      );
    }

    const parsed = sectionSchema.safeParse(raw);
    if (!parsed.success) {
      throw fault(`La section « ${raw.type} » de « ${pageSlug} »`, parsed.error);
    }

    sections.push(parsed.data);
    references.push(...referencesOf(definition.fields, raw.data));
  }

  /* Entities point at each other too: an arbitration names its project, and a
     revision names the arbitration it revises. */
  for (const [entity, rows] of [
    [arbitration, arbitrations],
    [incident, incidents],
    [excerpt, excerpts],
  ] as const) {
    for (const row of rows.values()) references.push(...referencesOf(entity.fields, row));
  }

  const dangling = unresolved(
    references,
    new Map([
      ['project', new Set(projects.keys())],
      ['arbitration', new Set(arbitrations.keys())],
      ['incident', new Set(incidents.keys())],
      ['excerpt', new Set(excerpts.keys())],
    ]),
  );

  if (dangling.length > 0) {
    throw new Error(
      `Des références ne mènent à rien :\n${dangling
        .map(({ field, to, id }) => `  · ${field} → ${to} « ${id} »`)
        .join('\n')}`,
    );
  }

  return {
    slug: page.slug,
    title: page.title,
    identity: site,
    sections,
    projects,
    arbitrations,
    incidents,
    excerpts,
  };
};

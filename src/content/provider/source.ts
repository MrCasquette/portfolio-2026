/**
 * Where content comes from — and the only thing the rest of the site knows
 * about it.
 *
 * The shapes here are deliberately the platform's own: a section is
 * `{ id, type, data }`, which is what `GET /pages/by-slug/:slug` returns and what
 * `asSections()` retypes. Matching it is the whole point — swapping a folder of
 * files for a CMS must replace the reader, not the content.
 *
 * Nothing here validates. A provider says what it read; `../load.ts` is the
 * boundary that decides whether it may be trusted.
 */
import type { RawSection } from '@axiome-apps/atelier-content';

/** A page and its ordered sections, as read. */
export interface RawPage {
  readonly slug: string;
  readonly title: string;
  readonly sections: readonly RawSection[];
}

/**
 * One occurrence of an entity, as read.
 *
 * `slug` is its identity — the thing a `ref` holds. Under Prisme a reference
 * holds a UUID instead; which one it is belongs to the reader, and the shape
 * stays the same.
 */
export interface RawRow {
  readonly slug: string;
  readonly data: unknown;
}

export interface ContentSource {
  /** The page at that slug, or a failure: a missing page is never an empty page. */
  page(slug: string): Promise<RawPage>;
  /** Every occurrence of that entity. Order is not meaningful — a page carries it. */
  rows(entity: string): Promise<readonly RawRow[]>;
}

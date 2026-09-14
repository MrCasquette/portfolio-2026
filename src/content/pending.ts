/**
 * What the contract demands and no source provides yet.
 *
 * Carried over from `portfolio.draft.ts`, and for the same reason: the gaps must
 * stay countable instead of dissolving into the prose. A fabricated consequence
 * or a fabricated date is exactly what `docs/editorial/regles-d-ecriture.md` forbids, so a
 * hole is marked rather than filled — and something has to be able to list the
 * marks.
 */
import type { LoadedPage } from './load.ts';

/** Marks a value the contract demands and no existing source provides. */
export const TODO_MARK = '⟨à écrire⟩';

/** Obviously unreal, and still a valid ISO date so the content parses. */
export const TODO_DATE = '0001-01-01';

/** Every path still waiting, in the order the walk meets it. */
export const pendingMarkers = (value: unknown, path: readonly string[] = []): string[] => {
  if (typeof value === 'string') {
    const pending = value.startsWith(TODO_MARK) || value === TODO_DATE;
    return pending ? [`${path.join('.')} → ${value}`] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => pendingMarkers(item, [...path, String(index)]));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => pendingMarkers(item, [...path, key]));
  }
  return [];
};

/**
 * The same count, over a whole loaded page.
 *
 * Walks the sections and every entity, because a hole in an arbitration is a hole
 * in the site even though no section spells it out.
 */
export const pendingOf = (page: LoadedPage): string[] => [
  ...pendingMarkers(page.sections, ['sections']),
  ...[...page.projects].flatMap(([slug, row]) => pendingMarkers(row, ['project', slug])),
  ...[...page.arbitrations].flatMap(([slug, row]) => pendingMarkers(row, ['arbitration', slug])),
  ...[...page.incidents].flatMap(([slug, row]) => pendingMarkers(row, ['incident', slug])),
  ...[...page.excerpts].flatMap(([slug, row]) => pendingMarkers(row, ['excerpt', slug])),
];

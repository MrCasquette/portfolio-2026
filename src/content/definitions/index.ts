/**
 * The content declaration — the single source of truth for the shape.
 *
 * This is the only point `@axiome-apps/atelier-content`'s CLI reads. Components
 * are collected automatically by walking the references of the sections and the
 * entities, which is why none is listed here.
 *
 * Nothing in this module runs at request time: the package is a devDependency
 * and makes no call. Today a Markdown provider fills these shapes; the day
 * Prisme has a surface, `pushRegistry()` sends this same object to it and the
 * admin knows how to edit the site without a line changing here.
 */
import { defineContent } from '@axiome-apps/atelier-content';
import { arbitration, excerpt, identity, incident, project } from './entities.ts';
import { contact, descent, index, statement, thesis } from './sections.ts';

/**
 * Directives: the portfolio rides the closed core of seven for now
 * (`warning`, `note`, `tip`, `figure`, `quote`, `cta`, `highlight`), and
 * `highlight` — the only inline one — carries the accent of the statement.
 *
 * `defineDirective` is how the portfolio would declare its own; it refuses any
 * collision with the core. Which ones it needs is an open point, recorded as
 * such rather than guessed.
 */
const directives = [] as const;

export const content = defineContent({
  sections: [statement, thesis, index, descent, contact],
  entities: [project, arbitration, incident, excerpt, identity],
  directives,
});

export {
  arbitration,
  contact,
  descent,
  excerpt,
  identity,
  incident,
  index,
  project,
  statement,
  thesis,
};

/**
 * What a single field cannot say, and a whole page can.
 *
 * Two things only get this far. Everything that is a property of one field is
 * said on the field, through `format` (`./formats.ts`); everything that is a
 * property of one definition's shape is said by the grammar itself. What is left
 * is genuinely relational:
 *
 * 1. **The shape of an arbitration.** `settled` and `open` are two shapes, not one
 *    shape missing fields, and the grammar has no union-of-shapes. The
 *    declaration holds both sets of fields and this module rebuilds the
 *    discrimination — the only place the declaration is knowingly looser than
 *    what the site may serve.
 * 2. **That a reference resolves.** A `ref` holds an identifier, and whether
 *    anything answers to it is visible only once the page and its entities are
 *    both loaded. Prisme checks this at registry synchronisation; under a folder
 *    of files, nobody checks it but us.
 *
 * Both are written against values the derived schema has already accepted, so
 * they narrow with `in` rather than re-describing a shape that is already proven.
 */
import type { Fields } from '@axiome-apps/atelier-content';
import type { z } from 'zod';

/**
 * `settled` owes a decision and an *observed* consequence. A decision whose
 * effects have not been seen yet is not settled — it is open.
 *
 * `open` owes its opening and the branches still live. It does **not** owe
 * rejected options: an arbitration can be open having eliminated nothing yet,
 * and forcing a rejection there would fabricate one.
 */
export const arbitrationShape = (value: unknown, ctx: z.RefinementCtx): void => {
  if (typeof value !== 'object' || value === null || !('status' in value)) return;

  const owes = (field: string, because: string) => {
    if (!(field in value) || value[field as keyof typeof value] === undefined) {
      ctx.addIssue({ code: 'custom', message: because, path: [field] });
    }
  };

  if (value.status === 'settled') {
    owes('decided', 'un arbitrage tranché dit ce qui a été décidé');
    owes('consequence', 'un arbitrage tranché dit sa conséquence, observée et non prédite');
    owes('rejected', 'un arbitrage tranché dit ce qu’il a écarté, et pourquoi');
    return;
  }

  if (value.status === 'open') {
    owes('options', 'un arbitrage ouvert nomme les branches encore vivantes');
    owes('opening', 'un arbitrage ouvert dit ce qui reste à trancher, et ce qui le trancherait');
  }
};

/** A reference found in a value, and where it was found. */
export type Reference = {
  readonly field: string;
  readonly to: string;
  readonly id: string;
};

/** A value's own keys, without asserting anything about its shape. */
const entriesOf = (value: unknown): ReadonlyMap<string, unknown> =>
  typeof value === 'object' && value !== null ? new Map(Object.entries(value)) : new Map();

/** Each item of what should be an array, with the path that names it. */
const each = (
  value: unknown,
  visit: (item: unknown, at: (path: string) => string) => void,
): void => {
  if (!Array.isArray(value)) return;
  for (const [position, item] of value.entries()) {
    visit(item, path => `${path}[${position}]`);
  }
};

/**
 * Every reference a value carries, read off the declaration that describes it.
 *
 * Walking the declaration rather than the data is what makes this exact: a `ref`
 * is a plain string once stored, indistinguishable from any other string, and
 * guessing by field name would mistake one definition's `project` for another's.
 * The declaration knows which key is a reference and what it targets; the data
 * only knows the identifier.
 *
 * Paths are built as the walk descends, because the path is what lets the reader
 * find the file to fix.
 */
export const referencesOf = (fields: Fields, value: unknown, path = ''): Reference[] => {
  const found: Reference[] = [];
  const read = entriesOf(value);

  for (const [name, field] of Object.entries(fields)) {
    const here = path === '' ? name : `${path}.${name}`;
    const held = read.get(name);
    if (held === undefined) continue;

    switch (field.kind) {
      case 'ref':
        if (typeof held === 'string') found.push({ field: here, to: field.to, id: held });
        break;

      /* A nested component, named or bare: its own fields, against the same
         value. A reference can hide one level down — `source.href` is not one, but
         `revises.arbitration` is. */
      case 'component':
        found.push(...referencesOf(field.of.fields, held, here));
        break;

      case 'definition':
        found.push(...referencesOf(field.fields, held, here));
        break;

      case 'list':
        each(held, (item, at) => {
          found.push(...referencesOf(field.of.fields, item, at(here)));
        });
        break;

      case 'repeater':
        each(held, (item, at) => {
          found.push(...referencesOf(field.fields, item, at(here)));
        });
        break;

      /* Every other primitive holds no reference, and saying so case by case is
         what makes a new one fail to compile here instead of passing silently. */
      case 'text':
      case 'richText':
      case 'number':
      case 'boolean':
      case 'date':
      case 'enum':
      case 'image':
        break;

      default: {
        const unreachable: never = field;
        return unreachable;
      }
    }
  }

  return found;
};

/**
 * The references nothing answers to.
 *
 * `known` is supplied per target by the caller, because only the reader knows
 * what it managed to load — and a target that was never read at all is a
 * different fault from an identifier that does not exist.
 */
export const unresolved = (
  references: readonly Reference[],
  known: ReadonlyMap<string, ReadonlySet<string>>,
): Reference[] => references.filter(reference => !known.get(reference.to)?.has(reference.id));

/**
 * The declaration, compiled into a validator.
 *
 * This module exists because nothing validates the content of the Markdown
 * provider. `asSections()` of `@axiome-apps/atelier-content` is a bare cast, and
 * it is legitimate *there* precisely because the API validated on write — a
 * premise a file on disk does not satisfy. So the boundary is here, in front of
 * the files.
 *
 * It is therefore a part of the **provider**, not of the contract: the day the
 * content comes from Prisme, validation has already happened upstream and this
 * module goes away with the reader it protects. That is why the Zod is *derived*
 * rather than written: a schema written alongside the declaration would be a
 * second source of truth, and a second source of truth has to be dismantled.
 *
 * What it must hold: being isomorphic to the grammar. The mapping below mirrors
 * `ValueOf` and `RequiredKeys` of `@axiome-apps/atelier-content`, one case per
 * `kind`. `fieldsToSchema` of `@repo/fields` does exactly this for TypeBox, but
 * that package is private and unpublished — hence this one.
 */
import type { Entity, Fields, FieldValue, InferEntity } from '@axiome-apps/atelier-content';
import { z } from 'zod';
import { FORMATS } from './formats.ts';

const textSchema = (field: { minLength?: number; maxLength?: number; format?: string }) => {
  const declared = field.format ? FORMATS[field.format] : undefined;
  if (declared) return declared;

  /* A string addressed to the visitor is never empty: an empty string is a hole
     that renders as nothing and reports nothing. */
  let schema = z.string().min(field.minLength ?? 1);
  if (field.maxLength !== undefined) schema = schema.max(field.maxLength);
  return schema;
};

const bounded = <T extends z.ZodArray<z.ZodType>>(
  schema: T,
  bounds: { min?: number; max?: number },
) => {
  let next = schema;
  if (bounds.min !== undefined) next = next.min(bounds.min) as T;
  if (bounds.max !== undefined) next = next.max(bounds.max) as T;
  return next;
};

const enumValues = (options: ReadonlyArray<string | { value: string; label: string }>) =>
  options.map(option => (typeof option === 'string' ? option : option.value));

/** One field, compiled. Required and optional are decided by the caller. */
const fieldToZod = (field: FieldValue): z.ZodType => {
  switch (field.kind) {
    /* `format` is resolved against `./formats.ts`, which is where a rule the
       primitive cannot carry gets written — on the field, never in a table keyed
       by definition name. */
    case 'text':
      return textSchema(field);

    /* Markdown source, byte for byte. It is parsed into a tree at render time
       (`../render/Prose.astro`), never here: the tree is ephemeral, and storing
       or validating a shape for it would invent a second format. */
    case 'richText':
      return z.string().min(1);

    case 'number': {
      let schema = field.integer ? z.number().int() : z.number();
      if (field.min !== undefined) schema = schema.min(field.min);
      if (field.max !== undefined) schema = schema.max(field.max);
      return schema;
    }

    case 'boolean':
      return z.boolean();

    case 'date':
      return field.time ? z.iso.datetime() : z.iso.date();

    case 'enum': {
      const values = enumValues(field.options);
      const single = z.enum(values);
      return field.multiple ? z.array(single) : single;
    }

    /* An image and a reference are both an identifier of something stored
       elsewhere. Under the Markdown provider that identifier is the target's
       slug; under Prisme it is a UUID. Both are strings, and which one it is
       belongs to the resolver, not to the shape. That a reference actually
       resolves is checked in `./rules.ts`, which alone sees the whole page. */
    case 'image':
    case 'ref':
      return z.string().min(1);

    /* A named component, which may now be required — `f.component(of, { required })`.
       The bare form, where the definition itself stands as the value, is the case
       below and stays optional. */
    case 'component':
      return definitionToZod(field.of);

    case 'list':
      return bounded(z.array(definitionToZod(field.of)), field);

    case 'repeater':
      return bounded(z.array(fieldsToZod(field.fields)), field);

    /* The bare form of a nested component: the definition itself stands as the
       field's value. It carries no meta, so it is always optional — see below. */
    case 'definition':
      return definitionToZod(field);

    default: {
      /* Exhaustive by construction: a new primitive in the grammar fails to
         compile here instead of silently passing through. */
      const unreachable: never = field;
      return unreachable;
    }
  }
};

/** A sequence of fields, compiled into an object. */
export const fieldsToZod = (fields: Fields) => {
  const shape: Record<string, z.ZodType> = {};

  for (const [name, field] of Object.entries(fields)) {
    const schema = fieldToZod(field);

    /* The bare form of a nested component is always optional, and that is the
       grammar speaking rather than a choice: a `Definition` carries no meta, so
       `RequiredKeys` of `atelier-content` can never count it among the required
       keys. A `f.component(of, { required: true })` can be, and is handled by the
       same line. Mirroring the rule is what keeps this module isomorphic — parsing
       stricter than the type it validates would be the bug. */
    const required = field.kind !== 'definition' && field.required === true;
    shape[name] = required ? schema : schema.optional();
  }

  /* Strict: a key the declaration does not know is a typo in a frontmatter, and
     a typo that parses is a field silently missing from the page. */
  return z.strictObject(shape);
};

/**
 * A section, a component or an entity, compiled from the fields it declares.
 *
 * Typed structurally rather than as `Definition`: an `Entity` is not one — it
 * carries no `role` — and what this needs from either is the same single
 * property.
 */
export const definitionToZod = (declared: { readonly fields: Fields }) =>
  fieldsToZod(declared.fields);

/**
 * What a file actually holds about one occurrence of an entity.
 *
 * `id` and `slug` are left out, and that is the point: the platform owns them.
 * Under this provider the slug is the file's name, so asking the frontmatter to
 * repeat it would invite the two to disagree.
 */
export type EntityFields<E extends Entity> = Omit<InferEntity<E>, 'id' | 'slug'>;

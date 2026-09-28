/**
 * The formats a `text` field may claim, and what each one actually enforces.
 *
 * `format` is the one place the grammar of `@repo/fields` lets a field say more
 * about itself than its primitive. Prisme carries it as an opaque string and
 * passes it through, so this registry is the portfolio's own reading of it —
 * which makes it the right extension point: the invariant stays written **on the
 * field**, in the definition that owns it, rather than in a table keyed by
 * definition name somewhere else.
 *
 * Adding a format is adding a line here. A format this registry does not know is
 * left alone rather than refused: it is then a hint addressed to whoever fills
 * the admin form, which is a legitimate use of the same slot.
 */
import { z } from 'zod';

/**
 * A link is a proof only if it lands on something.
 *
 * The root of a site proves that the site exists, which was never in doubt.
 * Trailing slashes are stripped first, so `https://example.com/` is a root too.
 */
const deepLink = z
  .url()
  .refine(
    href => new URL(href).pathname.replace(/\/+$/, '') !== '',
    'must point at a record, a commit or a file — never at a root',
  );

/**
 * A year, never a duration.
 *
 * "2008" ages correctly on its own; "17 ans" is wrong the following January and
 * nobody notices.
 */
const year = z
  .string()
  .regex(/^\d{4}$/, 'four digits')
  .refine(value => Number(value) <= new Date().getFullYear(), 'not in the future');

/** Stable identifier, also usable as a DOM id and an anchor fragment. */
export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case slug');

/** Internal destination, always a fragment on the same document. */
const anchor = z.string().regex(/^#[a-z0-9]+(?:-[a-z0-9]+)*$/, 'internal anchor');

/**
 * Where an action may lead: a fragment, a file of this site, or an outside
 * address.
 *
 * The scheme list is a **whitelist**, and that is the point. `z.url()` accepts
 * `javascript:` — it parses, so it is a URL — and this value lands straight in an
 * `href` that no renderer sanitises on the way, unlike prose links which go
 * through `safeUrl`. An open format here would be an injection point one YAML
 * line wide.
 */
const destination = z
  .string()
  .refine(
    value =>
      /^#[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
      /^\/[^/]/.test(value) ||
      /^(?:https?|mailto):/.test(value),
    'an anchor (#id), a path of this site (/file), or an https / mailto address',
  );

export const FORMATS: Readonly<Record<string, z.ZodType<string>>> = {
  uri: z.url(),
  email: z.email(),
  deepLink,
  year,
  slug,
  anchor,
  destination,
};

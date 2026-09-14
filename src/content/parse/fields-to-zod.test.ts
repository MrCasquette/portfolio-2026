/**
 * The derivation, kind by kind.
 *
 * Run by `node --test`, which strips the types natively — no runner, no
 * transform, no dependency. What is under test is an isomorphism: each case
 * asserts that a conforming value passes and that a faulty one is refused, so a
 * primitive that drifts from the grammar fails here rather than at render time.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { defineComponent, f } from '@axiome-apps/atelier-content';
import { fieldsToZod } from './fields-to-zod.ts';

/** Shorthand: does this single-field shape accept that value? */
const accepts = (field: Parameters<typeof fieldsToZod>[0][string], value: unknown) =>
  fieldsToZod({ it: field }).safeParse({ it: value }).success;

test('text — refuses the empty string, which is a hole, not a value', () => {
  assert.ok(accepts(f.text({ required: true }), 'Prisme'));
  assert.ok(!accepts(f.text({ required: true }), ''));
  assert.ok(!accepts(f.text({ required: true }), 42));
});

test('text — honours minLength and maxLength', () => {
  const field = f.text({ required: true, minLength: 3, maxLength: 5 });
  assert.ok(accepts(field, 'abcd'));
  assert.ok(!accepts(field, 'ab'));
  assert.ok(!accepts(field, 'abcdef'));
});

test('text — applies the formats it knows', () => {
  assert.ok(accepts(f.text({ required: true, format: 'uri' }), 'https://example.com/a'));
  assert.ok(!accepts(f.text({ required: true, format: 'uri' }), 'pas une url'));

  /* A deep link lands on something: the root of a site proves only that the site
     exists, which was never in doubt. */
  const proof = f.text({ required: true, format: 'deepLink' });
  assert.ok(accepts(proof, 'https://example.com/commit/abc'));
  assert.ok(!accepts(proof, 'https://example.com/'));

  /* A year, never a duration — and never one that has not happened. */
  const year = f.text({ required: true, format: 'year' });
  assert.ok(accepts(year, '2008'));
  assert.ok(!accepts(year, '17 ans'));
  assert.ok(!accepts(year, String(new Date().getFullYear() + 1)));
});

test('text — leaves a format it does not know alone, as a hint for the form', () => {
  assert.ok(accepts(f.text({ required: true, format: 'couleur-preferee' }), 'jade'));
  /* Left alone is not unchecked: the primitive still refuses a hole. */
  assert.ok(!accepts(f.text({ required: true, format: 'couleur-preferee' }), ''));
});

test('richText — any non-empty Markdown source', () => {
  assert.ok(accepts(f.richText({ required: true }), 'Je :highlight[décide] avant de montrer.'));
  assert.ok(!accepts(f.richText({ required: true }), ''));
});

test('number — integer and bounds', () => {
  assert.ok(accepts(f.number({ required: true, integer: true, min: 1, max: 3 }), 2));
  assert.ok(!accepts(f.number({ required: true, integer: true }), 2.5));
  assert.ok(!accepts(f.number({ required: true, min: 1 }), 0));
});

test('boolean', () => {
  assert.ok(accepts(f.boolean({ required: true }), false));
  assert.ok(!accepts(f.boolean({ required: true }), 'true'));
});

test('date — an ISO date, and a datetime only when time is asked for', () => {
  assert.ok(accepts(f.date({ required: true }), '2026-08-26'));
  assert.ok(!accepts(f.date({ required: true }), '26/08/2026'));
  assert.ok(!accepts(f.date({ required: true }), '2026-08-26T10:00:00Z'));
  assert.ok(accepts(f.date({ required: true, time: true }), '2026-08-26T10:00:00Z'));
});

test('enum — accepts both option forms, refuses anything outside', () => {
  assert.ok(accepts(f.enum({ required: true, options: ['design', 'build'] }), 'build'));
  assert.ok(!accepts(f.enum({ required: true, options: ['design', 'build'] }), 'operate'));
  const labelled = f.enum({ required: true, options: [{ value: 'shipped', label: 'Livré' }] });
  assert.ok(accepts(labelled, 'shipped'));
  assert.ok(!accepts(labelled, 'Livré'));
});

test('enum — multiple yields an array', () => {
  const field = f.enum({ required: true, multiple: true, options: ['a', 'b'] });
  assert.ok(accepts(field, ['a', 'b']));
  assert.ok(!accepts(field, 'a'));
});

test('image and ref — an identifier of something stored elsewhere', () => {
  assert.ok(accepts(f.ref({ required: true, to: 'project' }), 'atelier'));
  assert.ok(!accepts(f.ref({ required: true, to: 'project' }), ''));
  assert.ok(accepts(f.image({ required: true }), 'some-id'));
});

const pair = defineComponent('pair', {
  fields: { left: f.text({ required: true }), right: f.text() },
});

test('list — an array of a component, with its bounds', () => {
  const field = f.list(pair, { required: true, min: 1, max: 2 });
  assert.ok(accepts(field, [{ left: 'a' }]));
  assert.ok(accepts(field, [{ left: 'a', right: 'b' }, { left: 'c' }]));
  assert.ok(!accepts(field, []));
  assert.ok(!accepts(field, [{ left: 'a' }, { left: 'b' }, { left: 'c' }]));
  assert.ok(!accepts(field, [{ right: 'b' }]));
});

test('repeater — an array of an inline field sequence', () => {
  const field = f.repeater({
    required: true,
    min: 2,
    fields: { at: f.text({ required: true }), label: f.text({ required: true }) },
  });
  assert.ok(
    accepts(field, [
      { at: '10:02', label: 'Détection' },
      { at: '10:31', label: 'Bascule' },
    ]),
  );
  assert.ok(!accepts(field, [{ at: '10:02', label: 'Détection' }]));
});

test('component — the bare form is always optional, because it carries no meta', () => {
  const schema = fieldsToZod({ nested: pair });
  assert.ok(schema.safeParse({}).success);
  assert.ok(schema.safeParse({ nested: { left: 'a' } }).success);
  /* Optional does not mean unchecked: present and malformed is still refused. */
  assert.ok(!schema.safeParse({ nested: { right: 'b' } }).success);
});

test('component — the named form can be required', () => {
  const schema = fieldsToZod({ nested: f.component(pair, { required: true }) });
  assert.ok(!schema.safeParse({}).success);
  assert.ok(schema.safeParse({ nested: { left: 'a' } }).success);
});

test('component — named and optional behaves like the bare form', () => {
  const schema = fieldsToZod({ nested: f.component(pair) });
  assert.ok(schema.safeParse({}).success);
  assert.ok(schema.safeParse({ nested: { left: 'a' } }).success);
});

test('an optional field may be absent, but not malformed when present', () => {
  const schema = fieldsToZod({ it: f.text() });
  assert.ok(schema.safeParse({}).success);
  assert.ok(!schema.safeParse({ it: '' }).success);
});

test('an unknown key is refused — a typo in a frontmatter is a missing field', () => {
  const schema = fieldsToZod({ title: f.text({ required: true }) });
  assert.ok(!schema.safeParse({ title: 'a', titel: 'b' }).success);
});

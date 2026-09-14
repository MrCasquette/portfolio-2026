/**
 * The v1 provider: a folder of YAML files.
 *
 * Why YAML and not Markdown files with a body: this content is made of *many
 * short prose fields*, not of a few long documents. An arbitration carries four
 * — `stakes`, `decided`, `consequence`, `opening` — and a file body can hold one.
 * So the file describes fields, and the Markdown lives inside the fields that are
 * rich text, which is also exactly where Prisme keeps it: a `richText` is a
 * `text` column, never a document. The bytes are therefore already the CMS's.
 *
 * The one trap of the format is type coercion — `value: 2` reads as a number,
 * `availability: no` as a boolean. It is bounded rather than avoided: the derived
 * schema refuses it at build time, naming the field, so it breaks loudly and
 * never silently.
 *
 * This module is the reader and nothing else: it does not validate, because what
 * may be trusted is decided at the boundary (`../../load.ts`).
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';
import type { ContentSource, RawPage, RawRow } from '../source.ts';

/** What a page file must look like before anything else can be said about it. */
const readPageFile = (source: unknown, slug: string): RawPage => {
  const file = expectRecord(source, `la page « ${slug} »`);
  const title = file.get('title');
  const sections = file.get('sections');

  if (typeof title !== 'string' || title === '') {
    throw new Error(`La page « ${slug} » n’a pas de titre.`);
  }
  if (!Array.isArray(sections)) {
    throw new Error(`La page « ${slug} » n’a pas de liste « sections ».`);
  }

  return {
    slug,
    title,
    sections: sections.map((entry, position) => {
      const section = expectRecord(entry, `la section ${position} de « ${slug} »`);
      const type = section.get('type');

      if (typeof type !== 'string' || type === '') {
        throw new Error(`La section ${position} de « ${slug} » ne dit pas son type.`);
      }

      /* The id is positional, and that is on purpose: it is a key, never an
         anchor. Anchors are derived from the content — a descent anchors on its
         project — so that they survive the day Prisme hands out UUIDs here. */
      return { id: `${type}-${position}`, type, data: section.get('data') ?? {} };
    }),
  };
};

/** A YAML mapping, read without asserting anything about its contents. */
const expectRecord = (value: unknown, what: string): ReadonlyMap<string, unknown> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${what} n’est pas un bloc de champs.`);
  }
  return new Map(Object.entries(value));
};

const YAML_FILE = /\.ya?ml$/;

/**
 * A source rooted at a directory.
 *
 * Layout: `pages/<slug>.yaml` for the compositions, `entities/<name>/<slug>.yaml`
 * for the data. A file's name is the slug, so nothing in a file repeats it and
 * the two cannot disagree.
 */
export const yamlSource = (root: string): ContentSource => ({
  async page(slug) {
    const path = join(root, 'pages', `${slug}.yaml`);
    const raw = await readFile(path, 'utf8').catch(() => {
      throw new Error(`Page introuvable : ${path}`);
    });
    return readPageFile(parse(raw), slug);
  },

  async rows(entity) {
    const directory = join(root, 'entities', entity);

    /* A target nobody has written yet reads as empty, and that is not a failure:
       what it costs is a reference that no longer resolves, which `../../load.ts`
       reports with the field that holds it. */
    const names = await readdir(directory).catch(() => [] as string[]);

    const rows = names
      .filter(name => YAML_FILE.test(name))
      .sort()
      .map(async (name): Promise<RawRow> => {
        const raw = await readFile(join(directory, name), 'utf8');
        return { slug: name.replace(YAML_FILE, ''), data: parse(raw) };
      });

    return Promise.all(rows);
  },
});

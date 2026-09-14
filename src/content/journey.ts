/**
 * The journey, derived from the content.
 *
 * One serpentine path: the survey runs right, each project descends, and the end
 * of a descent turns right into what follows. Scrolling always advances — there
 * is no second gesture to choose, so there is no mode to keep track of.
 *
 * **No coordinate is read from the content**, and `docs/architecture/parcours.md` insists
 * on it: « None of those numbers is written anywhere. » What a section *is*
 * decides how the path travels — a section opens a chapter and moves right, and
 * what a section contains descends inside it. A descent therefore falls out of
 * the shape of the content rather than out of a field, which is what keeps the
 * grammar of `docs/editorial/positionnement.md` true by construction: `→` advances, `↓` says
 * *vérifie ce que j'affirme*.
 *
 * Steps are derived, never listed: a project with no incident produces no
 * incident step, and a fourth section would extend the path without a line of
 * layout changing.
 */
import type { Arbitration, Excerpt, Incident, LoadedPage, Project, Section } from './load.ts';

/** The data of one kind of section, as the declaration infers it. */
type DataOf<K extends Section['type']> = Extract<Section, { type: K }>['data'];

export type StepContent =
  | { kind: 'statement'; data: DataOf<'statement'> }
  | { kind: 'thesis'; data: DataOf<'thesis'> }
  | { kind: 'index'; data: DataOf<'index'>; projects: readonly Project[] }
  | { kind: 'project'; project: Project; number: number }
  | {
      kind: 'arbitration';
      project: Project;
      arbitration: Arbitration;
      position: number;
      total: number;
    }
  | { kind: 'incident'; project: Project; incident: Incident }
  | { kind: 'excerpt'; project: Project; excerpt: Excerpt }
  | { kind: 'contact'; data: DataOf<'contact'> };

/** Which way the path travels between two steps. */
export type Move = 'right' | 'down';

export interface Step {
  readonly id: string;
  readonly label: string;
  readonly content: StepContent;
  readonly col: number;
  readonly row: number;
  /** How the path enters and leaves this cell. `null` at the two ends. */
  readonly enters: Move | null;
  readonly leaves: Move | null;
  /** Index of the chapter this step belongs to, for the rail. */
  readonly chapter: number;
  /** Position within its chapter, and how deep that chapter goes. */
  readonly depth: number;
  readonly chapterDepth: number;
}

/** A step and the move that reaches it. Chapter heads are the ones reached rightwards. */
interface Draft {
  readonly id: string;
  readonly label: string;
  readonly content: StepContent;
  readonly move: Move;
}

/**
 * Rail labels.
 *
 * The one place a visitor-facing string is not content: the rail names the
 * *shape* of the journey, not what a chapter says. A descent is named after its
 * rank rather than its project, because the rail measures progress through the
 * survey and a name would make two chapters look like two subjects.
 */
const CHAPTER_LABELS: Record<Exclude<Section['type'], 'descent'>, string> = {
  statement: 'Accueil',
  thesis: 'Profil',
  index: 'Réalisations',
  contact: 'Contact',
};

const numbered = (position: number) => String(position).padStart(2, '0');

/** A descent: the landing, then everything that answers for it. */
const descentDrafts = (
  section: Extract<Section, { type: 'descent' }>,
  page: LoadedPage,
  number: number,
): Draft[] => {
  const project = page.projects.get(section.data.project);
  if (!project) throw new Error(`Descente sans projet : « ${section.data.project} ».`);

  const steps = section.data.arbitrations
    .map(step => page.arbitrations.get(step.arbitration))
    .filter((arbitration): arbitration is Arbitration => arbitration !== undefined);

  const incident = section.data.incident ? page.incidents.get(section.data.incident) : undefined;
  const excerpt = section.data.excerpt ? page.excerpts.get(section.data.excerpt) : undefined;

  return [
    {
      id: project.slug,
      label: `Projet ${numbered(number)}`,
      content: { kind: 'project', project, number },
      move: 'right',
    },
    ...steps.map(
      (arbitration, position): Draft => ({
        id: `${project.slug}-arbitrage-${position + 1}`,
        label: `Arbitrage ${numbered(position + 1)}`,
        content: {
          kind: 'arbitration',
          project,
          arbitration,
          position: position + 1,
          total: steps.length,
        },
        move: 'down',
      }),
    ),
    ...(incident
      ? [
          {
            id: `${project.slug}-incident`,
            label: 'Incident',
            content: { kind: 'incident', project, incident } as const,
            move: 'down' as const,
          },
        ]
      : []),
    ...(excerpt
      ? [
          {
            id: `${project.slug}-extrait`,
            label: 'Extrait',
            content: { kind: 'excerpt', project, excerpt } as const,
            move: 'down' as const,
          },
        ]
      : []),
  ];
};

/** Every step a section produces, in reading order. */
const draftsOf = (section: Section, page: LoadedPage, descentNumber: number): Draft[] => {
  /* The type is passed rather than read back off the union: inside this helper
     the narrowing of the `switch` is no longer visible, and naming it again is
     what keeps the label lookup total without an assertion. */
  const head = (type: keyof typeof CHAPTER_LABELS, content: StepContent): Draft[] => [
    { id: type, label: CHAPTER_LABELS[type], content, move: 'right' },
  ];

  switch (section.type) {
    case 'statement':
      return head('statement', { kind: 'statement', data: section.data });
    case 'thesis':
      return head('thesis', { kind: 'thesis', data: section.data });
    case 'index':
      return head('index', {
        kind: 'index',
        data: section.data,
        projects: section.data.entries
          .map(entry => page.projects.get(entry.project))
          .filter((project): project is Project => project !== undefined),
      });
    case 'contact':
      return head('contact', { kind: 'contact', data: section.data });
    case 'descent':
      return descentDrafts(section, page, descentNumber);
  }
};

/**
 * Walk the drafts and place them.
 *
 * A rightward move opens a chapter and shifts a column; a downward move descends
 * inside the one already open. The very first step sits at the origin and is
 * entered by nothing.
 */
export const journeyOf = (page: LoadedPage): Step[] => {
  let descents = 0;
  const drafts = page.sections.flatMap(section =>
    draftsOf(section, page, section.type === 'descent' ? ++descents : descents),
  );

  const placed: Step[] = [];
  let col = -1;
  let row = 0;
  let chapter = -1;
  let depth = 0;

  for (const [index, draft] of drafts.entries()) {
    if (draft.move === 'right') {
      col += 1;
      chapter += 1;
      depth = 0;
    } else {
      row += 1;
      depth += 1;
    }

    placed.push({
      id: draft.id,
      label: draft.label,
      content: draft.content,
      col,
      row,
      enters: index === 0 ? null : draft.move,
      leaves: drafts[index + 1]?.move ?? null,
      chapter,
      depth,
      chapterDepth: 0,
    });
  }

  /* Second pass: a step cannot know how deep its own chapter goes until it is
     walked. This is the `depth` figure `docs/architecture/parcours.md` insists is written
     nowhere — derived here, stored never. */
  return placed.map(step => ({
    ...step,
    chapterDepth: placed.filter(other => other.chapter === step.chapter).length - 1,
  }));
};

/** Rail entries: one per chapter, which is one per rightward move. */
export const chaptersOf = (steps: readonly Step[]) =>
  steps
    .map((step, index) => ({ step, index }))
    .filter(({ step }) => step.depth === 0)
    .map(({ step, index }) => ({ id: step.id, label: step.label, step: index }));

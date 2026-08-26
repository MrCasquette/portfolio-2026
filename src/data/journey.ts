/**
 * The journey, laid out.
 *
 * One serpentine path: the survey runs right, each project descends, and the
 * end of a project turns right into the next one. Scrolling always advances —
 * there is no second gesture to choose, so there is no mode to keep track of.
 *
 * Steps are derived from the content, never listed by hand: a project with no
 * incident produces no incident step, and a fourth project would extend the
 * path without a line of layout changing.
 */
import type { CodeExcerpt, Decision, IncidentEvent, Project } from './portfolio';
import { projects } from './portfolio';

export type StepContent =
  | { kind: 'landing' }
  | { kind: 'profile' }
  | { kind: 'work' }
  | { kind: 'project'; project: Project; number: number }
  | { kind: 'decision'; project: Project; decision: Decision; position: number; total: number }
  | { kind: 'incident'; project: Project; events: IncidentEvent[] }
  | { kind: 'excerpt'; project: Project; excerpt: CodeExcerpt }
  | { kind: 'contact' };

/** Which way the path travels between two steps. */
export type Move = 'right' | 'down';

export type Step = {
  id: string;
  label: string;
  content: StepContent;
  col: number;
  row: number;
  /** How the path enters and leaves this cell. `null` at the two ends. */
  enters: Move | null;
  leaves: Move | null;
  /** Index of the chapter this step belongs to, for the rail. */
  chapter: number;
  /** Position within its chapter, and how deep that chapter goes. */
  depth: number;
  chapterDepth: number;
};

/** A step and the move that reaches it. Chapter heads are the ones reached rightwards. */
type Draft = { id: string; label: string; content: StepContent; move: Move };

const drafts: Draft[] = [
  { id: 'landing', label: 'Accueil', content: { kind: 'landing' }, move: 'right' },
  { id: 'profile', label: 'Profil', content: { kind: 'profile' }, move: 'right' },
  { id: 'work', label: 'Réalisations', content: { kind: 'work' }, move: 'right' },

  ...projects.flatMap((project, projectIndex): Draft[] => {
    const number = projectIndex + 1;

    const decisions = project.decisions.map((decision, decisionIndex) => ({
      id: `${project.id}-decision-${decisionIndex + 1}`,
      label: `Arbitrage ${String(decisionIndex + 1).padStart(2, '0')}`,
      content: {
        kind: 'decision' as const,
        project,
        decision,
        position: decisionIndex + 1,
        total: project.decisions.length,
      },
      move: 'down' as const,
    }));

    const incident = project.incident
      ? [
          {
            id: `${project.id}-incident`,
            label: 'Incident',
            content: { kind: 'incident' as const, project, events: project.incident },
            move: 'down' as const,
          },
        ]
      : [];

    const excerpt = project.excerpt
      ? [
          {
            id: `${project.id}-excerpt`,
            label: 'Extrait',
            content: { kind: 'excerpt' as const, project, excerpt: project.excerpt },
            move: 'down' as const,
          },
        ]
      : [];

    return [
      {
        id: project.id,
        label: `Projet ${String(number).padStart(2, '0')}`,
        content: { kind: 'project' as const, project, number },
        move: 'right' as const,
      },
      ...decisions,
      ...incident,
      ...excerpt,
    ];
  }),

  { id: 'contact', label: 'Contact', content: { kind: 'contact' }, move: 'right' },
];

/**
 * Walk the drafts and place them. A rightward move opens a chapter and shifts a
 * column; a downward move descends inside the one already open. The very first
 * step sits at the origin and is entered by nothing.
 */
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

/** Second pass: a step cannot know how deep its own chapter goes until it is walked. */
for (const step of placed) {
  step.chapterDepth = placed.filter(other => other.chapter === step.chapter).length - 1;
}

export const steps: Step[] = placed;

/** Rail entries: one per chapter, which is one per rightward move. */
export const chapters = steps
  .filter(step => step.depth === 0)
  .map(step => ({ id: step.id, label: step.label, step: steps.indexOf(step) }));

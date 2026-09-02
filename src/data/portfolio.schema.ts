/**
 * Portfolio content contract.
 *
 * The schema is the single source of truth; every type below is inferred from
 * it (`typescript.md` §2). It describes what a *step* of the journey is allowed
 * to carry — not how it looks. Anything typographic (line breaks, emphasis
 * placement, ordering of visual blocks) belongs to the design system, not here.
 *
 * `.describe()` annotations are addressed to whoever renders these contracts —
 * a designer, a design tool, or a future contributor. They are never shown to
 * the visitor.
 *
 * Boundary: this module is the *only* place content is parsed. Once
 * `PortfolioSchema.parse()` has returned, the data is trusted everywhere else
 * (philosophy §5). Today the input is `portfolio.ts`; tomorrow it is the CMS.
 */

import { z } from 'zod';

// ── Primitives ───────────────────────────────────────────────────────────────

/** Any prose addressed to the visitor. Never empty: an empty string is a hole. */
const text = z.string().min(1);

/** Stable identifier, also usable as a DOM id and an anchor fragment. */
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case slug');

/** Internal destination, always a fragment on the same document. */
const anchor = z.string().regex(/^#[a-z0-9]+(?:-[a-z0-9]+)*$/, 'internal anchor');

/**
 * A year, never a duration. "2008" ages correctly on its own; "17 ans" is
 * wrong the following January and nobody notices.
 */
const year = z
  .string()
  .regex(/^\d{4}$/, 'four digits')
  .refine(value => Number(value) <= new Date().getFullYear(), 'not in the future');

/**
 * A link is a proof only if it lands on something. The root of a site proves
 * that the site exists, which was never in doubt.
 */
const deepLink = z
  .url()
  .refine(
    href => new URL(href).pathname.replace(/\/+$/, '') !== '',
    'must point at a record, a commit or a file — never at a root',
  );

// ── Vocabulary ───────────────────────────────────────────────────────────────

/**
 * The three moments of responsibility over a system. They are an ordered
 * reading, not a taxonomy: each one proves what the other two cannot.
 */
export const MomentSchema = z.enum(['design', 'build', 'operate']);
export type Moment = z.infer<typeof MomentSchema>;

/** Where a project stands. Orthogonal to its moment. */
export const ProjectStateSchema = z.enum(['in-progress', 'shipped', 'in-production']);
export type ProjectState = z.infer<typeof ProjectStateSchema>;

// ── Shared shapes ────────────────────────────────────────────────────────────

/** A figure, quoted exactly. Rounding a number is already an argument. */
export const FactSchema = z.object({
  value: text.describe('The figure itself, exact — never rounded, never softened'),
  label: text.describe('What the figure counts'),
});
export type Fact = z.infer<typeof FactSchema>;

/** The verifiable end of an assertion. */
export const SourceSchema = z.object({
  href: deepLink,
  label: text.describe('What the reader will land on'),
});
export type Source = z.infer<typeof SourceSchema>;

// ── Statement — the first step ───────────────────────────────────────────────

/**
 * No destination, no count, nothing has backed it yet. It is the only place
 * allowed to speak before proving, because the reader has not yet been given
 * anything to verify.
 */
export const StatementSchema = z
  .object({
    title: text.describe('The claim. Line breaks are the design system’s business'),
    emphasis: text
      .optional()
      .describe('The one word carrying the accent — the only accented word on the site'),
    description: text,
    identification: text.describe('Status and location, deliberately second rank'),
    availability: text.optional(),
  })
  .refine(({ title, emphasis }) => emphasis === undefined || title.includes(emphasis), {
    error: 'emphasis must be a word of the title',
    path: ['emphasis'],
  });
export type Statement = z.infer<typeof StatementSchema>;

// ── Thesis — the only unproven type ──────────────────────────────────────────

const momentCost = <M extends Moment>(moment: M) =>
  z.object({
    moment: z.literal(moment),
    costOfAbsence: text.describe('What breaks when nobody holds this moment'),
  });

/**
 * The single exception in this file: no source, no fact. It states a posture,
 * and the three projects are what answers for it.
 *
 * Do not propagate the exception. Every other type pays for what it claims.
 */
export const ThesisSchema = z.object({
  anchor: z.object({
    since: year,
    produced: text.describe('What the years actually produced'),
  }),
  moments: z.tuple([momentCost('design'), momentCost('build'), momentCost('operate')]),
  clause: text.describe('The reservation. Always last — it is what makes the rest credible'),
});
export type Thesis = z.infer<typeof ThesisSchema>;

// ── Index — three proofs announced ───────────────────────────────────────────

const indexEntry = <M extends Moment>(moment: M) =>
  z.object({
    moment: z.literal(moment),
    name: text,
    proves: text.describe('What the other two do not prove'),
    state: ProjectStateSchema,
    target: anchor.describe('Anchor of the matching project landing'),
  });

export const IndexSchema = z.object({
  title: text,
  entries: z.tuple([indexEntry('design'), indexEntry('build'), indexEntry('operate')]),
});
export type Index = z.infer<typeof IndexSchema>;

// ── ProjectIntro — the landing of a project ──────────────────────────────────

/**
 * Depth is deliberately absent: it is the length of the descent, and the
 * descent is walked from the content (`docs/JOURNEY-MAP.md`). Use
 * {@link descentLength}; a hand-kept counter drifts on the first arbitration
 * added.
 */
export const ProjectIntroSchema = z.object({
  id: slug.describe('Anchor target of the Index entry pointing here'),
  moment: MomentSchema,
  name: text,
  state: ProjectStateSchema,
  stakes: text.describe('What the project is answering for'),
  facts: z.array(FactSchema).min(2).max(3),
  coveredFunctions: z
    .array(text)
    .min(2)
    .optional()
    .describe('Roles actually held on this project — not a catalogue of mastery'),
  source: SourceSchema.optional().describe('Absent on the server: there is nothing to link to'),
});
export type ProjectIntro = z.infer<typeof ProjectIntroSchema>;

// ── Arbitration — one step of a descent ──────────────────────────────────────

const RejectedOptionSchema = z.object({
  option: text,
  reason: text.describe('The reason belongs to the option it rejects, never to the set'),
});

const arbitrationBase = {
  id: slug,
  project: slug.describe('Owning project id'),
  stakes: text.describe('The question, not the decision'),
  date: z.iso.date().describe('Never optional: an undated decision is an opinion'),
  source: SourceSchema.optional(),
  revises: z
    .object({
      ref: slug.describe('Id of the arbitration being revised'),
      whatFalls: text.describe('What the earlier decision loses — the past is not rewritten'),
    })
    .optional(),
};

/**
 * `settled` and `open` are two shapes, not one shape missing fields.
 *
 * - `settled` owes a consequence, and it must be an observed one. A decision
 *   whose effects have not been seen yet is not settled — it is open.
 * - `open` owes an opening and its live branches. It does **not** owe rejected
 *   options: an arbitration can be open having eliminated nothing yet, and
 *   forcing a rejection there would fabricate one.
 */
export const ArbitrationSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('settled'),
    decided: text,
    rejected: z.array(RejectedOptionSchema).min(1).max(2),
    consequence: text.describe('Observed, never predicted'),
    opening: text.optional().describe('What the decision left open'),
    ...arbitrationBase,
  }),
  z.object({
    status: z.literal('open'),
    options: z
      .array(text)
      .min(2)
      .max(3)
      .describe('The branches still live. Naming them is what makes the step readable'),
    rejected: z
      .array(RejectedOptionSchema)
      .min(1)
      .max(2)
      .optional()
      .describe('Only what is already eliminated. An open arbitration may have rejected nothing'),
    opening: text.describe('What remains to be decided, and what would settle it'),
    ...arbitrationBase,
  }),
]);
export type Arbitration = z.infer<typeof ArbitrationSchema>;

// ── Incident — a step only the operated system can carry ─────────────────────

export const IncidentSchema = z.object({
  id: slug,
  project: slug,
  title: text,
  stakes: text.describe('What was actually at risk'),
  timeline: z
    .array(z.object({ at: text.describe('When, as read on the record'), label: text }))
    .min(2)
    .describe('Detection to resolution. Two entries minimum, or it is an anecdote'),
  resolution: text,
  lesson: text.optional().describe('What changed in the system afterwards, if anything did'),
  source: SourceSchema.optional(),
});
export type Incident = z.infer<typeof IncidentSchema>;

// ── Excerpt — the last step of a descent ─────────────────────────────────────

export const ExcerptSchema = z.object({
  id: slug,
  project: slug,
  shows: text.describe('What this code proves that prose could not'),
  path: text.describe('Real path in the real repository'),
  language: text,
  code: text,
  source: SourceSchema.optional(),
});
export type Excerpt = z.infer<typeof ExcerptSchema>;

// ── Contact — the last step of the journey ───────────────────────────────────

export const ContactSchema = z.object({
  title: text,
  invitation: text,
  availability: text.optional(),
  channels: z.array(z.object({ label: text, href: z.url() })).min(1),
});
export type Contact = z.infer<typeof ContactSchema>;

// ── Project — a landing and its descent ──────────────────────────────────────

export const ProjectSchema = z.object({
  intro: ProjectIntroSchema,
  arbitrations: z.array(ArbitrationSchema).min(1),
  incident: IncidentSchema.optional(),
  excerpt: ExcerptSchema.optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

/**
 * The number of steps below a project landing. Derived, never stored — this is
 * the `depth` figure `docs/JOURNEY-MAP.md` insists is written nowhere.
 */
export const descentLength = (project: Project): number =>
  project.arbitrations.length + (project.incident ? 1 : 0) + (project.excerpt ? 1 : 0);

// ── Portfolio — the root, and the only place integrity can be checked ────────

const portfolioShape = z.object({
  statement: StatementSchema,
  thesis: ThesisSchema,
  index: IndexSchema,
  projects: z
    .array(ProjectSchema)
    .length(3)
    .describe('One per moment. The lock is editorial, not mechanical'),
  contact: ContactSchema,
});

/**
 * Everything the site rests on that no single schema can see: the index and
 * the projects must describe the same three things, and a revision must point
 * at an arbitration that exists.
 */
export const PortfolioSchema = portfolioShape.superRefine((portfolio, ctx) => {
  const { index, projects } = portfolio;

  const byMoment = new Map(projects.map(project => [project.intro.moment, project]));
  if (byMoment.size !== projects.length) {
    ctx.addIssue({
      code: 'custom',
      message: 'each moment must be held by exactly one project',
      path: ['projects'],
    });
  }

  index.entries.forEach((entry, position) => {
    const project = byMoment.get(entry.moment);
    const at = (field: string) => ['index', 'entries', position, field];

    if (!project) {
      ctx.addIssue({
        code: 'custom',
        message: `no project for moment "${entry.moment}"`,
        path: at('moment'),
      });
      return;
    }
    if (entry.name !== project.intro.name) {
      ctx.addIssue({
        code: 'custom',
        message: `name differs from the project landing ("${project.intro.name}")`,
        path: at('name'),
      });
    }
    if (entry.state !== project.intro.state) {
      ctx.addIssue({
        code: 'custom',
        message: `state differs from the project landing ("${project.intro.state}")`,
        path: at('state'),
      });
    }
    if (entry.target !== `#${project.intro.id}`) {
      ctx.addIssue({
        code: 'custom',
        message: `must target "#${project.intro.id}"`,
        path: at('target'),
      });
    }
  });

  const arbitrationIds = new Set<string>();
  projects.forEach((project, projectPosition) => {
    project.arbitrations.forEach((arbitration, position) => {
      const at = (field: string) => ['projects', projectPosition, 'arbitrations', position, field];

      if (arbitrationIds.has(arbitration.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `duplicate arbitration id "${arbitration.id}"`,
          path: at('id'),
        });
      }
      arbitrationIds.add(arbitration.id);

      if (arbitration.project !== project.intro.id) {
        ctx.addIssue({
          code: 'custom',
          message: `must belong to "${project.intro.id}"`,
          path: at('project'),
        });
      }
      if (arbitration.revises?.ref === arbitration.id) {
        ctx.addIssue({
          code: 'custom',
          message: 'an arbitration cannot revise itself',
          path: at('revises'),
        });
      }
    });

    for (const step of [project.incident, project.excerpt]) {
      if (step && step.project !== project.intro.id) {
        ctx.addIssue({
          code: 'custom',
          message: `must belong to "${project.intro.id}"`,
          path: ['projects', projectPosition],
        });
      }
    }
  });

  projects.forEach((project, projectPosition) => {
    project.arbitrations.forEach((arbitration, position) => {
      if (arbitration.revises && !arbitrationIds.has(arbitration.revises.ref)) {
        ctx.addIssue({
          code: 'custom',
          message: `revises an unknown arbitration "${arbitration.revises.ref}"`,
          path: ['projects', projectPosition, 'arbitrations', position, 'revises', 'ref'],
        });
      }
    });
  });
});
export type Portfolio = z.infer<typeof PortfolioSchema>;

/**
 * JSON Schema projection, for tools that consume the contract without running
 * TypeScript — a design system generator among them. Cross-object refinements
 * cannot be expressed in JSON Schema and are dropped: the projection describes
 * the shapes, `PortfolioSchema` remains the only thing that validates.
 */
export const toJSONSchema = () => z.toJSONSchema(portfolioShape, { io: 'input' });

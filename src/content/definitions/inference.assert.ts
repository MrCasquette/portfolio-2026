/**
 * The declaration, checked at the level of types.
 *
 * Nothing here runs, and nothing here is imported: `pnpm type-check` is the test
 * runner, and a violated claim is a compilation error on the line that states it.
 *
 * Written as **type equalities rather than `@ts-expect-error`**. The directive only
 * asserts *that* a line errors, never *which* error — so a broken import or a
 * renamed field satisfies it just as well as the invariant it was meant to guard,
 * and the guard silently stops guarding. `Assert<…>` says what the type must be, so
 * anything else fails, and says so by name.
 */
import type { InferData, InferEntity, InferSections } from '@axiome-apps/atelier-content';
import type { arbitration, content, descent, project, statement } from './index.ts';

/** Exact type equality, optional and readonly modifiers included. */
type Equals<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

/** Fails to compile unless the claim holds. */
type Assert<T extends true> = T;

/** True when every named key of `T` is required — `Required` is what strips `?`. */
type AllRequired<T, K extends keyof T> = Equals<Pick<T, K>, Required<Pick<T, K>>>;

/** True when every named key of `T` is optional. */
type AllOptional<T, K extends keyof T> = Equals<Pick<T, K>, Partial<Pick<T, K>>>;

type Statement = InferData<typeof statement>;
type Descent = InferData<typeof descent>;
type Arbitration = InferEntity<typeof arbitration>;
type Project = InferEntity<typeof project>;
type Section = InferSections<typeof content>;

/**
 * What the rendering layer relies on, and no runtime test can see.
 *
 * Each entry is one claim. They are gathered in a tuple so that the file needs no
 * unused locals and no exported decoys to satisfy the linter.
 */
export type Assertions = [
  // ── `required` produces a required key, its absence an optional one ──────────
  Assert<AllRequired<Statement, 'name' | 'role' | 'description' | 'actions'>>,
  Assert<AllOptional<Statement, 'availability'>>,
  // ── A bounded list infers an array of the component, required flags intact ──
  Assert<AllRequired<Statement['actions'][number], 'label' | 'href'>>,
  // ── An enum infers its literals, never `string` ──────────────────────────────
  Assert<Equals<Arbitration['status'], 'settled' | 'open'>>,
  Assert<Equals<Project['moment'], 'design' | 'build' | 'operate'>>,
  // ── The platform owns the identity, and the declaration never restates it ────
  Assert<AllRequired<Project, 'id' | 'slug'>>,
  /*
   * A component reached through an entity still owes its own required fields.
   *
   * Worth guarding because it did not hold: up to `atelier-content@0.6.1`, an
   * `f.component(of)` or `f.list(of)` called without options lost the inner
   * `required` flags and every field of the component read as optional. Fixed in
   * `0.6.2`. These two lines are what makes the regression loud.
   */
  Assert<AllRequired<NonNullable<Arbitration['revises']>, 'arbitration' | 'whatFalls'>>,
  Assert<AllRequired<Project['facts'][number], 'value' | 'label'>>,
  // ── And through a repeater-like list of references, which carries the order ──
  Assert<AllRequired<Descent['arbitrations'][number], 'arbitration'>>,
  // ── The sections come out as a union discriminated on `type` ─────────────────
  Assert<Equals<Section['type'], 'statement' | 'thesis' | 'index' | 'descent' | 'contact'>>,
  // ── A shape the grammar cannot express, and the boundary rebuilds ────────────
  // Both halves of the arbitration are optional here *on purpose*: the declaration
  // is knowingly looser than the contract, and `../parse/rules.ts` is what refuses
  // a settled arbitration with no observed consequence.
  Assert<AllOptional<Arbitration, 'decided' | 'consequence' | 'options' | 'opening'>>,
];

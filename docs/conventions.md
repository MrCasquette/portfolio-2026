# Project conventions

Recorded arbitrations, in the sense of `~/.code-conform/docs/00-philosophy.md` §8.
This document only exists for deviations and for choices that cannot be inferred from
the code.

Trade-offs with a discarded alternative belong in [`decisions/`](./decisions/) instead.
What stays here is the standing rule, not the reasoning behind it.

## Reference documents

`DESIGN.md` takes precedence over `CONCEPT.md`. The first describes how, the second why.
`decisions/` holds dated trade-offs. `SCRATCHPAD.md` is a working document with no
authority.

## Language

Code, comments, documentation and file names are in **English**. Strings addressed to the
visitor — `aria-label`, visible labels, everything in `portfolio.ts` — stay in **French**:
the site is francophone.

## Tokens — posture B (semantic)

`atomic-design.md` §4. Neutral palette with no distinctive chromatic identity, dark single
theme: the vocabulary is one of usage (`bg`, `surface`, `ink`, `line`, `accent`), not of
brand.

Single source of truth: `src/styles/theme.css`. **No colour, weight, radius or typographic
scale value hard-coded in a component.** A component needing a colour absent from the
theme signals a design problem, not a gap in the theme.

See [`decisions/0002-semantic-token-posture.md`](./decisions/0002-semantic-token-posture.md).

## Global CSS versus utilities

- **`theme.css`** carries the tokens and the only untokenisable CSS: the two-axis
  scrolling mechanics (`.deck`, `.slide`) and the path, which utilities cannot express.
- **Everything else lives in the components**, as Tailwind utilities. No global class
  targeting a DOM structure (`.panel > div > p:first-child` and the like).

## Variants

`Record<Variant, classes>` — see `StatePill.astro`. No `tailwind-variants` until there are
combinatorial variants, slots, or three crossing axes.

## Zod — one boundary, in `portfolio.schema.ts`

`src/data/portfolio.schema.ts` holds the content contract: the Zod schema is the source of
truth, every type is inferred from it, and `PortfolioSchema.parse()` is the **only** place
content is parsed. Everything downstream trusts it (philosophy §5). No revalidation in a
component, no `interface Props` restating a schema.

It also carries what no single schema can see — the index and the projects describing the
same three things, a revision pointing at an arbitration that exists. That integrity is
the reason the root schema exists.

`src/data/portfolio.ts` is still the current content, typed at compile time and not yet
parsed against the contract. Wiring the CMS replaces it with a client; the boundary does
not move.

## No DDD

Explicit decision: simple slicing (`src/data`, `src/components`, `src/scripts`), no
`src/domain/<concept>/`. To be reconsidered when the CMS is wired in, not before.

## Linting

Biome is restricted to `src/**/*.ts`, `src/**/*.css` and root JSON files. It only parses
the frontmatter of `.astro` files and reports props consumed in the template as unused.
Components are covered by `pnpm type-check` (`astro check`).

Pre-commit: `pnpm lint && pnpm type-check`.

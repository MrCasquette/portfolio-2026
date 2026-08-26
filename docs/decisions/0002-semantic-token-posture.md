---
status: accepted
date: 2026-08-22
---

# Semantic token posture

## Context and Problem Statement

The prototype had no tokens: seven hard-coded chromatic identities in the global
CSS, some thirty `rgb(255 255 255 / x%)` at twelve unnamed opacities, and
typographic `clamp()` values invented case by case.

`atomic-design.md` §4 requires an explicit choice between two postures.

## Decision Drivers

- Neutral palette with no distinctive chromatic identity: the background is mute
  and all warmth goes through a single accent.
- Dark single theme, no light variant planned.

## Considered Options

- **Posture A, brand names** — the token *is* the identity (`bg-jade`). Suits a
  strong brand. Here there is no chromatic brand to name: the background is
  neutral on principle.
- **Posture B, semantic** — usage vocabulary (`bg`, `surface`, `ink`, `line`,
  `accent`).

## Decision Outcome

Chosen option: "posture B".

The switching criterion in `atomic-design.md` §4 is met by "neutral palette with
no distinctive identity". Single source of truth: `src/styles/theme.css`.

### Consequences

- Good, because no hard-coded value survives in a component. A component asking
  for a colour absent from the theme signals a design problem, not a gap.
- Good, because a theme switch would remain possible without rewriting components.
- Bad, because `bg-surface` needs a mental resolution that `bg-jade` would not.

## More Information

`DESIGN.md` §2, §3. Contrast ratios measured and corrected in §3.

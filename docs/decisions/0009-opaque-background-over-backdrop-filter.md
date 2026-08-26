---
status: accepted
date: 2026-08-26
---

# Opaque background rather than `backdrop-filter` on header and rail

## Context and Problem Statement

The header and the rail were translucent with `backdrop-blur`, inherited from
the prototype where the background was a saturated gradient that needed
softening.

A visible tonal shift separated those two bands from the rest of the page, even
though the arithmetic says there should be none: `bg-bg/92` composites
`--color-bg` at 92% over `--color-bg`, which returns exactly `--color-bg`.

## Decision Drivers

- The site background is now a flat neutral: **there is nothing to blur**.
- `backdrop-filter` forces the element into its own compositing layer, and the
  colour-space conversion on recomposition produces a visible shift under
  Chromium.

## Considered Options

- **Keep the blur and work around the artefact** — fixes a symptom without
  addressing the cause, and keeps an effect that serves no purpose.
- **Opaque background, no `backdrop-filter`**.

## Decision Outcome

Chosen option: "opaque background, no `backdrop-filter`".

### Consequences

- Good, because the artefact disappears, and content scrolling underneath is
  cleanly hidden instead of vaguely guessed at.
- Good, because that is one compositing layer fewer.
- Bad, because the rail lost its top border along the way — owned: it doubled the
  connector rule and competed with the path. The header keeps its own: it
  overhangs the content, whereas the rail sits inside it.

---
status: accepted
date: 2026-08-26
---

# The site header only appears from the second chapter

## Context and Problem Statement

The header carries the identity — name and way of working. The landing chapter
carries it too. Both were therefore saying it at once, on the same screen.

## Considered Options

- **Landing is the full version, header the abbreviated one** — the redundancy
  remains, but owned: the header is persistent chrome.
- **The header only appears from chapter 2** — its role is to remind; it has no
  purpose while you are on the chapter that carries the identity.

## Decision Outcome

Chosen option: "the header only appears from chapter 2".

The interface shows itself when it becomes useful. 300 ms fade,
`pointer-events: none` while hidden.

### Consequences

- Good, because the landing sheds a redundancy, and the header's appearance
  accompanies the first move.
- Bad, because **the landing chapter must name Vincent**. Without it, nothing
  does on the first screen and the reader is lost. A content constraint, not a
  formal one.

## More Information

Driven from `journey.ts`, off the intersection observer index.

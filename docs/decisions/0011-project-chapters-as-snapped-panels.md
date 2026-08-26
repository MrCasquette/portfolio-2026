---
status: accepted
date: 2026-08-26
---

# Project chapters as a column of snapped panels

## Context and Problem Statement

A project chapter carries more than a screen: an intro, a decision ledger, an
incident timeline, a code excerpt. The horizontal journey is the survey; this is
the depth (`CONCEPT.md`, spatial grammar). The question is what physics that
vertical axis obeys, and at what grain the content is cut.

## Considered Options

### How the column scrolls

- **Fluid scrolling**, as ordinary page content. Discarded: the content is not
  continuous prose but a series of closed artefacts, and fluid scrolling puts two
  unrelated ones in the same view, leaving the reader to work out where one ends.
  It would also give the vertical axis a different physics from the horizontal
  one, which is snapped — two surfaces instead of one grammar.
- **`scroll-snap-type: y mandatory` with `scroll-snap-stop: always`.** One
  gesture, one unit. `always` forbids skipping a panel, which is the point of
  giving each arbitrage a screen.

### At what grain

- **One panel per block** — the whole ledger on one screen. Read three entries at
  a time, a ledger is a table.
- **One panel per decision.** Read one screen at a time, it is an argument. The
  reader cannot skim past a trade-off without having crossed it.

### How the descent starts

- **A vertical wheel descends.** Discarded: a mouse only produces `deltaY`, which
  is already converted to horizontal travel (`0004`). If depth swallowed it, no
  mouse could get past the first project.
- **A link.** The descent is deliberate: at the top of a column the wheel still
  crosses the journey, and going down goes through `Explorer ↓`.

## Decision Outcome

Snapped panels, at the grain of the arbitrage, entered through a link.

This carries an invariant: **a panel fits one screen**. `mandatory` snap turns a
panel taller than the viewport into content that is partly unreachable and
fights the snap. When a block outgrows a screen it is split into two panels —
never traded back for fluid scrolling.

Two mechanical consequences were paid along the way:

- `scroll-behavior: smooth` is **not** set on the column. It applies to user
  scrolling too, so every wheel tick started an animation the next tick
  restarted, and the column felt stuck. The descent links smooth their own jump
  instead, which is a link doing a link's job, not scroll hijacking.
- The wheel is amplified inside the column by the same factor as on the journey.
  Native scrolling under a mandatory snap must cross half a panel before it
  tips, which takes several notches, while the deck tips on one. Same snap, two
  physics — and the heavier axis is the one that reads as broken.
- The native scrollbar is hidden and replaced by a floating indicator. A vertical
  bar on the first screen contradicts the horizontal continuity the path sets up,
  but a real scrollbar occupies layout, so revealing it on descent shifted the
  content sideways. A fixed element costs nothing and can appear freely.

### Consequences

- Good, because every arbitrage is stopped on, and the pace is predictable: one
  gesture, one unit, on both axes.
- Good, because panels are derived from what a project carries, so a project
  without an incident has no empty screen and no dead link.
- Bad, because the one-screen invariant is not enforced anywhere. It is a writing
  rule, and nothing fails loudly when content breaks it.
- Bad, because the descent depends on a link. It is signalled by the path turned
  vertical: a rule alongside the reading column, spanning the chapter and cut by
  its bottom edge. An animated mouse-wheel icon was discarded — it would invite a
  gesture that, at the top of a column, does the opposite of what it shows. A
  first attempt at a short stub under the link failed for a different reason: a
  rule that begins and ends in mid-air reads as neither a path nor an arrow.

## More Information

An anchor must target a node **inside** the scroll container. Pointing the return
link at the chapter's own `<section>` did nothing useful: the browser scrolled the
horizontal rail to bring it into view instead of scrolling the column to its top.
The intro panel carries its own id for that.

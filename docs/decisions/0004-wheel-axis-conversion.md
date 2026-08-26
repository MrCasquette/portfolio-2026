---
status: accepted
date: 2026-08-24
---

# Wheel axis conversion, arbitrated by chapter depth

## Context and Problem Statement

`DESIGN.md` §7 forbade any wheel hijacking. But a mouse only produces `deltaY`:
without conversion the horizontal journey is simply unreachable with one. That
is an accessibility defect, not a preference.

## Decision Drivers

- The rule targeted the prototype's wheel-jacking: computed index, `scrollTo`
  towards a chapter, 500 ms lock.
- Vertical content in project chapters must stay reachable with a mouse.

## Considered Options

- **Convert nothing** — `scroll-snap` alone. Compliant to the letter, but the
  journey becomes unreachable with a mouse. Discarded.
- **Native scroll chaining** (lifting `overscroll-behavior`) — elegant in theory,
  but not sufficient: a chapter's vertical content captures the gesture.
- **Tell mouse from trackpad through `deltaMode`** — tested and **discarded**:
  macOS normalises both to pixels, `DOM_DELTA_LINE` never appears. The handler
  simply never fired.
- **Arbitrate by chapter depth** — a chapter without vertical content converts,
  a chapter that has some lets the wheel descend.

## Decision Outcome

Chosen option: "arbitrate by chapter depth".

A content criterion rather than a hardware one, hence independent of platform
quirks. The conversion is proportional: no computed index, no chapter targeted,
no lock. `scroll-snap` alone decides where the scroll settles.

### Consequences

- Good, because the journey becomes usable with a mouse again without
  reintroducing wheel-jacking.
- Good, because the trackpad keeps its native behaviour, and the diagonal axis
  lock stops the page drifting sideways during a descent.
- Bad, because leaving a project chapter by wheel requires reaching the bottom or
  using the rail. A descent affordance is still to be wired back.

## More Information

`DESIGN.md` §7, "The wheel — the one admitted exception". Any change reintroducing a
computed index or a `scrollTo` towards a chapter leaves the exception and falls
back under the prohibition.

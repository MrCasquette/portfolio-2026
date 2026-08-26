---
status: accepted
date: 2026-08-22
---

# The decision ledger replaces the named parallel reading

## Context and Problem Statement

`CONCEPT.md` built the structure of project chapters on a "parallel reading":
two columns explicitly titled **Construire** and **Coordonner**, aligned phase
by phase.

`DESIGN.md` §1 states the opposite: *Coordonner — never named, never claimed*.
The two could not coexist, and the `ParallelReading` component displayed both
words literally.

## Decision Drivers

- The project's writing rule: nothing is claimed, everything is inferred.
- The two-column frame was abstract — it described an intent without filling it.

## Considered Options

- **Keep the named columns** — immediately legible, but names what should be
  inferred, and turns the site into a statement about oneself.
- **Keep the columns under other names** — moves the problem without solving it.
- **The decision ledger** — same structural slot, two columns, one tension, one
  vertical progression, but filled with real trade-offs.

## Decision Outcome

Chosen option: "the decision ledger".

The two-track structure is not abandoned, it is **filled**. The relation to the
two halves holds without being written: the "Retenu" column and the technical
decision belong to *Construire*; the rationale — why, against what, with what
consequence — is the artefact of *Coordonner*, the one that makes the system
intelligible to someone else.

### Consequences

- Good, because someone who reads three ledgers has understood that the profile
  can transmit, without the word appearing once.
- Good, because `ParallelReading` and `ProjectChapter` disappear.
- Bad, because the content constraint becomes hard. An invented ledger is felt
  immediately and destroys the credibility of the whole.

## More Information

`CONCEPT.md` was rewritten accordingly rather than subordinated: keeping both
documents with one "subordinate" to the other guaranteed that a future session
would pull up the wrong one. `DESIGN.md` §5.1.

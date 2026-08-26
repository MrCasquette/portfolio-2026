---
status: accepted
date: 2026-08-26
---

# Record decisions in `docs/decisions` using MADR

## Context and Problem Statement

Trade-offs were tracked across three documents and three formats: the "Discarded, and why" table in `DESIGN.md`, exceptions written into its sections as they
arose, and `conventions.md`. None is dated, none has an explicit field for
discarded options.

The drift was already measurable: the path — the structuring decision of the
session — appeared in no document, only in a commit message and code comments.
Yet `DESIGN.md` is meant to be binding.

## Decision Drivers

- The site's signature component **is** a decision ledger. A project that
  displays trade-offs and keeps none for itself has a coherence problem.
- These trade-offs are **real content**, which the site lacks (`DESIGN.md` §9).
- `DESIGN.md` was accumulating history on top of rules.

## Considered Options

- **Formalise nothing** — keep writing decisions into `DESIGN.md`.
- **`docs/adr/`, Nygard template** — the most widespread, instantly recognised.
  But Nygard has no dedicated field for alternatives: they live in the prose of
  the context section, so they are not extractable.
- **`docs/decisions/`, MADR template** — the more recent recommendation, and an
  explicit *Considered Options* field.

## Decision Outcome

Chosen option: "`docs/decisions/`, MADR template".

`decisions` rather than `adr` because it is not settled whether the folder will
only hold architecture decisions; the name will not have to change.

MADR for its considered-options field, which maps one-to-one onto the "Écarté"
column of the site's ledger — and, come the CMS, onto the `Decision` type,
`open` state included.

### Consequences

- Good, because the repository and the site speak the same language, which is
  itself a proof.
- Good, because `DESIGN.md` recovers its own role — rules, not history.
- Bad, because `conventions.md` now partly overlaps this folder. To be merged.

## More Information

See this folder's `README.md` for how the three documents divide up.

# Decisions

Decision records for the project, in [MADR](https://adr.github.io/madr/) format.

`decisions` rather than `adr`: it is not settled yet whether this folder will
only ever hold architecture decisions. The name will not have to change the day
it holds others.

## How this relates to the other documents

| Document | Role |
|---|---|
| `DESIGN.md` | The **rules** in force. What must be done, binding on any change. |
| `CONCEPT.md` | The editorial **what** and **why**. |
| `decisions/` | **Dated trade-offs**, with what was discarded and on what grounds. |

A rule in `DESIGN.md` answers "what should I do?". A record here answers "why,
against what, and when?". The first is read before acting, the second before
reversing a choice.

## Template

The **Considered Options** field is the one that matters — it carries what was
discarded, and it maps onto the "Écarté" column of the site's own decision
ledger, and later onto the `Decision` type.

Copy `0000-template.md` for a new entry.

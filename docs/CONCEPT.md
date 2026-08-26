# Portfolio concept

## Status of this document

This document describes the editorial concept and the navigation experience.

It describes **what** to show and **why**. [`DESIGN.md`](./DESIGN.md) describes **how** —
and takes precedence in case of divergence. Work in progress stays in
[`SCRATCHPAD.md`](../SCRATCHPAD.md).

The site's own copy is in French; this document is in English.

## Purpose

The portfolio presents a cross-disciplinary professional profile to someone hiring —
permanent role or contract. Not an end client, who goes through a different site.

It defends a single claim:

> He holds a whole system, and he makes it legible to others.

Technologies serve as evidence. They are not the identity of the profile.

## What is demonstrated, and how

Two halves, with very different standing:

- **Construire** — proof that a system exists, runs, and has survived an incident.
  This half is shown.
- **Coordonner** — proof that the system stays operable by someone else.
  This half is **never named**. It is inferred from the artefacts.

Hence the writing rule that governs all content: **nothing is claimed, everything is
inferred**. Facts, yes. Self-qualifiers, no.

## The decision ledger

An earlier version of this document described a "parallel reading": two columns named
*Construire* and *Coordonner*, aligned phase by phase along a vertical timeline. That
structure described an intent. The **decision ledger** is its realisation.

It occupies the same structural slot — two columns, one tension, a vertical progression —
but with real content in place of an abstract frame:

```
┌─ RETENU ───────────────────┬─ ÉCARTÉ ────────────────────┐
│ ● Serveur dédié bare metal │ ~~Infrastructure managée~~  │
├────────────────────────────┴─────────────────────────────┤
│ │ La charge est constante et le stockage dominant…       │
└──────────────────────────────────────────────────────────┘
```

The relation to the two halves holds without ever being written:

- the **Retenu** column and the technical decision are *Construire*;
- the **rationale** — why, against what, with what consequence — is the artefact of
  *Coordonner*: it is what makes the system intelligible to someone else.

Someone who reads three ledgers has understood that the profile can transmit, without the
word appearing once.

**Two hard constraints.** Every entry must correspond to a real trade-off: an invented
ledger is felt immediately. And a decision that is **not yet settled** is a legitimate
entry — that is what gives the work-in-progress piece its value.

## The three states

Work is shown in three states, deliberately:

- **en production** — proves the ability to operate;
- **livré** — proves a result;
- **en chantier** — proves the ability to arbitrate.

Together they say something none of them says alone. An unfinished project is not a
weakness to hide; it is the only place where a trade-off can be seen in progress.

## Journey architecture

```text
Accueil → Profil → Réalisations → Projet 01 → Projet 02 → Projet 03 → Contact
```

The number and names of projects depend on available content and **will change**. This
structure describes an intended journey, not a fixed tree: nothing in the code knows the
length of the journey in advance.

## Spatial grammar

Two complementary axes.

**Horizontal** — the overall journey. Going right means the next chapter. This is the
main navigation, materialised by the bottom rail and by the path.

**Vertical** — going deeper into the current chapter: decision ledger, incident timeline,
code excerpt.

The reader in a hurry crosses; the interested reader descends. Nobody is filtered out.

Below 768px the two touch axes fight each other, so the journey folds into a single
vertical scroll.

## Persistent navigation

**Header** — fixed, carrying the identity: name and the function of the site. No menu.
It only appears from the second chapter, since it is a reminder and has no purpose on the
chapter that carries the identity.

**Bottom rail** — the main navigation. It materialises progress, gives the current
position, and allows reaching any chapter directly.

## UX principles

The portfolio must be:

- original but immediately understandable;
- keyboard accessible and compatible with reduced-motion preferences;
- usable with mouse, trackpad and touch;
- quick to survey;
- centred on reading, not on demonstrating an interface.

Originality must always serve comprehension of the content.

Native browser behaviour and CSS come first. JavaScript only steps in where the expected
behaviour cannot be guaranteed otherwise — and never to hijack scrolling.

## Currently out of scope

- final copy and the real content of the ledgers;
- the definitive list and order of projects;
- the second identity anchor (see `DESIGN.md` §9).

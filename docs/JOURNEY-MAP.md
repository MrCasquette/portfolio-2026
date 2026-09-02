# The journey, mapped

A reading aid for anyone — human or model — arriving on this codebase cold.
It describes the shape of the navigation, not the content and not the code.
Source of truth: [`src/data/journey.ts`](../src/data/journey.ts).

Section labels are quoted from the content as it stands today. They come from
`portfolio.ts` and change with it; nothing in the mechanics knows or depends on
them.

## The shape

One **serpentine path**. Top-level sections run right; a section that has depth
descends; the last step of a descent turns right into the next section.
Scrolling always advances, in whichever direction the path currently travels.
There is no second gesture and no mode to keep track of.

```text
         col 0            col 1            col 2            col 3            col 4            col 5            col 6

row  0   Accueil      ──▶ Profil       ──▶ Réalisations ──▶ Projet 01
                                                            │
row  1                                                      Arbitrage 01
                                                            │
row  2                                                      Arbitrage 02 ──▶ Projet 02
                                                                             │
row  3                                                                       Arbitrage 01
                                                                             │
row  4                                                                       Arbitrage 02
                                                                             │
row  5                                                                       Arbitrage 03
                                                                             │
row  6                                                                       Extrait      ──▶ Projet 03
                                                                                              │
row  7                                                                                        Arbitrage 01
                                                                                              │
row  8                                                                                        Arbitrage 02
                                                                                              │
row  9                                                                                        Arbitrage 03
                                                                                              │
row 10                                                                                        Incident
                                                                                              │
row 11                                                                                        Extrait      ──▶ Contact
```

In this state: 7 sections, 18 steps, depths of `0,0,0,2,4,5,0`. **None of those
numbers is written anywhere.** The path is walked from the content, so a section
with no depth produces no descent, and an eighth section extends the path
without a line of layout changing. Treat every figure on this page as a current
reading, never as a constant to code against.

## Sections versus steps

- A **step** is one cell, one screen.
- A **section** is a step reached by a _rightward_ move — the head of a column.
  Sections are exactly the rail entries.

```text
section  Accueil  Profil  Réalisations  Projet 01  Projet 02  Projet 03  Contact
step           0       1             2          3          6         11       17
depth          0       0             0          2          4          5        0
```

Everything between two heads is a **descent**: depth inside the section already
open.

## How a step knows its own shape

Each step carries how the path **enters** and **leaves** it. Those two moves are
the whole layout language — four combinations, and the cell composes itself:

```text
enters  leaves   shape            content sits
──────  ──────   ─────            ────────────
 null   right    ──▶ start        on the line
 right  right    ──▶ through      on the line
 right  down     ──▶ then ▼       beside the corner
 down   down       ▼ through      beside the line
 down   null       ▼ end          beside the line
```

The two extremities are the only `null`s: the path is born at the first step and
dies at the last.

## What actually scrolls

Only one thing does. A hidden driver of `steps × 100dvh` is the whole scrollable
document; the visible grid is fixed and does not scroll at all.

```text
   document (the driver)              viewport (fixed)
   ┌──────────┐  step 0               ┌──────────────────┐
   │          │                       │                  │
   ├──────────┤  step 1     scrollY   │   the grid is    │
   │          │  ────────▶  drives ▶  │   translated in  │
   ├──────────┤             --x/--y   │   2D behind it   │
   │    ⋮     │                       │                  │
   ├──────────┤  last step            └──────────────────┘
   └──────────┘
```

Two consecutive steps differ by **exactly one cell on exactly one axis**, so the
grid position is a plain linear interpolation:

```text
progress = scrollY / innerHeight     →  8.4 means "40% of the way from step 8 to step 9"
--x, --y = lerp(layout[8], layout[9], 0.4)
```

Native scroll is kept as plumbing — anchors, keyboard, find-in-page, touch
inertia, `scroll-snap-type: y mandatory` — with its scrollbar hidden. The wheel
is amplified so one notch covers one step.

## What the two indicators say

They deliberately answer different questions, and never the same one twice.

```text
lateral leg                        descent
──────────────────────────         ──────────────────────────
rail:  travels, fills, lights      rail:  frozen on the current section
depth: silent                      depth: shows how far down you are
```

The rail holding still during a descent is the point: moving it would claim a
position _between_ two sections when the reader is squarely _inside_ one.

Everything the rail shows is derived from the same scroll-driven number — the
underline's travel, the connector's fill, the bullet's ignition. A cue driven by
an arrival transition instead would fire after the movement is over, and reads
as abrupt whatever its duration.

## Below 768px

The two touch axes fight each other, so the serpentine folds into a single
vertical scroll: the same steps in the same order, stacked.

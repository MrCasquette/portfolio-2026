---
status: accepted
date: 2026-08-26
---

# The path: materialising the horizontal axis with a continuous rule

## Context and Problem Statement

The landing chapter read like a classic hero stripped of its illustration, and
nothing announced the horizontal navigation paradigm. The rail and an arrow are
signs that must be decoded; what was missing was a **pre-attentive** cue —
perceived before any decision to read.

## Decision Drivers

- The cost of failure is total: a reader who does not discover the horizontal
  axis leaves.
- `DESIGN.md` §2 forbids decoration. The cue must come out of the composition.

## Considered Options

- **Page bleed** — let the next chapter show past the right edge. The strongest
  cue, and the reflex answer. **Discarded**: it forces giving up the exact 100%
  sizing, degrades `scroll-snap` precision, requires measuring a slide for the
  rail underline, and a half-visible neighbouring screen is plainly ugly.
- **The arrow alone** — insufficient: it is symbolic, therefore not pre-attentive.
- **Cut something *inside* the page** — the cue does not require the *page* to be
  cut, only that *something* is. A horizontal rule crossing the right edge
  produces the same clean cut for the price of one class.

## Decision Outcome

Chosen option: "cut something inside the page", developed into a continuous path
running across the survey chapters.

- **One segment per chapter** rather than a single element spanning the journey:
  chapters are contiguous, segments join up, and nothing needs to know how long
  the journey is.
- **Painted under the reading column**: opaque-background elements interrupt it
  on their own. The "———| boxed |———" falls out of the paint order, with no
  cut-out to write.
- **It is born, holds, then dies** at the first project — where the vertical axis
  takes over. Its death spills onto the project: a rule stopping at the edge of
  the Work chapter would make the page joint visible and read as the end of the
  site.
- **Absent below 768px**, where the journey folds into a vertical scroll: there
  is no horizontal axis left to hold.

### Consequences

- Good, because the horizontal axis is signalled without a sentence and without
  decoration.
- Good, because the path becomes the horizon of composition. The landing block
  anchors to it instead of being centred.
- Bad, because every survey chapter must carry a boxed element at its height, or
  the line crosses a bare page.
- Bad, because `--spacing-path` is a single approximate value. As long as the
  chapters stay vertically centred, boxes crossing the line is a coincidence and
  will move with the content. Still open.

## More Information

A positioned element paints above anything that is not positioned, whatever the
document order: `.slide-content` carries an explicit `z-index`, without which the
path would pass in front of the content.

---
status: accepted
date: 2026-08-26
---

# Anchor the survey chapters on the path by construction

## Context and Problem Statement

The path holds a constant height, `--spacing-path`, and reads best when a boxed
element crosses it (`0006`). Profile and Work were vertically centred in their
chapter, so the crossing was a coincidence: it depended on how tall the content
happened to be. It was recorded as a known defect and left open.

Two facts closed it.

The first is that the height is not free. Tested at 58% to improve the crossing,
the line came close enough to the middle to read as a **separator cutting the
page in two** rather than as a horizon. Being clearly below the middle is what
makes the rule a path, so `--spacing-path` is a constraint, not a setting.

The second follows: if the height cannot move, the content must.

## Considered Options

- **Retune `--spacing-path`** to whatever value happens to cross the boxes.
  Discarded twice over: it moves a value that carries meaning, and it is a
  measurement of today's content that a single added panel or a longer lede
  falsifies. It replaces one coincidence with a better-calibrated one.
- **Give each chapter its own path height** so every one can be tuned. Discarded:
  a rule that changes level between chapters stops being one continuous line, and
  the path exists only because it is continuous.
- **Anchor the content on the line by construction** — express the crossing as a
  layout rule rather than as a number.

## Decision Outcome

Chosen option: anchor by construction, as `.slide-on-path`.

The content is placed at the path's height — against the same box the path
resolves its own `top` against — then pulled up by half of its own height. The
head (`.slide-head`) is taken out of the flow, so that height is exactly the box
row's: `.slide-row` lands centred on the line whatever it weighs.

The head is then hung off the top of the row rather than off the line. That
distinction is the whole trick: half a tall row reaches well above the path, so a
head anchored on the line would end up underneath the row it introduces.

Nothing in this reads a content height, so the crossing is exact whatever the
chapter weighs.

### Consequences

- Good, because content can now grow freely: adding a panel, a card or a line of
  lede cannot desynchronise the crossing.
- Good, because `--spacing-path` goes back to meaning one thing only — where the
  horizon sits — instead of doubling as a tuning knob.
- Bad, because anchoring lifts the content out of the flow, and an overflow
  upwards is unreachable: no scrollbar reaches above the top edge. Below 700px of
  height the chapter falls back to centred flow and gives up the crossing rather
  than the readability.
- Bad, because chapters using it must expose a head and a single box row. A
  chapter with two rows to cross would need a different rule.

## More Information

Supersedes the last consequence recorded in
[`0006`](./0006-the-path.md), which left this open.

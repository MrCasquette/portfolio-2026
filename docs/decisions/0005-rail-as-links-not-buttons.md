---
status: accepted
date: 2026-08-22
---

# The navigation rail as links rather than buttons

## Context and Problem Statement

`DESIGN.md` §7 initially required the rail to be made of real `<button>`
elements, on keyboard-accessibility grounds.

## Considered Options

- **`<button>` plus keyboard handling** — the keyboard works, but what the
  browser already gives has to be reimplemented, and the position leaves the URL.
- **`<a href="#id">`** — the semantically correct element for navigating to a
  position in the document.

## Decision Outcome

Chosen option: "`<a href="#id">`".

A button triggers an action; a link leads somewhere. Here it leads somewhere.

### Consequences

- Good, because the URL is shareable, back-navigation works, middle-click works,
  and the keyboard works without a line of code.
- Good, because left/right arrows layer on top without replacing anything.
- Bad, because visual state must sit on the `<li>` rather than the `<a>`: the
  connector from one step to the next can only see `:last-child` from the list
  item.

## More Information

`DESIGN.md` §5.6. The number of steps is never hard-coded: the rail derives from
`chapters`, itself derived from `projects`.

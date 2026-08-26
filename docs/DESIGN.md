# DESIGN.md — Vincent Cottalorda's portfolio

Reference document for any change to the interface.
Read it before writing CSS or creating a component.

It takes precedence over [`CONCEPT.md`](./CONCEPT.md) in case of divergence.
Dated trade-offs, with what was discarded, live in [`decisions/`](./decisions/).

The site's own copy is in French. This document, the code and the decision
records are in English.

---

## 1. The thesis

The portfolio defends a single claim:

> **He holds a whole system, and he makes it legible to others.**

Two ways in to the same claim:
- **Construire** — proof that a system exists, runs, and has survived an incident.
- **Coordonner** — proof that it stays operable by someone else. *Never named, never
  claimed.* This half is demonstrated through artefacts (decision ledgers, procedures,
  legible documentation), not through a statement.

**The writing rule that follows from the thesis:** nothing is claimed, everything is
inferred. Banned from any copy on the site: « polyvalent », « passionné », « vision
globale », « je fais le lien entre les équipes », « autodidacte » used as a
justification. Facts, yes. Self-qualifiers, no.

**Intended reader:** someone hiring — permanent role or contract. Not an end client,
who goes through a different site.

---

## 2. Non-negotiable

| Rule | Reason |
|---|---|
| The background is mute | Every aesthetic drift in this project came from a background carrying a hue: mud, terminal amber, old paper. The background stays strictly neutral. |
| A single accent | Jade signals what is running, decisions kept, links, and position in the navigation. Nothing else. Its rarity is its strength. |
| No decoration | No particles, no mesh gradients, no simulated textures, no glassmorphism, no blobs. Depth is built by stacking surfaces and one-pixel rules. |
| One movement at a time | Short transitions on states. No ambient animation. `prefers-reduced-motion` honoured everywhere. |
| No hard-coded colour | Every value comes from `theme.css`. A component needing a colour absent from the theme signals a design problem, not a gap in the theme. |
| No imported editor theme | Syntax highlighting is derived from the site palette. Do not reintroduce Catppuccin, Nord, Dracula, Rosé Pine. |

### Motion — the one admitted exception

The "no ambient animation" rule has one exception and one only: **the scroll hint on the
landing chapter**. A lone arrow at the right of the screen, whose opacity and position
oscillate slightly.

It is admitted because it is not ambience: it announces the horizontal navigation
paradigm, which nothing else signals on arrival. It is scoped:

- **in `ink-3`, never in the accent** — a scroll hint is neither a link, nor a position,
  nor something running;
- `aria-hidden`: the bottom rail carries the real navigation;
- the animation's 0% and 100% state **is the visible state**, so that neutralisation by
  `prefers-reduced-motion` leaves the arrow legible rather than frozen half-faded;
- hidden below 1024px, where the journey folds and the arrow would lie;
- the motion is declared in `theme.css` (`--animate-scroll-hint`), not in the component:
  it is a token like any other.

No other ambient animation is admitted. A second one would make it ordinary.

### Accent drifts already corrected

The HTML prototype contained these. They must not come back:

- **Panel kickers in jade** (`Ce que je fais tourner`). A section heading is not on the
  list above. Kickers are `ink-3`, without exception.
- **String literals in pure `accent`** inside code blocks. An excerpt holds too many for
  the rarity to survive. See §5.5.

The one owned exception is the accented word in the landing heading: a single word, on a
single screen, across the whole site.

---

## 3. Palette

Tokens defined in `src/styles/theme.css`. Roles, as a reminder:

**Surfaces** — `bg` (#151515) → `surface` (#1C1C1C) → `surface-2` (#212121).
Code blocks use `code` (#1A1A1A), between the background and the cards.

**Text** — `ink` for headings and strong text, `ink-2` for body copy and descriptions,
`ink-3` for metadata and discarded options.

**Accent** — `accent` (#45B08C) for anything active. `accent-line` for rules and passed
step bullets. `accent-bg` for pill fills. `accent-halo` for the halo on the rail's
current bullet.

### Contrast measured on `bg`

Two values from the first version failed and were raised:

| Token | Ratio | Threshold |
|---|---|---|
| `ink` | ~16:1 | AA text ✅ |
| `ink-2` #A3A19D | 7.1:1 | AA text ✅ |
| `ink-3` **#807E7A** | 4.51:1 | AA text ✅ *(was #73716D at 3.75:1 — fail)* |
| `accent` #45B08C | 6.8:1 | AA text ✅ |
| `accent-line` **#35705C** | 3.15:1 | UI component ✅ *(was #295647 at 2.19:1 — fail)* |

`ink-3` carries rail labels and kickers: those are navigation elements, not decoration.
It had to pass AA.

### Collisions to watch

Jade has two dangerous neighbourhoods, already handled — do not reintroduce them:

1. **"Success" green.** Do not accent the end of an incident timeline: it reads as a
   validation tick. The accent marks the **trigger**, not the resolution.
2. **Status green.** States are no longer all coloured. See §5.3.

---

## 4. Typography

**Lexend** for display and body. **JetBrains Mono** for anything technical. Both are
self-hosted through Fontsource — no third-party request.

The mono is not decorative. It carries: kickers, technology chips, captions, timestamps,
column headings, code blocks, contact links. This split is structural: mono marks what
belongs to the machine, sans what belongs to the discourse.

Weights:
- body `300` — Lexend visibly gains weight at 400 in paragraphs
- headings `600`
- strong text inside a paragraph `500`
- decisions kept `400` (they must outweigh discarded ones, which stay at 300)

Do not go past 600 in a heading. Lexend at 700 turns doughy at large sizes.

Kickers are mono, uppercase, `letter-spacing: 0.18em`, colour `ink-3`. That is the only
place uppercase is used.

---

## 5. Components

### 5.1 Decision ledger — signature element

This is the central component of the site. It carries the portfolio's singularity on its
own. It is not decorative: it replaces the conventional project description.

**It is also the realisation of the parallel reading** described in `CONCEPT.md`: two
columns, one tension, a rationale that links them. The "Retenu" column and the technical
decision belong to *Construire*. The rationale — why, against what, with what consequence
— is the artefact of *Coordonner*: what makes the system intelligible to someone else.
Neither word appears on screen.

Structure: two columns (`Retenu` / `Écarté`), then a full-width rationale row.

```
┌─ RETENU ──────────────────┬─ ÉCARTÉ ───────────────────┐
│ ● Serveur dédié bare metal │ ~~Infrastructure managée~~ │
├────────────────────────────┴────────────────────────────┤
│ │ La charge est constante et le stockage dominant…      │
└─────────────────────────────────────────────────────────┘
```

- Kept column: jade bullet, `ink`, weight 400.
- Discarded column: `ink-3`, weight 300, one-pixel `line-through`.
- Rationale: `ink-2`, weight 300, 2px left rule in `accent-line`.
- Below 660px the two columns stack; the discarded one keeps its left indent.

#### The unsettled decision

An entry may carry a decision that is **not yet settled** — that is what gives the
work-in-progress piece its value. It is a **distinct shape**, not a resolved decision
missing a field, and the rendering must show it:

- full-width mono label `NON TRANCHÉ`;
- **no jade bullet** — nothing is kept, the accent would lie;
- **no strikethrough** — nothing is discarded;
- both options at equal weight, in `ink-2`, marked with a neutral dash;
- rationale rule in `line`, not `accent-line`.

In the data model this is a discriminated union (`state: 'settled' | 'open'`), not an
optional field.

**Content constraint:** every entry must correspond to a real trade-off. An invented
ledger is felt immediately and destroys the credibility of the whole.

### 5.2 Landing chapter — composition

The hero is designed for a horizontal portfolio, not as a classic hero stripped of its
illustration. Two typographic masses:

- **left**: heading, then the availability pill;
- **right**: the lede.

The void between the two masses is a compositional element. It must not be filled, least
of all with an illustration or a flat colour.

**No call to action.** The bottom rail already handles navigation; a button would
duplicate the function and bring back product-page vocabulary.

The chapter exceeds the reading column (`--slide-max`), otherwise the two masses crowd
together and the gap stops reading as an intention.

The block is **anchored on the path** rather than centred in the chapter: the line is the
horizon of the composition, and the heading sits just above it. At the path's height the
left column stays empty — composed void, not a gap.

### 5.3 State pills

Three states, told apart by shape as much as by colour, because the accent must only
signal what is running:

| State | Treatment |
|---|---|
| `en production` | `accent` on `accent-bg`, solid rule |
| `livré` | `ink-3`, solid rule |
| `en chantier` | `ink-2`, **dashed rule** |

### 5.4 Incident timeline

Vertical rule in `line`, round bullets. **Only the first bullet is accented.** Timestamps
in mono. The last event moves to `ink` (current state), without accent.

Optional: not every project has had an incident, and fabricating one would kill
credibility as surely as an invented ledger.

### 5.5 Code block

`code` background, `line` rule, mono caption with the source on the left and a mention on
the right. Almost monochrome highlighting: keywords in `code-key` at **weight 500**
(hierarchy comes from weight), strings in `code-string`, values in `code-value`,
punctuation and comments in the greys.

Highlighting is produced by Shiki with a theme defined in `src/styles/code-theme.ts`,
derived from the tokens. **The pure accent is absent from it**: an excerpt holds too many
strings for jade to stay rare. Bold is reserved for keywords — not operators.

Do not add another colour. If a language seems to need one, the excerpt is too long, not
the theme too poor.

### 5.6 Navigation rail

Steps at the bottom of the screen, bullets joined by a rule.
Passed: `accent-line`. Current: solid `accent` with a halo. Upcoming: `line`.
Labels in `ink-3`, the current one in `ink` at weight 500.

The current-chapter underline is **driven by the scroll offset**, as a fractional value,
not by the intersection observer: an observer is discrete and emits nothing for chapters
crossed during a jump, so the bar would lag on any move longer than one chapter.

Three implementation constraints:

- **These are `<a href="#id">` links, not buttons.** The position stays in the URL,
  shareable and restored on back-navigation; keyboard, middle-click and history work
  without code. Left/right arrows are layered on top.
- **The number of steps is never hard-coded.** The rail derives from `chapters`, itself
  derived from `projects`. Adding a project only touches `portfolio.ts`.
- **No top border.** It doubled the connector rule twenty pixels below it and competed
  with the path. The rail is separated by its opaque background alone.

### 5.7 Site header

It carries the identity — name and way of working — and **only appears from the second
chapter onwards**. Its role is to remind; it has no purpose while the reader is still on
the chapter that carries that identity. 300ms fade, `pointer-events: none` while hidden.

Consequence to keep in mind: **the landing chapter must name Vincent.** Without it,
nothing does on the first screen.

Unlike the rail, the header keeps its bottom border: it overhangs the content, whereas
the rail sits inside it.

### 5.8 The path

A one-pixel rule at constant height (`--spacing-path`) that materialises the horizontal
axis, before anything has been read. It is the site's pre-attentive cue.

- **One segment per chapter**, not a single element spanning the journey. Chapters are
  contiguous, so segments join up, and nothing needs to know the journey's length.
- **Painted under the reading column.** Opaque-background elements interrupt it on their
  own, which produces `———| boxed |———` with no cut-out to write. `.slide-content` carries
  an explicit `z-index`, without which the positioned path would paint in front.
- **It is born, holds, then dies.** Fade-in on the landing, solid across Profile and
  Work, and a short dying segment on the first project — where the vertical axis takes
  over. Its death deliberately spills onto the project: a rule stopping at the page edge
  would make the joint visible and read as the end of the site.
- **Absent below 768px**, where the journey folds into a vertical scroll.

Two constraints it imposes:

- every survey chapter must carry a boxed element at the path's height, or the line
  crosses a bare page;
- `--spacing-path` is a single approximate value. While chapters stay vertically centred,
  boxes crossing the line is a coincidence that will move with the content — see §9.

---

## 6. Navigation

- **→ horizontal**: the peaks of the journey. A full sweep gives the whole thesis.
- **↓ vertical**: the detail inside a chapter. Ledger, timeline, code.

The reader in a hurry crosses; the interested reader descends. Nobody is filtered out.

Three points handled:

1. **Axis lock.** Trackpads produce diagonal deltas. As soon as the reader has descended
   into a chapter, the horizontal component of the gesture is cancelled. The JS **never
   intercepts the vertical component and triggers no navigation**: `scroll-snap` drives
   alone, there is no scripted `scrollTo` and no computed index.
2. **Folding into a single vertical axis below 768px.** Two touch axes fight each other.
3. **Signalling the descent** — *still open*, see §9.

---

## 7. Accessibility — floor

- Contrast: see the measured table in §3. `ink-3` is reserved for metadata, rail labels
  and struck-through text.
- Information is never carried by colour alone — hence the dashed rule on `en chantier`,
  the strikethrough on discarded options, and the `NON TRANCHÉ` label.
- Visible focus everywhere, jade `outline` at 2px with a 3px offset.
- The rail is made of real links. Left/right arrows functional.
- Horizontal scrolling uses `scroll-snap`. **One wheel conversion is admitted**, and it
  is scoped: see below.

### The wheel — the one admitted exception

A mouse only produces `deltaY`. Without conversion the horizontal journey is simply
unreachable with one: that is an accessibility defect, not a preference.

The "never hijack the wheel" rule targeted the prototype's wheel-jacking — computed
index, `scrollTo` towards a chapter, 500ms lock. What is admitted is strictly narrower:

- **chapter depth arbitrates, not the hardware.** `deltaMode` cannot separate mouse from
  trackpad: macOS normalises both to pixels, and `DOM_DELTA_LINE` never appears. A
  chapter without depth converts a vertical wheel into a crossing; a chapter with
  scrollable content lets it descend, and the journey resumes by scroll chaining once the
  bottom is reached;
- the conversion is **proportional** (`deck.scrollBy({ left: deltaY * 32 })`): no index is
  computed, no chapter is targeted, no time lock;
- **`scroll-snap` alone decides** where the scroll settles;
- it only applies at the top level: once the reader has descended more than half a
  viewport into a chapter, the wheel becomes purely vertical again.

Any change reintroducing a computed index or a `scrollTo` towards a chapter leaves the
exception and falls back under the prohibition.

---

## 8. Discarded, and why

This section exists so the road is not walked twice. Every option here was tried.
Dated records with full reasoning live in [`decisions/`](./decisions/).

| Discarded | Reason |
|---|---|
| Purple-pink gradients | SaaS product-page vocabulary. Promises before having proved. |
| Glassmorphism | The veil has nothing behind it to blur: it forces a saturated palette in order to exist, and produces no depth at all. Cost without benefit. |
| One hue per chapter | Seven chromatic identities with no inferable logic. Makes the interface the subject. |
| One hue per reading (Construire / Coordonner) | The same mistake in other clothes: it violates "a single accent", and **visually names a dichotomy we decided not to claim**. |
| "British dandy" register (beige, khaki, tweed) | A material reference translated into a flat background gives mud. And it is a costume: it describes an appearance, not a way of working. |
| Display serif (Fraunces and relatives) | Reads dated, contradicting the aim of modernity. |
| Monospace headings (Martian Mono) | Combined with a warm accent on a dark background, produces an amber terminal look. |
| Cream background + terracotta accent | A pairing recognisable as an AI assistant theme, and it produces an "old paper" effect close to Obsidian themes. |
| Orange `#D97757` | Tested and dropped in favour of jade, which steps outside the saturated warm register of developer portfolios. |
| Semantic colour per theme (reflection / architecture / code / debugging) | That taxonomy does not exist in the content. Five active hues destroy the very notion of an accent. |
| Imported editor theme | Borrowed identity, immediately recognised by peers. |
| Background particles | The most common decoration of the genre. Contradicts "nothing is claimed". |
| Status line with infrastructure metrics | Too specialised a signal. And without real data wired in, it contradicts the promise of proof. |
| Photographs of the author | An image without a subject is a decorative flat. The subject here — the work — cannot be photographed. |
| Poppins, Inter, Boldonse, Gabarito, Space Grotesk, Schibsted Grotesk | Tested. Lexend chosen. |
| Columns named "Construire" / "Coordonner" | They name what should be inferred. The decision ledger occupies the same structural slot with real content in place of an abstract frame. |
| Page bleed to signal horizontality | The reflex answer, and the most expensive: it costs exact 100% sizing, degrades `scroll-snap` precision, and a half-visible neighbouring screen is plainly ugly. The path produces the same pre-attentive cut inside the page. |
| `backdrop-filter` on header and rail | Nothing left to blur on a flat background, and Chromium's compositing produces a visible tonal shift. |

---

## 9. Still open

Five points. None is settled.

1. **The second identity anchor.** The decision ledger carries the singularity alone.
   Whatever reinforces it must come out of the content, not the decoration. Two leads
   from the existing system: the **unsettled decision** carried as a form in its own right
   (§5.1), and the **`en chantier` pill** owned on a real project.
2. **Real content.** The ledgers, the timeline and the code excerpts are plausible
   reconstructions. They must be replaced by the real notes. Content will evolve as
   projects arrive; `portfolio.ts` is the single entry point, and it becomes a Zod schema
   and a client the day it comes from the CMS.
3. **Signalling the vertical descent** (§6.3). Without a cue, depth is never discovered.
   A half-block visible at the bottom of the view, or an indicator.
4. **Anchoring the survey chapters on the path** (§5.8). Profile and Work are still
   centred vertically, so the path crossing their boxes is a coincidence rather than a
   construction, and it will drift as content changes.
5. **The cognitive portrait.** One decision rationale mentioned unreliable episodic memory
   as the motive for choosing Ansible. A strong argument, but it is a personal
   disclosure. A decision to be taken, not to be settled by default.

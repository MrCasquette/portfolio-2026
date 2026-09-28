/**
 * Serpentine journey mechanics.
 *
 * A driver of one screen per step is the only thing that scrolls. Its position
 * drives a two-dimensional translation of the grid: two consecutive steps
 * differ by exactly one cell on exactly one axis, so the position is a linear
 * interpolation between them.
 *
 * Nothing here navigates. The wheel is amplified and smoothed so that one notch
 * covers one step, but it produces a scroll, not a jump to a computed chapter —
 * `scroll-snap` alone decides where it settles (docs/design/accessibilite.md).
 */

/** One notch, one step. Native scrolling under a mandatory snap has to cross
    half a screen before it tips, which takes several notches. */
const WHEEL_STEP = 32;
/** How long one amplified notch is left to travel before another is taken.
    A free-spinning wheel keeps emitting long after the hand has left it. */
const SETTLE_MS = 320;

const grid = document.querySelector<HTMLElement>('[data-grid]');
const cells = [...document.querySelectorAll<HTMLElement>('.cell')];
const railSteps = [...document.querySelectorAll<HTMLElement>('[data-rail-step]')];
const railTrack = document.querySelector<HTMLElement>('[data-rail-track]');
const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
const depthIndicator = document.querySelector<HTMLElement>('[data-depth-indicator]');

if (grid && cells.length > 1) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const layout = cells.map(cell => ({
    col: Number(cell.style.getPropertyValue('--col')),
    row: Number(cell.style.getPropertyValue('--row')),
    chapter: Number(cell.dataset.chapter),
    depth: Number(cell.dataset.depth),
    chapterDepth: Number(cell.dataset.chapterDepth),
  }));

  const lastIndex = layout.length - 1;
  const heads = railSteps.map(step => Number(step.dataset.railTarget));

  const readPosition = () => {
    const unit = window.innerHeight;
    if (unit === 0) return 0;
    return Math.min(Math.max(window.scrollY / unit, 0), lastIndex);
  };

  /**
   * The rail reads in chapters, the journey in steps.
   *
   * The indicator holds on the current chapter for the whole descent and only
   * travels on the last leg — the one that actually leads to the next chapter.
   * Moving it during a descent would claim a position between two projects when
   * the reader is squarely inside one. It therefore moves exactly when the
   * screen moves sideways, and holds still when it does not.
   */
  const reflectRail = (progress: number) => {
    let chapter = 0;
    while (chapter < heads.length - 1 && progress >= heads[chapter + 1]) chapter += 1;

    const next = heads[chapter + 1];
    const within = next === undefined ? 0 : Math.min(Math.max(progress - (next - 1), 0), 1);

    railTrack?.style.setProperty('--active-index', (chapter + within).toFixed(4));

    railSteps.forEach((step, stepIndex) => {
      const state = stepIndex === chapter ? 'current' : stepIndex < chapter ? 'past' : 'upcoming';
      step.dataset.state = state;

      const link = step.querySelector('a');
      if (stepIndex === chapter) link?.setAttribute('aria-current', 'true');
      else link?.removeAttribute('aria-current');
    });

    // The header only recalls an identity once you have left the chapter carrying it.
    if (siteHeader) siteHeader.dataset.state = chapter === 0 ? 'idle' : 'visible';
  };

  /**
   * The depth readout, for the vertical legs only.
   *
   * It says what the rail deliberately does not: how far down the current
   * project one is. On the lateral legs it goes quiet — there the rail and the
   * path already answer, and a second indicator would only repeat them.
   */
  const reflectDepth = (progress: number) => {
    if (!depthIndicator) return;

    const index = Math.min(Math.round(progress), lastIndex);
    const { depth, chapterDepth } = layout[index];

    if (chapterDepth === 0) {
      depthIndicator.dataset.state = 'idle';
      return;
    }

    const extent = 1 / (chapterDepth + 1);
    depthIndicator.style.setProperty('--depth-extent', extent.toFixed(4));
    depthIndicator.style.setProperty('--depth-offset', (depth / chapterDepth).toFixed(4));
    depthIndicator.dataset.state = depth === 0 ? 'idle' : 'visible';
  };

  const track = () => {
    const progress = readPosition();
    const index = Math.min(Math.floor(progress), lastIndex - 1);
    const ratio = progress - index;

    const from = layout[index];
    const to = layout[index + 1];

    grid.style.setProperty('--x', (from.col + (to.col - from.col) * ratio).toFixed(4));
    grid.style.setProperty('--y', (from.row + (to.row - from.row) * ratio).toFixed(4));

    reflectRail(progress);
    reflectDepth(progress);
  };

  window.addEventListener('scroll', track, { passive: true });
  window.addEventListener('resize', track);
  track();

  /**
   * Wheel amplification.
   *
   * `scroll-behavior: smooth` on the document would animate the notch in CSS,
   * but it applies to every notch, and unamplified notches are small and
   * frequent: each one restarts the previous animation and the page feels
   * stuck. Amplified, one notch already covers a whole step, so smoothing it is
   * one deliberate movement — guarded by a lock, without which a free-spinning
   * wheel would restart it dozens of times after the hand has left.
   */
  let animatingUntil = 0;

  window.addEventListener(
    'wheel',
    event => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();

      const now = performance.now();
      if (now < animatingUntil) return;
      animatingUntil = now + SETTLE_MS;

      window.scrollBy({
        top: event.deltaY * WHEEL_STEP,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      });
    },
    { passive: false },
  );

  const jump = (index: number, behavior: ScrollBehavior = 'smooth') =>
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: prefersReducedMotion.matches ? 'auto' : behavior,
    });

  /** The step a fragment names, or -1. Cells are in the journey's own order. */
  const stepOf = (hash: string) =>
    hash.length > 1 ? cells.findIndex(cell => cell.id === decodeURIComponent(hash.slice(1))) : -1;

  /**
   * Every link to a step moves the driver — the rail's, and any other.
   *
   * Native anchor navigation cannot work here: a cell sits far outside `.view`,
   * which does not scroll but is translated into place, so the browser has
   * nothing legitimate to scroll and the jump either does nothing or shifts a
   * container the journey does not read. Delegated rather than bound per link,
   * so a link written later in a component is carried without having to know
   * about any of this.
   *
   * Jumps always glide, whatever the distance: a long one does not cut across
   * the grid, it follows the path cell by cell, and the reader watches the very
   * journey being skipped. Guarding by distance would have cut exactly the
   * survey chapters, the most legible ones to travel.
   */
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
    if (!(link instanceof HTMLAnchorElement) || link.origin !== window.location.origin) return;
    if (link.pathname !== window.location.pathname) return;

    const index = stepOf(link.hash);
    if (index < 0) return;

    event.preventDefault();
    jump(index);
    /* The href was already the truth of where the link leads; this is what makes
       the URL say it too — shareable, and restored by the back button below. */
    if (link.hash !== window.location.hash) history.pushState(null, '', link.hash);
  });

  /* Back and forward land on the step the URL names, without a transition: the
     reader asked to go back, not to watch the way back. */
  window.addEventListener('popstate', () => {
    const index = stepOf(window.location.hash);
    if (index >= 0) jump(index, 'auto');
  });

  /* A deep link opens on its step. The browser has already given up on the
     fragment by now — nothing it could scroll holds the cell — so this is the
     only thing that honours it. */
  const opened = stepOf(window.location.hash);
  if (opened > 0) jump(opened, 'auto');

  /** The arrow keys move by one step, in the journey's own order. */
  window.addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (direction === 0) return;

    event.preventDefault();
    const target = Math.min(Math.max(Math.round(readPosition()) + direction, 0), lastIndex);
    window.scrollTo({
      top: target * window.innerHeight,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });
  });
}

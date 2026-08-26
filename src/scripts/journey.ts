/**
 * Two-axis journey mechanics.
 *
 * Scrolling stays native: `scroll-snap` drives navigation, no index is computed
 * to feed a `scrollTo`. This script only handles the three things CSS cannot
 * (DESIGN.md §6, §7):
 *   1. reflect the current position in the rail;
 *   2. cancel the stray axis of a diagonal trackpad gesture;
 *   3. wire the left/right arrow keys.
 */

const ACTIVE_RATIO = 0.55;
/** Wheel amplification. One notch must cover enough ground for snap to settle
    on the next unit — the same figure on both axes, so both feel alike. */
const WHEEL_STEP = 32;
const deck = document.querySelector<HTMLElement>('.deck');
const slides = [...document.querySelectorAll<HTMLElement>('.slide')];
const steps = [...document.querySelectorAll<HTMLElement>('[data-rail-step]')];
const railTrack = document.querySelector<HTMLElement>('[data-rail-track]');
const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
const depthIndicator = document.querySelector<HTMLElement>('[data-depth-indicator]');

if (deck && slides.length > 0) {
  let activeIndex = 0;

  /**
   * Position of the current-chapter underline.
   *
   * Horizontally it is derived from the scroll offset itself, as a fractional
   * value: the bar tracks the movement exactly, whatever the distance covered.
   * An intersection observer could not do this — it is discrete and emits
   * nothing for chapters crossed during a jump.
   *
   * In vertical mode (below 768px) `scrollLeft` stays at zero, so we fall back
   * on the observer index and let the CSS transition take over.
   */
  const trackIndicator = () => {
    if (!railTrack) return;

    const isHorizontal = deck.scrollWidth > deck.clientWidth && deck.clientWidth > 0;
    const position = isHorizontal ? deck.scrollLeft / deck.clientWidth : activeIndex;

    railTrack.dataset.tracking = isHorizontal ? 'scroll' : 'index';
    railTrack.style.setProperty('--active-index', position.toFixed(4));
  };

  /**
   * The fake scrollbar of a panelled chapter, sized on the two ratios a real
   * one uses: the visible fraction of the column, and progress through the
   * rest. Idle at the top, where a vertical bar would contradict the horizontal
   * continuity the path sets up.
   */
  const reflectDepth = (slide: HTMLElement) => {
    if (!depthIndicator) return;

    const scrollable = slide.scrollHeight - slide.clientHeight;

    depthIndicator.style.setProperty(
      '--depth-extent',
      (slide.clientHeight / slide.scrollHeight).toFixed(4),
    );
    depthIndicator.style.setProperty(
      '--depth-offset',
      (scrollable > 0 ? slide.scrollTop / scrollable : 0).toFixed(4),
    );
    depthIndicator.dataset.state = slide.scrollTop < 2 ? 'idle' : 'visible';
  };

  const reflectPosition = (index: number) => {
    activeIndex = index;
    trackIndicator();

    // Leaving a chapter takes its depth readout with it.
    const current = slides[index];
    if (current?.classList.contains('slide-deep')) reflectDepth(current);
    else if (depthIndicator) depthIndicator.dataset.state = 'idle';

    // The header only recalls an identity once you have left the chapter carrying it.
    if (siteHeader) siteHeader.dataset.state = index === 0 ? 'idle' : 'visible';

    steps.forEach((step, stepIndex) => {
      const state = stepIndex === index ? 'current' : stepIndex < index ? 'past' : 'upcoming';
      step.dataset.state = state;

      const link = step.querySelector('a');
      if (stepIndex === index) link?.setAttribute('aria-current', 'true');
      else link?.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < ACTIVE_RATIO) continue;
        reflectPosition(slides.indexOf(entry.target as HTMLElement));
      }
    },
    { root: deck, threshold: [ACTIVE_RATIO] },
  );

  for (const slide of slides) observer.observe(slide);
  reflectPosition(0);

  deck.addEventListener('scroll', trackIndicator, { passive: true });
  window.addEventListener('resize', trackIndicator);

  for (const slide of slides) {
    if (!slide.classList.contains('slide-deep')) continue;
    slide.addEventListener('scroll', () => reflectDepth(slide), { passive: true });
  }

  /**
   * Wheel axis conversion.
   *
   * A mouse only produces deltaY: without conversion the horizontal journey is
   * simply unreachable with one.
   *
   * Mouse and trackpad cannot be told apart through `deltaMode`: macOS
   * normalises both to pixels (DOM_DELTA_PIXEL), so the check never returns
   * DOM_DELTA_LINE. Chapter depth arbitrates instead, which has the advantage
   * of being a content criterion rather than a hardware one:
   *
   *   - chapter without depth → a vertical wheel crosses the journey;
   *   - chapter that merely overflows → the wheel descends into it, and the
   *     journey resumes by scroll chaining once the bottom is reached;
   *   - chapter built as a column of panels → it is crossed at the top like any
   *     other, and only descended into through its link.
   *
   * The conversion is proportional and drives no navigation: no computed index,
   * no `scrollTo` towards a chapter, no lock. `scroll-snap` alone decides where
   * the scroll settles (DESIGN.md §7).
   */
  deck.addEventListener(
    'wheel',
    event => {
      // Below 768px the journey folds into a single vertical axis: nothing to convert.
      if (deck.scrollWidth <= deck.clientWidth) return;

      const target = event.target instanceof Element ? event.target : null;
      const slide = target?.closest<HTMLElement>('.slide');

      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const isVerticalGesture = Math.abs(event.deltaY) > Math.abs(event.deltaX);

      // A chapter built as a column of panels only descends deliberately: at its
      // top the wheel still crosses the journey, and the descent goes through
      // the link. Without this a mouse could never get past the first project,
      // since every vertical gesture would be swallowed by the depth.
      const isPanelled = slide?.classList.contains('slide-deep') ?? false;
      const isEngaged = slide ? slide.scrollTop >= 2 : false;

      if (slide && isPanelled && isEngaged) {
        // Axis lock: any depth means the reader is going down, so the sideways
        // component of a diagonal trackpad gesture is cancelled.
        if (isHorizontalGesture) {
          event.preventDefault();
          return;
        }

        if (!isVerticalGesture) return;

        // Same amplification as the journey. Native scrolling under a mandatory
        // snap has to cross half a panel before it tips, which takes several
        // notches; the deck does not, and the two axes must feel alike.
        event.preventDefault();
        slide.scrollBy({ top: event.deltaY * WHEEL_STEP });
        return;
      }

      // An ordinary chapter that happens to overflow — a short viewport — keeps
      // native scrolling, and the journey resumes by scroll chaining at the
      // bottom. Its axis lock waits for a real descent rather than a stray pixel.
      const overflows = slide ? slide.scrollHeight > slide.clientHeight + 1 : false;

      if (slide && !isPanelled && overflows) {
        const isDescended = slide.scrollTop >= slide.clientHeight / 2;
        if (isDescended && isHorizontalGesture) event.preventDefault();
        return;
      }

      if (!isVerticalGesture) return;

      event.preventDefault();
      deck.scrollBy({ left: event.deltaY * WHEEL_STEP });
    },
    { passive: false },
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const goTo = (index: number) => {
    const target = slides[index];
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  /**
   * The descent links smooth their own jump.
   *
   * `scroll-behavior: smooth` on the column would have done it in CSS, but it
   * applies to user scrolling too and turns every wheel tick into an animation
   * the next tick restarts. This is not scroll hijacking: the link moves to its
   * own anchor, nothing intercepts a gesture, and without JavaScript the anchor
   * still works — instantly.
   */
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-depth-link]')) {
    link.addEventListener('click', event => {
      const target = document.querySelector<HTMLElement>(link.hash);
      if (!target) return;

      // No default navigation: it would push a hash the rail does not own.
      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  window.addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'ArrowRight') goTo(activeIndex + 1);
    else if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
    else return;

    event.preventDefault();
  });
}

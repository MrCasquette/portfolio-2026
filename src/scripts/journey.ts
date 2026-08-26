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
const deck = document.querySelector<HTMLElement>('.deck');
const slides = [...document.querySelectorAll<HTMLElement>('.slide')];
const steps = [...document.querySelectorAll<HTMLElement>('[data-rail-step]')];
const railTrack = document.querySelector<HTMLElement>('[data-rail-track]');
const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');

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

  const reflectPosition = (index: number) => {
    activeIndex = index;
    trackIndicator();

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
   *   - chapter with scrollable content → the wheel descends into it, and the
   *     journey resumes by scroll chaining once the bottom is reached.
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

      const isDescended = slide ? slide.scrollTop >= slide.clientHeight / 2 : false;
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);

      // Axis lock: once engaged in a descent, the horizontal component of a
      // diagonal trackpad gesture is cancelled so the page does not drift
      // sideways.
      if (isDescended && isHorizontalGesture) {
        event.preventDefault();
        return;
      }

      if (isDescended) return;

      // The chapter has depth: the wheel must be able to descend into it, or
      // vertical content becomes unreachable with a mouse.
      const hasDepth = slide ? slide.scrollHeight > slide.clientHeight + 1 : false;
      if (hasDepth) return;

      const isVerticalGesture = Math.abs(event.deltaY) > Math.abs(event.deltaX);

      if (!isVerticalGesture) return;

      event.preventDefault();
      deck.scrollBy({ left: event.deltaY * 32 });
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

  window.addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'ArrowRight') goTo(activeIndex + 1);
    else if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
    else return;

    event.preventDefault();
  });
}

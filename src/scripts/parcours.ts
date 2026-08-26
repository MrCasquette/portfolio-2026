/**
 * Mécanique du parcours à deux axes.
 *
 * Le défilement reste natif : `scroll-snap` conduit la navigation, aucun index
 * n'est calculé pour piloter un `scrollTo`. Le script se limite à trois choses
 * que le CSS ne sait pas faire (DESIGN.md §6, §7) :
 *   1. refléter la position courante dans le rail ;
 *   2. annuler l'axe parasite d'un geste diagonal de trackpad ;
 *   3. brancher les flèches gauche/droite.
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
   * Position de la ligne courante.
   *
   * À l'horizontale elle est dérivée du défilement lui-même, en valeur
   * fractionnaire : la barre suit exactement le mouvement, quelle que soit la
   * distance parcourue. Un observateur d'intersection ne le permettrait pas —
   * il est discret et n'émet rien pour les chapitres traversés lors d'un saut.
   *
   * En mode vertical (sous 768 px) `scrollLeft` reste nul : on retombe alors
   * sur l'index de l'observateur, et la transition CSS prend le relais.
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

    // L'en-tête ne rappelle une identité que si on a quitté le chapitre qui la porte.
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
   * Conversion d'axe pour la molette.
   *
   * Une souris ne produit que du deltaY : sans conversion, le parcours
   * horizontal lui est purement inaccessible.
   *
   * On ne peut pas distinguer la souris du trackpad par `deltaMode` : macOS
   * normalise les deux en pixels (DOM_DELTA_PIXEL), le test ne renvoie jamais
   * DOM_DELTA_LINE. C'est donc la profondeur du chapitre qui arbitre, ce qui a
   * l'avantage d'être un critère de contenu et non de matériel :
   *
   *   - chapitre sans profondeur → la molette verticale traverse le parcours ;
   *   - chapitre avec du contenu à faire défiler → la molette y descend, et le
   *     parcours reprend par propagation une fois le bas atteint.
   *
   * La conversion est proportionnelle et ne pilote aucune navigation : pas
   * d'index calculé, pas de `scrollTo` vers un chapitre, pas de verrou. C'est
   * `scroll-snap` qui décide où le défilement se pose (DESIGN.md §7).
   */
  deck.addEventListener(
    'wheel',
    event => {
      // Sous 768 px le parcours est replié en vertical : rien à convertir.
      if (deck.scrollWidth <= deck.clientWidth) return;

      const target = event.target instanceof Element ? event.target : null;
      const slide = target?.closest<HTMLElement>('.slide');

      const isDescended = slide ? slide.scrollTop >= slide.clientHeight / 2 : false;
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);

      // Verrou d'axe : une fois engagé en descente, la composante horizontale
      // d'un geste diagonal de trackpad est annulée pour que la page ne parte
      // pas en biais.
      if (isDescended && isHorizontalGesture) {
        event.preventDefault();
        return;
      }

      if (isDescended) return;

      // Le chapitre a de la profondeur : la molette doit pouvoir y descendre,
      // sans quoi le contenu vertical devient inatteignable à la souris.
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

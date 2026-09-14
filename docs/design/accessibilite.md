# Accessibilité — le plancher

Ce qu'aucune modification ne descend en dessous.

- **Contraste** : voir le tableau mesuré dans [vocabulaire.md](./vocabulaire.md#contrastes-mesurés-sur-bg).
  `ink-3` est réservé aux métadonnées, aux libellés du rail et au texte raturé.
- **L'information n'est jamais portée par la couleur seule** — d'où le filet tireté sur `en chantier`,
  la rature sur les options écartées, et le libellé `NON TRANCHÉ`.
- **Focus visible partout** : `outline` jade de 2 px, décalé de 3 px.
- **Le rail est fait de vrais liens.** Flèches gauche/droite fonctionnelles.
- **Le parcours horizontal repose sur `scroll-snap`.** Une seule conversion de molette est admise, et
  elle est bornée — voir ci-dessous.
- **Sous 768 px, le parcours se replie en un axe vertical unique.** Deux axes tactiles se combattent.

## La molette — l'unique exception admise

Une souris ne produit que du `deltaY`. Sans conversion, le parcours horizontal est simplement
inatteignable avec elle : c'est un défaut d'accessibilité, pas une préférence.

La règle « ne jamais détourner la molette » visait le détournement du prototype — index calculé,
`scrollTo` vers un chapitre, verrou de 500 ms. Ce qui est admis est strictement plus étroit :

- **c'est la profondeur du chapitre qui arbitre, pas le matériel.** `deltaMode` ne sait pas séparer
  souris et trackpad : macOS normalise les deux en pixels, et `DOM_DELTA_LINE` n'apparaît jamais. Un
  chapitre sans profondeur convertit une molette verticale en traversée ; un chapitre à contenu
  défilant la laisse descendre, et le parcours reprend par chaînage une fois le bas atteint ;
- la conversion est **proportionnelle** (`deck.scrollBy({ left: deltaY * 32 })`) : aucun index
  calculé, aucun chapitre visé, aucun verrou temporel ;
- **`scroll-snap` décide seul** où le défilement se pose ;
- elle ne s'applique qu'au niveau supérieur : une fois le lecteur descendu de plus d'une demi-fenêtre
  dans un chapitre, la molette redevient purement verticale.

**Toute modification qui réintroduit un index calculé ou un `scrollTo` vers un chapitre sort de
l'exception et retombe sous l'interdiction**
(→ [0004](../decisions/0004-conversion-d-axe-de-la-molette.md)).

## Le verrouillage d'axe

Les trackpads produisent des deltas diagonaux. Dès que le lecteur est descendu dans un chapitre, la
composante horizontale du geste est annulée.

Le script **n'intercepte jamais la composante verticale et ne déclenche aucune navigation** :
`scroll-snap` pilote seul, il n'y a ni `scrollTo` scripté ni index calculé.

## Ce que le mouvement doit garantir

`prefers-reduced-motion` est honoré partout. L'unique animation d'ambiance du site — l'indice de
défilement — est conçue pour que sa neutralisation laisse un état lisible et non un état figé à
mi-course (→ [vocabulaire.md](./vocabulaire.md#mouvement)).

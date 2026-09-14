---
statut : accepté · précisé par 0011
date : 2026-08-24
type : Design
---

# Conversion d'axe de la molette, arbitrée par la profondeur du chapitre

## Contexte

La règle de design interdisait tout détournement de la molette. Mais une souris ne produit que du
`deltaY` : sans conversion, le parcours horizontal est simplement inatteignable avec elle. C'est un
défaut d'accessibilité, pas une préférence.

Ce qui pousse la décision : la règle visait le détournement du prototype — index calculé, `scrollTo`
vers un chapitre, verrou de 500 ms — et le contenu vertical des chapitres projet doit rester
atteignable à la souris.

## Options envisagées

- **Ne rien convertir** — `scroll-snap` seul. Conforme à la lettre, mais le parcours devient
  inatteignable à la souris. Écarté.
- **Chaînage de scroll natif** (en levant `overscroll-behavior`) — élégant en théorie, mais
  insuffisant : le contenu vertical d'un chapitre capture le geste.
- **Distinguer souris et trackpad par `deltaMode`** — testé et **écarté** : macOS normalise les deux
  en pixels, `DOM_DELTA_LINE` n'apparaît jamais. Le gestionnaire ne se déclenchait tout simplement
  pas.
- **Arbitrer par la profondeur du chapitre** — un chapitre sans contenu vertical convertit, un
  chapitre qui en a laisse la molette descendre.

## Décision

Option retenue : « arbitrer par la profondeur du chapitre ».

Un critère de contenu plutôt que de matériel, donc indépendant des particularités de plateforme. La
conversion est proportionnelle : aucun index calculé, aucun chapitre visé, aucun verrou.
`scroll-snap` décide seul où le défilement se pose.

### Conséquences

- Bon, parce que le parcours redevient utilisable à la souris sans réintroduire le détournement.
- Bon, parce que le trackpad garde son comportement natif, et le verrouillage d'axe diagonal empêche
  la page de dériver latéralement pendant une descente.
- Mauvais, parce que sortir d'un chapitre projet à la molette impose d'atteindre le bas ou d'utiliser
  le rail. L'affordance de descente reste à recâbler — faite par
  [0011](./0011-chapitres-projet-en-panneaux-aimantes.md).

## Pour aller plus loin

Toute modification qui réintroduit un index calculé ou un `scrollTo` vers un chapitre sort de
l'exception et retombe sous l'interdiction. État courant :
[`design/accessibilite.md`](../design/accessibilite.md).

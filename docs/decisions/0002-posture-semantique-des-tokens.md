---
statut : accepté · précisé par 0013
date : 2026-08-22
type : Design
---

# Posture sémantique des tokens

## Contexte

Le prototype n'avait pas de tokens : sept identités chromatiques codées en dur dans le CSS global,
une trentaine de `rgb(255 255 255 / x%)` à douze opacités non nommées, et des `clamp()`
typographiques inventés au cas par cas.

`atomic-design.md` §4 exige un choix explicite entre deux postures. Deux données le contraignent :
une palette neutre sans identité chromatique distinctive — le fond est muet et toute la chaleur passe
par un accent unique — et un thème sombre unique, sans variante claire prévue.

## Options envisagées

- **Posture A, noms de marque** — le token *est* l'identité (`bg-jade`). Convient à une marque forte.
  Ici il n'y a pas de marque chromatique à nommer : le fond est neutre par principe.
- **Posture B, sémantique** — vocabulaire d'usage (`bg`, `surface`, `ink`, `line`, `accent`).

## Décision

Option retenue : « posture B ».

Le critère de bascule d'`atomic-design.md` §4 est rempli par « palette neutre sans identité
distinctive ». Source unique : `src/styles/theme.css`.

### Conséquences

- Bon, parce qu'aucune valeur en dur ne survit dans un composant. Un composant qui réclame une
  couleur absente du thème signale un problème de design, pas un manque du thème.
- Bon, parce qu'un changement de thème resterait possible sans réécrire les composants.
- Mauvais, parce que `bg-surface` demande une résolution mentale que `bg-jade` ne demanderait pas.

## Pour aller plus loin

L'état courant est dans [`design/vocabulaire.md`](../design/vocabulaire.md), ratios de contraste
mesurés compris.

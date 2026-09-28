---
statut : accepté · corrigé par 0017
date : 2026-08-22
type : Design
---

# Le rail de navigation en liens plutôt qu'en boutons

## Contexte

La règle d'accessibilité exigeait initialement que le rail soit fait de vrais éléments `<button>`,
au motif de l'accessibilité au clavier.

## Options envisagées

- **`<button>` plus gestion clavier** — le clavier fonctionne, mais il faut réimplémenter ce que le
  navigateur donne déjà, et la position quitte l'URL.
- **`<a href="#id">`** — l'élément sémantiquement juste pour aller à une position dans le document.

## Décision

Option retenue : « `<a href="#id">` ».

Un bouton déclenche une action ; un lien mène quelque part. Ici, il mène quelque part.

### Conséquences

- Bon, parce que l'URL est partageable, le retour arrière fonctionne, le clic du milieu fonctionne,
  et le clavier fonctionne sans une ligne de code.
- Bon, parce que les flèches gauche/droite se superposent sans rien remplacer.
- Mauvais, parce que l'état visuel doit vivre sur le `<li>` plutôt que sur le `<a>` : le connecteur
  d'une étape à la suivante ne voit `:last-child` que depuis l'élément de liste.

## Pour aller plus loin

Le nombre d'étapes n'est jamais codé en dur : le rail se dérive du parcours, lui-même dérivé du
contenu. État courant : [`design/composants.md`](../design/composants.md).

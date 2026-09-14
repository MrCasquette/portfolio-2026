---
statut : accepté
date : 2026-08-26
type : Design
---

# Fond opaque plutôt que `backdrop-filter` sur l'en-tête et le rail

## Contexte

L'en-tête et le rail étaient translucides avec `backdrop-blur`, hérité du prototype où le fond était
un dégradé saturé qu'il fallait adoucir.

Un décalage tonal visible séparait ces deux bandes du reste de la page, alors que l'arithmétique dit
qu'il ne devrait pas y en avoir : `bg-bg/92` compose `--color-bg` à 92 % par-dessus `--color-bg`, ce
qui rend exactement `--color-bg`.

Ce qui pousse la décision : le fond du site est désormais un neutre plat — **il n'y a rien à
flouter** — et `backdrop-filter` force l'élément dans sa propre couche de composition, la conversion
d'espace colorimétrique à la recomposition produisant un décalage visible sous Chromium.

## Options envisagées

- **Garder le flou et contourner l'artefact** — corrige un symptôme sans traiter la cause, et
  conserve un effet qui ne sert à rien.
- **Fond opaque, pas de `backdrop-filter`**.

## Décision

Option retenue : « fond opaque, pas de `backdrop-filter` ».

### Conséquences

- Bon, parce que l'artefact disparaît, et que le contenu qui défile dessous est proprement masqué au
  lieu d'être vaguement deviné.
- Bon, parce que c'est une couche de composition en moins.
- Mauvais, parce que le rail a perdu sa bordure haute au passage — assumé : elle doublait le filet du
  connecteur et concurrençait le chemin. L'en-tête garde la sienne : il surplombe le contenu, là où le
  rail siège dedans.

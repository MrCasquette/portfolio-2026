---
statut : accepté
date : 2026-09-14
type : Méthode
---

# La documentation passe au français

## Contexte

La documentation de ce dépôt était en anglais, par une règle de `conventions.md` qui rangeait ensemble
le code, ses commentaires, la documentation et les noms de fichiers. Deux documents y échappaient :
le positionnement et le document de cadrage, écrits en français parce qu'ils raisonnent sur une copie
de site française et qu'ils sont de l'écriture d'auteur.

Cette exception n'était pas une négligence, c'était le symptôme. La documentation de ce projet
argumente **sur du texte français** : elle cite des libellés, des mots bannis, des états (`en
production`, `en chantier`, `NON TRANCHÉ`), et des formulations dont le poids est l'objet même de
l'arbitrage. Raisonner en anglais sur une phrase française ajoute une traduction à chaque citation.

## Options envisagées

- **Tout en anglais** — le statu quo, cohérent avec le code. Il faut alors traduire le positionnement,
  et accepter qu'un document argumentant sur le choix entre « polyvalent » et rien du tout s'écrive
  dans une autre langue que celle du choix.
- **Anglais technique, français éditorial** — chaque nature dans la langue de son objet. Écarté : la
  frontière passe entre deux fichiers voisins, et une frontière qu'on doit se rappeler à chaque
  écriture est une frontière qui cède. Elle produit aussi des décisions bilingues, puisqu'une décision
  de design cite du contenu.
- **Tout en français, code excepté** — une langue par surface, et la surface est facile à nommer :
  `src/` ou le reste.

## Décision

Option retenue : **la documentation s'écrit en français, titres et noms de fichiers compris.**

La frontière est le dossier. Le **code, ses commentaires et les noms de fichiers de `src/`** restent
en anglais — c'est la convention d'`atelier` et celle de la profession, et les identifiants se citent
dans les deux langues sans friction. Les messages de commit sont en français, comme ils l'étaient
déjà en pratique.

Ce qui reste en anglais dans `docs/` : les identifiants de code, les noms de fichiers de `src/`, les
noms de tokens, les propriétés CSS. Tout ce qui est cité, jamais ce qui est dit.

### Conséquences

- Bon, parce que la documentation et son objet sont dans la même langue. Une décision sur un mot
  banni cite le mot sans le traduire.
- Bon, parce que la règle est mécanique — `src/` ou pas — au lieu de dépendre de la nature du
  document.
- Bon, parce que l'auteur écrit dans sa langue. Ce corpus est long, il s'écrit sous fatigue, et la
  finesse d'un argument est ce qui se perd en premier dans une langue seconde.
- Mauvais, parce que les commentaires de code, restés en anglais, citent des chemins de documents
  français. C'est assumé : un chemin est un identifiant, pas une phrase.
- Mauvais, parce que le corpus existant a dû être traduit en une fois — douze décisions et quatre
  documents de référence. Une traduction est une réécriture, et une réécriture d'un journal frôle
  l'interdit de l'amender. Elle est acceptée parce qu'elle ne change aucune affirmation, et elle ne se
  refera pas.

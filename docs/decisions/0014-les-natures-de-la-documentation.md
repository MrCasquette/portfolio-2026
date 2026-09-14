---
statut : accepté · précise 0001
date : 2026-09-14
type : Méthode
---

# La documentation a des natures, et un dossier se mérite

## Contexte

[0001](./0001-consigner-les-decisions-en-madr.md) a sorti les arbitrages de `DESIGN.md` et les a mis
au journal. Il notait en conséquence que `conventions.md` recouvrait désormais partiellement ce
dossier, « à fusionner ». Ça n'a pas été fait, et le recouvrement s'est étendu.

L'état constaté : `DESIGN.md` portait des règles en vigueur (§1 à §7), un journal d'options écartées
(§8) et un backlog (§9) dans un seul fichier de 454 lignes. `CONCEPT.md` redisait la thèse que
`DESIGN.md` §1 énonce, et `POSITIONNEMENT.md` la redisait une troisième fois, plus longuement.
`JOURNEY-MAP.md` décrivait la mécanique du parcours et désignait comme source de vérité
`src/data/journey.ts`, **supprimé** depuis. `SCRATCHPAD.md` affirmait encore des choses tranchées
contre lui.

Aucun de ces documents n'était faux par négligence. Ils étaient faux parce que rien ne disait **où**
une chose s'écrit, donc chaque chose s'écrivait là où on se trouvait.

## Options envisagées

- **Une hiérarchie de documents**, `DESIGN.md` primant sur `CONCEPT.md`, celui-ci primant sur le
  reste. C'est ce qui existait. Écarté par l'observation : une règle de préséance ne dit pas où
  écrire, seulement qui gagne quand deux documents se contredisent. Elle **organise la divergence au
  lieu de l'empêcher**.
- **Un document unique**, tout dans un seul fichier. Écarté : c'est l'état d'où l'on vient, à 454
  lignes, et il ne distingue pas ce qui se réécrit de ce qui ne se réécrit jamais.
- **Découper par sujet** — un fichier par composant, un par couleur, un par mécanique. Écarté : le
  sujet n'est pas ce qui décide de la durée de vie d'une phrase. Deux phrases sur le rail, l'une règle
  et l'autre histoire, n'ont pas le même sort.
- **Découper par nature** — reprendre la méthode de documentation d'`atelier`, en la ramenant à ce
  qu'un front qui consomme du contenu a réellement.

## Décision

Option retenue : découper par nature, et **ne créer un dossier que quand la navigation le réclame**.

Une nature répond à une question et se réécrit — ou ne se réécrit jamais. C'est cette propriété, pas
le sujet, qui décide où une phrase va vivre. La méthode complète est dans
[`docs/README.md`](../README.md) ; ce qui relève de la décision est ce qui suit.

**Deux natures sont ajoutées à celles d'`atelier`**, parce que le produit est une surface de lecture
et non une plateforme :

- **design** — ce que l'interface doit respecter. Ça se dément par une capture d'écran.
- **éditorial** — ce que le site doit prouver, et comment ça s'écrit. Ça se dément par une relecture
  du contenu.

**Trois natures d'`atelier` sont écartées**, faute d'objet ici : `specifications` (rien ne se
garantit à un appelant, il n'y a pas d'appelant), `incidents` (rien ne tourne), `roadmap` (rien n'est
promis à un client). Elles ne sont pas nommées : une nature qu'on nomme sans objet est une case vide
qui invite à la remplir.

**`operations` est nommée sans dossier.** Le site n'est pas déployé ; écrire d'avance une procédure
jamais exécutée produirait de la fiction. La nature naît à sa première page.

**Le backlog est un fichier, pas un dossier.** Un dossier par périmètre ne range rien quand il y a un
périmètre.

**Rien ne garde la méthode, et rien ne la gardera.** `atelier` a un `docs-guard` qui refuse un lien
mort, un chemin inexistant, un statut hors vocabulaire — et il le doit à sa charge : deux produits,
des paquets publiés, des surfaces versionnées, un corpus de décisions qu'aucune relecture n'embrasse
plus. Ici, un front mono-auteur, une poignée de documents, un seul périmètre. Une garde y coûterait
son écriture et son entretien pour refuser ce qu'une relecture voit. **La charge décide de
l'outillage** : reprendre la méthode d'un monorepo n'oblige pas à en reprendre la machinerie.

### Conséquences

- Bon, parce que la question « où j'écris ça ? » a une réponse mécanique, et qu'une réponse mécanique
  se tient sous fatigue.
- Bon, parce que ce qui ne se réécrit jamais est physiquement séparé de ce qui se réécrit. Un support
  de référence peut être remplacé en entier sans perdre d'histoire.
- Bon, parce que les points ouverts cessent d'être une section d'un document de règles. Ils ont un
  support qui les emporte à leur clôture.
- Mauvais, parce que le nombre de fichiers augmente, et qu'un lecteur qui cherchait tout dans
  `DESIGN.md` doit apprendre une carte. Le [README de méthode](../README.md) est cette carte, et c'est
  sa seule raison d'exister.
- Mauvais, parce qu'une dérive ne se signale pas d'elle-même : elle se découvre à la lecture, donc
  tard. C'est ce qui est arrivé à `JOURNEY-MAP.md`, qui a désigné un fichier supprimé pendant
  plusieurs commits. Assumé — c'est le prix de l'absence de garde, et il se paie en relecture, pas en
  code.

## Pour aller plus loin

La méthode est reprise de `docs-internal/README.md` d'`atelier`, dont ce dépôt est un consommateur
([0012](./0012-le-contenu-declare-avec-atelier.md)). Elle en garde le vocabulaire — nature, journal,
support de référence, verrou — parce qu'un même auteur travaillant sur les deux dépôts paie autrement
une traduction à chaque passage.

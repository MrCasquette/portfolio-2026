---
statut : accepté · précise 0004
date : 2026-08-26
type : Design
---

# Les chapitres projet comme colonne de panneaux aimantés

## Contexte

Un chapitre projet porte plus qu'un écran : une introduction, un registre d'arbitrages, une chronique
d'incident, un extrait de code. Le parcours horizontal est le survol ; ceci est la profondeur. La
question est quelle physique obéit cet axe vertical, et à quel grain le contenu est découpé.

## Options envisagées

### Comment la colonne défile

- **Défilement fluide**, comme du contenu de page ordinaire. Écarté : le contenu n'est pas de la
  prose continue mais une série d'artefacts clos, et le défilement fluide met deux artefacts sans
  rapport dans la même vue, laissant au lecteur le soin de deviner où l'un finit. Il donnerait aussi à
  l'axe vertical une physique différente de l'horizontal, qui est aimanté — deux surfaces au lieu
  d'une grammaire.
- **`scroll-snap-type: y mandatory` avec `scroll-snap-stop: always`.** Un geste, une unité. `always`
  interdit de sauter un panneau, ce qui est tout l'intérêt de donner un écran à chaque arbitrage.

### À quel grain

- **Un panneau par bloc** — le registre entier sur un écran. Lus trois à la fois, les arbitrages
  forment un tableau.
- **Un panneau par arbitrage.** Lu un écran à la fois, c'est un argument. Le lecteur ne peut pas
  survoler un arbitrage sans l'avoir traversé.

### Comment la descente commence

- **Une molette verticale descend.** Écarté : une souris ne produit que du `deltaY`, déjà converti en
  déplacement horizontal ([0004](./0004-conversion-d-axe-de-la-molette.md)). Si la profondeur
  l'avalait, aucune souris ne passerait le premier projet.
- **Un lien.** La descente est délibérée : en haut d'une colonne, la molette traverse encore le
  parcours, et descendre passe par `Explorer ↓`.

## Décision

Panneaux aimantés, au grain de l'arbitrage, entrés par un lien.

Cela porte un invariant : **un panneau tient dans un écran**. Un aimantage `mandatory` transforme un
panneau plus haut que la fenêtre en contenu partiellement inatteignable, et qui lutte contre
l'aimantage. Quand un bloc dépasse l'écran, il est coupé en deux panneaux — jamais rendu au
défilement fluide.

Trois conséquences mécaniques ont été payées en chemin :

- `scroll-behavior: smooth` n'est **pas** posé sur la colonne. Il s'applique aussi au défilement
  utilisateur, donc chaque cran de molette lançait une animation que le cran suivant relançait, et la
  colonne semblait coincée. Les liens de descente adoucissent leur propre saut, ce qui est un lien
  faisant son travail de lien, pas un détournement.
- La molette est amplifiée dans la colonne du même facteur que sur le parcours. Le défilement natif
  sous un aimantage `mandatory` doit traverser un demi-panneau avant de basculer, ce qui prend
  plusieurs crans, là où le parcours bascule au premier. Même aimantage, deux physiques — et c'est
  l'axe le plus lourd qui se lit comme cassé.
- La barre de défilement native est masquée et remplacée par un indicateur flottant. Une barre
  verticale sur le premier écran contredit la continuité horizontale que le chemin installe, mais une
  vraie barre occupe la mise en page, donc la révéler à la descente décalait le contenu latéralement.
  Un élément fixe ne coûte rien et peut apparaître librement.

### Conséquences

- Bon, parce que chaque arbitrage est un arrêt, et que le rythme est prévisible : un geste, une
  unité, sur les deux axes.
- Bon, parce que les panneaux se dérivent de ce qu'un projet porte : un projet sans incident n'a ni
  écran vide ni lien mort.
- Mauvais, parce que l'invariant « un panneau, un écran » n'est vérifié nulle part. C'est une règle
  d'écriture, et rien n'échoue bruyamment quand le contenu la casse.
- Mauvais, parce que la descente dépend d'un lien. Elle est signalée par le chemin tourné à la
  verticale : un filet longeant la colonne de lecture, couvrant le chapitre et coupé par son bord
  inférieur. Une icône de molette animée a été écartée — elle inviterait à un geste qui, en haut d'une
  colonne, fait l'inverse de ce qu'elle montre. Une première tentative de moignon court sous le lien a
  échoué pour une autre raison : un filet qui commence et finit en l'air ne se lit ni comme un chemin
  ni comme une flèche.

## Pour aller plus loin

Une ancre doit viser un nœud **à l'intérieur** du conteneur de défilement. Pointer le lien de retour
sur la `<section>` du chapitre ne faisait rien d'utile : le navigateur déplaçait le rail horizontal
pour l'amener dans la vue au lieu de remonter la colonne. Le panneau d'introduction porte son propre
identifiant pour cela.

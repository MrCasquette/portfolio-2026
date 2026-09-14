---
statut : accepté · corrigé par 0010
date : 2026-08-26
type : Design
---

# Le chemin : matérialiser l'axe horizontal par un filet continu

## Contexte

Le chapitre d'accueil se lisait comme un hero classique privé de son illustration, et rien
n'annonçait le paradigme de navigation horizontale. Le rail et une flèche sont des signes qu'il faut
décoder ; ce qui manquait était un indice **pré-attentif** — perçu avant toute décision de lire.

Ce qui pousse la décision : le coût de l'échec est total — un lecteur qui ne découvre pas l'axe
horizontal s'en va — et la règle de design interdit la décoration, donc l'indice doit sortir de la
composition.

## Options envisagées

- **Débord de page** — laisser le chapitre suivant dépasser du bord droit. L'indice le plus fort, et
  la réponse réflexe. **Écarté** : il oblige à renoncer au dimensionnement exact à 100 %, dégrade la
  précision de `scroll-snap`, impose de mesurer une diapositive pour le soulignement du rail, et un
  écran voisin à moitié visible est franchement laid.
- **La flèche seule** — insuffisante : elle est symbolique, donc pas pré-attentive.
- **Couper quelque chose *dans* la page** — l'indice n'exige pas que la *page* soit coupée, seulement
  que *quelque chose* le soit. Un filet horizontal qui traverse le bord droit produit la même coupure
  nette pour le prix d'une classe.

## Décision

Option retenue : « couper quelque chose dans la page », développée en un chemin continu qui traverse
les chapitres de survol.

- **Un segment par chapitre** plutôt qu'un élément unique couvrant le parcours : les chapitres sont
  contigus, les segments se rejoignent, et rien n'a besoin de connaître la longueur du parcours.
- **Peint sous la colonne de lecture** : les éléments à fond opaque l'interrompent d'eux-mêmes. Le
  `———| encadré |———` tombe de l'ordre de peinture, sans découpe à écrire.
- **Il naît, il tient, il meurt** au premier projet — là où l'axe vertical prend le relais. Sa mort
  déborde sur le projet : un filet s'arrêtant au bord du chapitre Réalisations rendrait le joint de
  page visible et se lirait comme la fin du site.
- **Absent sous 768 px**, où le parcours se replie en défilement vertical : il n'y a plus d'axe
  horizontal à tenir.

### Conséquences

- Bon, parce que l'axe horizontal est signalé sans une phrase et sans décoration.
- Bon, parce que le chemin devient l'horizon de la composition. Le bloc d'accueil s'y ancre au lieu
  d'être centré.
- Mauvais, parce que chaque chapitre de survol doit porter un élément encadré à sa hauteur, sinon la
  ligne traverse une page nue.
- Mauvais, parce que `--spacing-path` a d'abord été une valeur approchée unique : les chapitres étant
  centrés verticalement, le fait que les encadrés croisent la ligne était une coïncidence qui bougeait
  avec le contenu. Corrigé par [0010](./0010-ancrer-les-chapitres-de-survol-sur-le-chemin.md).

## Pour aller plus loin

Un élément positionné peint au-dessus de tout ce qui ne l'est pas, quel que soit l'ordre du document :
`.slide-content` porte un `z-index` explicite, sans quoi le chemin passerait devant le contenu.

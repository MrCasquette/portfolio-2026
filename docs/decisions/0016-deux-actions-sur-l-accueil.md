---
statut : accepté · corrige 0007
date : 2026-09-15
type : Design
---

# Deux actions sur l'accueil, et le nom qui manquait

## Contexte

L'accueil ne nommait pas Vincent. [0007](./0007-en-tete-differe.md) avait pourtant posé cette
contrainte en conséquence explicite — l'en-tête n'apparaissant qu'au deuxième chapitre, rien d'autre
ne le nomme sur le premier écran — mais le contrat de contenu n'avait aucun champ pour cela. La
contrainte était écrite et rien ne la portait, donc le nom avait migré dans le titre, où il partageait
une phrase avec une affirmation.

L'accueil n'offrait par ailleurs aucun point d'entrée. La règle en vigueur l'interdisait : *« Aucun
appel à l'action. Le rail assure déjà la navigation ; un bouton doublerait la fonction et ramènerait
du vocabulaire de page produit. »*

Cette règle raisonnait sur la navigation, et elle a raison sur ce terrain : le rail va partout, un
bouton qui mène au chapitre suivant ne fait rien de plus. Mais elle traite un bouton comme un
doublon de navigation, alors que ce que le lecteur cherche sur un accueil n'est pas un déplacement :
c'est **savoir quoi faire de ce site**. Le rail nomme des chapitres ; il ne dit pas lequel répond à la
question qu'on se pose en arrivant.

## Options envisagées

- **Tenir la règle.** Le rail suffit, l'accueil ne propose rien. Cohérent, et c'est l'état d'où l'on
  vient. Écarté : le lecteur visé arrive par un lien de candidature, pas par curiosité, et il a deux
  intentions précises — voir les preuves, ou prendre contact. Ne pas les nommer lui fait deviner.
- **Un seul bouton.** Moins de vocabulaire de page produit. Écarté : un bouton unique impose son
  intention, et les deux intentions n'ont pas le même moment — l'une avant les preuves, l'autre
  après.
- **Trois ou plus.** Écarté sans hésiter : au-delà de deux, c'est un menu, et le rail en est déjà un.
- **Deux actions, dont une seule pleine.**

## Décision

Option retenue : **deux actions, dont une seule pleine**, et un champ de nom propre.

- `name` et `role` remplacent `title` et `identification`. Le nom est un champ, pas un fragment de
  phrase. `role` est le texte riche : c'est là que tombe le seul mot accentué du site, par la
  directive `:highlight[…]` — l'exception assumée de
  [0013](./0013-le-registre-visuel-jade-sur-neutre.md) ne bouge pas, elle change seulement de champ.
- `actions` est une liste bornée à **exactement deux**. C'est une contrainte de composition, pas une
  limite : la déclaration refuse une troisième action au lieu de compter sur la discipline.
- La déclaration reste **générique** — un libellé, une destination. Ce que les boutons font se décide
  dans le contenu, sans rouvrir la déclaration.
- **Une seule est pleine.** La paire se lit comme une hiérarchie, pas comme un choix à faire. L'accent
  n'y est pas dépensé : le jade signale déjà les liens, et ce sont des liens.
- La destination est close par liste blanche — une ancre, un fichier de ce site, une adresse `https`
  ou `mailto`.

### Conséquences

- Bon, parce que la contrainte de [0007](./0007-en-tete-differe.md) est désormais **portée par le
  contrat** au lieu d'être une phrase dans une décision. Un accueil sans nom ne construit plus.
- Bon, parce que `identification` disparaît. Il portait un intitulé de poste en prose tout en se
  déclarant « délibérément au second rang » : deux rôles pour un champ.
- Bon, parce que la liste blanche de schémas ferme une injection d'une ligne de YAML. `z.url()`
  accepte `javascript:` — il parse, donc c'est une URL — et cette valeur atterrit dans un `href` que
  rien n'assainit en chemin, contrairement aux liens de prose qui passent par `safeUrl`.
- Mauvais, parce que la règle « aucun appel à l'action » tombe, et avec elle une partie de ce qui
  tenait l'accueil à distance du vocabulaire de page produit. Ce qui la remplace est plus faible :
  deux maximum, une seule pleine, aucun verbe de conversion. C'est une discipline d'écriture, et seul
  le compte est vérifié.
- Mauvais, parce que l'accueil porte maintenant cinq masses — nom, intitulé, chapô, pastille,
  actions — là où la composition en tenait deux. Le vide entre les deux colonnes reste un élément de
  composition, et il se défendra moins facilement.

## Pour aller plus loin

L'état courant est dans [`design/composants.md`](../design/composants.md#chapitre-daccueil).

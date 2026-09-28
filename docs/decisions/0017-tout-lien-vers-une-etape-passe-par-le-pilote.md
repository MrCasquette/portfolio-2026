---
statut : accepté · corrige 0005
date : 2026-09-15
type : Architecture
---

# Tout lien vers une étape passe par le pilote

## Contexte

Les deux actions ajoutées sur l'accueil ([0016](./0016-deux-actions-sur-l-accueil.md)) pointaient
`#index` et `#contact`, exactement comme les liens du rail. Elles ne naviguaient pas : elles figeaient
le parcours.

La cause n'est pas dans le lien, elle est dans la structure. Une cellule est posée à
`top: row × 100%; left: col × 100%` dans `.journey-grid`, elle-même dans `.view`, qui est
`position: fixed` et ne défile pas — c'est la grille qu'on translate, pilotée par `window.scrollY`.
Une cellule vit donc **loin hors de la boîte visible**, et le navigateur, sommé d'amener une ancre
dans la vue, fait la seule chose qu'il sache faire : il défile l'ancêtre défilable le plus proche.

`.view` était `overflow: hidden`. Or **un conteneur `overflow: hidden` reste défilable par
programme** — il ne montre pas de barre, il n'en est pas moins un conteneur de défilement. Le
navigateur le décalait donc, et l'y laissait, pendant que `window.scrollY` — seul pilote de la
translation — n'avait pas bougé d'un pixel. Les deux ne s'accordaient plus, et tout mouvement
ultérieur repartait d'un décalage que rien ne lisait.

Le rail y échappait sans le savoir : un écouteur posé sur chacun de ses liens appelait
`preventDefault()` et défilait le pilote. Son `href` n'était jamais suivi. Ce qui protégeait le rail
ne protégeait que lui, et le premier lien écrit ailleurs tombait dans le piège — la carte de projet
(« Voir le détail → ») l'avait d'ailleurs déjà fait, sans que personne le remarque.

## Options envisagées

- **Rendre les cellules atteignables nativement.** Il faudrait que la position d'une cellule soit un
  décalage de défilement réel, donc renoncer à la grille translatée. C'est renoncer au mécanisme
  entier du serpentin ([`architecture/parcours.md`](../architecture/parcours.md)) pour faire marcher
  une ancre.
- **Poser un écouteur sur chaque lien concerné**, comme le rail le faisait. Écarté : ça marche jusqu'au
  prochain lien écrit dans un composant qui ignore tout de cette mécanique. Le défaut est silencieux,
  et il se découvre à l'usage — c'est précisément ce qui vient d'arriver.
- **`scroll-margin` ou `scroll-padding`** sur les cellules. Ne traite rien : le problème n'est pas
  *où* la cellule arrive, c'est *quel élément* le navigateur décale pour l'y amener.
- **Intercepter au document, et fermer le piège au CSS.**

## Décision

Option retenue : les deux, parce qu'elles ne répondent pas à la même question.

- **`.view` passe de `overflow: hidden` à `overflow: clip`.** `clip` ne crée aucun conteneur de
  défilement — le navigateur n'a plus rien à décaler, même par programme. Le piège n'est plus évité,
  il n'existe plus. Une ligne de CSS pour une classe entière de défauts.
- **Un seul écouteur délégué, sur le document**, traite tout lien interne dont le fragment nomme une
  cellule, **le rail compris**. Un lien écrit plus tard dans n'importe quel composant est porté sans
  avoir à connaître quoi que ce soit de tout ceci. L'écouteur par lien du rail disparaît.
- **Le `href` reste la vérité de la destination.** Il n'est pas décoratif : il porte le clavier, le
  clic du milieu, l'ouverture dans un onglet, et il survit à l'absence de script.

Ce qui a été réparé au passage : la délégation **écrit le fragment dans l'URL** (`pushState`), le
retour arrière y ramène (`popstate`), et un lien profond ouvre sur son étape. Les trois manquaient.

### Conséquences

- Bon, parce que la promesse de [0005](./0005-le-rail-en-liens-plutot-qu-en-boutons.md) devient
  vraie. Elle annonçait « l'URL est partageable, le retour arrière fonctionne » — or le rail appelait
  `preventDefault()` sans jamais écrire le fragment, donc l'URL ne bougeait pas, le retour arrière ne
  revenait nulle part, et `/#contact` n'ouvrait pas sur le contact. La décision était juste, son
  implémentation ne l'a jamais tenue.
- Bon, parce que la carte de projet est réparée sans avoir été touchée, et qu'elle portait le même
  défaut depuis qu'elle existe.
- Bon, parce qu'un lien interne redevient une chose ordinaire à écrire.
- Mauvais, parce qu'un écouteur délégué est un endroit de plus où un clic peut être annulé, et qu'il
  est invisible depuis le composant qui écrit le lien. Il ne se déclenche que si le fragment nomme une
  cellule, et il respecte `defaultPrevented`, les clics modifiés et le clic du milieu — mais c'est une
  discipline du gestionnaire, pas une garantie du système.
- Mauvais, parce que `overflow: clip` demande Safari 16. Le parcours en demandait déjà autant par
  ailleurs, donc rien de neuf n'est exclu.

## Pour aller plus loin

Le même piège avait déjà été rencontré un cran plus bas, à l'intérieur d'un chapitre projet
([0011](./0011-chapitres-projet-en-panneaux-aimantes.md)) : une ancre doit viser un nœud *à
l'intérieur* du conteneur de défilement. C'est le même fait sous un autre angle — une ancre ne va
jamais qu'où un conteneur défilable peut la porter.

# Composants

**À lire avant de créer ou de modifier un composant.** Ce qui vaut pour tous — couleur, graisse,
mouvement — est dans [vocabulaire.md](./vocabulaire.md). La mécanique qui produit tout cela est dans
[`architecture/parcours.md`](../architecture/parcours.md).

## Registre d'arbitrages

C'est le composant central du site. Il porte la singularité du portfolio à lui seul, et il n'est pas
décoratif : il remplace la description de projet conventionnelle.

Il est aussi la réalisation de la lecture parallèle : deux colonnes, une tension, une justification
qui les relie. La colonne « Retenu » et la décision technique relèvent de *Construire* ; la
justification est l'artefact de *Coordonner*. Ni l'un ni l'autre mot n'apparaît à l'écran
(→ [0003](../decisions/0003-le-registre-remplace-la-lecture-parallele-nommee.md)).

Structure : deux colonnes (`Retenu` / `Écarté`), puis une rangée de justification pleine largeur.

```
┌─ RETENU ───────────────────┬─ ÉCARTÉ ────────────────────┐
│ ● Serveur dédié bare metal │ ~~Infrastructure managée~~  │
├────────────────────────────┴─────────────────────────────┤
│ │ La charge est constante et le stockage dominant…       │
└──────────────────────────────────────────────────────────┘
```

- Colonne retenue : puce jade, `ink`, graisse 400.
- Colonne écartée : `ink-3`, graisse 300, `line-through` d'un pixel.
- Justification : `ink-2`, graisse 300, filet gauche de 2 px en `accent-line`.
- Sous 660 px les deux colonnes s'empilent ; l'écartée garde son retrait gauche.

### L'arbitrage non tranché

Une entrée peut porter une décision **non encore tranchée** — c'est ce qui donne sa valeur à la pièce
en chantier. C'est une **forme distincte**, pas une décision résolue à laquelle il manque un champ, et
le rendu doit le montrer :

- libellé mono pleine largeur `NON TRANCHÉ` ;
- **pas de puce jade** — rien n'est retenu, l'accent mentirait ;
- **pas de rature** — rien n'est écarté ;
- les deux options à poids égal, en `ink-2`, marquées d'un tiret neutre ;
- filet de justification en `line`, pas en `accent-line`.

Dans le modèle de contenu, c'est une union discriminée (`state: 'settled' | 'open'`), pas un champ
optionnel.

**Contrainte de contenu** : chaque entrée doit correspondre à un arbitrage réel. Un registre inventé
se sent immédiatement et détruit la crédibilité de l'ensemble
(→ [`editorial/regles-d-ecriture.md`](../editorial/regles-d-ecriture.md)).

## Chapitre d'accueil

Le hero est conçu pour un portfolio horizontal, pas comme un hero classique privé de son illustration.
Deux masses typographiques :

- **à gauche** : le titre, puis la pastille de disponibilité ;
- **à droite** : le chapô.

Le vide entre les deux masses est un élément de composition. Il ne doit pas être rempli, et surtout
pas par une illustration ou un aplat.

**Aucun appel à l'action.** Le rail assure déjà la navigation ; un bouton doublerait la fonction et
ramènerait du vocabulaire de page produit.

Le chapitre dépasse la colonne de lecture (`--slide-max`), sans quoi les deux masses se serrent et
l'écart cesse de se lire comme une intention.

Le bloc est **ancré sur le chemin** plutôt que centré dans le chapitre : la ligne est l'horizon de la
composition, et le titre se tient juste au-dessus. À la hauteur du chemin, la colonne gauche reste
vide — vide composé, pas trou.

**Le chapitre d'accueil doit nommer Vincent.** L'en-tête n'apparaît qu'ensuite
(→ [0007](../decisions/0007-en-tete-differe.md)) : sans cela, rien ne le nomme sur le premier écran.

## Pastilles d'état

Trois états, distingués par la forme autant que par la couleur, parce que l'accent ne doit signaler
que ce qui tourne :

| État | Traitement |
|---|---|
| `en production` | `accent` sur `accent-bg`, filet plein |
| `livré` | `ink-3`, filet plein |
| `en chantier` | `ink-2`, **filet tireté** |

## Chronique d'incident

Filet vertical en `line`, puces rondes. **Seule la première puce est accentuée.** Horodatages en mono.
Le dernier événement passe en `ink` — l'état courant — sans accent.

Optionnelle : tous les projets n'ont pas connu d'incident, et en fabriquer un tuerait la crédibilité
aussi sûrement qu'un registre inventé.

## Bloc de code

Fond `code`, filet `line`, légende mono avec la source à gauche et une mention à droite. Coloration
quasi monochrome : mots-clés en `code-key` à la **graisse 500** — la hiérarchie vient de la graisse —,
chaînes en `code-string`, valeurs en `code-value`, ponctuation et commentaires dans les gris.

La coloration est produite par Shiki avec un thème défini dans `src/styles/code-theme.ts`, dérivé des
tokens. **L'accent pur en est absent** : un extrait porte trop de chaînes pour que le jade y reste
rare. Le gras est réservé aux mots-clés, pas aux opérateurs.

Ne pas ajouter de couleur. Si un langage semble en réclamer une, c'est l'extrait qui est trop long,
pas le thème trop pauvre.

## Rail de navigation

Étapes en bas d'écran, puces jointes par un filet.
Franchies : `accent-line`. Courante : `accent` plein avec halo. À venir : `line`.
Libellés en `ink-3`, le courant en `ink` à la graisse 500.

Le soulignement du chapitre courant est **piloté par la position de défilement**, en valeur
fractionnaire, pas par un observateur d'intersection : un observateur est discret et n'émet rien pour
les chapitres traversés pendant un saut, donc la barre retarderait sur tout déplacement de plus d'un
chapitre.

Trois contraintes d'implémentation :

- **Ce sont des liens `<a href="#id">`, pas des boutons.** La position reste dans l'URL, partageable
  et restaurée au retour arrière ; le clavier, le clic du milieu et l'historique fonctionnent sans
  code. Les flèches gauche/droite se superposent
  (→ [0005](../decisions/0005-le-rail-en-liens-plutot-qu-en-boutons.md)).
- **Le nombre d'étapes n'est jamais codé en dur.** Le rail se dérive du parcours, lui-même dérivé du
  contenu.
- **Pas de bordure haute.** Elle doublait le filet du connecteur vingt pixels plus bas et
  concurrençait le chemin. Le rail est séparé par son seul fond opaque.

## En-tête

Il porte l'identité — le nom et la manière de travailler — et **n'apparaît qu'à partir du deuxième
chapitre**. Son rôle est de rappeler ; il n'a pas d'objet tant que le lecteur est sur le chapitre qui
porte cette identité. Fondu de 300 ms, `pointer-events: none` tant qu'il est masqué.

Contrairement au rail, l'en-tête garde sa bordure basse : il surplombe le contenu, là où le rail siège
dedans.

## Le chemin

Un filet d'un pixel à hauteur constante (`--spacing-path`) qui matérialise l'axe horizontal avant que
quoi que ce soit ait été lu. C'est l'indice pré-attentif du site.

Ce que le design exige de lui :

- **il naît, il tient, il meurt.** Fondu d'apparition sur l'accueil, plein sur Profil et Réalisations,
  et un court segment mourant sur le premier projet — là où l'axe vertical prend le relais. Sa mort
  déborde délibérément sur le projet : un filet s'arrêtant au bord de la page rendrait le joint
  visible et se lirait comme la fin du site ;
- **sa hauteur est une contrainte, pas un réglage.** `--spacing-path` se tient nettement sous le
  milieu. Un filet à 50 % coupe la page en deux et se lit comme un séparateur ; poussé vers le bas, il
  se lit comme un horizon, ce qui est ce qui en fait un chemin. **Le contenu s'adapte à la ligne,
  jamais l'inverse** ;
- **absent sous 768 px**, où le parcours se replie en défilement vertical ;
- **chaque chapitre de survol porte un élément encadré à sa hauteur**, sinon la ligne traverse une
  page nue. C'est ce que `.slide-on-path` garantit par construction
  (→ [0010](../decisions/0010-ancrer-les-chapitres-de-survol-sur-le-chemin.md)).

Comment il est produit — un segment par chapitre, peint sous la colonne de lecture, ancré par calcul —
est dans [`architecture/parcours.md`](../architecture/parcours.md).

## Profondeur d'un chapitre

Un chapitre projet n'est pas une page mais une colonne de panneaux pleine hauteur, parcourue
verticalement. Le parcours horizontal n'y voit toujours qu'un chapitre.

- **Un panneau par arbitrage.** Lus trois à la fois, les arbitrages forment un tableau ; lu un écran à
  la fois, c'est un argument. L'incident et l'extrait prennent un panneau chacun.
- **Un panneau tient dans un écran.** Un aimantage `mandatory` transforme tout ce qui dépasse en
  contenu partiellement inatteignable. Un bloc qui déborde est coupé en deux — jamais rendu au
  défilement fluide. C'est une règle d'écriture ; rien ne la vérifie.
- **La descente est délibérée.** En haut d'une colonne, la molette traverse encore le parcours ;
  descendre passe par `Explorer ↓`. Sans cette règle, une souris ne passerait jamais le premier
  projet, la profondeur avalant tout geste vertical.
- **La descente est signalée par le chemin, tourné à la verticale.** Même token, même grammaire, seule
  la direction change. Il obéit aux trois choses qui font lire l'horizontal comme un chemin : il
  couvre toute la dimension, il tient une position constante, et c'est le cadre qui le coupe — né en
  haut du chapitre, sortant par le bord inférieur là où le rail commence. Un filet qui finirait de
  lui-même dirait que l'axe s'arrête. Il longe la colonne de lecture, il ne passe pas derrière : un
  filet vertical traversant un paragraphe se verrait entre les lignes. Statique — une coupure dans la
  page est pré-attentive par sa forme, et la flèche d'accueil garde la rareté d'être le seul mouvement
  d'ambiance.

Les panneaux se dérivent de ce qu'un projet porte : pas d'incident, pas d'écran vide
(→ [0011](../decisions/0011-chapitres-projet-en-panneaux-aimantes.md)).

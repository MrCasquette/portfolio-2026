# Le parcours : sa forme, et ce qui défile

Ce que le parcours signifie est dans
[`editorial/positionnement.md`](../editorial/positionnement.md#le-principe-de-preuve) ; ce qu'il doit
respecter à l'écran est dans [`design/composants.md`](../design/composants.md). Cette page dit
comment il est produit.

Source de vérité : [`src/content/journey.ts`](../../src/content/journey.ts).

## La forme

Un **chemin en serpentin**. Les sections de premier niveau vont à droite ; une section qui a de la
profondeur descend ; la dernière étape d'une descente tourne à droite vers la section suivante. Le
défilement avance toujours, dans la direction où le chemin voyage à cet instant. Il n'y a pas de
second geste, donc pas de mode à retenir.

```text
         col 0            col 1            col 2            col 3            col 4

row  0   Accueil      ──▶ Profil       ──▶ Réalisations ──▶ Projet 01
                                                            │
row  1                                                      Arbitrage 01
                                                            │
row  2                                                      Arbitrage 02 ──▶ Projet 02
                                                                             │
row  3                                                                       Arbitrage 01
                                                                             │
row  4                                                                       Extrait      ──▶ …
```

Ce schéma illustre la forme, il ne la fixe pas. **Aucun de ces nombres n'est écrit nulle part** : le
chemin est parcouru depuis le contenu, donc une section sans profondeur ne produit aucune descente, et
une section de plus étend le chemin sans qu'une ligne de mise en page change. La forme courante est
tenue par `src/content/journey.test.ts`, qui est le seul endroit où elle se compte.

## Sections et étapes

- Une **étape** est une cellule, un écran.
- Une **section** est une étape atteinte par un déplacement *vers la droite* — la tête d'une colonne.
  Les sections sont exactement les entrées du rail.

Tout ce qui se trouve entre deux têtes est une **descente** : de la profondeur dans la section déjà
ouverte.

## Comment une étape connaît sa forme

Chaque étape porte la manière dont le chemin **entre** en elle et **en sort**. Ces deux mouvements
sont tout le langage de mise en page — quatre combinaisons, et la cellule se compose seule :

```text
entre   sort     forme            le contenu se place
─────   ─────    ─────            ───────────────────
 null   droite   ──▶ départ       sur la ligne
 droite droite   ──▶ traversée    sur la ligne
 droite bas      ──▶ puis ▼       à côté du coude
 bas    bas        ▼ traversée    à côté de la ligne
 bas    null       ▼ fin          à côté de la ligne
```

Les deux extrémités sont les seuls `null` : le chemin naît à la première étape et meurt à la dernière.

## Ce qui défile réellement

Une seule chose. Un pilote invisible de `étapes × 100dvh` constitue tout le document défilant ; la
grille visible est fixe et ne défile pas du tout.

```text
   document (le pilote)               fenêtre (fixe)
   ┌──────────┐  étape 0              ┌──────────────────┐
   │          │                       │                  │
   ├──────────┤  étape 1    scrollY   │  la grille est   │
   │          │  ────────▶  pilote ▶  │  translatée en   │
   ├──────────┤             --x/--y   │  2D derrière     │
   │    ⋮     │                       │                  │
   ├──────────┤  dernière             └──────────────────┘
   └──────────┘
```

Deux étapes consécutives diffèrent d'**exactement une cellule sur exactement un axe**, donc la
position de la grille est une interpolation linéaire :

```text
progress = scrollY / innerHeight     →  8,4 signifie « 40 % du trajet de l'étape 8 vers la 9 »
--x, --y = lerp(layout[8], layout[9], 0,4)
```

Le défilement natif est conservé comme plomberie — ancres, clavier, recherche dans la page, inertie
tactile, `scroll-snap-type: y mandatory` — sa barre étant masquée. La molette est amplifiée pour qu'un
cran couvre une étape.

## Ce que disent les deux indicateurs

Ils répondent délibérément à des questions différentes, et jamais deux fois à la même.

```text
segment latéral                    descente
──────────────────────────         ──────────────────────────
rail :  voyage, se remplit         rail :  figé sur la section courante
profondeur : muette                profondeur : dit où on en est
```

Que le rail tienne bon pendant une descente est le sujet : le bouger revendiquerait une position
*entre* deux sections alors que le lecteur est franchement *dans* une.

Tout ce que le rail montre est dérivé du même nombre piloté par le défilement — le trajet du
soulignement, le remplissage du connecteur, l'allumage de la puce. Un indice piloté par une transition
d'arrivée se déclencherait après la fin du mouvement, et se lirait comme abrupt quelle que soit sa
durée.

## Le chemin, et le contenu ancré dessus

Le chemin est **un segment par chapitre**, pas un élément unique couvrant le parcours : les chapitres
étant contigus, les segments se rejoignent, et rien n'a besoin de connaître la longueur du parcours.

Il est **peint sous la colonne de lecture**. Les éléments à fond opaque l'interrompent d'eux-mêmes, ce
qui produit `———| encadré |———` sans découpe à écrire. `.slide-content` porte un `z-index` explicite,
sans quoi le chemin, qui est positionné, peindrait devant.

**Le contenu est ancré sur la ligne par calcul**, jamais par une valeur accordée à la main. Le
contenu est placé à la hauteur du chemin — contre la même boîte que celle contre laquelle le chemin
résout son propre `top` — puis remonté de la moitié de sa propre hauteur. La tête est sortie du flux,
si bien que cette hauteur est exactement celle de la rangée encadrée, qui se pose donc centrée sur la
ligne quel que soit son poids. La tête est ensuite accrochée au haut de la rangée, pas à la ligne :
la moitié d'une rangée haute remonte bien au-dessus du chemin.

Rien là-dedans ne lit une hauteur de contenu, donc ajouter un panneau, une carte ou une ligne de chapô
ne peut pas désynchroniser le croisement (→ [0010](../decisions/0010-ancrer-les-chapitres-de-survol-sur-le-chemin.md)).

L'ancrage sort le contenu du flux, et un débordement vers le haut est inatteignable — aucune barre ne
remonte au-dessus du bord supérieur. Sous 700 px de hauteur, le chapitre revient au flux centré et
abandonne le croisement plutôt que la lisibilité.

## La profondeur d'un chapitre

Une colonne de panneaux aimantés, `scroll-snap-type: y mandatory` avec `scroll-snap-stop: always` pour
qu'un geste ne puisse pas sauter un panneau.

Trois points mécaniques, chacun payé une fois :

- **pas de `scroll-behavior: smooth` sur la colonne.** Il s'applique aussi au défilement utilisateur,
  donc chaque cran de molette lançait une animation que le cran suivant relançait. Les liens de
  descente adoucissent leur propre saut ;
- **la molette est amplifiée du même facteur sur les deux axes.** Le défilement natif sous un
  aimantage `mandatory` doit traverser un demi-panneau avant de basculer, là où le parcours bascule au
  premier cran. Deux physiques pour une grammaire est ce qui fait qu'un aimantage semble cassé ;
- **la barre de défilement est un indicateur flottant**, pas la native : une vraie barre occupe la
  mise en page, donc la révéler décalerait le contenu.

Une ancre doit viser un nœud **à l'intérieur** du conteneur de défilement : pointer le lien de retour
sur la `<section>` du chapitre déplace le rail horizontal au lieu de remonter la colonne. Le panneau
d'introduction porte son propre identifiant pour cela
(→ [0011](../decisions/0011-chapitres-projet-en-panneaux-aimantes.md)).

## Sous 768 px

Les deux axes tactiles se combattent, donc le serpentin se replie en un défilement vertical unique :
les mêmes étapes, dans le même ordre, empilées. Le chemin est absent — il n'y a plus d'axe horizontal
à tenir.

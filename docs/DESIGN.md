# DESIGN.md — Portfolio Vincent Cottalorda

Document de référence pour toute intervention sur l'interface.
À lire avant d'écrire du CSS ou de créer un composant.

Il prime sur [`CONCEPT.md`](./CONCEPT.md) en cas de divergence.

---

## 1. La thèse

Le portfolio défend une seule affirmation :

> **Il tient un système entier, et il le rend lisible aux autres.**

Deux portes d'entrée pour la même affirmation :
- **Construire** — la preuve qu'un système existe, tourne, et a survécu à un incident.
- **Coordonner** — la preuve qu'il reste opérable par quelqu'un d'autre. *Jamais nommé, jamais revendiqué.* Cette moitié se démontre par les artefacts (registres de décisions, procédures, documentation lisible), pas par une déclaration.

**Règle de rédaction qui découle de la thèse :** rien n'est revendiqué, tout se déduit.
Interdits dans toute copie du site : « polyvalent », « passionné », « vision globale »,
« je fais le lien entre les équipes », « autodidacte » en position de justification.
Les faits, oui. Les qualificatifs sur soi, non.

**Cible de lecture :** quelqu'un qui recrute — CDI ou mission. Pas un client final,
qui passe par un autre site.

---

## 2. Non négociable

| Règle | Raison |
|---|---|
| Le fond est muet | Toutes les dérives esthétiques du projet sont venues d'un fond porteur de teinte : boue, ambre terminal, vieux papier. Le fond reste strictement neutre. |
| Un seul accent | Le jade signale ce qui tourne, les décisions retenues, les liens et la position dans la navigation. Rien d'autre. Sa rareté fait sa force. |
| Pas de décor | Pas de particules, pas de dégradés mesh, pas de textures simulées, pas de glassmorphism, pas de blobs. La profondeur se construit par empilement de surfaces et filets d'un pixel. |
| Un seul mouvement à la fois | Transitions courtes sur les états. Aucune animation d'ambiance. `prefers-reduced-motion` respecté partout. |
| Aucune couleur en dur | Toute valeur vient de `theme.css`. Un composant qui a besoin d'une couleur absente du thème signale un problème de conception, pas un manque dans le thème. |
| Pas de thème d'éditeur importé | La coloration syntaxique est dérivée de la palette du site. Ne pas réintroduire Catppuccin, Nord, Dracula, Rosé Pine. |

### Mouvement — l'exception admise

La règle « aucune animation d'ambiance » connaît une exception, et une seule :
**l'indice de défilement du chapitre d'accueil**. Une flèche seule, à droite de l'écran,
dont l'opacité et la position oscillent légèrement.

Elle est admise parce qu'elle n'est pas de l'ambiance : elle annonce le paradigme de
navigation horizontale, que rien d'autre ne signale à l'arrivée sur le site. Elle est
cadrée :

- **en `ink-3`, jamais en accent** — un indice de défilement n'est ni un lien, ni une
  position, ni ce qui tourne ;
- `aria-hidden` : c'est le rail bas qui porte la navigation réelle ;
- l'état à 0 % et 100 % de l'animation **est l'état visible**, pour que la neutralisation
  par `prefers-reduced-motion` laisse la flèche lisible plutôt que figée à demi effacée ;
- masquée sous 1024 px, où le parcours se replie et où la flèche mentirait ;
- le mouvement est déclaré dans `theme.css` (`--animate-scroll-hint`), pas dans le
  composant : c'est un token comme un autre.

Aucune autre animation d'ambiance n'est admise. Une deuxième la banaliserait.

### Dérives d'accent déjà corrigées

Le POC HTML les contenait, elles ne doivent pas revenir :

- **Sur-titres de panneau en jade** (`Ce que je fais tourner`). Un intitulé de section
  ne fait pas partie de la liste ci-dessus. Les sur-titres sont en `ink-3`, sans exception.
- **Chaînes de caractères en `accent` pur** dans les blocs de code. Un extrait en contient
  trop pour que la rareté tienne. Voir §5.4.

La seule exception assumée est le mot mis en accent dans le titre d'accueil
(`qui les **tiennent**`) : un seul mot, sur un seul écran, sur tout le site.

---

## 3. Palette

Tokens définis dans `src/styles/theme.css`. Rappel des rôles :

**Surfaces** — `bg` (#151515) → `surface` (#1C1C1C) → `surface-2` (#212121).
Les blocs de code utilisent `code` (#1A1A1A), entre le fond et les cartes.

**Texte** — `ink` pour les titres et le texte fort, `ink-2` pour le courant et les
descriptions, `ink-3` pour les métadonnées et les options écartées.

**Accent** — `accent` (#45B08C) pour tout ce qui est actif. `accent-line` pour les
filets et les puces d'étapes franchies. `accent-bg` pour le remplissage des pastilles.
`accent-halo` pour le halo de la pastille courante du rail.

### Contrastes mesurés sur `bg`

Deux valeurs de la première version échouaient et ont été relevées :

| Token | Ratio | Seuil |
|---|---|---|
| `ink` | ~16:1 | AA texte ✅ |
| `ink-2` #A3A19D | 7,1:1 | AA texte ✅ |
| `ink-3` **#807E7A** | 4,51:1 | AA texte ✅ *(était #73716D à 3,75:1 — échec)* |
| `accent` #45B08C | 6,8:1 | AA texte ✅ |
| `accent-line` **#35705C** | 3,15:1 | composant UI ✅ *(était #295647 à 2,19:1 — échec)* |

`ink-3` porte les libellés du rail et les sur-titres : ce sont des éléments de
navigation, pas de la décoration. Il devait passer AA.

### Collisions à surveiller

Le jade a deux voisinages dangereux, déjà traités — ne pas les réintroduire :

1. **Vert « succès ».** Ne pas accentuer la fin d'une chronologie d'incident : ça se lit
   comme une coche de validation. L'accent marque le **déclenchement**, pas la résolution.
2. **Vert d'état.** Les états ne sont plus tous colorés. Voir §5.3.

---

## 4. Typographie

**Lexend** en display et en courant. **JetBrains Mono** pour tout ce qui est technique.
Les deux sont auto-hébergées via Fontsource — aucune requête vers un tiers.

Le mono n'est pas décoratif. Il porte : sur-titres (kickers), puces de technologies,
légendes, horodatages, intitulés de colonnes, blocs de code, liens de contact.
Cette répartition est structurelle : le mono marque ce qui relève de la machine,
le sans ce qui relève du discours.

Graisses :
- corps `300` — Lexend s'alourdit visiblement en 400 sur du paragraphe
- titres `600`
- texte fort dans un paragraphe `500`
- décisions retenues `400` (elles doivent primer sur les écartées, qui restent en 300)

Ne pas dépasser 600 en titre. Lexend en 700 devient pâteuse aux grandes tailles.

Les sur-titres sont en mono, capitales, `letter-spacing: 0.18em`, couleur `ink-3`.
C'est le seul endroit où l'on emploie des capitales.

---

## 5. Composants

### 5.1 Registre de décisions — élément signature

C'est le composant central du site. Il porte à lui seul la singularité du portfolio.
Il n'est pas décoratif : il remplace la description de projet classique.

**C'est aussi la réalisation de la lecture parallèle** décrite dans `CONCEPT.md` :
deux colonnes, une tension, un motif qui les relie. La colonne « Retenu » et la décision
technique relèvent de *Construire*. Le motif — pourquoi, contre quoi, avec quelle
conséquence — est l'artefact de *Coordonner* : ce qui rend le système intelligible à
quelqu'un d'autre. Aucun des deux mots n'apparaît à l'écran.

Structure : deux colonnes (`Retenu` / `Écarté`), puis une ligne de motif en pleine largeur.

```
┌─ RETENU ──────────────────┬─ ÉCARTÉ ───────────────────┐
│ ● Serveur dédié bare metal │ ~~Infrastructure managée~~ │
├────────────────────────────┴────────────────────────────┤
│ │ La charge est constante et le stockage dominant…      │
└─────────────────────────────────────────────────────────┘
```

- Colonne retenue : puce jade, `ink`, graisse 400.
- Colonne écartée : `ink-3`, graisse 300, `line-through` d'un pixel.
- Motif : `ink-2`, graisse 300, filet gauche de 2 px en `accent-line`.
- Sous 660 px : les deux colonnes s'empilent, l'écartée garde son retrait gauche.

#### La décision non tranchée

Une entrée peut porter une décision **non encore tranchée** — c'est ce qui donne sa
valeur à la pièce en chantier. C'est une **forme distincte**, pas une décision résolue
à laquelle il manquerait un champ, et le rendu doit le montrer :

- intitulé mono `NON TRANCHÉ` en pleine largeur ;
- **aucune puce jade** — rien n'est retenu, l'accent mentirait ;
- **aucun barré** — rien n'est écarté ;
- les deux options à poids égal, en `ink-2`, marquées d'un tiret neutre ;
- filet du motif en `line` et non `accent-line`.

Dans le modèle de données, c'est une union discriminée (`state: 'settled' | 'open'`),
pas un champ optionnel.

**Contrainte de contenu :** chaque entrée doit correspondre à un arbitrage réel.
Un registre inventé se sent immédiatement et détruit la crédibilité de l'ensemble.

### 5.2 Chapitre d'accueil — composition

Le hero est conçu pour un portfolio horizontal, pas comme un hero classique amputé de
son illustration. Deux masses typographiques :

- **à gauche** : pastille de disponibilité, titre, puis un trait horizontal fin qui pose
  la ligne d'horizon — décoratif, sans flèche ni animation ;
- **à droite, décalé vers le bas** : le propos et les technologies.

Le vide entre les deux masses est un élément de composition. Il ne doit pas être comblé,
et surtout pas par une illustration ou un aplat.

**Pas d'appel à l'action.** Le rail bas assure déjà la navigation ; un bouton
dupliquerait la fonction et ramènerait le vocabulaire de la page produit.

Le chapitre dépasse la colonne de lecture (`--slide-max`), sans quoi les deux masses se
tassent et l'écart cesse d'être lisible comme une intention.

### 5.3 Pastilles d'état

Trois états, distingués par forme autant que par couleur, parce que l'accent ne doit
signaler que ce qui tourne :

| État | Traitement |
|---|---|
| `en production` | `accent` sur `accent-bg`, filet plein |
| `livré` | `ink-3`, filet plein |
| `en chantier` | `ink-2`, **filet tireté** |

### 5.4 Chronologie d'incident

Filet vertical en `line`, pastilles rondes. **Seule la première pastille est accentuée.**
Horodatages en mono. Le dernier événement passe en `ink` (état courant), sans accent.

Optionnelle : tous les projets n'ont pas eu d'incident, et en fabriquer un tuerait la
crédibilité aussi sûrement qu'un registre inventé.

### 5.5 Bloc de code

Fond `code`, filet `line`, légende en mono avec la source à gauche et une mention
à droite. Coloration presque monochrome : mots-clés en `code-key` **graisse 500**
(la hiérarchie vient du poids), chaînes en `code-string`, valeurs en `code-value`,
ponctuation et commentaires dans les gris.

La coloration est produite par Shiki avec un thème défini dans `src/styles/code-theme.ts`,
dérivé des tokens. **L'accent pur en est absent** : un extrait contient trop de chaînes
pour que le jade y garde sa rareté. Le gras est réservé aux mots-clés — pas aux opérateurs.

Ne pas ajouter de couleur supplémentaire. Si un langage semble en avoir besoin,
c'est l'extrait qui est trop long, pas le thème qui est trop pauvre.

### 5.6 Rail de navigation

Étapes en bas d'écran, pastilles reliées par un filet.
Franchies : `accent-line`. Courante : `accent` plein avec halo. À venir : `line`.
Libellés en `ink-3`, la courante en `ink` graisse 500.

Deux contraintes d'implémentation :

- **Ce sont des liens `<a href="#id">`, pas des boutons.** La position reste dans l'URL,
  partageable et restaurée au retour arrière ; le clavier, le clic-milieu et l'historique
  fonctionnent sans code. Les flèches gauche/droite sont ajoutées par-dessus.
- **Le nombre d'étapes n'est jamais écrit en dur.** Le rail se dérive de `chapters`,
  lui-même dérivé de `projects`. Ajouter un projet ne touche qu'à `portfolio.ts`.

---

## 6. Navigation

- **→ horizontal** : les sommets du parcours. Un survol complet donne la thèse entière.
- **↓ vertical** : le détail à l'intérieur d'un chapitre. Registre, chronologie, code.

Le lecteur pressé traverse, le lecteur intéressé descend. Personne n'est filtré.

Trois points traités :

1. **Verrou d'axe.** Les trackpads produisent des deltas diagonaux. Dès que le lecteur
   est descendu dans un chapitre, la composante horizontale du geste est annulée. Le JS
   **n'intercepte jamais la composante verticale et ne déclenche aucune navigation** :
   `scroll-snap` conduit seul, il n'y a pas de `scrollTo` piloté ni d'index calculé.
2. **Repli en vertical pur sous 768 px.** Deux axes tactiles se marchent dessus.
3. **Signaler la descente** — *reste ouvert*, voir §9.

---

## 7. Accessibilité — plancher

- Contraste : voir le tableau mesuré en §3. `ink-3` est réservé aux métadonnées, aux
  libellés du rail et aux textes barrés.
- L'information n'est jamais portée par la couleur seule — d'où le filet tireté
  sur « en chantier », le barré sur les options écartées, et l'intitulé `NON TRANCHÉ`.
- Focus visible partout, `outline` jade à 2 px avec 3 px de décalage.
- Le rail est composé de vrais liens. Flèches gauche/droite fonctionnelles.
- Le défilement horizontal utilise `scroll-snap`. **Une seule conversion de molette est
  admise**, et elle est cadrée : voir ci-dessous.

### Molette — l'exception admise

Une souris ne produit que du `deltaY`. Sans conversion, le parcours horizontal lui est
purement inaccessible : c'est un défaut d'accessibilité, pas une préférence.

La règle « jamais un détournement de la molette » visait le wheel-jacking du prototype —
calcul d'index, `scrollTo` vers un chapitre, verrou de 500 ms. Ce qui est admis est
strictement plus étroit :

- **c'est la profondeur du chapitre qui arbitre, pas le matériel.** `deltaMode` ne
  permet pas de séparer souris et trackpad : macOS normalise les deux en pixels, et
  `DOM_DELTA_LINE` n'apparaît jamais. Un chapitre sans profondeur convertit la molette
  verticale en traversée ; un chapitre qui a du contenu à faire défiler la laisse
  descendre, et le parcours reprend par propagation une fois le bas atteint ;
- la conversion est **proportionnelle** (`deck.scrollBy({ left: deltaY * 32 })`) : aucun
  index n'est calculé, aucun chapitre n'est visé, aucun verrou temporel ;
- **`scroll-snap` décide seul** où le défilement se pose ;
- elle ne s'applique qu'au niveau principal : dès que le lecteur est descendu de plus
  d'une demi-vue dans un chapitre, la molette redevient purement verticale.

Toute évolution qui réintroduirait un index calculé ou un `scrollTo` vers un chapitre
sort de l'exception et retombe sous l'interdiction.

---

## 8. Écarté, et pourquoi

Cette section existe pour éviter de refaire le chemin. Chaque piste a été essayée.

| Écarté | Motif |
|---|---|
| Dégradés violet-rose | Vocabulaire de page produit SaaS. Promet avant d'avoir prouvé. |
| Glassmorphism | Le voile n'a rien derrière lui à flouter : il impose une palette saturée pour exister, et ne produit aucune profondeur. Coût sans bénéfice. |
| Une teinte par chapitre | Sept identités chromatiques sans logique déductible. Fait de l'interface le sujet. |
| Une teinte par lecture (Construire / Coordonner) | Même erreur sous un autre habillage : viole « un seul accent », et **nomme visuellement une dichotomie qu'on a décidé de ne pas revendiquer**. |
| Registre « dandy britannique » (beige, kaki, tweed) | Une référence matérielle traduite en aplat de fond donne de la boue. Et c'est un costume : ça décrit une apparence, pas une manière de travailler. |
| Serif d'affichage (Fraunces et apparentées) | Lecture vieillotte, en contradiction avec l'objectif de modernité. |
| Monospace en titre (Martian Mono) | Combiné à un accent chaud sur fond sombre, produit un rendu terminal ambre. |
| Fond crème + accent terracotta | Couple identifiable comme thème d'assistant IA, et produit un effet « vieux papier » proche des thèmes Obsidian. |
| Orange `#D97757` | Testé et écarté au profit du jade, qui sort du registre chaud saturé des portfolios de dev. |
| Couleur sémantique par thème (réflexion / architecture / code / débug) | Cette taxonomie n'existe pas dans le contenu. Cinq teintes actives détruisent la notion d'accent. |
| Thème d'éditeur importé | Identité empruntée, immédiatement reconnue par les pairs. |
| Particules en arrière-plan | Décor le plus répandu du genre. Contredit la règle « rien n'est revendiqué ». |
| Ligne d'état avec métriques d'infrastructure | Signal trop spécialisé. Et sans données réelles câblées, contredit la promesse de preuve. |
| Photographies de l'auteur | Une image sans sujet est un aplat décoratif. Le sujet ici — le travail — n'est pas photographiable. |
| Poppins, Inter, Boldonse, Gabarito, Space Grotesk, Schibsted Grotesk | Testées. Lexend retenue. |
| Colonnes nommées « Construire » / « Coordonner » | Nomment ce qui doit se déduire. Le registre de décisions occupe le même emplacement structurel avec du contenu réel à la place d'un cadre abstrait. |

---

## 9. Ce qui reste ouvert

Quatre points. Aucun n'est réglé.

1. **Le second appui d'identité.** Le registre de décisions porte seul la singularité.
   Ce qui viendra en renfort doit sortir du contenu, pas du décor. Deux pistes issues du
   système existant : la **décision non tranchée** portée comme forme à part entière
   (§5.1), et la **pastille « en chantier »** assumée sur un projet réel.
2. **Le contenu réel.** Les registres, la chronologie et les extraits de code sont des
   reconstitutions plausibles. Ils doivent être remplacés par les vraies notes.
   Le contenu va évoluer : les projets arriveront, `portfolio.ts` est le seul point d'entrée.
3. **Signaler la descente verticale** (§6.3). Sans signal, la profondeur n'est jamais
   découverte. Un demi-bloc visible en bas de vue, ou un indicateur.
4. **Le portrait cognitif.** Une justification de décision mentionnait une mémoire
   épisodique peu fiable comme motif du choix d'Ansible. Argument fort, mais c'est
   une divulgation personnelle. Décision à prendre, pas à trancher par défaut.

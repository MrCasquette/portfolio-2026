---
statut : accepté · précise 0002
date : 2026-09-14
type : Design
---

# Le registre visuel : jade sur neutre, et ce qu'il écarte

## Contexte

Le registre visuel du site est en vigueur depuis la refonte du 24 août 2026 : fond neutre muet, accent
unique jade, aucune décoration. Il n'a jamais été écrit comme décision — seulement comme règles, dans
un tableau « Discarded, and why » qui accumulait dix-huit lignes d'options essayées et rejetées.

Ce tableau posait un problème de nature. Il porte de l'histoire datée, donc il n'a pas sa place dans
un support de référence ([méthode](../README.md) §4) ; mais il porte aussi ce qui coûte le plus cher à
redécouvrir — la raison pour laquelle un chemin a déjà été parcouru. Il est écrit ici, une fois, au
seul endroit dont c'est le rôle.

Ce qui pousse la décision : chaque dérive esthétique de ce projet est venue d'un fond portant une
teinte, et chaque retour en arrière a coûté une session.

## Options envisagées

Toutes ont été essayées, sur le prototype ou sur le site.

**Registres chromatiques**

- **Dégradés violet-rose** — vocabulaire de page produit SaaS. Promet avant d'avoir prouvé.
- **Registre « dandy anglais »** (beige, kaki, tweed) — une référence matière traduite en fond plat
  donne de la boue. Et c'est un costume : ça décrit une apparence, pas une manière de travailler.
- **Fond crème et accent terracotta** — appariement reconnaissable comme thème d'assistant IA, et
  produit un effet « vieux papier » proche des thèmes Obsidian.
- **Orange `#D97757`** — testé, abandonné au profit du jade, qui sort du registre chaud saturé des
  portfolios de développeurs.

**Distributions de couleur**

- **Une teinte par chapitre** — sept identités chromatiques sans logique inférable. Fait de
  l'interface le sujet.
- **Une teinte par lecture (Construire / Coordonner)** — la même erreur autrement vêtue : ça viole
  l'accent unique, et ça **nomme visuellement une dichotomie qu'on a décidé de ne pas revendiquer**
  ([0003](./0003-le-registre-remplace-la-lecture-parallele-nommee.md)).
- **Couleur sémantique par thème** (réflexion / architecture / code / débogage) — cette taxonomie
  n'existe pas dans le contenu. Cinq teintes actives détruisent la notion même d'accent.
- **Thème d'éditeur importé** pour la coloration syntaxique — identité empruntée, reconnue
  immédiatement par les pairs. Catppuccin, Nord, Dracula, Rosé Pine.

**Typographies**

- **Serif de titrage** (Fraunces et voisines) — se lit daté, ce qui contredit l'objectif de modernité.
- **Titres en monospace** (Martian Mono) — combiné à un accent chaud sur fond sombre, produit un look
  de terminal ambré.
- **Poppins, Inter, Boldonse, Gabarito, Space Grotesk, Schibsted Grotesk** — testées. Lexend retenue.

**Décorations**

- **Glassmorphism** — le voile n'a rien derrière lui à flouter : il impose une palette saturée pour
  exister, et ne produit aucune profondeur. Coût sans bénéfice.
- **Particules en fond** — la décoration la plus commune du genre. Contredit « rien ne se
  revendique ».
- **Photographies de l'auteur** — une image sans sujet est un aplat décoratif. Le sujet ici — le
  travail — ne se photographie pas.
- **Ligne d'état avec métriques d'infrastructure** — signal trop spécialisé. Et sans données réelles
  branchées, contredit la promesse de preuve.

## Décision

Option retenue : **jade sur neutre, un seul accent, aucune décoration.**

Trois règles en découlent, et elles sont non négociables :

- le fond reste strictement neutre — toute teinte qu'il porte a produit une dérive ;
- l'accent est unique et rare : il signale ce qui tourne, les décisions retenues, les liens et la
  position dans la navigation, rien d'autre ;
- la profondeur se construit par empilement de surfaces et filets d'un pixel, jamais par un effet.

### Conséquences

- Bon, parce que la rareté de l'accent devient une information : jade veut dire quelque chose parce
  qu'il est rare.
- Bon, parce que ce tableau cesse de vieillir dans un support de référence. Il est daté, il est au
  journal, et il ne se relit que pour éviter de refaire un chemin.
- Mauvais, parce qu'un accent unique rend chaque nouvel usage coûteux à arbitrer : il n'y a pas de
  seconde couleur pour se sortir d'un cas difficile. C'est voulu — le manque de couleur force à
  distinguer par la forme, ce qui est aussi ce qui rend l'information lisible sans la couleur
  ([`design/accessibilite.md`](../design/accessibilite.md)).

## Pour aller plus loin

L'état courant vit dans [`design/vocabulaire.md`](../design/vocabulaire.md). Quatre options écartées
ont leur décision propre, parce qu'elles engageaient plus que le registre :
[0006](./0006-le-chemin.md) pour le débord de page, [0009](./0009-fond-opaque-plutot-que-backdrop-filter.md)
pour `backdrop-filter`, [0010](./0010-ancrer-les-chapitres-de-survol-sur-le-chemin.md) pour le
réaccord de `--spacing-path`, [0011](./0011-chapitres-projet-en-panneaux-aimantes.md) pour l'icône de
molette animée.

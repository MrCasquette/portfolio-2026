# Concept du portfolio

## Statut du document

Ce document décrit le concept éditorial et l'expérience de navigation validés pour le portfolio.

Il constitue la référence stable du projet. Les idées, hypothèses et formulations encore en cours de
réflexion restent dans [`SCRATCHPAD.md`](../SCRATCHPAD.md).

Ce document n'est ni une spécification graphique ni une liste définitive de contenus.

## Objectif

Le portfolio présente un profil professionnel transversal à un employeur potentiel. Il ne cherche
pas à vendre une prestation ni à convaincre indistinctement tous les recruteurs.

Il doit permettre au visiteur de comprendre rapidement dans quels contextes Vincent COTTALORDA
peut apporter le plus de valeur.

Le message central est le suivant :

> Comprendre un système dans sa globalité afin de concevoir des solutions cohérentes.

Les technologies employées servent de preuves. Elles ne constituent pas l'identité principale du
profil.

## Positionnement

Le profil intervient à différentes étapes du cycle de vie d'un produit selon quatre capacités :

- analyser ;
- construire ;
- coordonner ;
- accompagner.

Le portfolio ne présente pas ces capacités comme une simple liste de compétences. Il les démontre
à travers des systèmes, des décisions et des résultats concrets.

## Deux contextes de lecture

Chaque projet est présenté selon deux lectures complémentaires.

### Construire

Cette lecture montre comment une idée devient un produit :

- compréhension du besoin ;
- prise en compte des contraintes ;
- conception de la solution ;
- réalisation ;
- intégration et déploiement.

Elle s'adresse implicitement aux structures qui recherchent une capacité d'intervention autonome
et de bout en bout.

### Coordonner

Cette lecture montre comment plusieurs expertises s'articulent autour d'une architecture commune :

- identification des domaines impliqués ;
- définition des interfaces et des responsabilités ;
- communication entre les expertises ;
- arbitrages ;
- maintien de la cohérence globale.

Elle s'adresse implicitement aux structures dont les produits impliquent plusieurs domaines et
plusieurs intervenants.

Les types de structures visés ne doivent pas devenir des étiquettes explicites dans le site. Chaque
visiteur doit pouvoir reconnaître son propre contexte dans la manière dont les projets sont
présentés.

## Lecture parallèle des projets

« Construire » et « Coordonner » ne sont ni deux catégories de projets ni deux récits successifs. Ce
sont deux lectures parallèles d'un même projet, mises en regard phase par phase.

```text
                        Projet
                           ↓
            Construire     │     Coordonner
                           ↓
Phase 1     Approche       ●     Approche
            produit              collective
                           ↓
Phase 2     Approche       ●     Approche
            produit              collective
                           ↓
Phase 3     Approche       ●     Approche
            produit              collective
                           ↓
                        Résultat
```

Les deux colonnes partagent une seule progression verticale. Elles ne possèdent pas de zones de
défilement indépendantes. L'alignement des phases doit permettre :

- de suivre uniquement la lecture correspondant à son contexte ;
- de comparer les deux approches ;
- de percevoir la polyvalence et la capacité d'adaptation du profil.

Le portfolio doit distinguer les expériences réellement vécues des adaptations ou transpositions
envisagées. Une mise en situation hypothétique ne doit jamais être présentée comme une preuve.

## Architecture du parcours

Le parcours principal envisagé est :

```text
Accueil → Profil → Réalisations → Projet 1 → Projet 2 → Projet 3 → Contact
```

Le nombre et le nom définitifs des projets dépendront du contenu disponible. Cette structure décrit
une intention de parcours, pas une arborescence figée.

## Grammaire spatiale

Le portfolio utilise deux axes complémentaires.

### Axe horizontal

L'axe horizontal représente le parcours global. Aller vers la droite signifie passer au chapitre
suivant ; aller vers la gauche signifie revenir au chapitre précédent.

La navigation principale est donc une timeline horizontale :

```text
Accueil → Profil → Réalisations → Projets → Contact
```

### Axe vertical

L'axe vertical représente l'approfondissement du chapitre courant.

Dans une étude de cas, il devient une timeline verticale :

```text
Introduction
     ↓
Phase 1
     ↓
Phase 2
     ↓
Phase 3
     ↓
Résultat
```

Chaque phase met en parallèle les lectures « Construire » et « Coordonner ».

### Règle de navigation

Au niveau principal, l'utilisateur peut naviguer horizontalement entre les chapitres. Lorsqu'il
descend dans un chapitre, la navigation horizontale est verrouillée. Il doit revenir au sommet du
chapitre avant de reprendre le parcours global.

Cette règle donne un sens stable aux déplacements :

- horizontalement, découvrir ;
- verticalement, approfondir.

L'accès à un niveau vertical se fait par une action explicite. Le site ne doit pas déclencher une
descente automatique au simple passage ou à l'arrivée sur un chapitre.

## Navigation persistante

### En-tête

L'en-tête reste fixe au-dessus des cartes, sans les chevaucher. Il porte l'identité du site :

- logo ou monogramme ;
- Vincent COTTALORDA ;
- nom ou fonction du portfolio ;
- chapitre courant lorsque cette information devient utile.

Il ne contient pas le menu principal.

### Navigation basse

La navigation principale reste fixe en bas de l'écran. Elle matérialise la timeline horizontale et
permet :

- de connaître sa position dans le parcours ;
- d'accéder directement aux grands chapitres ;
- de revenir rapidement au niveau principal.

Sa forme exacte pourra différer entre desktop et mobile, mais sa position basse fait partie du
concept.

## Adaptation aux écrans

Sur desktop, les lectures « Construire » et « Coordonner » sont présentées côte à côte autour de la
timeline verticale.

Sur mobile, elles sont empilées à l'intérieur d'une même phase. Elles restent associées au même
jalon afin de préserver la comparaison sans introduire un nouvel axe horizontal concurrent.

## Principes UX

Le portfolio doit être :

- original mais immédiatement compréhensible ;
- accessible au clavier et compatible avec les préférences de réduction des animations ;
- utilisable à la souris, au trackpad et au toucher ;
- rapide à parcourir ;
- centré sur la lecture et non sur la démonstration d'interface.

L'originalité doit toujours servir la compréhension du contenu.

Le comportement natif du navigateur et le CSS sont privilégiés. JavaScript n'est utilisé que lorsque
le comportement attendu ne peut pas être garanti autrement, notamment pour adapter la molette des
souris et verrouiller correctement un axe de navigation.

## Principes éditoriaux

Chaque projet est une étude de cas et non une galerie ou une fiche technique. Son contenu doit
s'appuyer sur des éléments tels que :

- le problème ;
- le contexte ;
- les contraintes ;
- les décisions ;
- l'architecture ;
- le résultat ;
- le recul porté sur le projet.

Le site ne doit pas prendre la forme d'un CV, d'une démonstration technologique ou d'une succession
d'images sans récit.

Le visiteur doit comprendre que le profil ne cherche pas à être le meilleur spécialiste de chaque
domaine, mais qu'il en comprend suffisamment les interactions pour concevoir un ensemble cohérent.

## Hors périmètre actuel

Le concept ne fixe pas encore :

- l'identité graphique définitive ;
- le logo définitif ;
- les textes finaux ;
- la liste et l'ordre définitifs des projets ;
- le nombre exact de phases par projet ;
- la formulation publique du positionnement professionnel ;
- le comportement détaillé de la navigation basse sur les écrans étroits.

Ces éléments seront définis à partir du contenu réel et des essais d'usage du prototype.

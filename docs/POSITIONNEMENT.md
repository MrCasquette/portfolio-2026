# Positionnement — Portfolio

> **Document interne.**
> Ce texte n'est pas destiné à apparaître tel quel dans le portfolio. Il sert de référence pour guider sa conception, son contenu et les arbitrages futurs.

## 1. Ce que le portfolio doit démontrer

Je ne suis pas généraliste par accumulation de compétences.

**Je suis généraliste par continuité de responsabilité.**

Mon positionnement n'est pas :

**Front + Back + BDD + DevOps + UX + CI/CD = Full-stack**

Il repose sur une autre dimension :

**Besoin → Conception → Décisions → Architecture → Implémentation → Distribution → Production → Exploitation**

Je ne prétends pas être spécialiste de chacune de ces disciplines.

Ma valeur réside dans ma capacité à comprendre suffisamment l'ensemble du système pour :

- conserver sa cohérence ;
- identifier les contraintes et leurs conséquences ;
- arbitrer entre plusieurs solutions ;
- dialoguer avec des spécialistes et coordonner leurs interventions ;
- implémenter moi-même lorsque c'est pertinent ;
- conduire une décision jusqu'à ses conséquences réelles ;
- assumer le système au-delà de sa simple livraison.

Le code est une partie de cette chaîne, pas sa finalité.

---

## 2. Trois projets, trois preuves

Les trois projets ne doivent pas être présentés comme « mes trois meilleures réalisations ».

Ils représentent trois moments différents de la responsabilité d'un système.

### Atelier — Concevoir

Atelier démontre la capacité à travailler dans l'incertitude.

Le projet n'est pas intéressant malgré son état de chantier, mais notamment **parce qu'il est encore en chantier**.

Il permet de montrer :

- l'identification des contraintes ;
- l'exploration de plusieurs solutions ;
- les arbitrages ;
- les décisions d'architecture ;
- leurs conséquences ;
- les erreurs ;
- les décisions révoquées ou remplacées ;
- l'évolution d'un système qui possède désormais sa propre histoire.

Atelier n'a pas commencé comme Atelier.

Il a commencé comme Échoppe. La nécessité de faire émerger Prisme puis de faire vivre les deux produits dans un même dépôt est apparue au cours du développement.

L'architecture actuelle n'était donc pas connue dès le départ.

C'est précisément ce qui doit être montré.

Les DR constituent la mémoire de cette évolution. Une décision est figée : lorsqu'elle devient inadéquate, le passé n'est pas réécrit. Une nouvelle décision vient expliquer pourquoi le système doit évoluer.

**Atelier ne doit pas montrer une architecture parfaite.**

Il doit montrer **comment une architecture rencontre la réalité et évolue en conséquence**.

### Plume — Construire

Plume démontre la capacité à transformer une intention en logiciel réellement utilisable.

L'application ne s'arrête pas au code ou au build :

**Conception → Implémentation → Tests → CI/CD → Artefacts → Distribution → Installation**

Plume fonctionne sous Windows, macOS et Linux. Les builds sont produits par CI/CD et l'application dispose de mécanismes réels de distribution, jusqu'à l'installation via Homebrew sur macOS.

La preuve recherchée n'est donc pas :

> « Je sais développer une application desktop. »

Mais :

> **« Pour moi, un logiciel n'est pas terminé lorsqu'il compile. »**

### Mon serveur — Exploiter

Le serveur démontre ce qui se passe après la livraison.

Il s'agit d'un cloud familial réellement utilisé et maintenu dans le temps : services, stockage, supervision, sauvegardes, gestion des ressources, incidents et évolution.

La valeur de cette preuve vient notamment de sa durée.

Ce système n'existe pas pour constituer une démonstration de portfolio. Il existe parce qu'il répond à des besoins réels et doit continuer à fonctionner.

Il permet donc de montrer :

- l'exploitation ;
- l'observabilité ;
- la maintenance ;
- les sauvegardes et leur vérification ;
- les contraintes de ressources ;
- les incidents ;
- leur diagnostic ;
- les corrections ;
- l'évolution d'un système vivant.

---

## 3. La grammaire du portfolio

Le portfolio possède une représentation bidimensionnelle, mais une interaction unidimensionnelle.

**Le contenu reste 2D. L'interaction reste 1D.**

Le visiteur utilise toujours le même geste :

**Scroll = continuer.**

Le site décide ensuite de la direction spatiale correspondant au contenu.

### Horizontalement : progresser

**→ = avancer dans le parcours**

Accueil → Profil → Réalisations → Projet 01 → Projet 02 → Projet 03 → Contact

Un déplacement horizontal signifie un changement de chapitre.

### Verticalement : approfondir

**↓ = entrer dans la preuve**

Lorsqu'un projet est présenté, le visiteur peut continuer naturellement et entrer dans son raisonnement, ses décisions et ses conséquences.

Le sens profond de l'axe vertical est :

> **↓ Vérifie ce que j'affirme.**

La surface doit rester compréhensible par un recruteur non technique.

La profondeur doit permettre à un recruteur technique, lead ou CTO d'auditer progressivement les affirmations.

Le visiteur ne doit jamais avoir à choisir entre un scroll horizontal et vertical.

La structure est complexe.

**Son utilisation ne doit pas l'être.**

Le menu inférieur reste donc constamment disponible comme navigation conventionnelle entre les grands chapitres.

Le scroll sert à découvrir.

Le menu sert à aller quelque part.

---

## 4. Le problème de recrutement

Le portfolio répond à une difficulté particulière :

- absence de diplôme ;
- absence d'expérience traditionnelle en entreprise de développement.

Ces absences retirent deux formes classiques de validation externe.

Le portfolio doit donc produire de la **crédibilité par la preuve**.

Mais il existe une limite fondamentale :

**le portfolio ne peut convaincre que quelqu'un qui l'a ouvert.**

Le parcours réel est :

**Candidature → CV → Clic → Portfolio → Preuves → Entretien**

Le risque est :

**Candidature → CV → Filtre → Rejet**

Le portfolio ne doit donc pas être considéré comme l'unique solution au problème de recrutement.

Deux problèmes distincts doivent être optimisés.

### Acquisition

**Comment provoquer le clic ?**

Le CV, le positionnement et les canaux de candidature doivent créer suffisamment d'intérêt pour que le parcours atypique ne soit pas immédiatement interprété comme une absence de compétence.

### Conversion

**Que se passe-t-il après le clic ?**

Le portfolio doit progressivement transformer :

**« parcours atypique »**

en :

**« je veux parler avec cette personne pour comprendre jusqu'où va réellement sa maîtrise. »**

Le portfolio n'a pas besoin de provoquer directement une embauche.

Son objectif est de rendre **l'entretien rationnellement désirable**.

---

## 5. Usage de l'IA

Claude Code est l'environnement principal de développement.

Il ne doit ni être caché, ni devenir le centre du positionnement.

Le processus repose sur une boucle :

**Problème → Contexte → Alternatives → Contradiction → Arbitrage → DR → Implémentation → Observation → Nouveau contexte**

Avant une décision importante, plusieurs solutions peuvent être explorées et confrontées.

Claude peut produire des avantages, inconvénients, conséquences et angles morts.

La décision finale reste sous responsabilité humaine.

Une fois prise, elle est documentée.

Au fur et à mesure du développement, le projet accumule ainsi son propre contexte : architecture, vocabulaire, contraintes, conventions, décisions et raisons historiques.

La documentation n'est donc pas seulement produite **après le logiciel**.

Elle participe à la production du logiciel.

L'objectif est de réduire progressivement l'espace d'ambiguïté dans lequel l'IA — ou un futur contributeur — doit travailler.

Claude peut proposer, implémenter, analyser et contredire.

**L'autorité sur le système n'est pas déléguée.**

La responsabilité consiste notamment à savoir :

- définir les contraintes ;
- fournir le contexte pertinent ;
- reconnaître une mauvaise direction ;
- interrompre une implémentation incorrecte ;
- remettre une décision en question ;
- vérifier le résultat ;
- assumer ses conséquences.

---

## 6. Ce qu'il ne faut pas chercher à prouver

Le portfolio ne doit pas chercher à démontrer :

> Je sais tout faire.

Il ne doit pas devenir un catalogue de technologies.

Il ne doit pas transformer chaque projet en inventaire de fonctionnalités.

Il ne doit pas prétendre que l'expérience personnelle est identique à l'expérience d'une équipe ou d'une organisation.

Il ne doit pas masquer les erreurs ou reconstruire a posteriori une histoire dans laquelle toutes les décisions étaient bonnes.

Il ne doit pas surinvestir la mise en scène au détriment des preuves.

Et il ne doit pas demander au visiteur de comprendre son interface avant de pouvoir comprendre son auteur.

---

## 7. Principe de preuve

Chaque niveau supplémentaire doit apporter une preuve plus forte que le précédent.

**Niveau 1 — Comprendre**

Que fait cette personne ?

**Niveau 2 — Constater**

Qu'a-t-elle effectivement construit ?

**Niveau 3 — Examiner**

Pourquoi a-t-elle pris cette décision ?

**Niveau 4 — Vérifier**

Quelles en sont les conséquences dans le système réel ?

Le recruteur doit pouvoir s'arrêter au niveau qui correspond à son besoin.

Le RH n'a pas besoin de comprendre un ADR.

Le CTO ne doit pas être condamné à une présentation superficielle.

---

## 8. Principe directeur

Le portfolio doit permettre au visiteur d'arriver lui-même à cette conclusion :

> **Cette personne sait concevoir, construire et exploiter un système.**

Cette conclusion ne doit pas reposer principalement sur une déclaration.

Elle doit émerger des preuves.

Et pour toute décision future concernant le portfolio — contenu, animation, navigation, texte, technologie ou niveau de détail — une question sert de filtre :

> **Est-ce que cette décision aide le recruteur à comprendre que je peux prendre la responsabilité d'un système, de sa conception à son exploitation ?**

Si oui, elle sert le portfolio.

Si non, elle est secondaire.

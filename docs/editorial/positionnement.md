# Positionnement

Ce que le site doit prouver, à qui, et par quels moyens. Cette page contraint le **contenu** —
elle est opposable à une phrase de `content/`, jamais à une ligne de `src/`. Comment ça s'écrit est
dans [règles d'écriture](./regles-d-ecriture.md).

Rien de ce texte n'est destiné à apparaître tel quel sur le site.

## La thèse

Le portfolio défend une seule affirmation :

> **Il tient un système entier, et il le rend lisible à d'autres.**

Je ne suis pas généraliste par accumulation de compétences. **Je suis généraliste par continuité de
responsabilité.** Le positionnement n'est pas :

> Front + Back + BDD + DevOps + UX + CI/CD = full-stack

Il repose sur une autre dimension :

> Besoin → Conception → Décisions → Architecture → Implémentation → Distribution → Production →
> Exploitation

Je ne prétends pas être spécialiste de chacune de ces disciplines. La valeur est la capacité à
comprendre assez de l'ensemble pour en conserver la cohérence, identifier les contraintes et leurs
conséquences, arbitrer, dialoguer avec des spécialistes et coordonner leurs interventions,
implémenter soi-même quand c'est pertinent, conduire une décision jusqu'à ses conséquences réelles, et
assumer le système au-delà de sa livraison.

Le code est une partie de cette chaîne, pas sa finalité. Les technologies servent de preuve ; elles ne
sont pas l'identité du profil.

## Les deux moitiés, et leur statut inégal

- **Construire** — la preuve qu'un système existe, tourne, et a survécu à un incident. Cette moitié
  est montrée.
- **Coordonner** — la preuve que le système reste exploitable par quelqu'un d'autre. Cette moitié
  n'est **jamais nommée**. Elle s'infère des artefacts : registres d'arbitrages, procédures,
  documentation lisible.

De là découle la règle qui gouverne tout le contenu : **rien ne se revendique, tout s'infère**
(→ [règles d'écriture](./regles-d-ecriture.md)).

## Le lecteur visé

Quelqu'un qui recrute — poste ou mission. Pas un client final, qui passe par un autre site.

Le portfolio répond à une difficulté particulière : l'absence de diplôme et l'absence d'expérience
traditionnelle en entreprise de développement retirent deux formes classiques de validation externe.
Il doit donc produire de la **crédibilité par la preuve**.

Mais il existe une limite : **le portfolio ne peut convaincre que quelqu'un qui l'a ouvert.** Le
parcours réel est `Candidature → CV → Clic → Portfolio → Preuves → Entretien`, et le risque est
`Candidature → CV → Filtre → Rejet`. Deux problèmes distincts s'optimisent séparément :

- **acquisition** — provoquer le clic. Relève du CV et des canaux de candidature, pas de ce dépôt.
- **conversion** — ce qui se passe après. Le portfolio doit transformer « parcours atypique » en
  « je veux parler à cette personne pour comprendre jusqu'où va sa maîtrise ».

Le portfolio n'a pas besoin de provoquer une embauche. Son objectif est de rendre **l'entretien
rationnellement désirable**.

## Trois projets, trois moments de la responsabilité

Ce ne sont pas « mes trois meilleures réalisations ». Ce sont trois moments différents de la
responsabilité d'un système.

### Atelier — concevoir

Atelier démontre la capacité à travailler dans l'incertitude. Le projet n'est pas intéressant malgré
son état de chantier, mais **parce qu'il est encore en chantier**. Il montre l'identification des
contraintes, l'exploration de plusieurs solutions, les arbitrages, les décisions d'architecture et
leurs conséquences, les erreurs, les décisions révoquées ou remplacées.

Atelier n'a pas commencé comme Atelier : il a commencé comme Échoppe, et la nécessité de faire émerger
Prisme puis de faire vivre les deux produits dans un même dépôt est apparue en cours de
développement. L'architecture actuelle n'était donc pas connue au départ — et c'est précisément ce qui
doit être montré.

Ses décisions constituent la mémoire de cette évolution. Une décision est figée : quand elle devient
inadéquate, le passé n'est pas réécrit, une nouvelle décision explique pourquoi le système doit
évoluer.

**Atelier ne doit pas montrer une architecture parfaite. Il doit montrer comment une architecture
rencontre la réalité et évolue en conséquence.**

### Plume — construire

Plume démontre la capacité à transformer une intention en logiciel réellement utilisable.
L'application ne s'arrête pas au code ni au build :

> Conception → Implémentation → Tests → CI/CD → Artefacts → Distribution → Installation

La preuve recherchée n'est pas « je sais développer une application desktop », mais :

> **Pour moi, un logiciel n'est pas terminé lorsqu'il compile.**

### Le serveur — exploiter

Le serveur démontre ce qui se passe après la livraison : un cloud familial réellement utilisé et
maintenu dans le temps. Services, stockage, supervision, sauvegardes, gestion des ressources,
incidents, évolution.

La valeur de cette preuve vient de sa durée. Ce système n'existe pas pour constituer une démonstration
de portfolio : il existe parce qu'il répond à des besoins réels et doit continuer à fonctionner.

## Les trois états

Le travail est montré dans trois états, délibérément :

- **en production** — prouve la capacité à exploiter ;
- **livré** — prouve un résultat ;
- **en chantier** — prouve la capacité à arbitrer.

Ensemble, ils disent quelque chose qu'aucun ne dit seul. Un projet inachevé n'est pas une faiblesse à
cacher ; c'est le seul endroit où un arbitrage se voit en cours.

## Le principe de preuve

Chaque niveau supplémentaire apporte une preuve plus forte que le précédent, et **le lecteur doit
pouvoir s'arrêter au niveau qui correspond à son besoin** :

| Niveau | Question | Ce qui y répond |
|---|---|---|
| 1 — Comprendre | Que fait cette personne ? | L'accueil, le profil |
| 2 — Constater | Qu'a-t-elle effectivement construit ? | L'index des réalisations |
| 3 — Examiner | Pourquoi a-t-elle pris cette décision ? | Les registres d'arbitrages |
| 4 — Vérifier | Quelles conséquences dans le système réel ? | Les incidents, les extraits de code |

Un RH n'a pas besoin de comprendre une décision d'architecture. Un CTO ne doit pas être condamné à une
présentation superficielle.

C'est ce que la grammaire spatiale traduit : **→ avancer dans le parcours**, et **↓ entrer dans la
preuve**. Le sens profond de l'axe vertical est *vérifie ce que j'affirme*. La surface reste
compréhensible par un recruteur non technique ; la profondeur permet à un lead ou à un CTO d'auditer
progressivement les affirmations. La mécanique qui porte ces deux axes est dans
[`architecture/parcours.md`](../architecture/parcours.md).

## Ce qui n'est pas démontré

Ces points sont identifiés comme des expériences à acquérir, pas comme des compétences validées. Le
contenu ne doit jamais laisser croire l'inverse :

- la gestion d'une infrastructure à très grande échelle ;
- la résistance sous forte charge ;
- la direction d'équipes importantes ;
- les audits de sécurité avancés ;
- l'exploitation de systèmes complexes sur plusieurs années en contexte professionnel.

L'expérience personnelle n'est pas identique à l'expérience d'une équipe ou d'une organisation, et le
contenu ne doit pas la présenter comme telle.

## L'usage de l'IA

Claude Code est l'environnement principal de développement. Il ne doit ni être caché, ni devenir le
centre du positionnement.

Le processus repose sur une boucle :

> Problème → Contexte → Alternatives → Contradiction → Arbitrage → Décision → Implémentation →
> Observation → Nouveau contexte

Avant une décision importante, plusieurs solutions sont explorées et confrontées. **La décision finale
reste sous responsabilité humaine**, et une fois prise, elle est documentée. La documentation n'est
donc pas seulement produite après le logiciel : elle participe à sa production, en réduisant l'espace
d'ambiguïté dans lequel l'IA — ou un futur contributeur — doit travailler.

Claude peut proposer, implémenter, analyser et contredire. **L'autorité sur le système n'est pas
déléguée.** La responsabilité consiste à définir les contraintes, fournir le contexte, reconnaître une
mauvaise direction, interrompre une implémentation incorrecte, remettre une décision en question,
vérifier le résultat, et en assumer les conséquences.

## Le filtre

Pour toute décision future concernant le portfolio — contenu, animation, navigation, texte,
technologie, niveau de détail — une question sert de filtre :

> **Est-ce que cette décision aide le recruteur à comprendre que je peux prendre la responsabilité
> d'un système, de sa conception à son exploitation ?**

Si oui, elle sert le portfolio. Si non, elle est secondaire.

Le visiteur doit arriver lui-même à cette conclusion :

> **Cette personne sait concevoir, construire et exploiter un système.**

Elle ne doit pas reposer sur une déclaration. Elle doit émerger des preuves.

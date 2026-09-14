# Règles d'écriture

Ce qui gouverne toute phrase de `content/`. Ce que le site doit prouver est dans
[positionnement](./positionnement.md).

La copie du site est en français. Cette page l'est aussi, et pour la même raison : elle argumente sur
des mots, pas sur des concepts.

## La règle unique

> **Rien ne se revendique, tout s'infère.**

Elle découle du statut inégal des deux moitiés de la thèse : *Coordonner* n'est jamais nommé, il se
déduit des artefacts. Des faits, oui. Des qualificatifs sur soi, non.

**Bannis de toute copie du site** : « polyvalent », « passionné », « vision globale », « je fais le
lien entre les équipes », « autodidacte » employé comme justification.

Le test : une phrase qui ne pourrait pas être écrite par quelqu'un d'autre à propos du travail, mais
seulement par son auteur à propos de lui-même, est un qualificatif déguisé.

## Une étude de cas, pas une fiche projet

Chaque projet se présente comme une étude de cas : le problème, le contexte, les contraintes, les
choix, l'architecture, le résultat. Pas un inventaire de fonctionnalités, pas un catalogue de
technologies.

Les technologies sont portées par chaque projet, sous l'introduction, jamais par l'accueil : là, la
liste devient **jugeable**, parce qu'elle se lit juste avant les arbitrages qui l'ont produite
(→ [0008](../decisions/0008-la-stack-portee-par-chaque-projet.md)).

## Les trois contraintes dures du contenu

Elles portent toutes sur la même chose : **le contenu inventé se sent.**

1. **Chaque entrée de registre correspond à un arbitrage réel.** Un registre inventé détruit la
   crédibilité de l'ensemble, y compris celle des entrées vraies.
2. **Un incident ne se fabrique pas.** Tous les projets n'en ont pas connu, et un projet sans incident
   n'en affiche pas. Un incident inventé coûte exactement ce que coûte un registre inventé.
3. **Un marqueur ne se comble jamais par du plausible.** Ce qui reste à écrire porte `⟨à écrire⟩` et
   le reste tel quel jusqu'à ce que la note réelle existe. Une conséquence inventée ou une date
   inventée est précisément ce que le positionnement interdit. `pendingOf()`, dans
   `src/content/pending.ts`, liste les marqueurs par chemin, et un test tient leur compte : un trou ne
   peut être ni comblé en silence ni perdu en silence.

L'arbitrage **non tranché** est une entrée légitime, et c'est ce qui donne sa valeur à la pièce en
chantier. Il a sa forme propre, et cette forme doit dire qu'elle n'est pas une décision résolue à
laquelle il manquerait un champ
(→ [`design/composants.md`](../design/composants.md#larbitrage-non-tranché)).

## Ce qu'on ne cherche pas à prouver

Le contenu ne doit pas :

- prétendre « je sais tout faire » ;
- devenir un catalogue de technologies ;
- transformer un projet en inventaire de fonctionnalités ;
- masquer les erreurs, ni reconstruire a posteriori une histoire où toutes les décisions étaient
  bonnes ;
- surinvestir la mise en scène au détriment des preuves ;
- demander au visiteur de comprendre l'interface avant de pouvoir comprendre son auteur.

## Langue et adresse

La copie visible, les `aria-label` et tout ce qui vit sous `content/` sont en **français** : le site
est francophone. Les `label` et `hint` des déclarations de contenu sont en français aussi — ils
s'adressent à qui remplira le formulaire d'administration, pas au visiteur.

## Une formule mise en réserve

> Le développeur dont vous pensiez ne pas avoir besoin, et dont vous ne pourrez plus vous passer.

**À ne pas employer comme titre principal.** Elle revendique au lieu de laisser inférer, ce qui est
exactement la règle unique retournée. Elle est conservée comme signature possible, en clôture, là où
le lecteur a déjà vu les preuves — auquel cas elle résume au lieu de promettre.

# Méthode de documentation

Avant d'écrire dans `docs/`. Les entrées, selon ce qu'on ignore :

- **est-ce que ça s'écrit, et où ?** → §2
- **quelle nature répond à ma question ?** → §1
- **je sais où, pas comment ?** → §3, puis §4 pour ce qui vaut partout
- **est-ce que ça doit disparaître ?** → §5
- **c'est du code que j'écris ?** → [conventions de code](./conventions.md)

**Pour écrire, on ouvre le support qui porte la règle — jamais une décision.** Le journal explique
d'où une règle vient et ce qu'elle a écarté ; il ne la dicte pas, et il ne dit pas l'état courant du
système. On ne l'ouvre que pour comprendre, ou pour remettre une règle en cause.

Le vocabulaire employé ici a un sens fermé. Un **verrou** est un mécanisme exécutable qui fait
échouer quelque chose : un test, une vérification de types, une garde. Un support **de référence**
décrit le présent et se réécrit, par opposition au **journal**, qui ne se réécrit pas.

**Rien n'est gardé automatiquement ici, et c'est délibéré.** Aucun script ne vérifie les liens, les
chemins cités ou le vocabulaire des statuts : tout relève de la relecture. Une garde se justifie
quand un corpus dépasse ce qu'une relecture embrasse, ou quand plusieurs mains y écrivent ; ce
dossier n'est ni l'un ni l'autre
([0014](./decisions/0014-les-natures-de-la-documentation.md)).

## 1. Les natures, et la question de chacune

Ce dépôt est un **front qui consomme du contenu**, pas une plateforme. Il n'a ni instance en
production, ni consommateur externe, ni version publique à promettre : les natures ci-dessous sont
celles qui ont un objet ici, et pas davantage.

| Nature | Répond à | Support | Se réécrit |
|---|---|---|---|
| **décisions** | **pourquoi** un choix a été fait | [`decisions/`](./decisions/README.md) | jamais |
| **éditorial** | ce que le site doit **prouver**, et comment ça s'écrit | [`editorial/`](./editorial/positionnement.md) | oui |
| **design** | ce que l'interface doit **respecter** | [`design/`](./design/vocabulaire.md) | oui |
| **architecture** | comment le système est fait **aujourd'hui** | [`architecture/`](./architecture/overview.md) | oui, en entier |
| **operations** | ce qu'on fait sur une **instance qui tourne** | *déclarée, sans support* | oui |
| **conventions de code** | comment on **écrit du code** ici | [`conventions.md`](./conventions.md) | oui |
| **méthode** | comment on **écrit de la documentation** ici | ce fichier | oui |
| **glossaire** | ce qu'un **mot** veut dire | [`glossaire.md`](./glossaire.md) | oui |

Deux natures sont propres à ce dépôt, et n'existent pas dans la doc d'`atelier` dont cette méthode
est reprise. Elles s'y justifient parce que **le produit est une surface de lecture** :

- l'**éditorial** tient la thèse du portfolio et les règles d'écriture qui en découlent. C'est la
  spécification du contenu : elle contraint ce qui s'écrit dans `content/`, pas ce qui s'écrit dans
  `src/` ;
- le **design** tient ce que l'interface doit respecter. Ce ne sont pas des goûts, ce sont des règles
  opposables à toute modification — et leur violation se voit à l'écran, pas au diff.

L'**operations** est nommée sans dossier : le site n'est pas déployé, et il n'existe donc aucun geste
d'exploitation à décrire. La nature naît à sa première page, le jour où une mise en ligne est
tranchée ([backlog](./BACKLOG.md)). Écrire d'avance une procédure qu'on n'a jamais exécutée
produirait de la fiction, pas de la documentation.

Un support reçoit de l'écriture sans être une nature :

| Support | Répond à | Où |
|---|---|---|
| **backlog** | ce qu'il reste à faire **avant la mise en ligne** | [`BACKLOG.md`](./BACKLOG.md) |

Et ce qui suit ne relève d'aucune nature, et ne se lit pas comme de la documentation :

| Support | Ce qu'il porte |
|---|---|
| [`README.md`](../README.md) racine | ce que voit un arrivant : ce qu'est le projet, le démarrage, les commandes. Aucun raisonnement — il renvoie à la nature qui le porte |
| une note de chantier, un relevé, un audit | **rien de tout cela ne vit ici.** Un artefact de travail n'a aucune autorité, ne se cite jamais par un lien — qui en ferait une cible qu'on n'ose plus supprimer — et ne survit pas à la tâche qui l'a produit. Ce qu'il apprend de durable se consolide dans la nature concernée **avant** qu'il disparaisse (§5) |

## 2. Où va ce que je viens d'apprendre ?

**Étape 1 — est-ce que ça s'écrit ?**

- Si le choix **ferme une alternative** — quelqu'un de raisonnable prendrait-il l'autre chemin ? —
  c'est une **décision**. Elle va au journal, et les filtres ci-dessous ne s'y appliquent pas : une
  décision porte un *pourquoi*, pas une règle en vigueur.
- Sinon, une page de référence n'existe que si **aucun fichier ne porte la chose à lui seul**. S'il
  en existe un, ce fichier *est* la documentation ; une page n'en serait qu'une copie qui diverge.

Deux refus valables partout :

- **on ne documente pas ce que le code dit.** Le lecteur principal est un agent, et il lit très bien
  le code ; ce qu'il ne peut pas reconstituer, c'est le *pourquoi*, les alternatives écartées et les
  mesures ;
- mais **un chemin de navigation n'est pas une duplication** : une page qui n'apporte aucun fait et
  route vers ceux qui existent est légitime.

**Étape 2 — quelle nature ?** Trois questions départagent, dans cet ordre :

| La règle se dément par… | Elle parle de… | Nature |
|---|---|---|
| un **diff** | celui qui écrit du code | [conventions](./conventions.md) |
| une **capture d'écran** | ce que le visiteur voit | [design](./design/vocabulaire.md) |
| une **relecture du contenu** | ce que le site affirme | [éditorial](./editorial/positionnement.md) |
| un **renommage ou un déplacement** | où une chose vit | [architecture](./architecture/overview.md) |

« Les pastilles d'état se distinguent par la forme autant que par la couleur » est du **design** :
ça se dément à l'écran. « Un composant ne code jamais une couleur en dur » est une **convention** :
ça se dément au diff. Les deux coexistent et disent la même chose sous deux angles — c'est normal,
elles ne s'adressent pas au même lecteur.

**Étape 3 — quel support ?** L'échelle est **section → fichier → dossier**, et on ne monte d'un cran
que quand la navigation le réclame. Un dossier à un fichier ne range rien. Une nature peut être
nommée sans avoir de support — c'est le cas d'`operations`.

## 3. Comment s'écrit chaque nature

### Une décision

**Où** `decisions/NNNN-<titre-en-français>.md`, plus une ligne dans
[l'index](./decisions/README.md). Le compteur est **unique et jamais renuméroté**.
**Contient** le contexte qui l'a rendue nécessaire, les options envisagées, la décision, ses
conséquences. Les mesures qui l'ont tranchée, datées.
**Forme** — en-tête MADR, augmenté d'un champ `Type` :

```
---
statut : accepté | proposé  [· <relation> NNNN]
date : YYYY-MM-DD
type : Éditorial | Design | Architecture | Convention | Méthode | Vocabulaire
---

# Titre, nominal ou impératif

## Contexte                 le problème / la contrainte
## Options envisagées       ← le champ qui compte
## Décision
### Conséquences            bonnes et mauvaises, nommées
## Pour aller plus loin     (optionnel)
```

Le champ **`type` nomme la nature qui porte l'état courant** de cette décision — c'est là qu'on ira
lire ce qui vaut aujourd'hui, la décision ne disant que ce qui a été tranché et quand :

| `type` | L'état courant vit dans |
|---|---|
| `Éditorial` | [`editorial/`](./editorial/positionnement.md) |
| `Design` | [`design/`](./design/vocabulaire.md) |
| `Architecture` | [`architecture/`](./architecture/overview.md) |
| `Convention` | [`conventions.md`](./conventions.md) |
| `Méthode` | ce fichier |
| `Vocabulaire` | [`glossaire.md`](./glossaire.md) |

**Le champ `Options envisagées` est celui qui compte.** Il porte ce qui a été écarté, et il se
projette un-pour-un sur la colonne « Écarté » du registre d'arbitrages que le site affiche — puis sur
l'entité `arbitration` du contenu, état `open` compris. Une décision sans alternative crédible est
une décision qui n'a pas eu lieu.

**Le fichier est la seule source de ces champs. La ligne d'index n'en est qu'une vue** : elle reprend
le titre, le type et le statut, et n'ajoute rien. Un index qui ajoute au fichier devient une seconde
source, et deux sources divergent.

**Écrit au passé daté.** Elle peut montrer une arborescence ou un chemin si c'est la photographie
qui rend la décision compréhensible, jamais comme l'état courant.
**Ne se réécrit pas** : une coquille et un lien mort se corrigent, une décision qui change s'écrit
dans une **nouvelle** décision. Un journal est immuable dans ses affirmations, pas dans ses
pointeurs.

Le vocabulaire du champ `statut` est clos, et ce tableau en est la seule source. Une relation
s'écrit **des deux côtés** : c'est un seul fait, recopié là où on peut le lire.

| Segment | Ce qu'il dit |
|---|---|
| `accepté` | la décision vaut |
| `proposé` | elle est écrite, pas tranchée |
| `précisé par NNNN` ⇄ `précise NNNN` | la décision tient, sa portée s'étend |
| `corrigé par NNNN` ⇄ `corrige NNNN` | elle tient, **sauf** sur le point que la suivante rectifie |
| `remplacé par NNNN` ⇄ `remplace NNNN` | elle est morte |
| `déprécié` | elle n'a plus d'objet, et rien ne la remplace |

Le partage entre `précisé` et `corrigé` tient à une question : **une affirmation antérieure
devient-elle fausse ?** Non → `précisé`. Oui, mais la décision survit → `corrigé`. Oui, et elle ne
survit pas → `remplacé`.

**Indésirable** : de la référence écrite là faute d'un autre endroit ; un état courant ; une
décision qu'on amende en place.

### Une page d'éditorial

**Où** `editorial/<sujet>.md`
**Répond à** ce que le site doit prouver, à qui, et comment ça s'écrit.
**Contraint le contenu**, jamais le code : elle est opposable à une phrase de `content/`, pas à une
ligne de `src/`.
**Contient** la thèse et ce qui en découle — ce qui se démontre, ce qui ne se revendique pas, les
mots bannis, les niveaux de preuve.
**Indésirable** : un fragment de copie du site. La copie vit dans `content/`, et une copie recopiée
ici diverge au premier arbitrage rédactionnel.

### Une page de design

**Où** `design/<sujet>.md`
**Répond à** ce qu'une modification de l'interface doit respecter. **Se lit avant d'écrire du CSS ou
de créer un composant.**
**Contient** la règle et sa raison, en une phrase. Une règle de design sans raison est un goût, et un
goût ne se défend pas en revue.
**Cite ses mesures** quand il y en a — un contraste se donne en ratio et en seuil, pas en
appréciation.
**Indésirable** : l'historique de ce qui a été essayé, qui appartient aux `Options envisagées` de la
décision correspondante.

### Une page d'architecture

**Où** `architecture/<sujet>.md`
**Répond à** où une chose vit et pourquoi. Si l'information change quand on **renomme ou déplace un
fichier**, elle est ici ; si elle change quand on **modifie une signature**, elle est dans le code.
**Contient** la structure et les frontières, avec un renvoi vers la décision qui a tranché — jamais
sa justification en double.
**Se remplace en entier**, jamais ne s'amende : git porte son historique.
**Indésirable** : un récit ; un compte que rien ne vérifie ; une doc de module tenue loin de son
module — elle diverge.

### Une page d'operations

**Où** `operations/<geste>.md` — le dossier n'existe pas encore (§1).
**Répond à** ce qu'on fait sur une instance qui tourne. **Destinée à qui exploite.**
**Contient** la procédure, ses préalables, ce qui casse si on l'omet, et la commande exacte.
**Ne s'écrit qu'après avoir été exécutée** au moins une fois.

### Une ligne de backlog

**Où** [`BACKLOG.md`](./BACKLOG.md)
**Répond à** ce qu'il reste à faire avant la mise en ligne, et **rien d'autre**.
**Contient** *quoi* et *pourquoi*, en quelques lignes. Au-delà, le détail sort du fichier — décision
pour un *pourquoi*, règle réutilisable pour une convention.
**Forme** `- [ ] 🔴/🟠/🟡/⚪ **Titre.**` puis le corps.
**Indésirable** : un détail qui gonfle. Le sort d'une tâche finie est en §5.

### Une entrée de glossaire

**Où** [`glossaire.md`](./glossaire.md)
**Ferme un mot.** Un mot qui désigne deux choses entre dans « les mots surchargés » et ne s'emploie
plus jamais seul.
**S'ajoute quand une collision a coûté un aller-retour**, pas par exhaustivité.

## 4. Ce qui vaut pour tout support

**Le temps de la phrase suit l'état de la chose.**

| État | Temps | Où |
|---|---|---|
| Construit | présent | le support de sa nature |
| Acté, pas construit | **futur déclaré**, avec le lien qui l'acte | idem, ou le backlog |
| Ni acté ni construit | — | rien ne s'écrit |
| Historique | passé daté | le journal seul |

Une phrase qui affirme au présent qu'une chose existe est vraie ou fausse ; l'intention ne la sauve
pas.

**Aucune affirmation datée dans un support de référence.** La mesure, le récit et l'état
d'avancement appartiennent au journal, ou au backlog qui les porte et les emporte avec la tâche.
Symptôme : une phrase dont personne ne saura, dans six mois, s'il faut la mettre à jour ou la
supprimer — « migration terminée », « 36 champs restent à écrire ».

**La documentation nomme, elle ne dénombre pas.** Elle explique, elle décrit, elle liste. Une liste
sert le lecteur : il peut s'en servir. « Sept chapitres », « dix-huit étapes » ne lui sert à rien,
vieillit sans que rien ne le signale, et ce que le nombre prétendait garantir est le travail d'un
verrou, donc du code. Un compte n'est admis que lorsqu'il est **l'information elle-même**, ses
membres nommés dans la même phrase.

**Un document figé porte sa date** — une décision, un audit. Git dit quand un fichier a bougé, jamais
quand on a **arrêté** de l'écrire : cette date-là ne se déduit de rien.

**Un support vivant ne se date pas.** Ce qu'une date à la main y donne est une borne inférieure qui
ne répond pas à la question qu'on se pose en lisant : est-ce que je peux y croire ?

**Forme.** Un titre nomme, il n'ordonne pas. Un titre de section est un **point d'ancrage** : le
déplacer ou le reformuler casse les liens qui le citent — vérifier avant, réparer après. Une phrase,
une règle : trois règles empilées ne se citent pas en revue. Le libellé d'un lien nomme sa cible.

**Langue.** La documentation s'écrit en **français**, titres compris, ainsi que les messages de
commit. Le **code, ses commentaires et les noms de fichiers de `src/`** restent en anglais. Le nom
d'un fichier de documentation suit la langue de la documentation.
→ [décision 0015](./decisions/0015-la-documentation-passe-au-francais.md).

## 5. Quand ça meurt

| Ce qui meurt | Quand | Comment |
|---|---|---|
| Une tâche de backlog | à sa clôture | supprimée, jamais cochée |
| Une note de chantier, un audit, un plan | avec la tâche qui la cite | supprimée |
| Une page dont le sujet a disparu | à la disparition | supprimée |
| Une page de design, d'éditorial, d'architecture | quand la chose change | **remplacée**, jamais amendée |
| Une décision | jamais | une nouvelle décision corrige ou remplace |

Le `[x]` ne sert que de marqueur transitoire **à l'intérieur d'un chantier ouvert** ; à la clôture,
le bloc entier disparaît, cases comprises. **Avant toute suppression, consolider ce que le chantier
a produit de durable** — une règle, une décision. Après, la formulation n'existe plus.

## Avant de livrer

- [ ] aucun fait écrit ici n'est déjà porté en entier par un fichier ;
- [ ] chaque affirmation est au temps de son état ;
- [ ] aucune date, aucun compte, aucune mesure dans un support de référence ;
- [ ] les liens et les ancres résolvent ;
- [ ] ce que le chantier a produit de durable est consolidé, et ses notes supprimées ;
- [ ] la correction éditoriale se livre **en diff**, jamais en rapport.

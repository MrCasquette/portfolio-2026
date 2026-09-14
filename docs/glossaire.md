# Glossaire

Ce document **ferme des mots**. Il n'est pas un ornement : un mot qui désigne deux choses coûte un
aller-retour chaque fois qu'on l'emploie, et finit par produire une décision fausse. Chaque entrée de
la section « mots surchargés » a déjà coûté une discussion.

Une entrée s'ajoute quand une collision a coûté quelque chose, pas par exhaustivité.

## Le parcours

| Terme | Désigne |
|---|---|
| **Étape** | une cellule du serpentin, un écran. L'unité de défilement |
| **Section** | une étape atteinte par un déplacement vers la **droite** — la tête d'une colonne. Les sections sont exactement les entrées du rail. **Attention** : le mot a un second sens, voir plus bas |
| **Descente** | tout ce qui se trouve entre deux têtes : de la profondeur dans la section déjà ouverte |
| **Chemin** | le filet d'un pixel à hauteur constante qui matérialise l'axe. Horizontal sur le survol, vertical dans une descente : même token, même grammaire, seule la direction change |
| **Rail** | la navigation principale, en bas d'écran. Faite de vrais liens |
| **Pilote** | le document invisible de `étapes × 100dvh` qui constitue tout le défilement. La grille visible, elle, ne défile pas |
| **Survol** | les chapitres de premier niveau, parcourus horizontalement. Par opposition à la profondeur |

## Le contenu

Le vocabulaire est celui de Prisme, délibérément
(→ [0012](./decisions/0012-le-contenu-declare-avec-atelier.md)).

| Terme | Désigne |
|---|---|
| **`definition`** | une forme déclarée : une `section` ou un `component` |
| **`section`** | de la présentation. Ce qu'une page porte, dans l'ordre qu'elle énonce |
| **`component`** | un groupe de champs réutilisable. Jamais inséré seul : il s'imbrique |
| **`entity`** | de la donnée. Elle garde son sens en dehors de ce site |
| **`directive`** | une inflexion *à l'intérieur* d'un texte riche, pas un bloc de la page |
| **Fournisseur** | ce qui lit le contenu et ne le juge pas. Aujourd'hui un dossier de fichiers, demain Prisme |
| **Frontière** | `src/content/load.ts`, le seul endroit où le contenu est parsé. Tout en aval lui fait confiance |
| **Marqueur** | `⟨à écrire⟩`, ce que le contrat demande et qu'aucune source ne fournit encore. Jamais comblé par du plausible |

**Pas « block ».** L'ADR-0043 d'`atelier` rejette le mot, et payer une traduction à la frontière coûte
plus cher que de s'aligner.

## La documentation

| Terme | Désigne |
|---|---|
| **Nature** | une question à laquelle un support répond, et une durée de vie. C'est la nature, pas le sujet, qui décide où une phrase va vivre ([méthode](./README.md) §1) |
| **Journal** | ce qui ne se réécrit jamais : les décisions |
| **Support de référence** | ce qui décrit le présent et se remplace en entier : design, éditorial, architecture, conventions |
| **Verrou** | un mécanisme exécutable qui fait échouer quelque chose — un test, une vérification de types. Une affirmation sans verrou est une intention |
| **Décision** | le mot générique du journal. Sur le **site**, le mot visible est **arbitrage** |

## Les mots surchargés

Ces mots désignent deux choses. **Ils ne s'emploient jamais seuls.**

| Mot | Sens 1 | Sens 2 | Comment on dit |
|---|---|---|---|
| **section** | une `section` de contenu, au sens de Prisme : une forme déclarée qu'une page compose | une section du parcours : une étape atteinte par la droite, une entrée du rail | dire « une section de contenu » ou « un chapitre ». Le mot **chapitre** est réservé au parcours, et c'est celui à préférer |
| **décision** | une entrée du journal, dans `docs/decisions/` | une entrée du registre affiché sur le site, entité `arbitration` | dire « une décision » pour le dépôt, « un arbitrage » pour le site |
| **design** | la nature documentaire : ce que l'interface doit respecter | le premier des trois moments de responsabilité (`design`, `build`, `operate`), celui que porte Atelier | dire « le design » pour l'interface, « concevoir » pour le moment |
| **contenu** | ce qui est écrit — les fichiers de `content/` | le système qui le déclare et le valide — `src/content/` | dire « le contenu » pour l'écrit, « le système de contenu » pour le code |
| **état** | l'état d'un projet (`en production`, `livré`, `en chantier`) | l'état d'un arbitrage (`settled`, `open`) | ne jamais dire « état » seul : « état d'un projet », « arbitrage tranché ou non » |
| **profondeur** | l'axe vertical, par opposition au survol | le nombre d'étapes qu'une section contient | le second sens ne s'emploie que dans le code |

## Les projets

| Nom | Ce que c'est | Le moment qu'il prouve |
|---|---|---|
| **Atelier** | le monorepo qui héberge Prisme et Échoppe | concevoir — travailler dans l'incertitude |
| **Prisme** | le CMS headless d'Atelier, cible de ce portfolio | — |
| **Plume** | l'application desktop, distribuée jusqu'à l'installation | construire — un logiciel n'est pas fini quand il compile |
| **Le serveur** | le cloud familial, réellement utilisé et maintenu | exploiter — ce qui se passe après la livraison |

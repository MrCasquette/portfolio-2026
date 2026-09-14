# Architecture — vue d'ensemble

**Cette page décrit l'état courant du dépôt.** Elle ne justifie rien : chaque affirmation renvoie à la
décision qui l'a tranchée. Elle se remplace quand la structure change, elle ne s'amende pas
([méthode](../README.md#une-page-darchitecture)).

## Ce que c'est

Un **front statique qui consomme du contenu**. Astro sans adaptateur, Tailwind v4 en configuration
CSS-first, aucun rendu serveur, aucune API. La sortie est un dossier de fichiers.

Ce n'est pas une plateforme : il n'y a ni instance qui tourne, ni consommateur externe, ni contrat à
figer. Ce qui en fait une architecture digne d'être écrite est ailleurs — dans **une frontière** et
**une dérivation**.

## La frontière

Tout le contenu entre par un seul point.

```
content/*.yaml  ──▶  provider  ──▶  load.ts  ──▶  tout le reste
   fichiers            lit          valide          fait confiance
```

`src/content/load.ts` est **le seul endroit où le contenu est parsé**. Rien en aval ne revalide
(philosophy §5). Le détail — ce qui déclare la forme, d'où vient le Zod, ce que le fournisseur
promet — est dans [contenu.md](./contenu.md).

Cette frontière est **destinée à disparaître**. Elle existe parce que rien ne valide les fichiers à
l'écriture ; le jour où Prisme alimente le site, la validation a déjà eu lieu en amont et ce module
part avec le fournisseur qu'il protège
(→ [0012](../decisions/0012-le-contenu-declare-avec-atelier.md)).

## La dérivation

Aucune coordonnée n'est écrite dans le contenu. La forme du parcours — combien de chapitres, lesquels
descendent, où chacun se pose — est **calculée depuis ce que le contenu est**, et non depuis ce qu'il
déclare.

Une section ouvre un chapitre et voyage vers la droite ; ce qu'une section contient descend en elle.
Un huitième chapitre étend le chemin sans qu'une ligne de mise en page change, et un projet sans
incident ne produit ni écran vide ni lien mort.

Le détail est dans [parcours.md](./parcours.md).

## Où vivent les choses

| Dossier | Ce qu'il porte |
|---|---|
| `content/` | le contenu, en YAML. `pages/<slug>.yaml` pour les compositions, `entities/<nom>/<slug>.yaml` pour les données. Le nom d'un fichier est son slug |
| `src/content/` | la frontière : déclaration, dérivation du validateur, fournisseur, chargement, rendu de la prose, dérivation du parcours |
| `src/components/` | atomic design — `atoms`, `molecules`, `organisms`, `templates`. Pas de `src/ui/` |
| `src/scripts/` | le pilotage du défilement, côté navigateur |
| `src/styles/` | `theme.css` — les tokens, et le seul CSS non tokenisable — plus le thème de coloration syntaxique dérivé de ces tokens |
| `src/pages/` | les pages Astro. `index.astro` compose le parcours |
| `docs/` | cette documentation ([méthode](../README.md)) |

Il n'y a **pas de `src/domain/`** : `src/content/` *est* la tranche verticale du seul concept métier
du site, et elle n'a pas eu besoin d'une couche de domaine.

## Ce qui refuse la dérive

Il n'y a pas de garde dédiée ici. Trois mécanismes jouent ce rôle, et tous se lancent par `pnpm` :

| Commande | Ce qu'elle refuse |
|---|---|
| `pnpm type-check` (`astro check`) | qu'un composant mente sur ce que le contenu lui donne — et porte aussi les affirmations de typage de `definitions/inference.assert.ts`, dont c'est le lanceur de tests |
| `pnpm test` (`node --test`) | qu'un trou de contenu soit comblé en silence, qu'une règle de contenu cède, que la forme du parcours change sans qu'on le sache, que du HTML brut soit rendu quelque part dans `src/` |
| `pnpm lint` (Biome) | les dérives de style sur `src/**/*.ts`, `src/**/*.css` et les JSON racine |

**Rien ne garde la documentation**, délibérément : la charge de ce dépôt ne le justifie pas
([0014](../decisions/0014-les-natures-de-la-documentation.md)).

## Où continuer

| Question | Page |
|---|---|
| Comment le contenu est déclaré, validé, chargé | [contenu.md](./contenu.md) |
| Comment le parcours se dérive et ce qui défile | [parcours.md](./parcours.md) |
| Ce que l'interface doit respecter | [`design/vocabulaire.md`](../design/vocabulaire.md) |
| Ce que le site doit prouver | [`editorial/positionnement.md`](../editorial/positionnement.md) |
| Comment on écrit du code ici | [`conventions.md`](../conventions.md) |
| Ce que les mots veulent dire | [`glossaire.md`](../glossaire.md) |
| Pourquoi tout ceci | [le journal des décisions](../decisions/README.md) |

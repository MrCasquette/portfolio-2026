# Conventions du projet

Arbitrages actés, au sens de `~/.code-conform/docs/00-philosophy.md` §8.
Ce document n'existe que pour les écarts et les choix non déductibles du code.

## Documents de référence

`DESIGN.md` prime sur `CONCEPT.md`. Le premier décrit comment, le second pourquoi.
`SCRATCHPAD.md` est un document de travail, sans autorité.

## Tokens — posture B (sémantique)

`atomic-design.md` §4. Palette neutre sans identité chromatique distinctive, monothème
sombre assumé : le vocabulaire est celui de l'usage (`bg`, `surface`, `ink`, `line`,
`accent`), pas celui de la marque.

SSOT unique : `src/styles/theme.css`. **Aucune valeur de couleur, graisse, rayon ou
échelle typographique en dur dans un composant.** Un composant qui a besoin d'une
couleur absente du thème signale un problème de conception, pas un manque dans le thème.

## Répartition CSS global / utilities

- **`theme.css`** porte les tokens et le seul CSS non tokenisable : la mécanique de
  défilement à deux axes (`.deck`, `.slide`), que les utilities ne savent pas exprimer.
- **Tout le reste vit dans les composants**, en utilities Tailwind. Pas de classe
  globale qui cible une structure de DOM (`.panel > div > p:first-child` et compagnie).

## Variants

`Record<Variant, classes>` — cf. `StatePill.astro`. Pas de `tailwind-variants` tant
qu'il n'y a pas de variants combinatoires, de slots ou de trois axes croisés.

## Pas de Zod pour l'instant

`src/data/portfolio.ts` est de la donnée locale, typée à la compilation. Il n'y a pas
de frontière externe : parser serait de la revalidation (philosophy §5).

Le jour où le contenu vient d'un CMS, ce module devient un schéma Zod et un client, et
la frontière se place là — à un seul endroit.

## Pas de DDD

Décision explicite : slicing simple (`src/data`, `src/components`, `src/scripts`), pas
de `src/domain/<concept>/`. À réévaluer au branchement du CMS, pas avant.

## Linting

Biome est restreint à `src/**/*.ts`, `src/**/*.css` et aux fichiers JSON racine.
Il ne parse que le frontmatter des fichiers `.astro` et signale comme inutilisées les
props consommées dans le template. Les composants sont couverts par `pnpm type-check`
(`astro check`).

Pré-commit : `pnpm lint && pnpm type-check`.

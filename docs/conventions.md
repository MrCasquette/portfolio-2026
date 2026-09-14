# Conventions de code

Ce qui s'adresse à **qui écrit du code ici**. Une convention se dément par un **diff**.

La source de vérité des idiomes reste `~/.code-conform/docs/` ; ce fichier ne note que ce qui est
spécifique à ce dépôt ou qui tranche un point contextuel. Ce que l'interface doit respecter est dans
[`design/`](./design/vocabulaire.md) — ça se dément par une capture d'écran, pas par un diff. Les
arbitrages datés, avec ce qui a été écarté, sont dans [`decisions/`](./decisions/README.md).

## Langue

Le **code, ses commentaires et les noms de fichiers de `src/`** sont en **anglais**.

Les chaînes adressées au visiteur — `aria-label`, libellés visibles, tout ce qui vit sous `content/` —
sont en **français** : le site est francophone. Les `label` et `hint` des déclarations le sont aussi :
ils s'adressent à qui remplira le formulaire d'administration.

La **documentation** est en français (→ [0015](./decisions/0015-la-documentation-passe-au-francais.md)).
Un commentaire de code qui cite un chemin de `docs/` cite donc un nom français : c'est un identifiant,
pas une phrase.

## CSS global contre utilitaires

- **`theme.css`** porte les tokens et le seul CSS non tokenisable : la mécanique de défilement à deux
  axes (`.deck`, `.slide`) et le chemin, que des utilitaires ne savent pas exprimer.
- **Tout le reste vit dans les composants**, en utilitaires Tailwind. Aucune classe globale visant une
  structure du DOM (`.panel > div > p:first-child` et consorts).

Aucune valeur de couleur, de graisse, de rayon ou d'échelle typographique n'est codée en dur dans un
composant. Un composant qui réclame une couleur absente du thème signale un problème de design, pas un
manque du thème (→ [0002](./decisions/0002-posture-semantique-des-tokens.md)).

## Variants

`Record<Variant, classes>` — voir `atoms/StatePill.astro`. Pas de `tailwind-variants` tant qu'il n'y a
pas de variants combinatoires, de `slots`, ou trois axes croisés.

## Pas de revalidation

`src/content/load.ts` est la **seule** frontière de parsing ; tout en aval lui fait confiance
(philosophy §5). Aucune revalidation dans un composant, aucun schéma écrit à côté d'une déclaration.

Le détail de la chaîne est dans [`architecture/contenu.md`](./architecture/contenu.md).

## Types inférés, jamais redits

Les types viennent de la déclaration (`InferData`, `InferSections`, `InferEntity`). **Pas
d'`interface Props` qui redit un schéma**, pas de codegen.

Les affirmations sur les types inférés vivent dans `src/content/definitions/inference.assert.ts` et
sont exécutées par `pnpm type-check`, qui est leur lanceur de tests. Elles s'écrivent
`Assert<Equals<…>>`, **jamais `@ts-expect-error`** : la directive n'affirme que le fait qu'une ligne
échoue, pas laquelle, donc un import cassé la satisfait aussi bien que l'invariant — et une garde qui
ne peut pas échouer pour la bonne raison n'est pas une garde.

## Fichiers de contenu

YAML sous `content/` : `pages/<slug>.yaml` pour les compositions, `entities/<nom>/<slug>.yaml` pour
les données. **Le nom d'un fichier est son slug**, donc rien ne le répète à l'intérieur.

Le Markdown vit *dans* les champs de texte riche. `parseProse` rend l'arbre, `src/content/render/` le
parcourt, et `proseToHtml()` n'est pas utilisé.

## Pas de DDD

Décision explicite : découpage simple (`src/content`, `src/components`, `src/scripts`), pas de
`src/domain/<concept>/`. Reconsidéré au moment du branchement du système de contenu, comme prévu :
`src/content/` *est* cette tranche, et elle n'a pas eu besoin d'une couche de domaine.

## Outillage

**Biome** est restreint à `src/**/*.ts`, `src/**/*.css` et aux JSON racine. Il ne parse que le
frontmatter des fichiers `.astro` et signalerait comme inutilisées des props consommées dans le
gabarit. Les composants sont couverts par `pnpm type-check` (`astro check`).

**Les tests tournent sur `node --test`**, avec le retrait de types natif de Node — pas de runner, pas
de transformation, pas de dépendance. C'est pourquoi les imports relatifs sous `src/content/` portent
leur extension `.ts` : l'ESM de Node l'exige, et Astro comme TypeScript l'acceptent, donc les mêmes
fichiers sont exécutables et compilables.

**Avant de commiter** : `pnpm lint && pnpm type-check && pnpm test`.

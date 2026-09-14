---
statut : accepté
date : 2026-09-10
type : Architecture
---

# Le contenu déclaré avec Atelier, lu depuis des fichiers, validé ici

## Contexte

`portfolio.schema.ts` décrivait **une** page : une racine de cinq champs, `projects` verrouillé à
trois, `thesis` et `index` en triplets de moments, et une centaine de lignes de `superRefine` pour les
tenir ensemble. Il était posé et jamais branché — aucune page, aucun composant ne l'importait — et il
ne pouvait décrire ni une deuxième page ni une page réordonnée.

Ce qu'on voulait à la place : un registre ouvert de types de contenu, une page composée librement, des
fichiers aujourd'hui et Prisme demain, avec le fournisseur remplaçable.

La question est de savoir **ce qui déclare la forme, et où elle est validée**.

Ce qui pousse la décision :

- Prisme est la cible, et il a déjà ce système. En diverger, c'est payer une traduction à chaque
  frontière, pour toujours.
- La frontière de validation doit rester unique (philosophy §5), et doit pouvoir *se déplacer* quand
  le fournisseur se déplace.
- Aucune coordonnée ne s'écrit dans le contenu. Ce qui remplace `journey.ts` doit encore dériver le
  chemin.

## Options envisagées

- **Un registre à nous, en Zod.** Reproduire à la main la grammaire des onze `kind` et la forme
  `SerializedField`, zéro dépendance, Zod reste primaire. **Écarté** : c'est une copie, et une copie
  d'un paquet publié cesse de le suivre à sa primitive suivante. Ça laisse aussi l'accord avec Prisme
  à la seule vigilance.
- **La Content Layer d'Astro.** `defineCollection` avec un loader `glob()` aujourd'hui et un
  `prismeLoader()` demain ; l'API Loader *est* une abstraction de fournisseur, et elle rend le
  Markdown gratuitement. **Écarté** sur deux points. Le moteur Markdown est déjà tranché et ce n'est
  pas celui d'Astro : `parseProse` rend un arbre, l'arbre est le contrat, et le rendu appartient au
  consommateur (ADR-0061 d'Atelier). Et `defineCollection({ schema })` valide entrée par entrée, donc
  rien de ce qui a besoin de voir une page entière — une référence qui se résout — n'y a sa place.
- **`@axiome-apps/atelier-content` comme déclaration.** Le DSL publié, présent au seul temps du
  développement, que partagent déjà Échoppe et Prisme.

## Décision

Option retenue : déclarer avec Atelier, lire avec un fournisseur à nous, valider au bord de ce
fournisseur.

- **La déclaration est la source de vérité.** `src/content/definitions/` porte `defineSection`,
  `defineEntity`, `defineComponent` ; chaque type est inféré (`InferData`, `InferSections`,
  `InferEntity`) — pas de codegen, et pas d'`interface Props` qui redit un schéma.
- **Le vocabulaire est celui de Prisme** : `section`, `component`, `definition`, `entity`,
  `directive`. Pas « block » — l'ADR-0043 d'Atelier rejette le mot, et s'aligner ne coûte rien
  aujourd'hui.
- **Le Zod est dérivé, pas écrit.** `fields-to-zod.ts` compile une déclaration en validateur, un cas
  par `kind`. Un schéma écrit *à côté* de la déclaration serait une seconde source de vérité qu'il
  faudrait démonter plus tard ; un schéma dérivé est un détail d'implémentation du fournisseur et
  disparaît avec lui, le jour où Prisme valide à l'écriture et où `asSections()` devient honnête.
- **Les invariants vivent avec ce qu'ils contraignent.** Une règle sur un champ se dit sur le champ,
  par `format` (`parse/formats.ts`). Deux choses seulement échappent à cela : la forme d'un arbitrage,
  et le fait qu'une référence se résolve.
- **Le chemin reste dérivé.** Une section ouvre un chapitre et voyage vers la droite ; ce qu'une
  section *contient* descend en elle. Donc `→` et `↓` gardent le sens que leur donne le
  positionnement, par construction plutôt que par un champ.

Les fichiers sont du YAML, pas du Markdown avec un corps : ce contenu est fait de beaucoup de champs
de prose courts, pas de quelques longs documents — un arbitrage en porte quatre — et un corps n'en
porte qu'un. Le Markdown vit *dans* les champs de texte riche, exactement là où Prisme le garde.

### Conséquences

- Bon, parce que le portfolio devient le premier consommateur externe de la plateforme, et donc son
  premier test d'usage réel. Deux manques sont remontés immédiatement sur `atelier-content@0.5.0` :
  `FieldValue` n'était pas exporté, et un composant imbriqué ne pouvait jamais être `required`, faute
  d'un champ correspondant sur `Definition`. **Les deux ont été corrigés en amont en `0.6.1`** —
  `FieldNode`, `FieldValue` et `ComponentField` sont exportés, et `f.component(of, meta)` existe. Le
  passé n'est pas réécrit : les contournements qu'ils imposaient ont disparu, et un troisième constat
  a pris leur place (voir *Pour aller plus loin*).
- Bon, parce que l'index ne redit plus le nom ni l'état d'un projet. Il porte une référence, et une
  référence ne peut pas diverger de ce qu'elle désigne — ce qui retire toute cette classe de
  vérification au lieu de la déplacer.
- Bon, parce que la langue d'un extrait est une énumération, ce qui supprime le cast `lang={… as
  never}` que portait `CodeExcerpt.astro`.
- Mauvais, parce qu'une garantie éditoriale est perdue et ne revient pas : *un moment est porté par
  exactement un projet* était vérifié par le `superRefine` racine et relève désormais de la
  responsabilité de l'éditeur. C'était déjà qualifié de verrou éditorial plutôt que mécanique, mais
  c'était mécanique.
- Mauvais, parce que la déclaration est sciemment plus lâche que le contrat sur un point : la
  grammaire n'a pas d'union de formes, donc `settled` et `open` sont déclarés comme une énumération
  et un jeu de champs optionnels, et les deux formes sont reconstruites à la frontière.
- Mauvais, parce que YAML coerce les types — `value: 2` se lit comme un nombre. Borné, pas évité : le
  schéma dérivé le refuse à la construction, en nommant le champ.

## Pour aller plus loin

`checkRegistry()` ne peut pas s'utiliser hors ligne — il prend une `apiUrl` et une `apiKey`, et Prisme
n'a pas encore de surface de contenu (`prisme-api` monte l'auth, les clés d'API et l'audit, rien
d'autre). Ce qui *peut* se vérifier sans réseau est `serialize()`, et
`definitions/registry.test.ts` le fait : si le registre qu'il produit a la forme qu'attend
`PUT /content/registry`, la déclaration n'a pas dérivé de la cible.

Reste ouvert : quelles directives de prose le portfolio déclare en propre. Le noyau est clos à sept,
`highlight` est la seule en ligne et porte déjà l'accent, et `defineDirective` refuse toute collision
avec elle. → [backlog](../BACKLOG.md).

Un troisième constat, trouvé ici et corrigé en amont le jour même : en `0.6.1`, `f.component(of)` et
`f.list(of)` appelés **sans options** perdaient les drapeaux `required` de la définition imbriquée —
chaque champ du composant se lisait comme optionnel. Un défaut de typage seulement, ce qui est
précisément ce qui valait de le signaler plutôt que de hausser les épaules : `serialize()` et le
validateur dérivé étaient justes, donc le seul coût était la sûreté de typage du front, qui est tout
l'intérêt de « pas de codegen, les déclarations *sont* les types ». Corrigé en `0.6.2`.

Le portfolio garde la garde plutôt que le contournement : `definitions/inference.assert.ts` affirme
qu'un champ requis survit à l'imbrication, à travers un composant et à travers une liste. C'est ce qui
permet à la déclaration d'écrire `f.component(of)` uniformément au lieu de s'appuyer sur la forme nue.

Ces affirmations sont écrites comme des **égalités de types, pas des `@ts-expect-error`**. La
directive n'affirme *que* le fait qu'une ligne échoue, jamais laquelle — donc un import cassé ou un
champ renommé la satisfont aussi bien que l'invariant qu'elle garde, et la garde cesse de garder sans
un mot. C'est arrivé dans ce dépôt pendant l'écriture du fichier. `Assert<Equals<…>>` nomme le type
attendu, donc tout autre échoue ; vérifié en inversant chaque affirmation à son tour, l'import cassé
compris.

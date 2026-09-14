# Le contenu : de la déclaration au rendu

Comment une phrase écrite dans un fichier arrive à l'écran, et ce qui la refuse en chemin.
Pourquoi cette architecture plutôt qu'une autre :
[0012](../decisions/0012-le-contenu-declare-avec-atelier.md).

## La chaîne

```
definitions/          la déclaration — source de vérité de la forme
   │
   ├──▶ parse/fields-to-zod.ts     compile la déclaration en validateur
   │
provider/yaml/        lit les fichiers, ne valide rien
   │
   ▼
load.ts               LA FRONTIÈRE — valide, résout les références, rend la page
   │
   ├──▶ journey.ts    dérive le parcours de ce que la page contient
   └──▶ render/       parcourt l'arbre de prose et l'écrit en HTML
```

## La déclaration est la source de vérité

`src/content/definitions/` déclare le contenu avec `@axiome-apps/atelier-content` —
`defineSection`, `defineEntity`, `defineComponent` — et **tous les types en sont inférés**
(`InferData`, `InferSections`, `InferEntity`). Il n'y a pas de codegen, et **pas d'`interface Props`
qui redit un schéma**.

Le vocabulaire est celui de Prisme, délibérément (→ [glossaire](../glossaire.md#le-contenu)).

Le paquet est une `devDependency` et **rien de ce module ne s'exécute à la requête** : il ne fait
aucun appel. Le jour où Prisme a une surface, `pushRegistry()` envoie ce même objet et l'administration
sait éditer le site sans qu'une ligne change ici. `definitions/registry.test.ts` vérifie sans réseau
que le registre sérialisé a la forme attendue par `PUT /content/registry` : c'est ce qui dit que la
déclaration n'a pas dérivé de sa cible.

Les vocabulaires clos partagés — les trois moments, les trois états d'un projet et leurs libellés
visiteur — vivent dans `definitions/vocabulary.ts`, à côté de ce qu'ils nomment : une énumération lue
par une section *et* par une entité, dédoublée, est une énumération qui ne veut plus rien dire.

## Le Zod est dérivé, pas écrit

`parse/fields-to-zod.ts` compile une déclaration en validateur, un cas par `kind`. Un schéma écrit
*à côté* de la déclaration serait une seconde source de vérité, qu'il faudrait démonter le jour de la
bascule. Un schéma dérivé est un détail d'implémentation du fournisseur, et il disparaît avec lui.

**Un invariant vit avec ce qu'il contraint.** Une règle portant sur un champ se dit sur le champ, par
`format` (`parse/formats.ts`) : ajouter un format, c'est ajouter une ligne là. Deux choses seulement
ne sont pas une propriété d'un champ, et elles vivent dans `parse/rules.ts` — la forme d'un arbitrage,
et le fait qu'une référence se résolve.

## Le fournisseur ne valide rien

`provider/source.ts` définit tout ce que le reste du site sait de l'origine du contenu : une page et
ses sections ordonnées, les occurrences d'une entité. Les formes y sont **délibérément celles de la
plateforme** — une section est `{ id, type, data }`, ce que retourne `GET /pages/by-slug/:slug`.
C'est tout l'intérêt : remplacer un dossier de fichiers par un CMS doit remplacer **le lecteur**, pas
le contenu.

`provider/yaml/` est l'implémentation actuelle. Elle lit, elle ne juge pas.

Le YAML coerce les types — `value: 2` se lit comme un nombre. C'est borné, pas évité : le schéma
dérivé le refuse à la construction, en nommant le champ.

## La frontière

`load.ts` est **le seul endroit où le contenu est parsé**, et tout en aval lui fait confiance. Aucune
revalidation dans un composant.

Deux passes, et l'ordre est le sujet : chaque section et chaque occurrence est validée contre le
schéma dérivé de sa propre déclaration ; **seulement une fois tout en main**, les références sont
résolues — rien de moins que la page assemblée ne peut voir si une référence tombe juste.

Une page absente n'est jamais une page vide : elle échoue.

## Ce qui reste à écrire est compté

Le contrat demande des champs qu'aucune source ne fournit encore. Ces trous sont **marqués, pas
comblés** : `pending.ts` définit le marqueur et la date impossible, `pendingOf()` les liste par
chemin, et un test tient leur compte. Un trou ne peut donc être ni comblé en silence par du
plausible, ni perdu en silence.

La règle éditoriale qui l'exige est dans
[`editorial/regles-d-ecriture.md`](../editorial/regles-d-ecriture.md).

## Le rendu de la prose

Le Markdown vit **dans** les champs de texte riche, là où Prisme le garde aussi : un `richText` est
une colonne de texte, jamais un document.

Le moteur est `@axiome-apps/atelier-prose` : `parseProse` rend un arbre, **l'arbre est le contrat**,
et le rendu appartient au consommateur. `render/` parcourt cet arbre. `proseToHtml()` n'est pas
utilisé — c'est une commodité pour une prévisualisation d'administration.

Un test refuse que quoi que ce soit dans `src/` rende du HTML brut, et un autre qu'un lien
`javascript:` survive à `safeUrl`.

## Les affirmations de typage

Les affirmations sur les types inférés vivent dans `definitions/inference.assert.ts`, et
`pnpm type-check` est leur lanceur de tests.

Elles sont écrites comme `Assert<Equals<…>>`, **jamais comme `@ts-expect-error`** : la directive
n'affirme que le fait qu'une ligne échoue, pas laquelle — donc un import cassé la satisfait aussi bien
que l'invariant qu'elle garde, et une garde qui ne peut pas échouer pour la bonne raison n'est pas une
garde.

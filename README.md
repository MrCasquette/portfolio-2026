# Portfolio

Le portfolio de Vincent Cottalorda. Un front statique qui consomme du contenu déclaré.

Aucun raisonnement ici : chaque point renvoie à la nature qui le porte.

## Démarrer

```sh
pnpm install
pnpm dev
```

## Commandes

| Commande | Ce qu'elle fait |
|---|---|
| `pnpm dev` | serveur de développement |
| `pnpm build` | construit le site dans `dist/` |
| `pnpm preview` | sert la construction |
| `pnpm lint` | Biome |
| `pnpm type-check` | `astro check`, et les affirmations de typage |
| `pnpm test` | `node --test` |

Avant de commiter : `pnpm lint && pnpm type-check && pnpm test`.

## Structure

| Dossier | Ce qu'il porte |
|---|---|
| `content/` | le contenu, en YAML |
| `src/content/` | la frontière : déclaration, validation, chargement, rendu, dérivation du parcours |
| `src/components/` | atomic design |
| `src/styles/` | les tokens, et le seul CSS non tokenisable |
| `docs/` | la documentation |

## La documentation

**Commencer par [`docs/README.md`](./docs/README.md)** : c'est la méthode, elle dit où chaque chose
s'écrit et où chaque chose se lit.

| Question | Où |
|---|---|
| Ce que le site doit prouver | [`docs/editorial/positionnement.md`](./docs/editorial/positionnement.md) |
| Ce que l'interface doit respecter | [`docs/design/vocabulaire.md`](./docs/design/vocabulaire.md) |
| Comment le système est fait | [`docs/architecture/overview.md`](./docs/architecture/overview.md) |
| Comment on écrit du code ici | [`docs/conventions.md`](./docs/conventions.md) |
| Pourquoi tout ceci | [`docs/decisions/README.md`](./docs/decisions/README.md) |
| Ce qu'il reste à faire | [`docs/BACKLOG.md`](./docs/BACKLOG.md) |

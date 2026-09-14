# Vocabulaire visuel

**À lire avant d'écrire du CSS.** Cette page dit ce qu'une modification de l'interface doit respecter.
Ce qui a été essayé et rejeté vit dans [la décision 0013](../decisions/0013-le-registre-visuel-jade-sur-neutre.md),
et ne se relit que pour éviter de refaire un chemin.

## Les non négociables

| Règle | Raison |
|---|---|
| Le fond est muet | Chaque dérive esthétique de ce projet est venue d'un fond portant une teinte : boue, ambre de terminal, vieux papier. Le fond reste strictement neutre. |
| Un seul accent | Le jade signale ce qui tourne, les décisions retenues, les liens, et la position dans la navigation. Rien d'autre. Sa rareté fait sa force. |
| Aucune décoration | Pas de particules, pas de dégradés maillés, pas de textures simulées, pas de glassmorphism, pas de blobs. La profondeur se construit par empilement de surfaces et filets d'un pixel. |
| Un mouvement à la fois | Transitions courtes sur les états. Pas d'animation d'ambiance. `prefers-reduced-motion` honoré partout. |
| Aucune couleur en dur | Toute valeur vient de `theme.css`. Un composant qui réclame une couleur absente du thème signale un problème de design, pas un manque du thème. |
| Aucun thème d'éditeur importé | La coloration syntaxique dérive de la palette du site. Ne pas réintroduire Catppuccin, Nord, Dracula, Rosé Pine. |

Deux usages de l'accent sont explicitement fermés, parce qu'ils se réinstallent d'eux-mêmes :

- **les surtitres ne sont jamais en jade.** Un titre de section ne figure pas dans la liste ci-dessus.
  Ils sont en `ink-3`, sans exception ;
- **les chaînes de caractères d'un bloc de code ne sont jamais en `accent` pur.** Un extrait en porte
  trop pour que la rareté y survive.

La seule exception assumée est le mot accentué du titre d'accueil : un mot, sur un écran, dans tout le
site.

## Palette

Tokens définis dans `src/styles/theme.css`. Les rôles, pour mémoire :

**Surfaces** — `bg` (#151515) → `surface` (#1C1C1C) → `surface-2` (#212121). Les blocs de code
utilisent `code` (#1A1A1A), entre le fond et les cartes.

**Texte** — `ink` pour les titres et le texte fort, `ink-2` pour le corps et les descriptions, `ink-3`
pour les métadonnées et les options écartées.

**Accent** — `accent` (#45B08C) pour tout ce qui est actif. `accent-line` pour les filets et les puces
d'étapes franchies. `accent-bg` pour le fond des pastilles. `accent-halo` pour le halo de la puce
courante du rail.

### Contrastes mesurés sur `bg`

| Token | Ratio | Seuil |
|---|---|---|
| `ink` | ~16:1 | AA texte ✅ |
| `ink-2` #A3A19D | 7,1:1 | AA texte ✅ |
| `ink-3` #807E7A | 4,51:1 | AA texte ✅ |
| `accent` #45B08C | 6,8:1 | AA texte ✅ |
| `accent-line` #35705C | 3,15:1 | composant d'interface ✅ |

`ink-3` porte les libellés du rail et les surtitres : ce sont des éléments de navigation, pas de la
décoration. Il devait passer AA, ce qui a fixé sa valeur.

### Les deux voisinages dangereux du jade

Ils sont traités, et ne se réintroduisent pas :

1. **Le vert « succès ».** Ne pas accentuer la fin d'une chronique d'incident : ça se lit comme une
   coche de validation. L'accent marque le **déclencheur**, pas la résolution.
2. **Le vert « statut ».** Les états ne sont plus tous colorés — ils se distinguent par la forme
   (→ [composants](./composants.md#pastilles-détat)).

## Typographie

**Lexend** pour le titrage et le corps. **JetBrains Mono** pour tout ce qui est technique. Les deux
sont auto-hébergées par Fontsource — aucune requête tierce.

La monospace n'est pas décorative. Elle porte : les surtitres, les puces de technologie, les légendes,
les horodatages, les titres de colonne, les blocs de code, les liens de contact. Ce partage est
structurel : la mono marque ce qui appartient à la machine, la sans ce qui appartient au discours.

Graisses :

- corps `300` — Lexend s'alourdit visiblement à 400 dans un paragraphe ;
- titres `600` ;
- texte fort dans un paragraphe `500` ;
- décisions retenues `400` — elles doivent peser plus que les écartées, restées à 300.

Ne pas dépasser 600 dans un titre : Lexend à 700 devient pâteuse aux grandes tailles.

Les surtitres sont en mono, capitales, `letter-spacing: 0.18em`, couleur `ink-3`. C'est le seul
endroit où les capitales sont employées.

## Mouvement

La règle « pas d'animation d'ambiance » a **une** exception, et une seule : l'indice de défilement du
chapitre d'accueil. Une flèche isolée à droite de l'écran, dont l'opacité et la position oscillent
légèrement.

Elle est admise parce que ce n'est pas de l'ambiance : elle annonce le paradigme de navigation
horizontale, que rien d'autre ne signale à l'arrivée. Elle est bornée :

- **en `ink-3`, jamais en accent** — un indice de défilement n'est ni un lien, ni une position, ni
  quelque chose qui tourne ;
- `aria-hidden` : le rail porte la navigation réelle ;
- les états 0 % et 100 % de l'animation **sont l'état visible**, pour que la neutralisation par
  `prefers-reduced-motion` laisse la flèche lisible plutôt que figée à mi-fondu ;
- masquée sous 1024 px, où le parcours se replie et où la flèche mentirait ;
- le mouvement est déclaré dans `theme.css` (`--animate-scroll-hint`), pas dans le composant : c'est
  un token comme un autre.

Aucune autre animation d'ambiance n'est admise. Une deuxième rendrait la première ordinaire.

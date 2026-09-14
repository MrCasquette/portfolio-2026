---
statut : accepté · précisé par 0014
date : 2026-08-26
type : Méthode
---

# Consigner les décisions dans `docs/decisions`, au format MADR

## Contexte

Les arbitrages étaient suivis dans trois documents et trois formats : le tableau « Discarded, and
why » de `DESIGN.md`, les exceptions écrites au fil des sections à mesure qu'elles apparaissaient, et
`conventions.md`. Aucun n'est daté, aucun n'a de champ explicite pour les options écartées.

La dérive était déjà mesurable : le chemin — la décision structurante de la session — n'apparaissait
dans aucun document, seulement dans un message de commit et des commentaires de code. Alors que
`DESIGN.md` est censé être contraignant.

Ce qui pousse la décision :

- le composant signature du site **est** un registre d'arbitrages. Un projet qui affiche des
  arbitrages et n'en garde aucun pour lui-même a un problème de cohérence ;
- ces arbitrages sont du **contenu réel**, ce qui manque au site ;
- `DESIGN.md` accumulait de l'histoire par-dessus des règles.

## Options envisagées

- **Ne rien formaliser** — continuer d'écrire les décisions dans `DESIGN.md`.
- **`docs/adr/`, gabarit Nygard** — le plus répandu, reconnu au premier coup d'œil. Mais Nygard n'a
  pas de champ dédié aux alternatives : elles vivent dans la prose du contexte, donc elles ne sont
  pas extractibles.
- **`docs/decisions/`, gabarit MADR** — la recommandation la plus récente, et un champ *Options
  envisagées* explicite.

## Décision

Option retenue : « `docs/decisions/`, gabarit MADR ».

`decisions` plutôt qu'`adr` parce qu'il n'est pas tranché que le dossier ne porte jamais que des
décisions d'architecture ; le nom n'aura pas à changer.

MADR pour son champ d'options envisagées, qui se projette un-pour-un sur la colonne « Écarté » du
registre que le site affiche — et, le jour du CMS, sur l'entité `arbitration`, état `open` compris.

### Conséquences

- Bon, parce que le dépôt et le site parlent la même langue, ce qui est en soi une preuve.
- Bon, parce que `DESIGN.md` retrouve son rôle : des règles, pas de l'histoire.
- Mauvais, parce que `conventions.md` recouvre désormais partiellement ce dossier. Résolu par
  [0014](./0014-les-natures-de-la-documentation.md), qui nomme les natures et donne à chacune son
  support.

---
statut : accepté
date : 2026-08-22
type : Éditorial
---

# Le registre d'arbitrages remplace la lecture parallèle nommée

## Contexte

Le concept éditorial construisait la structure des chapitres projet sur une « lecture parallèle » :
deux colonnes explicitement titrées **Construire** et **Coordonner**, alignées phase par phase.

La thèse dit l'inverse : *Coordonner — jamais nommé, jamais revendiqué*. Les deux ne pouvaient pas
coexister, et le composant `ParallelReading` affichait les deux mots littéralement.

Ce qui pousse la décision : la règle d'écriture du projet — rien ne se revendique, tout s'infère —
et le fait que le cadre à deux colonnes était abstrait, décrivant une intention sans la remplir.

## Options envisagées

- **Garder les colonnes nommées** — immédiatement lisible, mais nomme ce qui devrait s'inférer, et
  transforme le site en déclaration sur soi.
- **Garder les colonnes sous d'autres noms** — déplace le problème sans le résoudre.
- **Le registre d'arbitrages** — même emplacement structurel, deux colonnes, une tension, une
  progression verticale, mais rempli d'arbitrages réels.

## Décision

Option retenue : « le registre d'arbitrages ».

La structure à deux voies n'est pas abandonnée, elle est **remplie**. La relation aux deux moitiés
tient sans jamais s'écrire : la colonne « Retenu » et la décision technique relèvent de *Construire* ;
la justification — pourquoi, contre quoi, avec quelle conséquence — est l'artefact de *Coordonner*,
celui qui rend le système intelligible à quelqu'un d'autre.

### Conséquences

- Bon, parce que qui lit trois registres a compris que le profil sait transmettre, sans que le mot
  apparaisse une seule fois.
- Bon, parce que `ParallelReading` et `ProjectChapter` disparaissent.
- Mauvais, parce que la contrainte de contenu devient dure. Un registre inventé se sent
  immédiatement et détruit la crédibilité de l'ensemble.

## Pour aller plus loin

Le document de concept a été réécrit en conséquence plutôt que subordonné : garder deux documents
dont l'un est « subordonné » à l'autre garantissait qu'une session future ouvre le mauvais. Il a
depuis été absorbé par [`editorial/`](../editorial/positionnement.md).

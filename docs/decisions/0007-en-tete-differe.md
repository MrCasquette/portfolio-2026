---
statut : accepté
date : 2026-08-26
type : Design
---

# L'en-tête n'apparaît qu'à partir du deuxième chapitre

## Contexte

L'en-tête porte l'identité — le nom et la manière de travailler. Le chapitre d'accueil la porte
aussi. Les deux la disaient donc en même temps, sur le même écran.

## Options envisagées

- **L'accueil est la version longue, l'en-tête l'abrégée** — la redondance demeure, mais assumée :
  l'en-tête est du chrome persistant.
- **L'en-tête n'apparaît qu'à partir du chapitre 2** — son rôle est de rappeler ; il n'a pas d'objet
  tant qu'on est sur le chapitre qui porte l'identité.

## Décision

Option retenue : « l'en-tête n'apparaît qu'à partir du chapitre 2 ».

L'interface se montre quand elle devient utile. Fondu de 300 ms, `pointer-events: none` tant qu'elle
est masquée.

### Conséquences

- Bon, parce que l'accueil perd une redondance, et que l'apparition de l'en-tête accompagne le
  premier déplacement.
- Mauvais, parce que **le chapitre d'accueil doit nommer Vincent**. Sans cela, rien ne le fait sur le
  premier écran et le lecteur est perdu. C'est une contrainte de contenu, pas de forme.

## Pour aller plus loin

Piloté depuis la position de défilement, pas depuis un observateur d'intersection.

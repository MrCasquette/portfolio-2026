---
statut : accepté · corrige 0006
date : 2026-08-26
type : Design
---

# Ancrer les chapitres de survol sur le chemin, par construction

## Contexte

Le chemin tient une hauteur constante, `--spacing-path`, et se lit le mieux quand un élément encadré
le croise ([0006](./0006-le-chemin.md)). Profil et Réalisations étaient centrés verticalement dans
leur chapitre : le croisement était donc une coïncidence, dépendant de la hauteur qu'avait le contenu.
C'était consigné comme un défaut connu, laissé ouvert.

Deux faits l'ont refermé.

Le premier est que la hauteur n'est pas libre. Testée à 58 % pour améliorer le croisement, la ligne
s'approche assez du milieu pour se lire comme un **séparateur coupant la page en deux** plutôt que
comme un horizon. Être nettement sous le milieu est ce qui fait du filet un chemin :
`--spacing-path` est une contrainte, pas un réglage.

Le second en découle : si la hauteur ne peut pas bouger, c'est le contenu qui doit.

## Options envisagées

- **Réaccorder `--spacing-path`** sur la valeur qui croise les encadrés. Écarté deux fois : ça
  déplace une valeur qui porte du sens, et c'est une mesure du contenu d'aujourd'hui qu'un seul
  panneau ajouté ou un chapô plus long falsifie. Ça remplace une coïncidence par une coïncidence
  mieux calibrée.
- **Donner à chaque chapitre sa propre hauteur de chemin** pour les accorder un à un. Écarté : un
  filet qui change de niveau entre chapitres cesse d'être une ligne continue, et le chemin n'existe
  que parce qu'il est continu.
- **Ancrer le contenu sur la ligne par construction** — exprimer le croisement comme une règle de
  mise en page plutôt que comme un nombre.

## Décision

Option retenue : ancrer par construction, sous la forme de `.slide-on-path`.

Le contenu est placé à la hauteur du chemin — contre la même boîte que celle contre laquelle le
chemin résout son propre `top` — puis remonté de la moitié de sa propre hauteur. La tête
(`.slide-head`) est sortie du flux, si bien que cette hauteur est exactement celle de la rangée
encadrée : `.slide-row` se pose centrée sur la ligne quel que soit son poids.

La tête est ensuite accrochée au haut de la rangée plutôt qu'à la ligne. Cette distinction est toute
l'astuce : la moitié d'une rangée haute remonte bien au-dessus du chemin, donc une tête ancrée sur la
ligne finirait sous la rangée qu'elle introduit.

Rien là-dedans ne lit une hauteur de contenu : le croisement est exact quel que soit le poids du
chapitre.

### Conséquences

- Bon, parce que le contenu peut désormais grandir librement : ajouter un panneau, une carte ou une
  ligne de chapô ne peut pas désynchroniser le croisement.
- Bon, parce que `--spacing-path` retrouve un sens unique — où se tient l'horizon — au lieu de servir
  aussi de molette de réglage.
- Mauvais, parce que l'ancrage sort le contenu du flux, et qu'un débordement vers le haut est
  inatteignable : aucune barre de défilement ne remonte au-dessus du bord supérieur. Sous 700 px de
  hauteur, le chapitre revient au flux centré et abandonne le croisement plutôt que la lisibilité.
- Mauvais, parce que les chapitres qui l'utilisent doivent exposer une tête et une seule rangée
  encadrée. Un chapitre à deux rangées à croiser demanderait une autre règle.

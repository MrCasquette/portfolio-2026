# Concept du portfolio

## Statut du document

Ce document décrit le concept éditorial et l'expérience de navigation.

Il décrit **quoi** montrer et **pourquoi**. [`DESIGN.md`](./DESIGN.md) décrit **comment** —
et prime en cas de divergence. Les réflexions en cours restent dans
[`SCRATCHPAD.md`](../SCRATCHPAD.md).

## Objectif

Le portfolio présente un profil professionnel transversal à quelqu'un qui recrute —
CDI ou mission. Pas un client final, qui passe par un autre site.

Il défend une seule affirmation :

> Il tient un système entier, et il le rend lisible aux autres.

Les technologies servent de preuves. Elles ne constituent pas l'identité du profil.

## Ce qui est démontré, et comment

Deux moitiés, de statuts très différents :

- **Construire** — la preuve qu'un système existe, tourne, et a survécu à un incident.
  Cette moitié se montre.
- **Coordonner** — la preuve que le système reste opérable par quelqu'un d'autre.
  Cette moitié **ne se nomme jamais**. Elle se déduit des artefacts.

D'où la règle de rédaction qui gouverne tout le contenu : **rien n'est revendiqué,
tout se déduit**. Les faits, oui. Les qualificatifs sur soi, non.

## Le registre de décisions

Une version antérieure de ce document décrivait une « lecture parallèle » : deux
colonnes nommées *Construire* et *Coordonner*, alignées phase par phase le long d'une
timeline verticale. Cette structure décrivait une intention. Le **registre de décisions**
en est la réalisation.

Il occupe le même emplacement structurel — deux colonnes, une tension, une progression
verticale — mais avec du contenu réel à la place d'un cadre abstrait :

```
┌─ RETENU ───────────────────┬─ ÉCARTÉ ────────────────────┐
│ ● Serveur dédié bare metal │ ~~Infrastructure managée~~  │
├────────────────────────────┴─────────────────────────────┤
│ │ La charge est constante et le stockage dominant…       │
└──────────────────────────────────────────────────────────┘
```

Le rapport aux deux moitiés se maintient sans jamais être écrit :

- la colonne **Retenu** et la décision technique, c'est *Construire* ;
- le **motif** — pourquoi, contre quoi, avec quelle conséquence — est l'artefact de
  *Coordonner* : c'est lui qui rend le système intelligible à quelqu'un d'autre.

Quelqu'un qui lit trois registres a compris que le profil sait transmettre, sans que
le mot apparaisse une seule fois.

**Deux contraintes fortes.** Chaque entrée doit correspondre à un arbitrage réel : un
registre inventé se sent immédiatement. Et une décision **non encore tranchée** est une
entrée légitime — c'est ce qui donne sa valeur à la pièce en chantier.

## Les trois états

Les réalisations sont montrées dans trois états, et c'est délibéré :

- **en production** — prouve qu'on sait exploiter ;
- **livré** — prouve un résultat ;
- **en chantier** — prouve qu'on sait arbitrer.

Les trois ensemble disent quelque chose qu'aucun ne dit seul. Un projet inachevé n'est
pas une faiblesse à masquer, c'est le seul endroit où l'on voit un arbitrage en cours.

## Architecture du parcours

```text
Accueil → Profil → Réalisations → Projet 01 → Projet 02 → Projet 03 → Contact
```

Le nombre et le nom des projets dépendent du contenu disponible et **vont évoluer**.
Cette structure décrit une intention de parcours, pas une arborescence figée : rien
dans le code ne connaît la longueur du parcours à l'avance.

## Grammaire spatiale

Deux axes complémentaires.

**Horizontal** — le parcours global. Aller à droite : chapitre suivant. C'est la
navigation principale, matérialisée par le rail en bas d'écran.

**Vertical** — l'approfondissement du chapitre courant : registre de décisions,
chronologie d'incident, extrait de code.

Le lecteur pressé traverse, le lecteur intéressé descend. Personne n'est filtré.

Sous 768 px, les deux axes tactiles se marchent dessus : le parcours se replie en
défilement vertical unique.

## Navigation persistante

**En-tête** — fixe, il porte l'identité : nom et fonction du portfolio. Pas de menu.

**Rail bas** — la navigation principale. Il matérialise la progression, donne la
position courante et permet d'atteindre directement chaque chapitre.

## Principes UX

Le portfolio doit être :

- original mais immédiatement compréhensible ;
- accessible au clavier et compatible avec les préférences de réduction des animations ;
- utilisable à la souris, au trackpad et au toucher ;
- rapide à parcourir ;
- centré sur la lecture et non sur la démonstration d'interface.

L'originalité doit toujours servir la compréhension du contenu.

Le comportement natif du navigateur et le CSS sont privilégiés. JavaScript n'intervient
que là où le comportement attendu ne peut pas être garanti autrement — et jamais pour
détourner le défilement.

## Hors périmètre actuel

- les textes finaux et le contenu réel des registres ;
- la liste et l'ordre définitifs des projets ;
- le second appui d'identité (cf. `DESIGN.md` §9).

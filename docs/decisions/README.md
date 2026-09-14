# Le journal des décisions

Il dit ce qu'on a décidé et pourquoi, à date. **On ne l'ouvre jamais pour écrire** — cf. la
[méthode de documentation](../README.md), qui dit aussi
[comment s'écrit une décision](../README.md#une-décision).

Le tableau ci-dessous est une **vue** : chaque champ vit dans le fichier de la décision.

Le champ `Type` nomme **la nature qui porte l'état courant** — c'est là qu'on lira ce qui vaut
aujourd'hui, la décision ne disant que ce qui a été tranché et quand.

| N° | Titre | Type | Statut |
|----|-------|------|--------|
| [0001](./0001-consigner-les-decisions-en-madr.md) | Consigner les décisions dans `docs/decisions`, au format MADR | Méthode | accepté · précisé par [0014](./0014-les-natures-de-la-documentation.md) |
| [0002](./0002-posture-semantique-des-tokens.md) | Posture sémantique des tokens | Design | accepté · précisé par [0013](./0013-le-registre-visuel-jade-sur-neutre.md) |
| [0003](./0003-le-registre-remplace-la-lecture-parallele-nommee.md) | Le registre d'arbitrages remplace la lecture parallèle nommée | Éditorial | accepté |
| [0004](./0004-conversion-d-axe-de-la-molette.md) | Conversion d'axe de la molette, arbitrée par la profondeur du chapitre | Design | accepté · précisé par [0011](./0011-chapitres-projet-en-panneaux-aimantes.md) |
| [0005](./0005-le-rail-en-liens-plutot-qu-en-boutons.md) | Le rail de navigation en liens plutôt qu'en boutons | Design | accepté |
| [0006](./0006-le-chemin.md) | Le chemin : matérialiser l'axe horizontal par un filet continu | Design | accepté · corrigé par [0010](./0010-ancrer-les-chapitres-de-survol-sur-le-chemin.md) |
| [0007](./0007-en-tete-differe.md) | L'en-tête n'apparaît qu'à partir du deuxième chapitre | Design | accepté |
| [0008](./0008-la-stack-portee-par-chaque-projet.md) | Les technologies sont portées par chaque projet, pas par l'accueil | Éditorial | accepté |
| [0009](./0009-fond-opaque-plutot-que-backdrop-filter.md) | Fond opaque plutôt que `backdrop-filter` sur l'en-tête et le rail | Design | accepté |
| [0010](./0010-ancrer-les-chapitres-de-survol-sur-le-chemin.md) | Ancrer les chapitres de survol sur le chemin, par construction | Design | accepté · corrige [0006](./0006-le-chemin.md) |
| [0011](./0011-chapitres-projet-en-panneaux-aimantes.md) | Les chapitres projet comme colonne de panneaux aimantés | Design | accepté · précise [0004](./0004-conversion-d-axe-de-la-molette.md) |
| [0012](./0012-le-contenu-declare-avec-atelier.md) | Le contenu déclaré avec Atelier, lu depuis des fichiers, validé ici | Architecture | accepté |
| [0013](./0013-le-registre-visuel-jade-sur-neutre.md) | Le registre visuel : jade sur neutre, et ce qu'il écarte | Design | accepté · précise [0002](./0002-posture-semantique-des-tokens.md) |
| [0014](./0014-les-natures-de-la-documentation.md) | La documentation a des natures, et un dossier se mérite | Méthode | accepté · précise [0001](./0001-consigner-les-decisions-en-madr.md) |
| [0015](./0015-la-documentation-passe-au-francais.md) | La documentation passe au français | Méthode | accepté |

## Le gabarit

Copier [`0000-gabarit.md`](./0000-gabarit.md).

Le champ **Options envisagées** est celui qui compte — il porte ce qui a été écarté, il se projette
un-pour-un sur la colonne « Écarté » du registre que le site affiche, puis sur l'entité `arbitration`
du contenu, état `open` compris.

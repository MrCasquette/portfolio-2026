# Backlog

Ce qu'il reste à faire **avant la mise en ligne**, et rien d'autre. Comment s'écrit une ligne :
[méthode](./README.md#une-ligne-de-backlog).

Une tâche finie est **supprimée, jamais cochée**. Avant de la supprimer, consolider ce qu'elle a
produit de durable dans la nature concernée.

**Priorités** — 🔴 bloque la mise en ligne · 🟠 la dégrade sérieusement · 🟡 à faire · ⚪ à décider

---

## Contenu

- [ ] 🔴 **Écrire le contenu réel.** Trente-six champs portent un marqueur `⟨à écrire⟩` et trois
  arbitrages une date impossible. Les registres, la chronique et les extraits de code restent des
  reconstructions plausibles et doivent être remplacés par les notes réelles — un marqueur ne se
  comble jamais par du vraisemblable
  ([règles d'écriture](./editorial/regles-d-ecriture.md#les-trois-contraintes-dures-du-contenu)).
  `pendingOf()` les liste par chemin, et `load.test.ts` tient le compte : le chiffre ci-dessus baisse
  avec le travail, il ne se met pas à jour à la main.

  Répartition : Plume six, Atelier quatre, la page d'accueil trois, le serveur trois, les extraits
  quatre, le reste un par fichier.

- [ ] ⚪ **Le portrait cognitif.** Une justification d'arbitrage mentionne une mémoire épisodique peu
  fiable comme motif du choix d'Ansible. L'argument est fort, mais c'est une divulgation personnelle.
  **Une décision à prendre, pas à trancher par défaut** — le contenu ne doit pas l'inclure tant
  qu'elle n'est pas prise.

## Identité du site

- [ ] 🔴 **Le second appui d'identité.** Le registre d'arbitrages porte la singularité seul. Ce qui le
  renforcera doit sortir du **contenu**, pas de la décoration
  ([0013](./decisions/0013-le-registre-visuel-jade-sur-neutre.md) ferme la voie décorative). Deux
  pistes issues du système existant : l'**arbitrage non tranché** porté comme une forme à part
  entière, et la pastille **`en chantier`** assumée sur un projet réel.

## Système de contenu

- [ ] 🟡 **Décider des directives de prose propres au portfolio.** Le noyau est clos à sept,
  `highlight` est la seule en ligne et porte déjà l'accent, et `defineDirective` refuse toute
  collision avec lui. `directives` est déclaré vide plutôt que deviné
  ([0012](./decisions/0012-le-contenu-declare-avec-atelier.md)).

## Mise en ligne

- [ ] 🔴 **Choisir l'hébergement et écrire la procédure.** La sortie est statique et aucun hébergeur
  n'est retenu. Ce choix **ouvre la nature `operations`** : la procédure s'écrit une fois exécutée,
  pas avant ([méthode](./README.md#une-page-doperations)).

## Dette

- [ ] 🟡 **Statuer sur `src/pages/poc.astro`.** Le prototype qui a validé le serpentin. Sa question
  est répondue et le mécanisme est porté par le site ; il reste dans le dépôt sans lien entrant. Soit
  il est supprimé — ce que la méthode prescrit d'un artefact de travail —, soit ce qu'il démontre
  encore est nommé et il devient autre chose qu'un reste.

- [ ] 🟡 **L'invariant « un panneau, un écran » n'est vérifié nulle part.** C'est une règle d'écriture,
  et rien n'échoue bruyamment quand le contenu la casse
  ([0011](./decisions/0011-chapitres-projet-en-panneaux-aimantes.md)). Un panneau trop haut sous
  aimantage `mandatory` rend son contenu partiellement inatteignable — le défaut est silencieux et se
  découvre à la lecture.

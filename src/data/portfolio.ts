/**
 * Portfolio content.
 *
 * Local data, typed at compile time: no parsing or validation here, the
 * external boundary does not exist yet. The day content comes from a CMS, this
 * module becomes a Zod schema and a client.
 */

export type ProjectStatus = 'production' | 'delivered' | 'wip';

/**
 * One entry in the decision ledger.
 *
 * `settled` and `open` are two distinct shapes, not one shape missing a field:
 * an unsettled decision has nothing kept, and the rendering must refuse to give
 * it the accent bullet.
 */
export type Decision =
  | { state: 'settled'; kept: string; discarded: string; rationale: string }
  | { state: 'open'; options: [string, string]; rationale: string };

export type IncidentEvent = { at: string; label: string };

export type CodeExcerpt = {
  source: string;
  lang: string;
  code: string;
};

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  /** Short summary, on the work card. */
  teaser: string;
  /** Introduction to the project chapter. */
  intro: string;
  /** What was used *on this project* — not a catalogue of mastery. */
  stack: string[];
  decisions: Decision[];
  incident?: IncidentEvent[];
  excerpt?: CodeExcerpt;
};

export const identity = {
  name: 'Vincent Cottalorda',
  tagline: 'Concevoir des systèmes cohérents',
} as const;

export const landing = {
  availability: 'Disponible · CDI ou mission · à distance',
  title: ['Ce site montre', 'comment je décide,', 'avant de montrer avec quoi.'],
  /** The word accented in the heading — the only one on the whole site. */
  emphasis: 'décide',
  lede: "Développeur, à distance depuis l'Ardèche. Ce qui suit se lit dans l'ordre : d'abord d'où vient cette manière de travailler, ensuite des systèmes réels et les arbitrages qui les ont faits — y compris ceux qui ne sont pas encore tranchés.",
} as const;

export const profile = {
  title: 'Je code depuis 2008.',
  lede: "Pas une reconversion : une pratique continue, menée en parallèle d'autres métiers qui ont payé le loyer et qui ont construit l'autre moitié de ce que je sais faire.",
  panels: [
    {
      title: 'Ce que je fais tourner',
      items: [
        {
          lead: 'Du code jusqu’à la production.',
          text: 'Frontend, API, base, conteneurs, reverse proxy, supervision, sauvegardes.',
        },
        {
          lead: 'De l’infrastructure reproductible.',
          text: 'Ansible comme source de vérité, machine reconstructible depuis zéro.',
        },
        {
          lead: 'De la documentation qui sert.',
          text: 'Décisions datées, procédures qu’un tiers peut suivre sans moi.',
        },
      ],
    },
    {
      title: 'Ce que j’apporte d’ailleurs',
      items: [
        {
          lead: 'Expliquer du complexe à des non-experts.',
          text: 'Sept ans au comptoir d’une pharmacie, sans marge d’erreur.',
        },
        {
          lead: 'Le calme en incident.',
          text: 'Urgences officine, rushs en restauration : la panique se travaille avant, pas pendant.',
        },
        {
          lead: 'Faire monter quelqu’un.',
          text: 'Formateur d’équipiers, transmission technique.',
        },
      ],
    },
  ],
} as const;

export const work = {
  title: 'Trois pièces, trois états.',
  lede: "Un projet fini prouve un résultat. Un projet qui tourne prouve qu'on sait l'exploiter. Un projet en cours prouve qu'on sait arbitrer. Les trois ensemble disent quelque chose qu'aucun ne dit seul.",
} as const;

export const projects: Project[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    status: 'production',
    teaser:
      'Serveur dédié, une quinzaine de services, supervision et sauvegardes vérifiées. Un incident réel, documenté de bout en bout.',
    intro:
      "La configuration vit dans un dépôt, pas dans ma mémoire. C'est une contrainte que je me suis imposée tôt et qui s'est révélée être la meilleure décision d'exploitation que j'aie prise.",
    stack: ['Debian', 'Docker', 'Ansible', 'CrowdSec'],
    decisions: [
      {
        state: 'settled',
        kept: 'Serveur dédié bare metal',
        discarded: 'Infrastructure managée, scalable à la demande',
        rationale:
          'La charge est constante et le stockage dominant. Le managé coûtait trois fois plus pour un service identique.',
      },
      {
        state: 'settled',
        kept: 'Ansible comme source de vérité unique',
        discarded: 'Configuration manuelle, documentée après coup',
        rationale:
          'Une documentation se désynchronise en silence. Un playbook qui échoue se voit tout de suite.',
      },
      {
        state: 'settled',
        kept: 'Sauvegardes restaurées à blanc chaque trimestre',
        discarded: 'Snapshots hébergeur seuls',
        rationale: 'Une sauvegarde jamais restaurée est une hypothèse, pas une sauvegarde.',
      },
    ],
    incident: [
      {
        at: 'T+0',
        label: 'Avril 2026 — alerte de charge CPU hors fenêtre de traitement planifiée.',
      },
      {
        at: 'T+12 min',
        label: 'Processus non référencé identifié dans un conteneur. Arrêt, isolation réseau.',
      },
      {
        at: 'T+40 min',
        label: 'Vecteur remonté : vulnérabilité connue, version en retard de deux correctifs.',
      },
      {
        at: 'T+2 h',
        label:
          'Image reconstruite depuis une base saine, secrets tournés, absence de persistance vérifiée.',
      },
      {
        at: 'Depuis',
        label:
          'Pare-feu restreint, détection affinée par service, veille de mises à jour automatisée sur toutes les images.',
      },
    ],
    excerpt: {
      source: 'crowdsec · parser dédié',
      lang: 'yaml',
      code: `# ne déclenche que sur des codes réellement exploitables
filter: "evt.Meta.service == 'web' && evt.Parsed.status in ['401','403','429']"
name:   cottalorda/web-probe
nodes:
  - grok:
      pattern:  '%{IPORHOST:remote} %{WORD:verb} %{URIPATH:path}'
      apply_on: message
leakspeed: 10s
capacity:  5   # 5 sondes en 10 s → bannissement`,
    },
  },
  {
    id: 'plume',
    title: 'Plume',
    status: 'delivered',
    teaser:
      "Outil d'écriture open source. Périmètre fermé volontairement, avec la liste écrite de ce qu'il ne fera jamais.",
    intro:
      "Outil d'écriture open source. Ce qu'il fait, il le fait entièrement. Ce qu'il ne fera jamais est écrit dans le dépôt, parce qu'un périmètre non écrit finit toujours par s'étendre.",
    stack: ['TypeScript', 'Bun', 'Elysia', 'Drizzle', 'Zod', 'CASL', 'Postgres'],
    decisions: [
      {
        state: 'settled',
        kept: 'Elysia · Bun · Drizzle · Zod · CASL',
        discarded: 'Directus comme socle applicatif',
        rationale:
          "Le passage en licence MSCL rendait la dépendance risquée pour un projet destiné à durer. Payer la reconstruction une fois plutôt qu'hériter d'une contrainte que je ne contrôle pas.",
      },
      {
        state: 'settled',
        kept: 'Schéma validé à la frontière, typé de bout en bout',
        discarded: 'Validation applicative au cas par cas',
        rationale: 'Un seul endroit déclare la forme des données, le compilateur propage le reste.',
      },
      {
        state: 'settled',
        kept: 'Autorisation déclarative, testée isolément',
        discarded: 'Contrôles dispersés dans les routes',
        rationale:
          "Une règle d'accès éparpillée est une règle qu'on ne peut pas relire. Celle-ci tient dans un fichier.",
      },
    ],
    excerpt: {
      source: "plume · politique d'accès",
      lang: 'typescript',
      code: `export const defineAbility = (user: User) => {
  const { can, cannot, build } = new AbilityBuilder(createAbility)

  can('read', 'Document', { published: true })
  can('manage', 'Document', { authorId: user.id })
  cannot('delete', 'Document', { locked: true })
    .because('Un document verrouillé se déverrouille avant de se supprimer.')

  return build()
}`,
    },
  },
  {
    id: 'atelier',
    title: 'Atelier',
    status: 'wip',
    teaser:
      'Deux briques, Échoppe et Prisme, sur un socle commun. Montré avec ses arbitrages encore ouverts.',
    intro:
      "Ce projet n'est pas fini, et c'est pour ça qu'il est ici. Deux briques, Échoppe et Prisme, sur un socle commun. Les arbitrages en cours en disent plus long qu'un projet poli.",
    stack: ['TypeScript', 'Vue', 'Postgres'],
    decisions: [
      {
        state: 'settled',
        kept: 'Un socle partagé, deux briques distinctes',
        discarded: 'Deux applications indépendantes',
        rationale:
          'Le modèle de données est commun à 80 %. Le dupliquer, c’est signer pour deux migrations à chaque évolution.',
      },
      {
        state: 'open',
        options: [
          'Attendre le deuxième usage réel pour fixer le périmètre du socle',
          'Trancher maintenant, sur un seul usage',
        ],
        rationale:
          "Factoriser trop tôt produit une abstraction qui ne sert qu'un cas. La décision reste ouverte tant qu'Échoppe est le seul consommateur.",
      },
    ],
  },
];

export const contact = {
  title: 'Ce que je cherche',
  lede: "Une équipe ou une structure où quelqu'un doit tenir un système entier et le laisser lisible derrière lui. CDI ou mission, à distance depuis l'Ardèche.",
  links: [
    { label: 'vincent@…', href: 'mailto:cottalorda.vincent@pm.me' },
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'CV (PDF)', href: '#' },
  ],
} as const;

export const statusLabels: Record<ProjectStatus, string> = {
  production: 'en production',
  delivered: 'livré',
  wip: 'en chantier',
};

/**
 * Rail steps, derived from the content: the number of projects is not fixed,
 * and no component should know the length of the journey in advance.
 */
export const chapters = [
  { id: 'landing', label: 'Accueil' },
  { id: 'profile', label: 'Profil' },
  { id: 'work', label: 'Réalisations' },
  ...projects.map((project, index) => ({
    id: project.id,
    label: `Projet ${String(index + 1).padStart(2, '0')}`,
  })),
  { id: 'contact', label: 'Contact' },
];

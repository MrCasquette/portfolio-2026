/**
 * Draft content, parsed against the contract.
 *
 * Every string here comes from `portfolio.ts`, `docs/POSITIONNEMENT.md` or the
 * repository — nothing was invented. What the contract requires and the
 * existing content does not carry is marked with {@link todo} rather than
 * filled with something plausible: a fabricated consequence or a fabricated
 * date is exactly what POSITIONNEMENT §6 forbids.
 *
 * `PORTFOLIO_DRAFT` therefore parses — it proves the contract holds — while
 * {@link pendingMarkers} lists, by path, everything still waiting on Vincent.
 *
 * This module is a working fixture. It is not what the site serves, and it
 * disappears the day `portfolio.ts` is migrated onto the contract.
 */

import { type Portfolio, PortfolioSchema } from './portfolio.schema';

/** Marks a value the contract demands and no existing source provides. */
const todo = (what: string) => `⟨à écrire⟩ ${what}`;

/** Obviously unreal, and still a valid ISO date so the fixture parses. */
const TODO_DATE = '0001-01-01';

const draft = {
  // ── Accueil ───────────────────────────────────────────────────────────────
  // `landing`, three title lines joined: the break is the design system's call.
  statement: {
    title: 'Ce site montre comment je décide, avant de montrer avec quoi.',
    emphasis: 'décide',
    description:
      "Ce qui suit se lit dans l'ordre : d'abord d'où vient cette manière de travailler, ensuite des systèmes réels et les arbitrages qui les ont faits — y compris ceux qui ne sont pas encore tranchés.",
    identification: "Développeur, à distance depuis l'Ardèche.",
    availability: 'Disponible · CDI ou mission · à distance',
  },

  // ── Profil ────────────────────────────────────────────────────────────────
  // `profile` for the anchor, POSITIONNEMENT §1 for the clause. The three costs
  // of absence exist nowhere yet: they are the thesis itself.
  thesis: {
    anchor: {
      since: '2008',
      produced:
        "Pas une reconversion : une pratique continue, menée en parallèle d'autres métiers qui ont payé le loyer et qui ont construit l'autre moitié de ce que je sais faire.",
    },
    moments: [
      {
        moment: 'design',
        costOfAbsence: todo('ce qui casse quand personne ne tient la conception'),
      },
      {
        moment: 'build',
        costOfAbsence: todo('ce qui casse quand personne ne tient la construction'),
      },
      {
        moment: 'operate',
        costOfAbsence: todo("ce qui casse quand personne ne tient l'exploitation"),
      },
    ],
    clause: 'Je ne prétends pas être spécialiste de chacune de ces disciplines.',
  },

  // ── Réalisations ──────────────────────────────────────────────────────────
  // `work.title` verbatim; the three `proves` are `work.lede` split in three.
  index: {
    title: 'Trois pièces, trois états.',
    entries: [
      {
        moment: 'design',
        name: 'Atelier',
        proves: "Qu'on sait arbitrer, avant que le système soit stabilisé.",
        state: 'in-progress',
        target: '#atelier',
      },
      {
        moment: 'build',
        name: 'Plume',
        proves: "Qu'un résultat existe, installable ailleurs que sur ma machine.",
        state: 'shipped',
        target: '#plume',
      },
      {
        moment: 'operate',
        name: 'Mon serveur',
        proves: "Qu'on sait l'exploiter dans la durée, incidents compris.",
        state: 'in-production',
        target: '#serveur',
      },
    ],
  },

  projects: [
    // ── Atelier — concevoir ─────────────────────────────────────────────────
    {
      intro: {
        id: 'atelier',
        moment: 'design',
        name: 'Atelier',
        state: 'in-progress',
        stakes:
          "Ce projet n'est pas fini, et c'est pour ça qu'il est ici. Deux briques, Échoppe et Prisme, sur un socle commun. Les arbitrages en cours en disent plus long qu'un projet poli.",
        facts: [
          { value: todo('chiffre exact'), label: todo('ce que le chiffre compte') },
          { value: todo('chiffre exact'), label: todo('ce que le chiffre compte') },
        ],
        source: undefined,
      },
      arbitrations: [
        {
          status: 'settled',
          id: 'atelier-socle-partage',
          project: 'atelier',
          stakes:
            'Deux briques sur un modèle de données commun à 80 % : un socle partagé, ou deux applications indépendantes ?',
          decided: 'Un socle partagé, deux briques distinctes',
          rejected: [
            {
              option: 'Deux applications indépendantes',
              reason:
                'Le modèle de données est commun à 80 %. Le dupliquer, c’est signer pour deux migrations à chaque évolution.',
            },
          ],
          consequence: todo('ce qui a été constaté depuis — jamais ce qui était prévu'),
          date: TODO_DATE,
        },
        {
          status: 'open',
          id: 'atelier-perimetre-socle',
          project: 'atelier',
          stakes: "Jusqu'où le socle doit-il aller tant qu'Échoppe en est le seul consommateur ?",
          options: [
            'Attendre le deuxième usage réel pour fixer le périmètre du socle',
            'Trancher maintenant, sur un seul usage',
          ],
          opening:
            "Factoriser trop tôt produit une abstraction qui ne sert qu'un cas. La décision reste ouverte tant qu'Échoppe est le seul consommateur.",
          date: TODO_DATE,
        },
      ],
    },

    // ── Plume — construire ──────────────────────────────────────────────────
    {
      intro: {
        id: 'plume',
        moment: 'build',
        name: 'Plume',
        state: 'shipped',
        stakes:
          "Outil d'écriture open source. Ce qu'il fait, il le fait entièrement. Ce qu'il ne fera jamais est écrit dans le dépôt, parce qu'un périmètre non écrit finit toujours par s'étendre.",
        facts: [
          {
            value: todo('nombre de plateformes, ou de releases'),
            label: todo('ce que le chiffre compte'),
          },
          { value: todo('chiffre exact'), label: todo('ce que le chiffre compte') },
        ],
        coveredFunctions: [
          todo('rôle réellement tenu sur ce projet'),
          todo('rôle réellement tenu sur ce projet'),
        ],
        source: undefined,
      },
      arbitrations: [
        {
          status: 'settled',
          id: 'plume-socle-applicatif',
          project: 'plume',
          stakes: 'Reconstruire le socle applicatif, ou hériter de Directus ?',
          decided: 'Elysia · Bun · Drizzle · Zod · CASL',
          rejected: [
            {
              option: 'Directus comme socle applicatif',
              reason:
                "Le passage en licence MSCL rendait la dépendance risquée pour un projet destiné à durer. Payer la reconstruction une fois plutôt qu'hériter d'une contrainte que je ne contrôle pas.",
            },
          ],
          consequence: todo('ce qui a été constaté depuis'),
          date: TODO_DATE,
        },
        {
          status: 'settled',
          id: 'plume-frontiere-validation',
          project: 'plume',
          stakes: 'Où la forme des données est-elle déclarée ?',
          decided: 'Schéma validé à la frontière, typé de bout en bout',
          rejected: [
            {
              option: 'Validation applicative au cas par cas',
              reason:
                'Un seul endroit déclare la forme des données, le compilateur propage le reste.',
            },
          ],
          consequence: todo('ce qui a été constaté depuis'),
          date: TODO_DATE,
        },
        {
          status: 'settled',
          id: 'plume-autorisation-declarative',
          project: 'plume',
          stakes: "Où vivent les règles d'accès ?",
          decided: 'Autorisation déclarative, testée isolément',
          rejected: [
            {
              option: 'Contrôles dispersés dans les routes',
              reason:
                "Une règle d'accès éparpillée est une règle qu'on ne peut pas relire. Celle-ci tient dans un fichier.",
            },
          ],
          consequence: todo('ce qui a été constaté depuis'),
          date: TODO_DATE,
        },
      ],
      excerpt: {
        id: 'plume-politique-acces',
        project: 'plume',
        shows: todo('ce que ce code prouve et que la prose ne prouvait pas'),
        path: todo('chemin réel dans le dépôt Plume'),
        language: 'typescript',
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

    // ── Mon serveur — exploiter ─────────────────────────────────────────────
    {
      intro: {
        id: 'serveur',
        moment: 'operate',
        name: 'Mon serveur',
        state: 'in-production',
        stakes:
          "La configuration vit dans un dépôt, pas dans ma mémoire. C'est une contrainte que je me suis imposée tôt et qui s'est révélée être la meilleure décision d'exploitation que j'aie prise.",
        facts: [
          { value: todo('nombre de services'), label: 'services en production' },
          {
            value: todo('durée exacte, en années ou depuis une date'),
            label: todo('ce que la durée compte'),
          },
        ],
        // Absent by design: there is nothing public to link a private server to.
        source: undefined,
      },
      arbitrations: [
        {
          status: 'settled',
          id: 'serveur-bare-metal',
          project: 'serveur',
          stakes: 'Serveur dédié ou infrastructure managée ?',
          decided: 'Serveur dédié bare metal',
          rejected: [
            {
              option: 'Infrastructure managée, scalable à la demande',
              reason:
                'La charge est constante et le stockage dominant. Le managé coûtait trois fois plus pour un service identique.',
            },
          ],
          consequence: todo('ce qui a été constaté depuis'),
          date: TODO_DATE,
        },
        {
          status: 'settled',
          id: 'serveur-ansible-ssot',
          project: 'serveur',
          stakes: 'Où vit la configuration de la machine ?',
          decided: 'Ansible comme source de vérité unique',
          rejected: [
            {
              option: 'Configuration manuelle, documentée après coup',
              reason:
                'Une documentation se désynchronise en silence. Un playbook qui échoue se voit tout de suite.',
            },
          ],
          consequence: todo('ce qui a été constaté depuis'),
          date: TODO_DATE,
        },
        {
          status: 'settled',
          id: 'serveur-restauration-trimestrielle',
          project: 'serveur',
          stakes: 'Comment sait-on que les sauvegardes fonctionnent ?',
          decided: 'Sauvegardes restaurées à blanc chaque trimestre',
          rejected: [
            {
              option: 'Snapshots hébergeur seuls',
              reason: 'Une sauvegarde jamais restaurée est une hypothèse, pas une sauvegarde.',
            },
          ],
          consequence: todo('ce qui a été constaté depuis'),
          date: TODO_DATE,
        },
      ],
      incident: {
        id: 'serveur-charge-cpu',
        project: 'serveur',
        title: 'Charge CPU hors fenêtre planifiée',
        stakes: todo('ce qui était réellement en jeu — données, disponibilité, exposition'),
        timeline: [
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
        ],
        resolution:
          'Image reconstruite depuis une base saine, secrets tournés, absence de persistance vérifiée. T+2 h.',
        lesson:
          'Pare-feu restreint, détection affinée par service, veille de mises à jour automatisée sur toutes les images.',
      },
      excerpt: {
        id: 'serveur-parser-crowdsec',
        project: 'serveur',
        shows: todo('ce que ce parser prouve et que la prose ne prouvait pas'),
        path: todo('chemin réel dans le dépôt Ansible'),
        language: 'yaml',
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
  ],

  // ── Contact ───────────────────────────────────────────────────────────────
  // Only the real channel is listed. GitHub, LinkedIn and the CV are `#` in
  // `portfolio.ts`: a placeholder URL that parses would be worse than a gap.
  contact: {
    title: 'Ce que je cherche',
    invitation:
      "Une équipe ou une structure où quelqu'un doit tenir un système entier et le laisser lisible derrière lui. CDI ou mission, à distance depuis l'Ardèche.",
    availability: 'Disponible · CDI ou mission · à distance',
    channels: [{ label: 'vincent@…', href: 'mailto:cottalorda.vincent@pm.me' }],
  },
};

/** The draft, proven against the contract at module load. */
export const PORTFOLIO_DRAFT: Portfolio = PortfolioSchema.parse(draft);

/**
 * Every path still carrying a {@link todo} marker or {@link TODO_DATE}, so the
 * gaps stay countable instead of dissolving into the prose.
 */
export const pendingMarkers = (value: unknown, path: string[] = []): string[] => {
  if (typeof value === 'string') {
    const pending = value.startsWith('⟨à écrire⟩') || value === TODO_DATE;
    return pending ? [`${path.join('.')} → ${value}`] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => pendingMarkers(item, [...path, String(index)]));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => pendingMarkers(item, [...path, key]));
  }
  return [];
};

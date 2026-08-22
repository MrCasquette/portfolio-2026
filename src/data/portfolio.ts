export type ProjectType = {
  id: string;
  number: string;
  title: string;
  summary: string;
};

export type PhaseType = {
  title: string;
  build: string;
  coordinate: string;
};

export const projects: ProjectType[] = [
  {
    id: 'project-1',
    number: '01',
    title: 'Produit métier',
    summary: "Transformer un besoin concret en un outil utilisable, puis préparer son évolution.",
  },
  {
    id: 'project-2',
    number: '02',
    title: 'Système interconnecté',
    summary: 'Relier plusieurs domaines sans perdre la lisibilité de l’ensemble.',
  },
  {
    id: 'project-3',
    number: '03',
    title: 'Outil spécialisé',
    summary: 'Concevoir une solution ciblée autour de contraintes techniques fortes.',
  },
];

export const phases: PhaseType[] = [
  {
    title: 'Cadrer',
    build: 'Transformer le besoin initial en périmètre concret et en priorités produit.',
    coordinate: 'Identifier les domaines concernés, leurs contraintes et leurs responsabilités.',
  },
  {
    title: 'Concevoir',
    build: 'Choisir une architecture proportionnée, utilisable et maintenable.',
    coordinate: 'Définir les frontières, les interfaces et les règles communes entre expertises.',
  },
  {
    title: 'Réaliser',
    build: 'Développer, intégrer, tester et conduire la solution jusqu’à son usage réel.',
    coordinate: 'Faire converger les contributions et arbitrer sans perdre la cohérence globale.',
  },
];

export const mainNavigation = [
  { href: '#landing', label: 'Accueil', shortLabel: 'A' },
  { href: '#profile', label: 'Profil', shortLabel: 'Profil' },
  { href: '#work', label: 'Réalisations', shortLabel: 'Projets' },
  { href: '#project-1', label: 'Projet 1', shortLabel: '01' },
  { href: '#project-2', label: 'Projet 2', shortLabel: '02' },
  { href: '#project-3', label: 'Projet 3', shortLabel: '03' },
  { href: '#contact', label: 'Contact', shortLabel: 'Contact' },
] as const;

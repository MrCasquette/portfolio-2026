import type { ShikiConfig } from 'astro';

type CodeTheme = Exclude<ShikiConfig['theme'], string | undefined>;

/**
 * Syntax highlighting derived from the site palette.
 *
 * No imported editor theme (docs/design/vocabulaire.md): the six colours come from
 * theme.css. Hierarchy comes from lightness and weight, not hue — the pure
 * accent is deliberately absent.
 */
const palette = {
  bg: '#1A1A1A',
  text: '#CFCEC9',
  key: '#EFEEEC',
  string: '#86C9AE',
  value: '#A8BFB4',
  punct: '#8A8884',
  comment: '#6E6C68',
} as const;

export const codeTheme: CodeTheme = {
  name: 'portfolio',
  type: 'dark',
  colors: {
    'editor.background': palette.bg,
    'editor.foreground': palette.text,
  },
  settings: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: palette.comment, fontStyle: 'italic' },
    },
    {
      scope: [
        'keyword.control',
        'storage.type',
        'storage.modifier',
        'variable.language',
        'keyword.other',
      ],
      settings: { foreground: palette.key, fontStyle: 'bold' },
    },
    {
      scope: ['entity.name.tag.yaml', 'entity.name.tag', 'support.type.property-name'],
      settings: { foreground: palette.key, fontStyle: 'bold' },
    },
    {
      scope: ['string', 'string.quoted', 'constant.character.escape'],
      settings: { foreground: palette.string },
    },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.other'],
      settings: { foreground: palette.value },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: palette.punct, fontStyle: '' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'variable', 'entity.name.type'],
      settings: { foreground: palette.text },
    },
  ],
};

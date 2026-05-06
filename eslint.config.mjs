import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      '.vs/**',
      '.frontmatter/**',
      '_pgbackup/**',
      '.editor-backups/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  {
    files: ['scripts/**/*.mjs', '*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ['src/**/*.{js,ts,mjs,mts,cjs,cts}', 'astro.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];

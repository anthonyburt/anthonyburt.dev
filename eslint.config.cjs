const astro = require('eslint-plugin-astro');

module.exports = [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  ...astro.configs['flat/recommended'],
];

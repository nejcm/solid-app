const path = require('path');
const prettierOptions = require(path.resolve(__dirname, 'prettier.config.cjs'));

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['src/**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};

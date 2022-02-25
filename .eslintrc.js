module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ignorePatterns: ['build/**', 'cypress/**', 'dist/**'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-debugger': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
};

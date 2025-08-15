module.exports = {
  env: {
    browser: true,
    es2015: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    'no-undef': 'warn',
    '@next/next/no-html-link-for-pages': 'warn',
    '@next/next/no-img-element': 'warn',
    'jsx-a11y/alt-text': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    semi: 1,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  root: true,
  parser: '@typescript-eslint/parser',
};

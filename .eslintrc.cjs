/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb-with-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Enforce `rel="noopener noreferrer"` on external links in `<template>`
    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': 'error',
    // Enforce `rel="noopener noreferrer"` on external links in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': 'error',
  },
};

/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ["dist/**/*"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    semi: ["error", "always"],
    "eol-last": ["error", "always"],
  },
};
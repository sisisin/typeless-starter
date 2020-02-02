/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    useJSXTextNode: true,
    project: './tsconfig.json',
  },
  env: { browser: true, jest: true, es6: true },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      parser: 'esprima',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.test.ts', 'src/app/testHelpers/*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};

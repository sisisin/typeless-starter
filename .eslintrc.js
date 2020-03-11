/** @type {import('eslint').Linter.Config.rules} */
const looseRules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
};

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
    // '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-router-dom',
            importNames: ['useLocation', 'useParams', 'useHistory', 'useRouteMatch'],
            message: "Don't use react-router-dom's hooks directly. You should use useRouteState.ts",
          },
          {
            name: 'react-router',
          },
        ],
      },
    ],
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
      files: ['*.test.ts', '*.test.tsx', 'src/setupTests.ts', 'src/app/testHelpers/*'],
      rules: looseRules,
    },
    {
      files: ['scripts/**/*.ts'],
      parserOptions: {
        useJSXTextNode: true,
        project: './scripts/tsconfig.json',
      },
      rules: looseRules,
    },
  ],
};

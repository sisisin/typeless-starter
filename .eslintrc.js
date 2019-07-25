module.exports = {
  extends: ['react-app', 'prettier', 'prettier/react'],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    useJSXTextNode: true,
    project: './tsconfig.json',
  },
  env: { browser: true, jest: true },
  rules: {
    'prefer-const': 'error',
    'import/no-default-export': 1,
  },
};

/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: false, // Allows for the parsing of JSX
    },
  },
  settings: {},
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Rule to flag statements that use != and == instead of !== and ===
    eqeqeq: 'error',

    // enforces the use of the shorthand syntax
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],

    // DISABLE constructor names to begin with a capital letter
    'new-cap': ['error', { newIsCap: false }],

    camelcase: ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'property',
        format: ['snake_case'],
        leadingUnderscore: 'allow',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        camelcase: ['off'],
      },
    },
  ],
}

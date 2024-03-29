module.exports = {
  parser: `babel-eslint`,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [`ghost`, `react`, `node`, `promise`],
  extends: [
    `plugin:ghost/node`,
    `plugin:ghost/ember`,
    `plugin:react/recommended`,
    `plugin:promise/recommended`,
  ],
  settings: {
    react: {
      createClass: `createReactClass`,
      pragma: `React`,
      version: `16.13.1`,
      flowVersion: `0.53`,
    },
    propWrapperFunctions: [`forbidExtraProps`],
  },
  env: {
    node: true,
  },
  rules: {
    "ghost/sort-imports-es6-autofix/sort-imports-es6": `off`,
    "ghost/ember/use-ember-get-and-set": `off`,
    "no-console": `off`,
    indent: [`error`, 2],
    "no-inner-declarations": `off`,
    "valid-jsdoc": `off`,
    "require-jsdoc": `off`,
    quotes: [`error`, `backtick`],
    "consistent-return": [`error`],
    "arrow-body-style": [
      `error`,
      `as-needed`,
      { requireReturnForObjectLiteral: true },
    ],
    "jsx-quotes": [`error`, `prefer-double`],
    semi: [`error`, `never`],
    "object-curly-spacing": [`error`, `always`],
    "comma-dangle": [
      `error`,
      {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
        functions: `ignore`,
      },
    ],
    "react/prop-types": [
      `error`,
      {
        ignore: [`children`],
      },
    ],
  },
}

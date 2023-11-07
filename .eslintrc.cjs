const { default: path } = require("path");
const { fileURLToPath } = require("url");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: path.resolve(fileURLToPath(import.meta.url), "../"),
  },
  plugins: ["react"],
  rules: {},
};

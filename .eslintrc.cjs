module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended"],
  settings: {
    react: {
      version: "detect",
    },
  },
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
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["react"],
  ignorePatterns: ["register-hooks.js", "**/dist/*"],
  rules: {
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/comma-semi": "off",
    "@typescript-eslint/semi": "off",

    quotes: ["error", "double"],
    semi: ["error", "always"],
    "func-style": ["error", "expression"],
  },
};

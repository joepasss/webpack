import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  ...compat.extends("standard-with-typescript"),
  pluginReactConfig,
  {
    ignorePatterns: [
      "register-hooks.js",
      "**/dist/*",
      ".yarn/*",
      "yarn.lock",
      "**/node_modules/**/*",
    ],
    rules: {
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/comma-semi": "off",
      "@typescript-eslint/semi": "off",
      "react/no-unescaped-entities": "off",
      "no-sparse-arrays": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",

      quotes: ["error", "always"],
      semi: ["error", "dobule"],
      "func-style": ["error", "expression"],
    },
  },
];

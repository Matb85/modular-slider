import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier/recommended";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "prettier/prettier": ["error"],
        },
    },
    prettier,
];

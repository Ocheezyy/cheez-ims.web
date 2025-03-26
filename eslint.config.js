import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginQuery from '@tanstack/eslint-plugin-query'
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tseslintParser from "@typescript-eslint/parser"

export default [
    ...pluginQuery.configs["flat/recommended"],
    {
        ignores: ['dist', "**/types.ts"],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tseslintParser, // Specify TypeScript parser
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...prettierConfig.rules, // Apply Prettier rules
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': 'warn', // Enforce Prettier formatting
        },
    },
];

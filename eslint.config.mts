import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import {defineConfig} from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: {js}, extends: ['js/recommended'], languageOptions: {globals: {...globals.browser, ...globals.node}},
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	
	nextPlugin.configs['core-web-vitals'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]);

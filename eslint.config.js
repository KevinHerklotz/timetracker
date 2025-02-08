import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist-electron', 'dist-react', 'node_modules'] },

  // Default JS/TS rules
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    rules: {
      quotes: ['error', 'single'],
    },
  },

  // Import rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
  },

  // React rules
  {
    ...reactPlugin.configs.flat.recommended,
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  // React hooks rules
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },

  // React refresh rules (enabled by Vite)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-refresh': reactRefreshPlugin },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // React accessibility rules
  jsxA11yPlugin.flatConfigs.recommended,

  // Prettier overrides (need to be last)
  eslintConfigPrettier
)

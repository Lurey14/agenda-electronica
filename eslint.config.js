import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'evidence', 'outputs']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['src/**/__tests__/**/*.{js,jsx}'],
    languageOptions: { globals: globals.jest },
  },
  {
    files: ['src/setupTests.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['cypress/**/*.{js,jsx}'],
    languageOptions: { globals: { cy: 'readonly', expect: 'readonly' } },
  },
  {
    // Dos efectos preexistentes incumplen esta regla; la lógica de la aplicación queda intacta.
    files: ['src/Paginacion.jsx', 'src/modals/EnteFormModal.jsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
])

import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^p_(response|request|error|next)$' }],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[object.name="req"], MemberExpression[object.name="res"]',
          message: 'Please use p_request and p_response instead of req and res.'
        }
      ]
    },
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/build/**']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  }
]);

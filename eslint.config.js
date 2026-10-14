import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Rules of Hooks, exhaustive effect deps and jsx-a11y are errors, not warnings (AI-GUIDE §1).
export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'storybook-static/**', 'src/tokens/generated.ts', 'src/icons/generated.ts', 'scripts/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Stable keys: never Math.random()/Date.now() as a key (AI-GUIDE §2).
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='key'] CallExpression[callee.object.name='Math'][callee.property.name='random']",
          message: 'Keys must be stable. Use an id from the data, never Math.random().',
        },
      ],
    },
  },
);

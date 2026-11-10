---
'@frontify/oxlint-config-basic': minor
'@frontify/oxlint-config-react': minor
---

feat: error on `no-else-return`, `no-nested-ternary`, `unicorn/no-array-reduce`, `eslint-comments/require-description` and JSDoc shape rules for existing doc blocks, and in TypeScript files on `typescript/switch-exhaustiveness-check` (a `default` no longer counts as covering a union) and `jsdoc-js/no-types`; `no-empty` and `no-useless-catch` now apply to TypeScript files too. Warn on `complexity`, `max-depth`, `max-params` and `no-param-reassign`. `complexity`, `max-depth`, `max-params`, `no-else-return`, `no-nested-ternary` and `no-param-reassign` are off in tests and stories.

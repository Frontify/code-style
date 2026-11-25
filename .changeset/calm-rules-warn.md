---
'@frontify/oxlint-config-basic': minor
'@frontify/oxlint-config-react': minor
---

Report nested ternaries, redundant `else` branches, array `reduce`, and lint exceptions without a reason as errors. Apply the existing errors for empty blocks and redundant catch clauses to TypeScript. Require an explicit switch case for every member of a TypeScript union.

Check existing JSDoc for summaries and tag formatting. If a documented function has a parameter or destructured prop with a default, include an `@default` tag with its value. Keep JSDoc types in JavaScript and use TypeScript annotations in TypeScript.

Warn about function complexity, nesting depth, parameter count, and parameter mutation. Tests and stories omit those warnings and the errors for nested ternaries and redundant `else` branches.

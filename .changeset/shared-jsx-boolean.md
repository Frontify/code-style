---
'@frontify/eslint-config-react': patch
'@frontify/eslint-plugin': patch
'@frontify/oxlint-config-react': minor
---

Share the JSX boolean shorthand rule between ESLint and Oxlint. Oxlint now reports explicit `={true}` on JSX props as an error. Use the prop name alone, such as `<Button disabled />`.

Load the recommended JSX accessibility rules from the installed plugin's current configuration export.

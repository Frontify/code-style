/* (c) Copyright Frontify Ltd., all rights reserved. */

import jsxShorthandBoolean from './rules/jsx-shorthand-boolean.mjs';

export default {
    meta: {
        name: '@frontify/eslint-plugin',
    },
    rules: {
        'jsx-shorthand-boolean': jsxShorthandBoolean,
    },
};

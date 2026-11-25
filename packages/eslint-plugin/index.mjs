/* (c) Copyright Frontify Ltd., all rights reserved. */

import jsxShorthandBoolean from './rules/jsx-shorthand-boolean.mjs';
import noInlineParamType from './rules/no-inline-param-type.mjs';

export default {
    meta: {
        name: '@frontify/eslint-plugin',
    },
    rules: {
        'jsx-shorthand-boolean': jsxShorthandBoolean,
        'no-inline-param-type': noInlineParamType,
    },
};

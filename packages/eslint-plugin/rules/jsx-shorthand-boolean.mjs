/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

const EXPLICIT_TRUE_PROP =
    'JSXAttribute[value.type="JSXExpressionContainer"][value.expression.type="Literal"][value.expression.value=true]';
const SHORTHAND_MESSAGE_ID = 'shorthand';

/** @satisfies {import('eslint').Rule.RuleModule} */
const jsxShorthandBoolean = {
    meta: {
        schema: [],
        messages: {
            [SHORTHAND_MESSAGE_ID]: 'Use shorthand syntax for boolean JSX props instead of `={true}`.',
        },
    },
    create(context) {
        return {
            /**
             * Reports the explicit JSX prop.
             * @param {import('eslint').JSSyntaxElement} node - The attribute matched by the selector.
             */
            [EXPLICIT_TRUE_PROP](node) {
                context.report({ node, messageId: SHORTHAND_MESSAGE_ID });
            },
        };
    },
};

export default jsxShorthandBoolean;

/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

const FUNCTION_NODES = [
    'FunctionDeclaration',
    'FunctionExpression',
    'ArrowFunctionExpression',
    'TSDeclareFunction',
    'TSEmptyBodyFunctionExpression',
    'TSFunctionType',
    'TSConstructorType',
    'TSMethodSignature',
    'TSCallSignatureDeclaration',
    'TSConstructSignatureDeclaration',
];
const FUNCTION_SIGNATURE = `:matches(${FUNCTION_NODES.join(', ')})`;
const TYPED_BINDING = ':matches(Identifier, ObjectPattern, ArrayPattern, RestElement)';
const INLINE_OBJECT_TYPE = 'TSTypeAnnotation.typeAnnotation > TSTypeLiteral.typeAnnotation';
const INLINE_PARAMETER_TYPE = [
    `${TYPED_BINDING}.params`,
    `AssignmentPattern.params > ${TYPED_BINDING}.left`,
    `TSParameterProperty.params > ${TYPED_BINDING}.parameter`,
    `TSParameterProperty.params > AssignmentPattern.parameter > ${TYPED_BINDING}.left`,
]
    .map((binding) => `${FUNCTION_SIGNATURE} > ${binding} > ${INLINE_OBJECT_TYPE}`)
    .join(', ');
const NAMED_TYPE_MESSAGE_ID = 'namedType';

/** @satisfies {import('eslint').Rule.RuleModule} */
const noInlineParamType = {
    meta: {
        type: 'problem',
        schema: [],
        messages: {
            [NAMED_TYPE_MESSAGE_ID]: 'Declare a named type at module level (`<Component>Props`, `<function>Options`).',
        },
    },
    create(context) {
        return {
            /**
             * Suggests a named type for the parameter.
             * @param {import('eslint').JSSyntaxElement} node - The inline object type written on the parameter.
             */
            [INLINE_PARAMETER_TYPE](node) {
                context.report({ node, messageId: NAMED_TYPE_MESSAGE_ID });
            },
        };
    },
};

export default noInlineParamType;

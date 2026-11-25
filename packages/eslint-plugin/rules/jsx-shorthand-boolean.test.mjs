/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RuleTester } from 'eslint';

import plugin from '../index.mjs';

const rule = plugin.rules['jsx-shorthand-boolean'];

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: { jsx: true },
        },
    },
});

ruleTester.run('jsx-shorthand-boolean', rule, {
    valid: [
        { code: '<Foo bar />' },
        { code: '<Foo bar={false} />' },
        { code: '<Foo bar={someVariable} />' },
        { code: '<Foo bar="true" />' },
    ],
    invalid: [
        {
            code: '<Foo bar={true} />',
            errors: [
                {
                    message: 'Use shorthand syntax for boolean JSX props instead of `={true}`.',
                },
            ],
        },
        {
            code: '<Foo bar={true} baz="hello" />',
            errors: [
                {
                    message: 'Use shorthand syntax for boolean JSX props instead of `={true}`.',
                },
            ],
        },
    ],
});

/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as parser from '@typescript-eslint/parser';
import { RuleTester } from 'eslint';

import plugin from '../index.mjs';

const rule = plugin.rules['no-inline-param-type'];
const ruleTester = new RuleTester({ languageOptions: { parser } });
const inlineObjectTypeError = { messageId: 'namedType' };

const inlineParameterTypes = [
    {
        name: 'reports a function expression parameter',
        code: 'const read = function (options: { label: string }) { return options.label; };',
    },
    {
        name: 'reports destructured component props',
        filename: 'example.tsx',
        code: 'const Badge = ({ label }: { label: string }) => <span>{label}</span>;',
    },
    {
        name: 'reports an array binding parameter',
        code: 'function first([label]: { [Symbol.iterator](): Iterator<string> }) { return label; }',
    },
    {
        name: 'reports a defaulted destructured parameter',
        code: 'function read({ label }: { label: string } = { label: "x" }) { return label; }',
    },
    {
        name: 'reports a rest parameter',
        code: 'function read(...options: { [index: number]: string }) { return options[0]; }',
    },
    {
        name: 'reports a constructor parameter property',
        code: 'class Reader { constructor(private options: { label: string }) {} }',
    },
    {
        name: 'reports a defaulted constructor parameter property',
        code: 'class Reader { constructor(private options: { label: string } = { label: "x" }) {} }',
    },
    {
        name: 'reports an ambient function parameter',
        code: 'declare function read(options: { label: string }): string;',
    },
    {
        name: 'reports a method overload parameter',
        code: 'class Reader { read(options: { label: string }): string; read(options: unknown) { return ""; } }',
    },
    {
        name: 'reports a function type parameter',
        code: 'type Reader = (options: { label: string }) => string;',
    },
    {
        name: 'reports a constructor type parameter',
        code: 'type Reader = new (options: { label: string }) => object;',
    },
    {
        name: 'reports an interface method parameter',
        code: 'interface Reader { read(options: { label: string }): string; }',
    },
    {
        name: 'reports a call signature parameter',
        code: 'interface Reader { (options: { label: string }): string; }',
    },
    {
        name: 'reports a construct signature parameter',
        code: 'interface Reader { new (options: { label: string }): object; }',
    },
];

ruleTester.run('no-inline-param-type', rule, {
    valid: [
        'type Options = { label: string }; function read(options: Options) { return options.label; }',
        'type Options = { label: string }; const read = ({ label }: Options = { label: "x" }) => label;',
        'type Options = { label: string }; class Reader { constructor(private options: Options) {} }',
        'const read = (options = { label: "x" }) => options.label;',
        'function read(label: string): { label: string } { return { label }; }',
        'function read() { const options: { label: string } = { label: "x" }; return options; }',
        'function read(options: { label: string }[]) { return options[0]; }',
        'function read(options: { label: string } | undefined) { return options; }',
        'function read(options: { label: string } & { enabled: boolean }) { return options; }',
        'function read(options: Readonly<{ label: string }>) { return options; }',
    ],
    invalid: [
        {
            name: 'underlines only the inline type on a function declaration parameter',
            code: 'function read(options: { label: string }) { return options.label; }',
            errors: [{ ...inlineObjectTypeError, line: 1, column: 24, endLine: 1, endColumn: 41 }],
        },
        ...inlineParameterTypes.map((testCase) => ({ ...testCase, errors: [inlineObjectTypeError] })),
        {
            name: 'reports each inline object type in the parameter list',
            code: 'function read(first: { label: string }, second: { active: boolean }) {}',
            errors: [inlineObjectTypeError, inlineObjectTypeError],
        },
    ],
});

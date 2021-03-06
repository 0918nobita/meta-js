import { PluginObj } from '@babel/core';
import core = require('@babel/core');

const { transform } = core;

const src = '1 + 2 / 3';

const plugin = ({ types }: { types: any }): PluginObj => ({
    visitor: {
        BinaryExpression(nodePath) {
            if (nodePath.node.operator !== '*') {
                const newAst = types.binaryExpression('*', nodePath.node.left, nodePath.node.right);
                nodePath.replaceWith(newAst);
            }
        }
    }
});

const { code } = transform(src, { plugins: [plugin] })!;
console.log(code);

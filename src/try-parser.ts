const parser = require('@babel/parser/lib');

const ast = parser.parse('2 + 3 * (4 - 5)');
console.log(JSON.stringify(ast));

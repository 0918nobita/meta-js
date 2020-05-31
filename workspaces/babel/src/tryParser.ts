import parser = require('@babel/parser');

const ast = parser.parse('2 + 3 * (4 - 5)');
console.log(JSON.stringify(ast));

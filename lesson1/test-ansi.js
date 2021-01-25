const c = require('ansi-colors');
const beep = require('beepbeep')

console.log(c.red('This is a red string!'));
beep();
console.log(c.green('This is a red string!'));
beep(2)
console.log(c.cyan('This is a cyan string!'));
console.log(c.yellow('This is a yellow string!'));
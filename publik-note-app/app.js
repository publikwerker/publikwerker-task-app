const validator = require('validator');
const chalk = require('chalk');
const getNotes = require('./notes');
const error = chalk.bold.red;

const notes = getNotes();
console.log(chalk.green('Success!'));
console.log(error(notes));

console.log(chalk.inverse.blue(validator.isURL('jdawg@gmail.com')));
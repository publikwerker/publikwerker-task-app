const yargs = require('yargs');
const validator = require('validator');
const chalk = require('chalk');
const getNotes = require('./notes');
const error = chalk.bold.bgRed;

// Customize yargs version
yargs.version('1.1.0');

// Create ADD command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler: function() {
    console.log('Adding a new note');
  }
});

// Create REMOVE command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function() {
    console.log('Removing a note');
  }
});

// Create LIST command
yargs.command({
  command: 'list',
  describe: 'List a note',
  handler: function () {
    console.log('Listing notes');
  }
});

// Create READ command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function () {
    console.log('Reading a note');
  }
});

const command = process.argv[2];

if (command === 'add'){
  console.log(chalk.green('Adding note'));
} else if (command === 'remove'){
  console.log(chalk.green('Removing note'));
}


console.log(chalk.inverse.blue(validator.isURL('jdawg@gmail.com')));

console.log(process.argv);
console.log(yargs.argv);
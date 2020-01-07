const yargs = require('yargs');
const validator = require('validator');
const chalk = require('chalk');
const notes = require('./notes');
const error = chalk.bold.bgRed;

// Customize yargs version
yargs.version('1.1.0');

// Create ADD command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Create REMOVE command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {    
      describe: 'Note title',
      demandOption: true,
      type: 'string'}
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
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

yargs.parse();
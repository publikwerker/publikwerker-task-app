const validator = require('validator');
const getNotes = require('./notes');

const notes = getNotes();

console.log(notes);
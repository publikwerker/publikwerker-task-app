const fs = require('fs');
console.log('notes.js');
const chalk = require('chalk');
const error = chalk.bold.bgRed;

const getNote = function(){
  return 'Your notes...';
}

const addNote = function(title, body){
  const notes = loadNotes();
  let titles = [];
  notes.forEach(note => {
    titles.push(note.title);
  });
  console.log(titles);
  if (titles.includes(title)){
    console.log(error('note already exists'));
  } else { 
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
  };
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = function(title) {
  let notes = loadNotes();
  notes = notes.filter(note => note.title !== title);
  saveNotes(notes);
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    // if file does not exist, returns an empty file to add notes to.
    return [];
  }
}

module.exports = {
  getNote,
  addNote,
  removeNote
};
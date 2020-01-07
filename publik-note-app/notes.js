const fs = require('fs');
console.log('notes.js');
const chalk = require('chalk');
const error = chalk.bold.bgRed;
const success = chalk.bold.bgGreen;

const getNote = () => {
  return 'Your notes...';
}

const addNote = (title, body) => {
  const notes = loadNotes();
  let titles = [];
  notes.forEach(note => {
    titles.push(note.title);
  });
  if (titles.includes(title)){
    console.log(error('Note already exists'));
  } else { 
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(success(`Note ${title} saved!`));
  };
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = (title) => {
  let notes = loadNotes();
  let newNotes = notes.filter(note => note.title !== title);
  if (newNotes.length === notes.length) {
    console.log(error('No note found!'));
  } else {
    console.log(success(`Note ${title} removed!`));
  }
  saveNotes(newNotes);
}

const loadNotes = () => {
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
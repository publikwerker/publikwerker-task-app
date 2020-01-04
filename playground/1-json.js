
const fs = require('fs');
// const book = {
//   title: "Alien Agenda",
//   author: "Jim Marrs"
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.name = 'Jason Hoffman';
data.planet = 'Mars';
fs.writeFileSync('1-json.json', JSON.stringify(data));
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
  if (error){
    return console.log(`${error}: An error occured`);
  }
  const db = client.db(databaseName);
  // db.collection('users').deleteMany({
  //   age: 50
  // }).then((result)=>{
  //   console.log(`The Result: ${result}`);
  // }).catch((error)=>{
  //   console.log(`The ERROR is ${error}`);
  // });

  db.collection('tasks').deleteOne({
    description: 'Find a house'
  }).then((result)=>{
    console.log(`The Result: ${result}`);
  }).catch((error)=>{`There was an ERROR: ${error}`});
});
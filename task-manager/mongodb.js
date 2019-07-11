const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
  if (error){
    return console.log(`${error}: An error occured`);
  }
  const db = client.db(databaseName);
  // db.collection('users').updateOne({
  //   _id: new ObjectID('5d262ed140a0a5836aaaeea9')
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then((result)=>{
  //   console.log(`${result} is the result`);
  // }).catch((error)=>{
  //   console.log(`${error} is the error`);
  // });
  db.collection('tasks').updateMany({
    completed: false
  },{
    $set: {
      completed: true
    }
  }).then((result)=>{
    console.log(`The Result is ${result}`);
  }).catch((error)=>{
    console.log(`There is an error, ${error}`);
  })
});
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
  if (error){
    return console.log(`${error}: An error occured`);
  }
  const db = client.db(databaseName);
  
  // db.collection('users').findOne({_id: new ObjectID("5d26319cf8ef9a83b8d40082")}, (error, user) => {
  //   if (error) {
  //     return console.log(`${error}, couldn't find`);
  //   }
  //   console.log(user);
  // });

  // db.collection('users').find({
  //   name: 'Jason'
  // }).toArray((error, users)=>{
  //   console.log(users)
  // });

  // db.collection('users').find({
  //   name: 'Jason'
  // }).count((error, count)=>{
  //   console.log(count)
  // })

  db.collection('tasks').findOne({
    _id: ObjectID("5d2634ea0ae51e8400139166")
  }, (error, task) => {
    console.log(task);
  });

  db.collection('tasks').find({
    completed: false
  }).toArray((error, tasks) => {
    console.log(tasks);
  });

});
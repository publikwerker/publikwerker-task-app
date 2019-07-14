require ('../src/db/mongoose.js');
const Task = require('../src/models/task.js');

deleteID =  '5d2a290f451d2aa6bd2e2a5a'

Task.findByIdAndRemove(deleteID, {rawResult: true})
.then((res)=>{
  console.log(res);
  if (!res.value){
   console.log('Error, could not find task ID');
  }
  return Task.countDocuments({completed: false})
})
.then((res) => {
  console.log(res);
})
.catch((err)=>{
  console.log(err);
});
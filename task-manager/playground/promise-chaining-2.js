require ('../src/db/mongoose.js');
const Task = require('../src/models/task.js');

deleteID =  '5d2a29870b0486a6cb963bd2'

// Task.findByIdAndRemove(deleteID, {rawResult: true})
// .then((res)=>{
//   console.log(res);
//   if (!res.value){
//    console.log('Error, could not find task ID');
//   }
//   return Task.countDocuments({completed: false})
// })
// .then((res) => {
//   console.log(res);
// })
// .catch((err)=>{
//   console.log(err);
// });

// same as above, but using async/await
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    console.log(`Could not find Task ID`);
  }
  const count = await Task.countDocuments({completed: false});
  return count;
};

deleteTaskAndCount(deleteID).then((count)=>{
  console.log(count);
}).catch((err) => {
  console.log(err);
});
require('../src/db/mongoose');
const User = require('../src/models/user');

// 5d2a28c275bdbba6a52ff75b

// User.findByIdAndUpdate('5d2a28c275bdbba6a52ff75b', {age: 112}).then((user) => {
//   if (!user) {
//     throw new Error('user not found')
//   }
//   return User.countDocuments({age: 112})
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });



const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
}

updateAgeAndCount('5d2a28c275bdbba6a52ff75b', 111).then((count)=>{
  console.log(count);
}).catch((err) => {
  console.log(err)
});
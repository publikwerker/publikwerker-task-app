require('../src/db/mongoose');
const User = require('../src/models/user');

// 5d2a28c275bdbba6a52ff75b

User.findByIdAndUpdate('5d2a28c275bdbba6a52ff75b', {age: 112}).then((user) => {
  if (!user) {
    throw new Error('user not found')
  }
  return User.countDocuments({age: 112})
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});
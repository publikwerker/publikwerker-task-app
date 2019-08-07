const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error(`Password may not contain the word 'password'`);
      }
    }
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'User email is required.'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    min: 0
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: Buffer
  }
},{
  timestamps: true,
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'createdBy'
})

// methods are accessible on the Instance
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, { expiresIn: '1 day'});
  user.tokens = user.tokens.concat({ token });
  await user.save();
  
  return token;
};

userSchema.methods.getPublicProfile = async function () {
  console.log(`this is ${this}`)
  const { _id,age,name,email,avatar} = this;
  return {
    _id,
    age,
    name,
    email,
    avatar
  }
}

// statics are accessible on the Model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({ createdBy: user._id});
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
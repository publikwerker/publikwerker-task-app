const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
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
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
})

const user = new User({
  name: 'Billy',
  email: 'Billy@TheBilly.club',
  password: 'Green21',
  age: 55
});

user.save().then(()=>{
  console.log(`The user is ${user}`);
}).catch((error)=> {
  console.log(`The ERROR is ${error}`);
})
 

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean
  }
})

const newTask = new Task({
  description: 'Daily fu',
  completed: false
})

newTask.save().then(()=>{
  console.log(newTask);
}).catch((error)=>{
  console.log(`There was an ERROR: ${error}`);
})
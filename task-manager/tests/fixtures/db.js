const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Hello',
  email: 'hello@publikwerker.com',
  password: 'Pa55word',
  tokens: [{
    token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
  }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Marvin',
  email: 'marvin@publikwerker.com',
  password: 'P@55word',
  tokens: [{
    token: jwt.sign({ _id: userTwoId}, process.env.JWT_SECRET)
  }]

}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'description for task one',
  completed: false,
  createdBy: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'description for task two',
  completed: true,
  createdBy: userOne._id
}

const taskThreeId = new mongoose.Types.ObjectId();
const taskThree = {
  _id: taskThreeId,
  description: 'description for task three',
  completed: false,
  createdBy: userTwo._id
}

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  setUpDatabase,
  taskOne,
  taskTwo,
  taskThree,
  taskThreeId
}
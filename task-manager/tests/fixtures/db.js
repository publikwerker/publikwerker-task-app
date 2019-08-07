const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Hello',
  email: 'hello@publikwerks.com',
  password: 'Pa55word',
  tokens: [{
    token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
  }]
}

const setUpDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
}

module.exports = {
  userOne,
  userOneId,
  setUpDatabase
}
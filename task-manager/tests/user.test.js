/**
 * @jest-environment node
 */

const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

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

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
})

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'jason',
      email: 'hello@publikwerker.com',
      password: 'Pa55word'
    }).expect(201)
console.log(response.body)
    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
})

test('Should login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: "william@bill.com",
      password: "S3cur3!"
    }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for authenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for nonauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
  name: 'Hello',
  email: 'hello@publikwerks.com',
  password: 'Pa55word'
}

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
})

test('Should sign up a new user', async () => {
  await request(app).post('/users').send({
    name: 'jason',
    email: 'hello@publikwerker.com',
    password: 'Pa55word'
  }).expect(201)
})

test('Should login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test('Should not login nonexistent user', async () => {
  await request(app).post('/users/login').send({
    email: "william@bill.com",
    password: "S3cur3!"
  }).expect(400)
})
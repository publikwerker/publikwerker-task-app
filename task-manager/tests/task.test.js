const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne,
  userOneId,
  userTwoId,
  setUpDatabase,
  taskThreeId,
  taskThree } = require('./fixtures/db.js');

beforeEach(setUpDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'testing one'
    })
    .expect(201)
  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
})

test('Should return tasks for user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  expect(response.body).toHaveLength(2)
})

test('Should only delete tasks belonging to user', async () => {
  await request(app)
    .delete(`/tasks/${taskThreeId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404)

  const task = await Task.findById(taskThreeId)
  expect(task).toMatchObject({
    _id: taskThreeId,
    completed: false,
    createdBy: userTwoId
  });
})

test('Should not create task with invalid description/completed', async () => {
  await request(app)
})
//
// Additonal Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
const express = require('express');
const Task  = require('../models/task');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    createdBy: req.user._id
  })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  };
});


// GET /tasks?completed=true || false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}
  
  if (req.query.completed){
    match.completed = req.query.completed === 'true'
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':');
    sort[parts[0] = parts[1]] === 'desc' ? -1 : 1;
  }

 try {
    await req.user.populate({
      path: 'tasks',
      match, 
      options : {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (err) {
    res.status(500).send(err);
  };
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  
  try {
    const task = await Task.findOne({_id, createdBy: req.user._id });
    if (!task) {
      return res.status(404).send('Task ID not found');
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  };
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation){
    return res.status(400).send('Error: non-updatable field')
  }
  try {
    const task = await Task.findOne({_id: req.params.id, createdBy: req.user._id});
    if (!task) {
      return res.status(404).send('Cannot find task');
    }
    updates.forEach((update) => task[update] = req.body[update]);
    await task.save();
    res.send(task);
  }catch (err) {
    res.status(400).send(err);
  };
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, createdBy: req.user._id});
    if (!task) {
      return res.status(404).send(`Error: Unable to find taskId ${req.params.id}.`);
    }
    res.send();
  } catch (err) {
    res.status(500).send(err);
  };
});

module.exports = router;
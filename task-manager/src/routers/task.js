const express = require('express');
const Task  = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    createdBy: req.user._id
  })
  try {
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  };
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  };
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task ID not found');
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  };
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation){
    return res.status(400).send('Error: non-updatable field')
  }
  try {
    const task = await Task.findById(req.params.id);
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
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

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send(`Error: Unable to find taskId ${req.params.id}.`);
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  };
});

module.exports = router;
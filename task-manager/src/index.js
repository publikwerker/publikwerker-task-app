const express = require('express');
require('./db/mongoose');
const chalk = require('chalk');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  };
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }; 
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    if (!user){
      return res.status(404).send('User ID not found.');
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  };
});

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age' ];
  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
  if (!isValidOperation){
    return res.status(400).send('Error: Invalid Updates')
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send(`Error: unable to find userId ${req.params.id}.`);
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  };
});

app.post('/tasks', async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  };
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  };
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task ID not found');
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  };

  // const { id } = req.params;
  // Task.findById(id)
  // .then((task) => {
  //   if (!task) {
  //     res.status(404).send('Task ID not found.');
  //   }
  //   res.status(200).send(task);
  // })
  // .catch((err) => {
  //   res.status(500).send(err);
  // });
});

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation){
    return res.status(400).send('Error: non-updatable field')
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!task) {
      return res.status(404).send('Cannot find task');
    }
    res.send(task);
  }catch (err) {
    res.status(400).send(err);
  }
})

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, ()=> {
  console.log(chalk.green.inverse(`Server is running on port ${port}`));
})
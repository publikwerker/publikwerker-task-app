const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user.getPublicProfile, token });
  } catch (e) {
    res.status(500).send(e.message);
  };
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  };
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    // clear out tokens from user object tokens array
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  };
});

router.get('/users/me', auth, async (req, res) => {
 res.send(req.user); 
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age' ];
  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
  if (!isValidOperation){
    return res.status(400).send('Error: Invalid Updates')
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/:id', async (req, res) => {
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

module.exports = router;
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}, { username: 1, name: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be atleast 3 characters long'
    });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    name,
    passwordHash
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch(ex) {
    next(ex);
  }
});

module.exports = usersRouter;
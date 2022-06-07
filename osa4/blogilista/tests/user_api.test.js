/* const mongoose = require('mongoose'); */
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('salasana', 10);
  const user = new User({
    username: 'testman',
    name: 'Test Man',
    passwordHash
  });
  await user.save();
});

describe('user creation', () => {
  test('successful user creation', async () => {
    const newUser = {
      username: 'newtest',
      name: 'New Test',
      password: 'test'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(2);
    expect(usersAtEnd).toContainEqual(response.body);
  });

  test('if username exists, return code 400', async () => {
    const newUser = {
      username: 'testman',
      name: 'Test Man',
      password: 'test'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(JSON.parse(response.text)).toEqual({ 'error': 'username must be unique' });
  });

  test('if username is too short, return code 400', async () => {
    const newUser = {
      username: 'te',
      name: 'Test Man',
      password: 'test'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(JSON.parse(response.text)).toEqual({ 'error': 'User validation failed: username: username must be atleast 3 characters long' });
  });

  test('if password is too short, return code 400', async () => {
    const newUser = {
      username: 'testman',
      name: 'Test Man',
      password: 'te'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(JSON.parse(response.text)).toEqual({ 'error': 'password must be atleast 3 characters long' });
  });
});
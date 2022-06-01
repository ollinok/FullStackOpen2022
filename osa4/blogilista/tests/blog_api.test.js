const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');


beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogPosts.map(b => new Blog(b));
  const promiseArr = blogObjects.map(b => b.save());
  await Promise.all(promiseArr);
});

describe('get blog posts', () => {
  test('blog posts are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogPosts.length);
  });

  test('blog posts are identified by the field "id"', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(b =>
      expect(b.id).toBeDefined());
  });
});

describe('add blog posts', () => {
  test('a valid blog post can be added', async () => {
    const newBlogPost = {
      title: 'Test post 1234',
      author: 'Test man',
      url: 'http://test.test',
      likes: 15
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogPosts = await helper.blogPostsInDb();
    expect(newBlogPosts).toHaveLength(helper.initialBlogPosts.length + 1);
    expect(newBlogPosts).toContainEqual(response.body);
  });

  test('if "likes" is not defined, give it a value of 0', async () => {
    const newBlogPost = {
      title: 'Test post 1234',
      author: 'Test man',
      url: 'http://test.test'
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlogPost);

    expect(response.body).toMatchObject({ likes: 0 });
  });

  test('if "title" or "url" are not defined, return code 400', async () => {
    const newBlogPost1 = {
      title: 'Test post',
      author: 'Test man'
    };
    await api
      .post('/api/blogs')
      .send(newBlogPost1)
      .expect(400);

    const newBlogPost2 = {
      author: 'Test man',
      url: 'http://test.test'
    };
    await api
      .post('/api/blogs')
      .send(newBlogPost2)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
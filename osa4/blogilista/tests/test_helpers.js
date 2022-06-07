const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogPosts = [
  {
    title: 'Testi blogi',
    author: 'Testi Ukko',
    url: 'http://testi.test',
    likes: 7
  },
  {
    title: 'Jotain tärkeetä',
    author: 'Simo',
    url: 'http://testi.test',
    likes: 10
  },
  {
    title: 'lololololololololo',
    author: 'Pertti',
    url: 'http://testi.test',
    likes: 20
  },
  {
    title: 'sasdasdasdasads',
    author: 'Pertti',
    url: 'http://testi.test',
    likes: 50
  },
  {
    title: 'elellelelelele',
    author: 'Pertti',
    url: 'http://testi.test',
    likes: 645
  }
];

const blogPostsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(b => b.toJSON());
};

const singleBlogPostInDb = async () => {
  const blog = await Blog.find({ title: initialBlogPosts[0].title });
  return blog[0].toJSON();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogPosts,
  blogPostsInDb,
  singleBlogPostInDb,
  usersInDb
};
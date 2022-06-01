const dummy = (blogs) => {
  blogs;
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return likes;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  blogs.sort((a, b) => b.likes - a.likes);
  const favourite = [blogs[0]];
  return favourite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const count = {};
  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });
  let productiveWriter = {};
  for (const [key, value] of Object.entries(count)) {
    productiveWriter = value > (productiveWriter.blogs || 0)
      ? { author: key, blogs: value }
      : { author: productiveWriter.author, blogs: productiveWriter.blogs };
  }
  return productiveWriter;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const count = {};
  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes;
  });
  let likedWriter = {};
  for (const [key, value] of Object.entries(count)) {
    likedWriter = value > (likedWriter.likes || 0)
      ? { author: key, likes: value }
      : { author: likedWriter.author, likes: likedWriter.likes };
  }
  return likedWriter;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
const mostBlogs = require('../utils/list_helper').mostBlogs;

describe('most productive author', () => {
  const listWithOneBlog = [
    {
      title: 'Testi blogi',
      author: 'Testi Ukko',
      url: 'http://testi.test',
      likes: 7,
      id: '628e0b9cf66f8ad019522e04'
    }
  ];

  const list = [
    {
      title: 'Testi blogi',
      author: 'Testi Ukko',
      url: 'http://testi.test',
      likes: 7,
      id: '628e0b9cf66f8ad019522e04'
    },
    {
      title: 'Jotain tärkeetä',
      author: 'Simo',
      url: 'http://testi.test',
      likes: 10,
      id: '628e24e736bf2c4576ab139c'
    },
    {
      title: 'lololololololololo',
      author: 'Pertti',
      url: 'http://testi.test',
      likes: 20,
      id: '628e32a12473cc597b929e07'
    },
    {
      title: 'sasdasdasdasads',
      author: 'Pertti',
      url: 'http://testi.test',
      likes: 50,
      id: '628e35d804cd18c2203d406a'
    },
    {
      title: 'elellelelelele',
      author: 'Pertti',
      url: 'http://testi.test',
      likes: 645,
      id: '628e35e404cd18c2203d406c'
    }
  ];

  test('when list has only one blog, returns that', () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toEqual(
      {
        author: 'Testi Ukko',
        blogs: 1
      }
    );
  });

  test('when sending multiple blog entries', () => {
    const result = mostBlogs(list);
    expect(result).toEqual(
      {
        author: 'Pertti',
        blogs: 3
      }
    );
  });

  test('when sending an empty array', () => {
    const result = mostBlogs([]);
    expect(result).toBe(0);
  });
});
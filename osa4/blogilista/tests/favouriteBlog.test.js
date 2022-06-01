const favouriteBlog = require('../utils/list_helper').favouriteBlog;

describe('favourite blog', () => {
  const listWithOneBlog = [
    {
      title: 'lololololololololo',
      author: 'Pertti',
      url: 'http://testi.test',
      likes: 20,
      id: '628e32a12473cc597b929e07'
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
    }
  ];

  test('when list has only one blog, returns that', () => {
    const result = favouriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog);
  });

  test('when sending multiple blog entries', () => {
    const result = favouriteBlog(list);
    expect(result).toEqual(listWithOneBlog);
  });

  test('when sending an empty array', () => {
    const result = favouriteBlog([]);
    expect(result).toBe(0);
  });
});
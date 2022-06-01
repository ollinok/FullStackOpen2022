const totalLikes = require('../utils/list_helper').totalLikes;

describe('total likes', () => {
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
      id: '628e4e736bf2c4576ab139c'
    }
  ];

  test('when list has only one blog, returns that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(7);
  });

  test('when sending multiple blog entries', () => {
    const result = totalLikes(list);
    expect(result).toBe(17);
  });

  test('when sending an empty array', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });
});
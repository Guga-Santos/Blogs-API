module.exports = {
  insert: {
    user: 'INSERT INTO Users (displayName, email, password, image) ' +
          'VALUES ("Brett Wiltshire", "brett@email.com", "123456", "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png")',
    categories: 'INSERT INTO Categories (name) VALUES ("News")',
    blogPosts:  'INSERT INTO BlogPosts (title, content, userId, published, updated) ' +
                'VALUES ("Latest updates, August 1st", ' +
                        '"The whole text for the article goes here in this key", ' +
                        '1, ' +
                        '"2011-08-01 19:58:00", ' +
                        '"2011-08-01 19:58:51.947")',
    postCategories: 'INSERT INTO PostCategories (postId, categoryId) VALUES (1, 1)'
  },
  select: {
    user: 'SELECT * FROM Users WHERE displayName = "Brett Wiltshire"',
    categories: 'SELECT * FROM Categories WHERE name = "News"',
    blogPosts: 'SELECT * FROM BlogPosts WHERE title = "Latest updates, August 1st"',
    postCategories: 'SELECT * FROM PostCategories WHERE postId = 1'
  },
  expect: {
    user: {
      id: 1,
      displayName: 'Brett Wiltshire',
      email: 'brett@email.com',
      password: '123456',
      image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png'
    },
    categories: {
      id: 1,
      name: 'News'
    },
    blogPosts: {
      general: {
        id: 1,
        title: 'Latest updates, August 1st',
        content: 'The whole text for the article goes here in this key',
        userId: 1,
      },
      published: 1312228680000,
      updated: 1312228732000
    },
    postCategories: {
      postId: 1,
      categoryId: 1,
    }
  }
}

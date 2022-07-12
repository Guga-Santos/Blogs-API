const Sequelize = require('sequelize');
const shell = require('shelljs');

const sequelizeConfig = require('../src/database/config/config');
const { sequelize: sequelizeCli } = require('./assets/constants');
const queries = require('./assets/queries');

const { requirements } = require('../.trybe/requirements.json');

describe(requirements[0].description, () => {
  let database;

  beforeAll(() => {
    database = new Sequelize(sequelizeConfig.test);
  });

  beforeEach(() => {
    shell.exec([
      sequelizeCli.drop,
      sequelizeCli.create,
      sequelizeCli.migrate
    ].join(' && '),
      { silent: process.env.DEBUG === "false" });
  });

  it('Será validado que é possível fazer um INSERT e um SELECT na tabela User', async () => {
    const insertQuery = await database
      .query(queries.insert.user, { type: 'INSERT' });
    expect(insertQuery).toEqual([1, 1]);

    const [selectQuery] = await database
      .query(queries.select.user, { type: 'SELECT' });
    expect(selectQuery).toEqual(
      expect.objectContaining(queries.expect.user)
    );
  });

  it('Será validado que é possível fazer um INSERT e um SELECT na tabela Categories', async () => {
    const insertQuery = await database
      .query(queries.insert.categories, { type: 'INSERT' });
    expect(insertQuery).toEqual([1, 1]);

    const [selectQuery] = await database
      .query(queries.select.categories, { type: 'SELECT' });
    expect(selectQuery).toEqual(
      expect.objectContaining(queries.expect.categories)
    );
  });

  it('Será validado que, a partir de um INSERT em User, é possível fazer um INSERT e um SELECT na tabela BlogPosts', async () => {
    const insertUserQuery = await database
      .query(queries.insert.user, { type: 'INSERT' });
    expect(insertUserQuery).toEqual([1, 1]);

    const insertQuery = await database
      .query(queries.insert.blogPosts, { type: 'INSERT' });
    expect(insertQuery).toEqual([1, 1]);

    const [selectQuery] = await database
      .query(queries.select.blogPosts, { type: 'SELECT' });
    expect(selectQuery).toEqual(
      expect.objectContaining(queries.expect.blogPosts.general)
    );
    expect(Date.parse(selectQuery.published))
      .toEqual(queries.expect.blogPosts.published);
    expect(Date.parse(selectQuery.updated))
      .toEqual(queries.expect.blogPosts.updated);
  });

  it('Será validado que, a partir de INSERTs em User, Categories e BlogPosts, é possível fazer um INSERT e um SELECT na tabela PostCategories', async () => {
    const insertUserQuery = await database
      .query(queries.insert.user, { type: 'INSERT' });
    expect(insertUserQuery).toEqual([1, 1]);

    const inserCategoriesQuery = await database
      .query(queries.insert.categories, { type: 'INSERT' });
    expect(inserCategoriesQuery).toEqual([1, 1]);

    const insertBlogPostsQuery = await database
      .query(queries.insert.blogPosts, { type: 'INSERT' });
    expect(insertBlogPostsQuery).toEqual([1, 1]);

    const insertQuery = await database
      .query(queries.insert.postCategories, { type: 'INSERT' });
    expect(insertQuery).toEqual([0, 1]);

    const [selectQuery] = await database
      .query(queries.select.postCategories, { type: 'SELECT' });
    expect(selectQuery).toEqual(
      expect.objectContaining(queries.expect.postCategories)
    );
  });
});

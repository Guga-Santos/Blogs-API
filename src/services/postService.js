const Joi = require('joi');
const { Op } = require('sequelize');
const models = require('../database/models');

module.exports = {
    findById: async (id) => {
        const findById = await models.BlogPost.findOne({ where: { id }, raw: true });

        if (!findById) return { code: 404, message: { message: 'Post does not exist' } };
        
        const user = await models.User.findOne({
            where: { id: findById.userId },
            raw: true,
            attributes: { exclude: ['password'] },
          });
    
          const postCategory = await models.PostCategory
          .findOne({ where: { postId: findById.id }, raw: true });
    
          const category = await models.Category
          .findAll({ where: { id: postCategory.categoryId }, raw: true });
    
          findById.user = user;
          findById.categories = category;
    
          return findById;
    },
    getAllPostsIds: async () => {
        const posts = await models.BlogPost.findAll();
        console.log(posts);
        const ids = posts.map((item) => item.id);
        return ids;
      },
      createPost: async (user, data) => {
        const { title, content, categoryIds } = data;
      
        const schema = Joi.object({
          title: Joi.string().required(),
          content: Joi.string().required(),
          categoryIds: Joi.array().required(),
        });
      
        const { error } = schema.validate(data);
        if (error) return { code: 400, message: { message: 'Some required fields are missing' } };
      
        const categ = await models.Category.findAll({ where: { id: categoryIds }, raw: true });
        if (categ.length < 1) return { code: 400, message: { message: '"categoryIds" not found' } };
      
        const newPost = await models.BlogPost.create({ title, content, userId: user.data.id });
      
        const newPostCateg = categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId }));
      
        await models.PostCategory.bulkCreate(newPostCateg);
      
        return newPost;
      },
      updatePost: async (id, postId, data) => {      
        const { title, content } = data;
        const schema = Joi.object({
          title: Joi.string().required(),
          content: Joi.string().required(),
        });

        const findPost = await models.BlogPost.findOne({ where: { id: postId }, raw: true });
      
        const { error } = schema.validate(data);
        if (error) return { code: 400, message: { message: 'Some required fields are missing' } };
      
        if (id !== findPost.userId) return { code: 401, message: { message: 'Unauthorized user' } };
        
        const [updated] = await models.BlogPost.update({
          title,
          content,
        }, { 
          where: { id: Number(postId) },
          raw: true,
        });

        return updated;
        // Vai retornar apenas o id do post que será alterado.
      },
      deletePost: async (id, postId) => {
        const findById = await models.BlogPost.findOne({ where: { id: postId }, raw: true });

        if (!findById) return { code: 404, message: { message: 'Post does not exist' } };

        if (id !== findById.userId) return { code: 401, message: { message: 'Unauthorized user' } };

        await models.BlogPost.destroy({ where: { id: postId } });

        return true;
      },
      searchQuery: async (query) => {
        const search = await models.BlogPost.findAll({
          include: [
            { model: models.User, as: 'user', attributes: { exclude: 'password' } },
            { model: models.Category, as: 'categories', through: { attributes: [] } },
          ],
          // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
          where: {
            [Op.or]: [
              { title: { [Op.substring]: query } },
              { content: { [Op.substring]: query } },
            ],
          },
        });
        // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#:~:text=Sequelize%20provides%20several%20operators.
        return search;
      },
};
// 

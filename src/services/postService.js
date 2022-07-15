const Joi = require('joi');
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
        const posts = await models.BlogPost.findAll({ raw: true });
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
};
// 

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
};
// 

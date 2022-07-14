const Joi = require('joi');
const models = require('../database/models');

module.exports = {
    createCategory: async (category) => {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        const auth = schema.validate(category);

        const { error } = auth;
    
        if (error) return { code: 400, message: { message: error.message } };

        const createdCategory = await models.Category.create(category);

        return createdCategory;
    },
    getAllCategories: async () => {
        const findAll = await models.Category.findAll();
        return findAll;
    },
};
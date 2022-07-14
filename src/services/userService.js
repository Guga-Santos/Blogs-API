const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');

module.exports = {
    newUserAuth: async (newUser) => {
        const schema = Joi.object({
            displayName: Joi.string().min(8).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            image: Joi.string().required(),
        });
        const auth = schema.validate(newUser);
    
        const { error, value } = auth;
    
        if (error) return { code: 400, message: { message: error.message } };
    
        return value;
    },
    findUser: async ({ email }) => {
        const findUser = await models.User.findOne({
            where: { email },
            raw: true,
        });
        
        if (!findUser) return false;

        return true;
    },
    generateToken: async (userInfos) => {
        const token = jwt.sign({ data: userInfos }, process.env.JWT_SECRET);

        return token;
      },
    userCreate: async (newUser) => {
        const createdUser = await models.User.create(newUser);

        return createdUser;
    },
    getAllUsers: async () => {
        const users = await models.User.findAll({
          attributes: { exclude: ['password'] },
        });
        return users;
      },
};
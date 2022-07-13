const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');

module.exports = {
    loginAuth: async (user) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        const auth = schema.validate(user);

        const { error, value } = auth;
    
        if (error) return { code: 400, message: 'Some required fields are missing' };
    
        return value;
    },
    findUser: async ({ email, password }) => {
        const findUser = await models.User.findOne({
            where: { email },
            raw: true,
        });
        
        if (!findUser || findUser.password !== password) {
            return { code: 400, message: 'Invalid fields' };
        }

        const { password: any, ...infos } = findUser;

        return infos;
    },
    tokenAuth: async (token) => {
        const schema = Joi.string().required();
        
        const auth = schema.validate(token);
    
        const { error, value } = auth;
    
        if (error) return { code: 401, message: 'Token is required' };
        
        return value;
    },
    generateToken: async (userInfos) => {
        const token = jwt.sign({ data: userInfos }, process.env.JWT_SECRET);

        return token;
      },
        
};

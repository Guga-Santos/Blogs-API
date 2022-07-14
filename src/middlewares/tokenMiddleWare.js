const jwt = require('jsonwebtoken');
const Joi = require('joi');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const schema = Joi.string().required();
        const validate = schema.validate(token);
    
        if (!token || validate.error) return res.status(401).json({ message: 'Token not found' });

        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
};
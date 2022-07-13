const { Router } = require('express');
const userController = require('../controllers/userController');

const createUser = Router();

createUser.route('/').post(userController.newUserCreated);

module.exports = createUser;
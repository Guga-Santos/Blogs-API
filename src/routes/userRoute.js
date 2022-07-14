const { Router } = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/tokenMiddleWare');

const User = Router();

// User.route('/').post(userController.newUserCreated);
// User.route('/').get()

User.post('/', userController.newUserCreated);
User.get('/:id', auth, userController.getUserById);
User.get('/', auth, userController.getAllUsers);

module.exports = User;
const { Router } = require('express');
const loginController = require('../controllers/loginController');

const login = Router();

login.route('/').post(loginController.loginDone);

module.exports = login;
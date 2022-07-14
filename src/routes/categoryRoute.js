const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/tokenMiddleWare');

const Category = Router();

Category.post('/', auth, categoryController.createCategory);
Category.get('/', auth, categoryController.getAllCategories);

module.exports = Category;
const { Router } = require('express');
const postController = require('../controllers/postController');
const auth = require('../middlewares/tokenMiddleWare');

const BlogPost = Router();

BlogPost.get('/:id', auth, postController.getById);
BlogPost.get('/', auth, postController.getAllPosts);

module.exports = BlogPost;
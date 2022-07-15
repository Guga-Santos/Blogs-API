const { Router } = require('express');
const postController = require('../controllers/postController');
const auth = require('../middlewares/tokenMiddleWare');

const BlogPost = Router();

BlogPost.get('/:id', auth, postController.getById);
BlogPost.get('/', auth, postController.getAllPosts);
BlogPost.put('/:id', auth, postController.updatePost);
BlogPost.post('/', auth, postController.createPost);
BlogPost.delete('/:id', auth, postController.deletePost);

module.exports = BlogPost;
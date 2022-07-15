const postService = require('../services/postService');

module.exports = {
  getById: async (req, res) => {
    const { id } = req.params;

    const getById = await postService.findById(id);

    if (getById.code) return res.status(404).json({ message: 'Post does not exist' });

    res.status(200).json(getById);
  },
  getAllPosts: async (req, res) => {
    const getPostsIds = await postService.getAllPostsIds();
    const allPosts = await Promise.all(getPostsIds
        .map((id) => postService.findById(id)));
    
        res.status(200).json(allPosts);
  },
  createPost: async (req, res) => {
    const post = await postService.createPost(req.user, req.body);

    if (post.code) return res.status(post.code).json(post.message);

    return res.status(201).json(post);
  },
  updatePost: async (req, res) => {
    const { data } = req.user;
    const { id } = req.params;

    const upPost = await postService.updatePost(data.id, id, req.body);

    if (upPost.code) return res.status(upPost.code).json(upPost.message);

    const updated = await postService.findById(upPost);

    return res.status(200).json(updated);
  },
};
const postService = require('../services/postService');

module.exports = {
  getById: async (req, res) => {
    const { id } = req.params;

    const getById = await postService.findById(id);

    if (getById.code) return res.status(404).json({ message: 'Post does not exist' });

    res.status(200).json(getById);
  },
};
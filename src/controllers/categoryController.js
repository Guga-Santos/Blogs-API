const categoryService = require('../services/categoryService');

module.exports = {
    createCategory: async (req, res) => {
        const create = await categoryService.createCategory(req.body);

        if (create.code) return res.status(create.code).json(create.message);

        res.status(201).json(create);
    },
    getAllCategories: async (req, res) => {
        const findAll = await categoryService.getAllCategories();

        res.status(200).json(findAll);
    },
};
const userService = require('../services/userService');

module.exports = {
    newUserCreated: async (req, res) => {
        const auth = await userService.newUserAuth(req.body);
        if (auth.code) return res.status(auth.code).json(auth.message);

        const findUser = await userService.findUser(req.body);
        if (findUser) return res.status(409).json({ message: 'User already registered' });

        const { password, ...infos } = auth;

        const token = await userService.generateToken(infos);
        
        await userService.userCreate(auth);

        res.status(201).json({ token });
    },
    getAllUsers: async (req, res) => {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    },
};
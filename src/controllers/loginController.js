const loginService = require('../services/loginService');

module.exports = {
    loginDone: async (req, res) => {
        const validated = await loginService.loginAuth(req.body);
        if (validated.code) return res.status(validated.code).json(validated.message);

        const findUser = await loginService.findUser(validated);
        if (findUser.code) return res.status(findUser.code).json(findUser.message);

        const token = await loginService.generateToken(findUser);
        res.status(200).json({ token });
    },
};
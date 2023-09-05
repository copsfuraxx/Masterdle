const authService = require('../services/authService');
const userService = require('../services/userService');
const logger = require('../logger');

exports.signup = async (req, res) => {
    try {
        const codeValide = await authService.isCodeValid(req.body.code);
        if (userExists) {
            res.status(400).json('Code not valide');
            return;
        }

        const userExists = await authService.isUserExist(req.body.username);
        if (userExists) {
            res.status(400).json(`User ${req.body.username} already exist`);
            return;
        }

        const hash = await authService.hashPasswrd(req.body.passwrd);

        const uuid = await userService.newUser(req.body.username, hash);
        
        res.status(200).json(await authService.generateToken(uuid));

    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message);
        return;
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.findUser(req.body.username);
        if (user == null) {
            res.status(400).json(`User ${req.body.username} does not exist`);
            return;
        }
        if (!await authService.verifyPasswrd(req.body.passwrd, user.user_passwrd)) {
            res.status(400).json('Wrong password');
            return;
        }
        res.status(200).json(await authService.generateToken(user.uuid));
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message);
        return;
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
    
        if (token == null) {
            res.status(400).json('Token not sent');
            return;
        }

        const verified = await authService.verifyRefreshToken(token);
        if (verified.error) {
            res.status(400).json(verified.message);
            return;
        }
        res.status(200).send({accessToken: verified.accessToken});
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message);
        return;
    }
};
const authService = require('../services/authService');
const userService = require('../services/userService');
const logger = require('../logger');

exports.newUser = async (req, res) => {
    /*
    #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string',
        description: 'token with admin role'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/UserSign' }
    }
    */
    try {
        const userExists = await authService.isUserExist(req.body.username);
        if (userExists) {
            res.status(400).json(`User ${req.body.username} already exist`);
            return;
        }

        const hash = await authService.hashPasswrd(req.body.passwrd);

        await userService.newUser(req.body.username, hash);
        
        res.status(200).json('User succesfuly create');

    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message);
        return;
    }
};

exports.login = async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/UserSign' }
    }
    #swagger.responses[400] = {
        description: 'Wrong username or password'
    }
    #swagger.responses[200] = {
        schema: {
            accessToken: 'jwt',
            refreshToken: 'jwt'
        }
    }
    */
    try {
        const user = await userService.findUser(req.body.username);
        if (user == null) {
            res.status(400).json('Wrong username or password');
            return;
        }
        if (!await authService.verifyPasswrd(req.body.passwrd, user.user_passwrd)) {
            res.status(400).json('Wrong username or password');
            return;
        }
        let tokens = await authService.generateToken(user.uuid);
        res.status(200).json(tokens);
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message);
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
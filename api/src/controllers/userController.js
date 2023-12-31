const userService = require('../services/userService');
const logger = require('../logger');

exports.getUser = async (req, res) => {
    /*
    #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string',
        description: 'token'
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/User' }
    }
    */
    try {
        const ans = await userService.findUserWithid(req.uuid);
        res.status(200).json({user_name: ans.user_name, user_role: ans.user_role});
    } catch (error) {
        console.log('test');
        logger.error(error.message)
        res.status(500).json(error.message);
    }
};
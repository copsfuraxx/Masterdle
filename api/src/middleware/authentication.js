const authService = require('../services/authService');
const userService = require('../services/userService');
const logger = require('../logger');

exports.checkPermission = (permission) => {
    return async (req, res, next) => {
        // Check if the user is authenticated and has the required permission
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            res.status(400).json('Token not sent');
            return;
        }

        try {
            const uuid = await authService.verifyAccessToken(token);
            const isAdmin = await userService.userRoleEquals(uuid, 'admin');
            if (isAdmin[0].user_role != 'admin') {
                res.status(400).json("You don't have the permission");
                return;
            }
                next();
            
        } catch (error) {
            logger.error(error.message)
            res.status(500).json(error.message);
        }
    };
}
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authentication')

router.get('/get', authMiddleware.isConnected, userController.getUser);

module.exports = router;
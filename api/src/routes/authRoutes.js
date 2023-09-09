const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authentication.js');

router.post('/newUser', authMiddleware.checkPermission('admin'), authController.newUser);
router.post('/login', authController.login);
router.get('/refreshToken', authController.refreshToken);

module.exports = router;
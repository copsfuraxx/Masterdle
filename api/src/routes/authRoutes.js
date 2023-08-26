const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/refreshToken', AuthController.refreshToken);

module.exports = router;
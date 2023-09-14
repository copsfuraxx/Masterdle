const express = require('express');
const router = express.Router();
const game1Controller = require('../controllers/game1Controller');
const authMiddleware = require('../middleware/authentication')

router.get('/isGoodAnswer/:id', authMiddleware.isConnected, game1Controller.isGoodAnswer);

module.exports = router;
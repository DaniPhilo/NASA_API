const express = require('express');
const router = express.Router();

// Auth controllers:
const { initSignUp,  closeSignUp } = require('../controllers/auth_controllers');

// Auth middlewares:
const { validateUser, createAccessToken, createRefreshToken, authenticateToken } = require('../middlewares/auth_middlewares');

router.post('/signUp', initSignUp, createAccessToken, createRefreshToken, closeSignUp);

module.exports = router;
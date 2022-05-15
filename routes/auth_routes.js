const express = require('express');
const router = express.Router();

// Auth controllers:
const { initSignUp,  closeSignUp, initSignIn, closeSignIn } = require('../controllers/auth_controllers');

// Auth middlewares:
const { validateUser, createAccessToken, createRefreshToken, authenticateToken } = require('../middlewares/auth_middlewares');

router.post('/signUp', initSignUp, createAccessToken, createRefreshToken, closeSignUp);
router.post('/signIn', initSignIn, createAccessToken, createRefreshToken, closeSignIn);

module.exports = router;
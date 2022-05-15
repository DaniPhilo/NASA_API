const express = require('express');
const router = express.Router();

// Auth controllers:
const { initSignUp,  closeSignUp, initSignIn, closeSignIn, logOut } = require('../controllers/auth_controllers');

// Auth middlewares:
const { validateUser, createAccessToken, createRefreshToken, authenticateToken } = require('../middlewares/auth_middlewares');

router.get('/session', authenticateToken, closeSignIn);
router.get('/logOut', authenticateToken, logOut);

router.post('/signUp', initSignUp, createAccessToken, createRefreshToken, closeSignUp);
router.post('/signIn', initSignIn, createAccessToken, createRefreshToken, closeSignIn);

module.exports = router;
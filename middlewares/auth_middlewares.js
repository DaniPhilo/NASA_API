const User = require('../models/users_models');

const { getAccessToken, getRefreshToken, storeRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../services/auth_services');

const { AuthenticationError } = require('../utils/errors');

const { createCookie } = require('../utils/cookies');

const validateUser = (req, res, next) => {
    // Run validations
    // ...
}

const createAccessToken = (req, res, next) => {
    try {
        const token = getAccessToken(req.user.user_id);
        createCookie(res, 'aT', token);

        return next()
    } catch (error) {
        return next(error)
    }
}

const createRefreshToken = async (req, res, next) => {
    try {
        const token = getRefreshToken(req.user.user_id);
        await storeRefreshToken(req.user.user_id, token);
        createCookie(res, 'rT', token);

        return next();
    }
    catch (error) {
        return next(error)
    }
}

const authenticateToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            const error = new AuthenticationError(403, 'No access token provided');
            return next(error)
        }
        const user = verifyAccessToken(accessToken);
        if (!user) {
            const refreshToken = req.cookies.refresh_token;
            if (!refreshToken) {
                const error = new AuthenticationError(403, 'No refresh token provided');
                return next(error)
            }
            const user = verifyRefreshToken(refreshToken);
            if (!user) {
                const error = new AuthenticationError(403, 'Invalid refresh token provided');
                return next(error)
            }
            const dbUser = await User.find({ email: user.user_id });
            if (refreshToken !== dbUser.refresh_token) {
                const error = new AuthenticationError(403, 'Refresh token does not match DB')
                return next(error)
            }
            const tokens = [getAccessToken(dbUser.email), getRefreshToken(dbUser.email)];
            await storeRefreshToken(dbUser.email, tokens[1]);
            createCookie(res, 'aT', tokens[0]);
            createCookie(res, 'rT', tokens[1]);
            req.user = user;

            return next()
        }

        req.user = user;

        return next();
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    validateUser,
    createAccessToken,
    createRefreshToken,
    authenticateToken
}
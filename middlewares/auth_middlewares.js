const User = require('../models/users_models');

const { getAccessToken, getRefreshToken, storeRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../services/auth_services');
const { findUserByField } = require('../services/users_services');

const { AuthenticationError } = require('../utils/errors');

const { createCookie, removeCookies } = require('../utils/cookies');

const validateUser = (req, res, next) => {
    // Run validations
    // ...
}

const createAccessToken = async (req, res, next) => {
    try {
        const token = await getAccessToken(req.user.user_id);
        createCookie(res, 'aT', token);

        return next()
    } catch (error) {
        return next(error)
    }
}

const createRefreshToken = async (req, res, next) => {
    try {
        const token = await getRefreshToken(req.user.user_id);
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
        const accessToken = req.cookies.aT;
        if (!accessToken) {
            const error = new AuthenticationError(403, 'No access token provided');
            return next(error)
        }
        const user = await verifyAccessToken(accessToken);
        if (!user) {
            const refreshToken = req.cookies.rT;
            if (!refreshToken) {
                const error = new AuthenticationError(403, 'No refresh token provided');
                return next(error)
            }
            const user = await verifyRefreshToken(refreshToken);
            if (!user) {
                const error = new AuthenticationError(403, 'Invalid refresh token provided');
                return next(error)
            }
            const dbUser = await findUserByField('email', user.user_id);
            if (refreshToken !== dbUser.refresh_token) {
                // console.log(refreshToken, dbUser.refresh_token)
                // console.log(refreshToken)
                // console.log(dbUser.refresh_token)
                const error = new AuthenticationError(403, 'Refresh token does not match DB')
                return next(error)
            }
            const newAccessToken = await getAccessToken(dbUser.email);
            const newRefreshToken = await getRefreshToken(dbUser.email);
            // console.log(newRefreshToken)
            await storeRefreshToken(dbUser.email, newRefreshToken);
            createCookie(res, 'aT', newAccessToken);
            createCookie(res, 'rT', newRefreshToken);
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

const checkAndRemoveTokens = async (req, res, next) => {
    try {
        const accessToken = req.cookies.aT;
        if (!accessToken) {
            const error = new AuthenticationError(403, 'No access token provided');
            return next(error)
        }
        const user = await verifyAccessToken(accessToken);
        if (!user) {
            const refreshToken = req.cookies.rT;
            if (!refreshToken) {
                const error = new AuthenticationError(403, 'No refresh token provided');
                return next(error)
            }
            const user = await verifyRefreshToken(refreshToken);
            if (!user) {
                const error = new AuthenticationError(403, 'Invalid refresh token provided');
                return next(error)
            }
            const dbUser = await findUserByField('email', user.user_id);
            if (refreshToken !== dbUser.refresh_token) {
                const error = new AuthenticationError(403, 'Refresh token does not match DB')
                return next(error)
            }
            req.user = user;
            removeCookies(res, ['aT', 'rT']);
            return next()
        }
        req.user = user;
        removeCookies(res, ['aT', 'rT']);
        return next()
    }
    catch (error) {
        return next(error)
    }
}

const createSwaggerAuth = async (req, res, next) => {
    try {
        const acessToken = await getAccessToken('tomas.de.zumalacarregui@gmail.com');
        createCookie(res, 'aT', acessToken);

        const refreshToken = await getRefreshToken('tomas.de.zumalacarregui@gmail.com');
        await storeRefreshToken('tomas.de.zumalacarregui@gmail.com', refreshToken);
        createCookie(res, 'rT', refreshToken);
        return next()
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    validateUser,
    createAccessToken,
    createRefreshToken,
    authenticateToken,
    checkAndRemoveTokens,
    createSwaggerAuth
}
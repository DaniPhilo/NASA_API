const { saveUser } = require('../services/auth_services');

const { AuthenticationError } = require('../utils/errors');

const initSignUp = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        req.user = { user_id: email };
        const newUser = await saveUser(name, email, password, password2);
        if (!newUser) {
            const error = new AuthenticationError(401, 'Unable to sign up');
            return next(error)
        }
        return next()
    }
    catch (error) {
        return next(error)
    }
}

const closeSignUp = async (req, res, next) => {
    try {
        res.status(201).json();
    } catch (error) {
        return (next(error))
    }
}

module.exports = {
    initSignUp,
    closeSignUp
}
const { saveUser } = require('../services/auth_services');
const { findUserByField } = require('../services/users_services');
const { checkPassword } = require('../utils/hashing');

const { AuthenticationError } = require('../utils/errors');

const initSignUp = async (req, res, next) => {
    try {
        // validations
        //...
        const { name, email, password, password2 } = req.body;
        req.user = { user_id: email };
        const newUser = await saveUser(name, email, password, password2);
        if (!newUser) {
            const error = new AuthenticationError(400, 'Unable to sign up');
            return next(error)
        }
        return next()
    }
    catch (error) {
        return next(error)
    }
}

const closeSignUp = (req, res, next) => {
    try {
        res.status(201).header('Access-Control-Allow-Credentials', true).json({ authenticated: true, message: 'User registered' });
    }
    catch (error) {
        return (next(error))
    }
}

const initSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByField('email', email);
        if (!user) {
            const error = new AuthenticationError(401, 'No user with that email in DB');
            return next(error)
        }
        const passwordCheck = await checkPassword(password, user.password);
        if (!passwordCheck) {
            const error = new AuthenticationError(401, 'Wrong password');
            return next(error)
        }
        req.user = { user_id: email }
        return next()
    }
    catch (error) {
        return next(error)
    }
}

const closeSignIn = (req, res, next) => {
    try {
        res.status(200).header('Access-Control-Allow-Credentials', true).json({ authenticated: true, message: 'User logged in' });
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    initSignUp,
    closeSignUp,
    initSignIn,
    closeSignIn
}
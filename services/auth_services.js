const jwt = require('jsonwebtoken');

const { createHash, checkPassword } = require('../utils/hashing');
const User = require('../models/users_models');

const saveUser = async (name, email, password) => {
    try {
        const hashedPassword = await createHash(password);
        const newUser = await User.create({ name: name, email: email, password: hashedPassword });
        if (!newUser) {
            return false
        }
        return newUser
    }
    catch (error) {
        return error
    }
}

const getAccessToken = async (email) => {
    const accessToken = jwt.sign({ user_id: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
    if (!accessToken) {
        return false
    }
    return accessToken
}

const getRefreshToken = async (email) => {
    const refreshToken = jwt.sign({ user_id: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
    if (!refreshToken) {
        return false
    }
    return refreshToken
}

const storeRefreshToken = async (email, token) => {
    try {
        const user = await User.findOneAndUpdate({ email: email }, { refresh_token: token }, { new: true });
        if (!user) {
            return false
        }
        return user
    } catch (error) {
        return error
    }
}

const verifyAccessToken = async (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return false
        }
        return user
    });
}

const verifyRefreshToken = async (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return false
        }
        return user
    });
}


    //     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    //         if (err) {
    //             const refreshToken = req.cookies.refresh_token;
    //             if (!refreshToken) {
    //                 const error = new AuthenticationError(403, 'No refresh token provided')
    //                 return next(error)
    //             }
    //             jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    //                 if (err) {
    //                     const error = new ForbiddenError('Invalid refresh token provided')
    //                     return next(error)
    //                 }

    //                 const dbUser = await findUserById(user.user_id);
    //                 if (refreshToken !== dbUser.refresh_token) {
    //                     const error = new ForbiddenError('Refresh token does not match DB')
    //                     return next(error)
    //                 }
    //             })


// const authenticateRefreshToken = async (refreshToken) => {
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
//         if (err) {
//             return false
//         }

//         const dbUser = await User.find({ email: user.user_id });
//         if (refreshToken !== dbUser.refresh_token) {
//             return false
//         }

//         await User.findOneAndUpdate({ email: user.user_id }, { refresh_token: refreshToken });

//         res.cookie('aT', refreshToken, {
//             secure: true,
//             httpOnly: true,
//             sameSite: 'lax'
//         });
//         res.cookie('rT', refreshToken, {
//             secure: true,
//             httpOnly: true,
//             sameSite: 'lax'
//         });

//         // Metemos user_id en req.user para tener siempre disponible en cada page la id de la DB del usuario.
//         req.user = user;

//         return next();
//     });

// }

module.exports = {
    saveUser,
    getAccessToken,
    getRefreshToken,
    storeRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,

}
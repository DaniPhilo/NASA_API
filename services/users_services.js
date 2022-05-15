const User = require('../models/users_models');

const findUserByField = async (field, value) => {
    try {
        const user = await User.find({ [field]: value});
        if (!user) {
            return false
        }
        return user
    } catch (error) {
        return error
    }
}

module.exports = {
    findUserByField
}
const createCookie = (res, name, value) => {
    try {
        res.cookie(name, value, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    } catch (error) {
        console.log(error);
    }
}

const deleteCookie = (res, name) => {
    res.clearCookie(name, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
}

module.exports = {
    createCookie,
    deleteCookie
}
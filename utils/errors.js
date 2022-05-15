class CustomError extends Error {
    constructor(message) {
        super();
        this.type = 'custom_error';
        this.message = message;
    }
}

class AuthenticationError extends Error {
    constructor(code, message) {
        super();
        this.type = 'authentication_error';
        this.code = code;
        this.message = message;
    }
}

module.exports = {
    CustomError,
    AuthenticationError
};
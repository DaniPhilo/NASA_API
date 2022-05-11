class CustomError {
    constructor(message) {
        this.type = 'custom_error';
        this.message = message;
    }
}

module.exports = CustomError;
const crypto = require('crypto');

const generateString = () => {
    const string = crypto.randomBytes(24).toString('hex');
    return string
}

const string = generateString();

console.log(string)
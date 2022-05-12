const CustomError = require("./errors");

const validateNumber = (mass) => {
    const regex = /^\d+$/g;
    return regex.test(Number(mass))
}

const validateName = (name) => {
    const regex = /^[\w\s-]+$/gi;
    return regex.test(name)
}

const validadteCoords = (coord) => {
    const regex = /^[\d]+\.[\d]+$/gi;
    return regex.test(parseFloat(coord))
}

const validateLandingDocument = (doc) => {
    console.log(doc)
    if (!doc.name || !validateName(doc.name)) {
        console.log('Invalid name')
        throw new CustomError('Invalid name')
    }

    if(!doc.id) {
        console.log('Invalid id')
        throw new CustomError('Invalid id')
    }

    if(!doc.recclass) {
        console.log('Invalid class')
        throw new CustomError('Invalid class')
    }

    if (!doc.mass) {
        console.log('Invalid mass')
        throw new CustomError('Invalid mass parameter: please, provide a whole number')
    }

    if (!doc.year) {
        console.log('Invalid year')
        throw new CustomError('Invalid year')
    }

    if (!doc.reclat) {
        console.log('Invalid lat')
        throw new CustomError('Invalid latitude')
    }

    if (!doc.reclong) {
        console.log('Invalid long')
        throw new CustomError('Invalid longitude')
    }
    else {
        return true
    }
    
}
const validateNeaDocument = (doc) => {
    const keys = Object.keys(doc);
    const result = keys.filter(key => !doc[key]);
    return result.length < 1 ? true : false
}

const capitalizeString = (string) => {
    const newString = string.split('').map((letter, index) => {
        return index === 0 ? letter.toUpperCase() : letter.toLowerCase();
    });
    return newString.join('')
}

module.exports = {
    validateNumber,
    validateName,
    validadteCoords,
    validateLandingDocument,
    validateNeaDocument,
    capitalizeString
}
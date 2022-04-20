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

const validateDocument = (doc) => {
    console.log(doc)
    if (!doc.name || !validateName(doc.name)) {
        console.log('Invalid name')
        throw new CustomError('Invalid name')
    }

    if(!doc.id || !validateNumber(doc.id)) {
        console.log('Invalid id')
        throw new CustomError('Invalid id')
    }

    if(!doc.recclass) {
        console.log('Invalid class')
        throw new CustomError('Invalid class')
    }

    if (!doc.mass || !validateNumber(doc.mass)) {
        console.log('Invalid mass')
        throw new CustomError('Invalid mass parameter: please, provide a whole number')
    }

    if (!doc.year) {
        console.log('Invalid year')
        throw new CustomError('Invalid year')
    }

    if (!doc.reclat || !validadteCoords(doc.reclat)) {
        console.log('Invalid lat')
        throw new CustomError('Invalid latitude')
    }

    if (!doc.reclong || !validadteCoords(doc.reclong)) {
        console.log('Invalid long')
        throw new CustomError('Invalid longitude')
    }
    else {
        return true
    }
    
}

module.exports = {
    validateNumber,
    validateName,
    validadteCoords,
    validateDocument
}
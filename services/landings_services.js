const Landing = require('../models/landings_models');

const { validateNumber } = require('../utils/validations');
const {CustomError} = require('../utils/errors');

const getAll = async () => {
    try {
        const landings = await Landing.find({}).sort('name');
        return landings
    }
    catch (error) {
        return error
    }
}

const getByName = async (name) => {
    try {
        const regex = new RegExp(name);
        const landings = await Landing.find({ name: { $regex: regex, $options: 'i' } }).limit(10).sort('name');
        return landings
    } catch (error) {
        return error
    }
}

const getNumberOfDocuments = async () => {
    try {
        const count = await Landing.countDocuments({});
        return count
    } catch (error) {
        return error
    }
}

const getPaginatedLandings = async (field, order, page) => {
    try {
        const landings = await Landing.find({}).sort({ [field]: order }).skip((page - 1) * 10).limit(10);
        return landings
    } catch (error) {
        return error
    }
}

const getByMinMass = async (minMass) => {
    try {
        if (!validateNumber(minMass)) { throw new CustomError('Invalid parameter(mass): please, provide a whole number') }

        const landings = await Landing.find({
            $expr: {
                $gte: [
                    { $convert: { input: '$mass', to: 'decimal' } },
                    minMass
                ]
            }
        }).sort({ mass: 1 });
        return landings
    }
    catch (error) {
        return error
    }
}

const getByMass = async (mass) => {
    try {
        if (!validateNumber(mass)) { throw new CustomError('Invalid parameter(mass): please, provide a whole number') }
        const landings = await Landing.find({
            $expr: {
                $eq: [
                    { $convert: { input: '$mass', to: 'decimal' } },
                    mass
                ]
            }
        });
        return landings
    }
    catch (error) {
        return error
    }
}

const getByClass = async (recclass) => {
    try {
        const landings = await Landing.find({ recclass: recclass });
        return landings
    }
    catch (error) {
        return error
    }
}

const getByDate = async (from, to) => {
    try {
        const landings = [];
        if (from && to && validateNumber(from) && validateNumber(to)) {
            const response = await Landing.find(
                { year: { $gte: from, $lte: to } }
            ).sort({ year: 1 });
            landings.push(...response);
        }

        else if (from && !to && validateNumber(from)) {
            const response = await Landing.find(
                { year: { $gte: from } }
            ).sort({ year: 1 });
            landings.push(...response);
        }

        else if (to && !from && validateNumber(to)) {
            const response = await Landing.find(
                { year: { $lte: to } }
            ).sort({ year: 1 });
            landings.push(...response);
        }

        else if (landings.length < 1) {
            return false;
        }

        return landings

    }
    catch (error) {
        return error
    }
};


module.exports = {
    getAll,
    getByName,
    getNumberOfDocuments,
    getPaginatedLandings,
    getByMinMass,
    getByMass,
    getByClass,
    getByDate
}
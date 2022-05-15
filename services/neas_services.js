const Nea = require('../models/neas_models');

const { validateNumber, validateNeaDocument, capitalizeString } = require('../utils/validations');
const {CustomError} = require('../utils/errors');

const getAll = async () => {
    try {
        const neas = await Nea.find({}).sort('discovery_date');
        return neas
    }
    catch (error) {
        return error
    }
}

const getByDesignation = async (designation) => {
    try {
        const regex = new RegExp(designation);
        const neas = await Nea.find({ designation: { $regex: regex, $options: 'i' } }).limit(10).sort('designation');
        return neas
    } catch (error) {
        return error
    }
}

const getNumberOfDocuments = async () => {
    try {
        const count = await Nea.countDocuments({});
        return count
    } catch (error) {
        return error
    }
}

const getPaginatedNeas = async (field, order, page) => {
    try {
        const neas = await Nea.find({}).sort({ [field]: order }).skip((page - 1) * 10).limit(10);
        return neas
    } catch (error) {
        return error
    }
}

const getByOrbitClass = async (param) => {
    try {
        const orbitClass = capitalizeString(param);
        const neas = await Nea.find({ orbit_class: orbitClass }).sort('orbit_class');
        return neas
    }
    catch (error) {
        return error
    }
}

const getByDate = async (from, to) => {
    try {
        const neas = [];
        if (from && to && validateNumber(from) && validateNumber(to)) {
            const response = await Nea.find(
                { discovery_date: { $gte: from, $lte: to } }
            ).sort({ discovery_date: 1 });
            neas.push(...response);
        }

        else if (from && !to && validateNumber(from)) {
            const response = await Nea.find(
                { discovery_date: { $gte: from } }
            ).sort({ discovery_date: 1 });
            neas.push(...response);
        }

        else if (to && !from && validateNumber(to)) {
            const response = await Nea.find(
                { discovery_date: { $lte: to } }
            ).sort({ discovery_date: 1 });
            neas.push(...response);
        }

        else if (neas.length < 1) {
            return false;
        }

        return neas

    }
    catch (error) {
        return error
    }
};


module.exports = {
    getAll,
    getByDesignation,
    getNumberOfDocuments,
    getPaginatedNeas,
    getByOrbitClass,
    getByDate
}
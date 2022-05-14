const Landing = require('../models/landings_models');
const { getAll, getNumberOfDocuments, getPaginatedLandings, getByMinMass, getByMass, getByClass, getByDate } = require('../services/landings_services');
const { validateNumber, validateLandingDocument } = require('../utils/validations');
const CustomError = require('../utils/errors');

const getAllLandings = async (req, res, next) => {
    try {
        const page = req.params.page;
        let count = null;
        let landings
        if (page) {
            count = await getNumberOfDocuments();
            landings = await getPaginatedLandings(page);
        } else {
            landings = await getAll();
        }

        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings found' });
        }
        res.status(200).json({ response: true, count: count, landings });
    }
    catch (error) {
        return next(error)
    }
}

const getLandingByMinMass = async (req, res, next) => {
    try {
        const queryMass = Number(req.params.minMass);
        const landings = await getByMinMass(queryMass);
        if (landings.type === 'custom_error') { return next(landings) }
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings });
    }
    catch (error) {
        return next(error)
    }
}

const getLandingByMass = async (req, res, next) => {
    try {
        const queryMass = Number(req.params.queryMass);
        const landings = await getByMass(queryMass);
        if (landings.type === 'custom_error') { return next(landings) }
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings });
    }
    catch (error) {
        return next(error)
    }
}

const getLandingByClass = async (req, res, next) => {
    try {
        const queryClass = req.params.queryClass;
        const landings = await getByClass(queryClass);
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings });
    }
    catch (error) {
        return next(error)
    }
}

const getLandingByDate = async (req, res) => {
    const { from, to } = req.query;
    try {
        const landings = await getByDate(from, to);
        if (!landings || landings.length < 1) {
            return res.status(400).json({ message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings });
    }
    catch (error) {
        return next(error)
    }
};

const createLanding = async (req, res, next) => {
    try {
        if (!validateLandingDocument(req.body)) { throw new CustomError('Invalid parameters') }
        const landing = await Landing.create(req.body);
        if (!landing) {
            throw new CustomError('Landing was not created in DB');
        }
        res.status(201).json({ response: true, landing });
    }
    catch (error) {
        return next(error)
    }
}

const editLanding = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!validateNumber(id)) { throw new CustomError('Invalid parameter(id): please, provide a whole number') }
        if (!validateLandingDocument(req.body)) { throw new CustomError('Invalid parameters') }
        const landings = await Landing.findOneAndUpdate({ id: id }, req.body, { new: true });
        if (!landings || landings.length < 1) {
            throw new CustomError('No landings with such parameters');
        }
        res.status(200).json({ response: true, landings });
    }
    catch (error) {
        return next(error)
    }
}

const deleteLanding = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!validateNumber(id)) { throw new CustomError('Invalid parameter(id): please, provide a whole number') }
        const landing = await Landing.findOneAndDelete({ id: id });
        if (!landing || landing.length < 1) {
            throw new CustomError('No landings with such parameters');
        }
        res.status(200).json({ response: true, landing });
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllLandings,
    getLandingByMinMass,
    getLandingByMass,
    getLandingByClass,
    getLandingByDate,
    createLanding,
    editLanding,
    deleteLanding
}
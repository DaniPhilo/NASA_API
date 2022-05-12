const Nea = require('../models/neas_models');
const { getAll, getByOrbitClass, getByDate } = require('../services/neas_services');
const { validateNeaDocument } = require('../utils/validations');
const CustomError = require('../utils/errors');

const getAllNeas = async (req, res, next) => {
    try {
        const neas = await getAll();
        if (!neas || neas.length < 1) {
            return res.status(400).json({ response: false, message: 'No NEAs found' });
        }
        res.status(200).json({ response: true, neas });
    }
    catch (error) {
        return next(error)
    }
}

const getNeaByOrbitClass = async (req, res, next) => {
    try {
        const neas = await getByOrbitClass(req.params.queryClass);
        if (!neas || neas.length < 1) {
            return res.status(400).json({ response: false, message: 'No NEAs with such parameters' });
        }
        res.status(200).json({ response: true, neas });
    }
    catch (error) {
        return next(error)
    }
}

const getNeaByDate = async (req, res) => {
    const { from, to } = req.query;
    try {
        const neas = await getByDate(from, to);
        if (!neas || neas.length < 1) {
            return res.status(400).json({ message: 'No NEAs with such parameters' });
        }
        res.status(200).json({ response: true, neas });
    } 
    catch (error) {
        return next(error)
    }
};

const createNea = async (req, res, next) => {
    try {
        if (!validateNeaDocument(req.body)) { throw new CustomError('Empty field/s') }
        const newNea = await Nea.create(req.body);
        if (!newNea) {
            throw new CustomError('Nea was not created in DB');
        }
        res.status(201).json({ response: true, newNea });
    } 
    catch (error) {
        return next(error)
    }
}

const editNea = async (req, res, next) => {
    try {
        const designation = req.params.designation;
        if (!validateNeaDocument(req.body)) { throw new CustomError('Empty field/s') }
        const neas = await Nea.findOneAndUpdate({ designation: designation }, req.body, { new: true });
        if (!neas || neas.length < 1) {
            throw new CustomError('No NEAs with such parameters');
        }
        res.status(200).json({ response: true, neas });
    } 
    catch (error) {
        return next(error)
    }
}

const deleteNea = async (req, res, next) => {
    try {
        const designation = req.params.designation;
        const nea = await Nea.findOneAndDelete({ designation: designation });
        if (!nea || nea.length < 1) {
            throw new CustomError('No NEAs with such parameters');
        }
        res.status(200).json({ response: true, nea });
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllNeas,
    getNeaByOrbitClass,
    getNeaByDate,
    createNea,
    editNea,
    deleteNea
}
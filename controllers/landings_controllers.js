const Landing = require('../models/landings_models');

const { validateNumber, validateDocument } = require('../utils/validations');
const CustomError = require('../utils/errors');

const getAllLandings = async (req, res, next) => {
    try {
        const landings = await Landing.find({}).sort('name').limit(10);
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings found' })
        }
        res.status(200).json({ response: true, landings })
    } catch (error) {
        return next(error)
    }
}

const getLandingByMinMass = async (req, res, next) => {
    try {
        const queryMass = Number(req.params.minMass);
        if (!validateNumber(queryMass)) { throw new CustomError('Invalid parameter(mass): please, provide a whole number') }
        const landings = await Landing.find({
            $expr: {
                $gte: [
                    { $convert: { input: '$mass', to: 'decimal' } },
                    queryMass
                ]
            }
        }).sort({ mass: 1 });
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings })
    } catch (error) {
        return next(error)
    }
}

const getLandingByMass = async (req, res, next) => {
    try {
        const queryMass = Number(req.params.queryMass);
        if (!validateNumber(queryMass)) { throw new CustomError('Invalid parameter(mass): please, provide a whole number') }
        const landings = await Landing.find({
            $expr: {
                $eq: [
                    { $convert: { input: '$mass', to: 'decimal' } },
                    queryMass
                ]
            }
        });
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings })
    } catch (error) {
        return next(error)
    }
}

const getLandingByClass = async (req, res, next) => {
    try {
        const queryClass = req.params.queryClass;
        const landings = await Landing.find({ recclass: queryClass });
        if (!landings || landings.length < 1) {
            return res.status(400).json({ response: false, message: 'No landings with such parameters' });
        }
        res.status(200).json({ response: true, landings })
    } catch (error) {
        return next(error)
    }
}

const getLandingByDate = async (req, res, next) => {
    try {
        const { from, to } = req.query;
        if (from || to) {
            const landings = []
            const results = await Landing.find({}).sort({ year: 1 });
            results.map(item => {
                if (item.year) {
                    let year = item.year.slice(0, 4);
                    if (from && !to && validateNumber(from) && Number(year) >= Number(from)) {
                        landings.push(item)
                    }
                    if (!from && to && validateNumber(to) && Number(year) <= Number(to)) {
                        landings.push(item)
                    }
                    if (from && to && validateNumber(from) && validateNumber(to) && (Number(year) >= Number(from) && Number(year) <= Number(to))) {
                        landings.push(item)
                    }
                }
            });

            if (landings.length < 1) {
                return res.status(400).json({ message: 'No landings with such parameters' });
            }

            res.status(200).json({ response: true, landings })
        }
    }
    catch (error) {
        return next(error)
    }
}

const createLanding = async (req, res, next) => {
    try {
        if (!validateDocument(req.body)) { throw new CustomError('Invalid parameters') }
        const landing = await Landing.create(req.body);
        if (!landing) {
            throw new CustomError('Landing was not created in DB');
        }
        res.status(201).json({ response: true, landing })
    } catch (error) {
        return next(error)
    }
}

const editLanding = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!validateNumber(id)) { throw new CustomError('Invalid parameter(id): please, provide a whole number') }
        if (!validateDocument(req.body)) { throw new CustomError('Invalid parameters') }
        const landings = await Landing.findOneAndUpdate({ id: id }, req.body, { new: true });
        if (!landings || landings.length < 1) {
            throw new CustomError('No landings with such parameters');
        }
        res.status(200).json({ response: true, landings })
    } catch (error) {
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
        res.status(200).json({ response: true, landing })
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
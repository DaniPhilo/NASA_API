const Landing = require('../models/landings_models');

const { validateNumber, validateDocument } = require('../utils/validations');
const CustomError = require('../utils/errors');

const getLandingByMinMass = async (req, res, next) => {
    try {
        const queryMass = Number(req.query.min_mass);
        if (!validateNumber(queryMass)) { throw new CustomError('Invalid parameter(mass): please, provide a whole number') }
        const landing = await Landing.find({
            $expr: {
                $gte: [
                    { $convert: { input: '$mass', to: 'decimal' } },
                    queryMass
                ]
            }
        }, {
            name: 1,
            mass: 1
        }).sort({ mass: 1 });
        if (!landing || landing.length < 1) {
            return res.json({ message: 'No landings with such parameters' });
        }
        res.json({ landing })
    } catch (error) {
        return next(error)
    }
}

const getLandingByMass = async (req, res, next) => {
    try {
        const queryMass = Number(req.params.queryMass);
        if (!validateNumber(queryMass)) { throw new CustomError('Invalid parameter(mass): please, provide a whole number') }
        const landing = await Landing.find({
            $expr: {
                $eq: [
                    { $convert: { input: '$mass', to: 'decimal' } },
                    queryMass
                ]
            }
        }, {
            name: 1,
            mass: 1
        });
        if (!landing || landing.length < 1) {
            return res.json({ message: 'No landings with such parameters' });
        }
        res.json({ landing })
    } catch (error) {
        return next(error)
    }
}

const getLandingByClass = async (req, res, next) => {
    try {
        const queryClass = req.params.queryClass;
        const landing = await Landing.find({ recclass: queryClass }, {
            name: 1,
            recclass: 1
        });
        if (!landing || landing.length < 1) {
            return res.json({ message: 'No landings with such parameters' });
        }
        res.json({ landing })
    } catch (error) {
        return next(error)
    }
}

const getLandingByDate = async (req, res, next) => {
    try {
        const { from, to } = req.query;
        if (from || to) {
            const results = []
            const landing = await Landing.find({}, {
                name: 1,
                mass: 1,
                year: 1
            }).sort({ year: 1 });
            landing.map(item => {
                if (item.year) {
                    let year = item.year.slice(0, 4);
                    if (from && !to && validateNumber(from) && Number(year) >= Number(from)) {
                        results.push(item)
                    }
                    if (!from && to && validateNumber(to) && Number(year) <= Number(to)) {
                        results.push(item)
                    }
                    if (from && to && validateNumber(from) && validateNumber(to) && (Number(year) >= Number(from) && Number(year) <= Number(to))) {
                        results.push(item)
                    }
                }
            });

            if (results.length < 1) {
                return res.json({ message: 'No landings with such parameters' });
            }

            res.json({ results })
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
        res.json({ landing })
    } catch (error) {
        return next(error)
    }
}

const editLanding = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!validateNumber(id)) { throw new CustomError('Invalid parameter(id): please, provide a whole number') }
        if (!validateDocument(req.body)) { throw new CustomError('Invalid parameters') }
        const landing = await Landing.findOneAndUpdate({ id: id }, req.body, { new: true });
        if (!landing || landing.length < 1) {
            throw new CustomError('No landings with such parameters');
        }
        res.json({ landing })
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
        res.json({ landing });
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    getLandingByMinMass,
    getLandingByMass,
    getLandingByClass,
    getLandingByDate,
    createLanding,
    editLanding,
    deleteLanding
}
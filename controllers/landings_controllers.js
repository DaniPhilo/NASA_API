const Landing = require('../models/landings_models');

const getLandingByMinMass = async (req, res) => {
    try {
        const queryMass = Number(req.query.min_mass);
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
        if (!landing) {
            const error = 'No landings retrieved from database';
            throw error
        }
        res.json({ landing })
    } catch (error) {
        console.log(error)
    }
}

const getLandingByMass = async (req, res) => {
    try {
        const queryMass = Number(req.params.queryMass);
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
        if (!landing) {
            const error = 'No landings retrieved from database';
            throw error
        }
        res.json({ landing })
    } catch (error) {
        console.log(error)
    }
}

const getLandingByClass = async (req, res) => {
    try {
        const queryClass = req.params.queryClass;
        const landing = await Landing.find({ recclass: queryClass }, {
            name: 1,
            recclass: 1
        });
        if (!landing) {
            const error = 'No landings retrieved from database';
            throw error
        }
        res.json({ landing })
    } catch (error) {
        console.log(error)
    }
}

const getLandingByDate = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (from || to) {
            try {
                const results = []
                const landing = await Landing.find({}, {
                    name: 1,
                    mass: 1,
                    year: 1
                }).sort({ year: 1 });
                landing.map(item => {
                    if (item.year) {
                        let year = item.year.slice(0, 4);
                        if (from && !to && Number(year) >= Number(from)) {
                            results.push(item)
                        }
                        if (!from && to && Number(year) <= Number(to)) {
                            results.push(item)
                        }
                        if (from && to && (Number(year) >= Number(from) && Number(year) <= Number(to))) {
                            results.push(item)
                        }
                    }
                })

                res.json({ results })
            }
            catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const createLanding = async (req, res) => {
    try {
        const landing = await Landing.create(req.body);
        if (!landing) {
            const error = 'Landing was not created in DB'
            throw error
        }
        res.json({ landing })
    } catch (error) {
        console.log(error)
    }
}

const editLanding = async (req, res) => {
    try {
        const id = req.params.id;
        const landing = await Landing.findOneAndUpdate({ id: id }, req.body, { new: true });
        if (!landing) {
            const error = 'Landing was not updated in DB'
            throw error
        }
        res.json({ landing })
    } catch (error) {
        console.log(error)
    }
}

const deleteLanding = async (req, res) => {
    try {
        const id = req.params.id;
        const landing = await Landing.findOneAndDelete({ id: id });
        if (!landing) {
            const error = 'Could not delete landing'
            throw error
        }
        res.json({ landing });
    }
    catch (error) {
        console.log(error)
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
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
        const landing = await Landing.find({ recclass: queryClass });
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
                const landing = await Landing.aggregate([{
                    '$project': {
                        '_id': 0,
                        'name': 1,
                        'mass': 1,
                        'year': 1
                    }
                }]);
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

module.exports = {
    getLandingByMinMass,
    getLandingByMass,
    getLandingByClass,
    getLandingByDate
}
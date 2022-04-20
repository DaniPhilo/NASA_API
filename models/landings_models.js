const mongoose = require('mongoose');

const LandingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String
    },
    nametype: {
        type: String
    },
    recclass: {
        type: String
    },
    mass: {
        type: String
    },
    fall: {
        type: String
    },
    year: {
        type: String
    },
    reclat: {
        type: String
    },
    reclong: {
        type: String
    },
    geolocation: {
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Landing', LandingSchema);
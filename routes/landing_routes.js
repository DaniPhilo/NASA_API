const express = require('express');
const router = express.Router();

// Landings controllers:
const { getLandingByMinMass, getLandingByMass, getLandingByClass, getLandingByDate } = require('../controllers/landings_controllers');

router.get('/', getLandingByMinMass);
router.get('/mass/:queryMass', getLandingByMass);
router.get('/class/:queryClass', getLandingByClass);
router.get('/date', getLandingByDate);


module.exports = router;
const express = require('express');
const router = express.Router();

// Landings controllers:
const { getAllLandings, getLandingsByName, getLandingsByMinMass, getLandingsByMass, getLandingsByClass, getLandingsByDate, createLanding, editLanding, deleteLanding } = require('../controllers/landings_controllers');

router.get('/:page?', getAllLandings);
router.get('/name/:name', getLandingsByName);
router.get('/minMass/:minMass', getLandingsByMinMass);
router.get('/mass/:queryMass', getLandingsByMass);
router.get('/class/:queryClass', getLandingsByClass);
router.get('/date', getLandingsByDate);

router.post('/create', createLanding);

router.put('/edit/:id', editLanding);

router.delete('/delete/:id', deleteLanding);


module.exports = router;
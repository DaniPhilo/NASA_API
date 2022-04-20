const express = require('express');
const router = express.Router();

// Landings controllers:
const { getLandingByMinMass, getLandingByMass, getLandingByClass, getLandingByDate, createLanding, editLanding, deleteLanding } = require('../controllers/landings_controllers');

router.get('/', getLandingByMinMass);
router.get('/mass/:queryMass', getLandingByMass);
router.get('/class/:queryClass', getLandingByClass);
router.get('/date', getLandingByDate);

router.post('/create', createLanding);

router.put('/edit/:id', editLanding);

router.delete('/delete/:id', deleteLanding);


module.exports = router;
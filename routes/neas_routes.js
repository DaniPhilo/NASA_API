const express = require('express');
const router = express.Router();

// Neas controllers:
const { getAllNeas, getNeasByDesignation, getNeasByOrbitClass, getNeasByDate, createNea, editNea, deleteNea } = require('../controllers/neas_controllers');

router.get('/:page?', getAllNeas);
router.get('/designation/:designation', getNeasByDesignation);
router.get('/class/:queryClass', getNeasByOrbitClass);
router.get('/date', getNeasByDate);

router.post('/create', createNea);

router.put('/edit/:designation', editNea);

router.delete('/delete/:designation', deleteNea);


module.exports = router;
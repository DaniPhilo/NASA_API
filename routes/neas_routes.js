const express = require('express');
const router = express.Router();

// Neas controllers:
const { getAllNeas, getNeaByOrbitClass, getNeaByDate, createNea, editNea, deleteNea } = require('../controllers/neas_controllers');

router.get('/:page?', getAllNeas);
router.get('/class/:queryClass', getNeaByOrbitClass);
router.get('/date', getNeaByDate);

router.post('/create', createNea);

router.put('/edit/:designation', editNea);

router.delete('/delete/:designation', deleteNea);


module.exports = router;
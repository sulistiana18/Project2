const express = require('express');
const router = express.Router();
const {
  getTrafos,
  getTrafoByKey,
  createTrafo,
  updateTrafo,
  deleteTrafo
} = require('../controllers/materialTekController');

// GET all
router.get('/', getTrafos);

// GET by LOKASI + NAMA
router.get('/:lokasi/:nama', getTrafoByKey);

// POST create
router.post('/', createTrafo);

// PUT update
router.put('/:lokasi/:nama', updateTrafo);

// DELETE
router.delete('/:lokasi/:nama', deleteTrafo);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getTrafos,
  getTrafoByKey,
  createTrafo,
  updateTrafo,
  deleteTrafo,
  getNearbyTrafos
} = require('../controllerS/materialTekController');

// GET nearby harus di atas supaya tidak tertangkap :lokasi/:nama
router.get('/nearby', getNearbyTrafos);

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

const express = require('express');
const router = express.Router();
const {
  getTrafos,
  getTrafoById,
  createTrafo,
  updateTrafo,
  deleteTrafo
} = require('../controllers/materialTekController');

// GET all trafos
router.get('/', getTrafos);

// GET single trafo by id
router.get('/:id', getTrafoById);

// POST create new trafo
router.post('/', createTrafo);

// PUT update trafo
router.put('/:id', updateTrafo);

// DELETE trafo
router.delete('/:id', deleteTrafo);

module.exports = router;

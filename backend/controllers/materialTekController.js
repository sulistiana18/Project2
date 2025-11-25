const db = require('../config/db');

// GET all materialTek
const getTrafos = (req, res) => {
  db.query('SELECT * FROM material_tek', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET single materialTek by LOKASI + NAMA
const getTrafoByKey = (req, res) => {
  const { lokasi, nama } = req.params;
  db.query(
    'SELECT * FROM material_tek WHERE LOKASI=? AND NAMA=?',
    [lokasi, nama],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Trafo not found' });
      res.json(results[0]);
    }
  );
};

// POST create new materialTek
const createTrafo = (req, res) => {
  const { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO } = req.body;

  if (!LOKASI || !ALAMAT || !NAMA || !KOORDINAT_X || !KOORDINAT_Y || !BESAR_TRAFO) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO material_tek (LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO });
  });
};

// PUT update materialTek by LOKASI + NAMA
const updateTrafo = (req, res) => {
  const { lokasi, nama } = req.params;
  const { ALAMAT, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO } = req.body;

  const sql = 'UPDATE material_tek SET ALAMAT=?, KOORDINAT_X=?, KOORDINAT_Y=?, BESAR_TRAFO=? WHERE LOKASI=? AND NAMA=?';
  db.query(sql, [ALAMAT, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO, lokasi, nama], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Trafo updated' });
  });
};

// DELETE materialTek by LOKASI + NAMA
const deleteTrafo = (req, res) => {
  const { lokasi, nama } = req.params;

  const sql = 'DELETE FROM material_tek WHERE LOKASI=? AND NAMA=?';
  db.query(sql, [lokasi, nama], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Trafo deleted' });
  });
};

module.exports = { getTrafos, getTrafoByKey, createTrafo, updateTrafo, deleteTrafo };

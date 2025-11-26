const db = require('../config/db');

// GET all
exports.getTrafos = (req, res) => {
  const sql = 'SELECT * FROM material_tek';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// GET by LOKASI + NAMA
exports.getTrafoByKey = (req, res) => {
  const { lokasi, nama } = req.params;
  const sql = 'SELECT * FROM material_tek WHERE LOKASI = ? AND NAMA = ?';
  db.query(sql, [lokasi, nama], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Trafo not found' });
    res.json(results[0]);
  });
};

// CREATE
exports.createTrafo = (req, res) => {
  const { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO } = req.body;
  const sql = 'INSERT INTO material_tek SET ?';
  db.query(sql, { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO }, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Trafo created', id: results.insertId });
  });
};

// UPDATE
exports.updateTrafo = (req, res) => {
  const { lokasi, nama } = req.params;
  const { ALAMAT, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO } = req.body;
  const sql = 'UPDATE material_tek SET ALAMAT=?, KOORDINAT_X=?, KOORDINAT_Y=?, BESAR_TRAFO=? WHERE LOKASI=? AND NAMA=?';
  db.query(sql, [ALAMAT, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO, lokasi, nama], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Trafo not found' });
    res.json({ message: 'Trafo updated' });
  });
};

// DELETE
exports.deleteTrafo = (req, res) => {
  const { lokasi, nama } = req.params;
  const sql = 'DELETE FROM material_tek WHERE LOKASI=? AND NAMA=?';
  db.query(sql, [lokasi, nama], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Trafo not found' });
    res.json({ message: 'Trafo deleted' });
  });
};

// GET nearby trafo tanpa batasan jarak, limit opsional
exports.getNearbyTrafos = (req, res) => {
  const { lat, lng, limit } = req.query;

  if (!lat || !lng) return res.status(400).json({ message: 'Latitude and Longitude are required' });

  const sql = `
    SELECT *,
      (6371 * 2 * ASIN(SQRT(
          POWER(SIN(RADIANS(KOORDINAT_X - ?)/2),2) +
          COS(RADIANS(?)) * COS(RADIANS(KOORDINAT_X)) *
          POWER(SIN(RADIANS(KOORDINAT_Y - ?)/2),2)
      ))) AS distance
    FROM material_tek
    ORDER BY distance
    ${limit ? 'LIMIT ?' : ''}
  `;

  const params = limit ? [lat, lng, lat, parseInt(limit)] : [lat, lng, lat];

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

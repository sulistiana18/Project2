const express = require("express");
const router = express.Router();
const db = require("../config/db"); // pastikan db.js ada

// GET semua transaksi pelanggan
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      NOAGENDA,
      NO_REGISTRASI,
      TGLMOHON,
      IDPEL,
      NAMA,
      JENIS_TRANSAKSI,
      STATUS_PERMOHONAN
    FROM transaksi_pelanggan
    ORDER BY TGLMOHON DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error query transaksi_pelanggan:", err);
      return res.status(500).json({ message: "Gagal mengambil data" });
    }
    res.json(results);
  });
});

module.exports = router;

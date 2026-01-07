const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const db = require("../db");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    for (const row of data) {
      await db.query(
        `
        INSERT INTO transaksi_pelanggan
        (NOAGENDA, NO_REGISTRASI, TGLMOHON, IDPEL, NAMA, JENIS_TRANSAKSI, STATUS_PERMOHONAN)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          row.NOAGENDA,
          row.NO_REGISTRASI,
          row.TGLMOHON,
          row.IDPEL,
          row.NAMA,
          row.JENIS_TRANSAKSI,
          row.STATUS_PERMOHONAN,
        ]
      );
    }

    res.json({ message: "Upload Excel berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload gagal" });
  }
});

module.exports = router;

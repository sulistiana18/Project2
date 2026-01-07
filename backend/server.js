// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");

// Routes
const materialTekRoutes = require("./routes/materialTekRoutes");
const permohonanRoutes = require("./routes/permohonanRoutes");



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// Test route
// ==========================
app.get("/", (req, res) => {
  res.send("Backend Express + MySQL berjalan!");
});

// ==========================
// Routes
// ==========================
app.use("/api/materialTek", materialTekRoutes);
app.use("/api/transaksi-pelanggan", permohonanRoutes);








// ==========================
// Setup Multer untuk upload Excel MaterialTek
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pastikan folder uploads ada
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ==========================
// Endpoint upload Excel MaterialTek
// ==========================
app.post("/api/materialTek/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File tidak ada" });

  try {
    const filePath = path.resolve(req.file.path);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    data.forEach((row) => {
      const { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO } = row;
      const sql = "INSERT INTO material_tek SET ?";
      db.query(sql, { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO }, (err) => {
        if (err) console.error("Error insert material_tek:", err);
      });
    });

    res.json({ message: "Upload material_tek berhasil", rows: data.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal upload Excel" });
  }
});

// ==========================
// Jalankan server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

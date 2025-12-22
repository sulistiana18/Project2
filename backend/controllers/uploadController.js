const multer = require("multer");
const path = require("path");

// konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `excel-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// filter hanya excel
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file Excel yang diperbolehkan"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

exports.uploadExcel = [
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    res.json({
      message: "File Excel berhasil diupload",
      filename: req.file.filename,
      path: req.file.path,
    });
  },
];

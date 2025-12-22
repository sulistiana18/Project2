const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const db = require('./config/db');
// const multer = require('multer');
// const XLSX = require('xlsx');
// const path = require('path');

// const materialTekRoutes = require('./routes/materialTekRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend Express + MySQL berjalan!');
});

// contoh data base
const user = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    role: 1,
  },
]

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // validasi 1: username dan password harus diisi
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password harus diisi' });
  }

  // validasi 2: username dan password harus benar
  user.forEach((user) => {
    if (user.username === username) {
      if (user.password === password) {
        // IMPORTANT: response token user
        return res.status(200).json({ message: 'Login berhasil', token: 'ajksdnakjsdnakjsdnaskdjnaskjdnaskjdnd' });
      } else { // validasi 3: password salah
        return res.status(401).json({ message: 'Password salah' });
      }
    } else { // validasi 4: username tidak ditemukan
      return res.status(401).json({ message: 'Username tidak ditemukan' });
    }
  })
})

// method nya apa: POST

// endpoint nya apa: /login

// body nya apa: { username: 'admin', password: 'admin' }

// example response

// {
//   "message": "Login berhasil",
//   "token": "ajksdnakjsdnakjsdnaskdjnaskjdnaskjdnd"
// }

// Routes
// app.use('/api/materialTek', materialTekRoutes);

// // --- Setup multer untuk upload Excel ---
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // pastikan folder uploads ada
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// --- Endpoint upload Excel ---
// app.post('/api/materialTek/upload', upload.single('file'), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: 'File tidak ada' });

//   const filePath = path.resolve(req.file.path);
//   const workbook = XLSX.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//   // Insert ke database
//   data.forEach((row) => {
//     const { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO } = row;
//     const sql = 'INSERT INTO material_tek SET ?';
//     db.query(sql, { LOKASI, ALAMAT, NAMA, KOORDINAT_X, KOORDINAT_Y, BESAR_TRAFO }, (err) => {
//       if (err) console.error('Error insert:', err);
//     });
//   });

//   res.json({ message: 'Upload berhasil', rows: data.length });
// });

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

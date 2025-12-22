const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

const materialTekRoutes = require('./routes/materialTekRoutes'); // nama variabel sesuai file

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend Express + MySQL berjalan!');
});

// Routes
app.use('/api/materialTek', materialTekRoutes); // pakai variabel yang benar

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

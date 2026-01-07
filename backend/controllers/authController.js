const mysql = require("mysql");

// ===== Database Connection =====
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // sesuaikan dengan XAMPP
  database: "db_users" // ganti sesuai nama database
});

db.connect((err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to MySQL database!");
});

// ===== Login Controller =====
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const user = results[0];
    res.json({
      id: user.id,
      username: user.username,
      role: user.role
    });
  });
};

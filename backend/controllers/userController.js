const db = require('../config/db');

// GET all users
exports.getUserDetail = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);

    });
};

// GET user by ID
exports.getUserDetailById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
};
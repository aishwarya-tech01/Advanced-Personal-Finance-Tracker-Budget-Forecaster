const db = require('../config/db');

exports.getTransactions = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC', [req.params.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addTransaction = async (req, res) => {
    const { user_id, type, category, amount } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO transactions (user_id, type, category, amount) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, type, category, amount]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [req.params.userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
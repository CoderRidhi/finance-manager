const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ADD TRANSACTION
router.post("/add", (req, res) => {
  const { user_id, type, amount, category, description, date } = req.body;

  db.query(
    `INSERT INTO transactions 
     (user_id, type, amount, category, description, date) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, type, amount, category, description, date],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Transaction added successfully" });
    }
  );
});

// GET USER TRANSACTIONS
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

module.exports = router;
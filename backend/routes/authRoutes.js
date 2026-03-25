const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = result[0];
      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res.status(400).json({ message: "Invalid password" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({ token, user });
    }
  );
});

module.exports = router;
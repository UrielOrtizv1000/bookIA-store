const express = require('express');
const router = express.Router();
const db = require('../config/db')

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
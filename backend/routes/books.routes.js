const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
} = require('../controllers/books.controller');
const { validateBookPayload } = require('../middlewares/validation');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBookPayload, createBook);

module.exports = router;

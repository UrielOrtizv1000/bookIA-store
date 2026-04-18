const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
} = require('../controllers/books.controller');
const uploadBookCover = require('../middlewares/upload');
const { validateBookPayload } = require('../middlewares/validation');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', uploadBookCover.single('cover'), validateBookPayload, createBook);

module.exports = router;

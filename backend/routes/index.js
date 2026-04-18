const express = require('express');
const booksRoutes = require('./books.routes');
const messagesRoutes = require('./messages.routes');

const router = express.Router();

router.use('/books', booksRoutes);
router.use('/messages', messagesRoutes);

module.exports = router;

const express = require('express');
const { createMessage } = require('../controllers/messages.controller');
const { validateMessagePayload } = require('../middlewares/validation');

const router = express.Router();

router.post('/', validateMessagePayload, createMessage);

module.exports = router;

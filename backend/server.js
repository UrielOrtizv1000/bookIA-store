require('dotenv').config();
const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/books', booksRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

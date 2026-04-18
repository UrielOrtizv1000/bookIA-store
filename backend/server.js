require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const healthRoutes = require('./routes/health.routes');
const booksRoutes = require('./routes/books.routes');
const messagesRoutes = require('./routes/messages.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api', healthRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/messages', messagesRoutes);

// Not Found pages middleware
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server because the database connection failed.', error);
    process.exit(1);
  }
}

startServer();

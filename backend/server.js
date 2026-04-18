require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API de tienda de libros operativa.',
  });
});

app.use('/api', apiRoutes);

app.use(notFound);

app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
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

module.exports = app;

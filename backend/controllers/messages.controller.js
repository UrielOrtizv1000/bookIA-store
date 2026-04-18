const db = require('../config/db');

function mapMessage(message) {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
  };
}

async function createMessage(req, res, next) {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [name, email, subject, message]
    );

    const [rows] = await db.query(
      `SELECT id, name, email, subject, message
       FROM messages
       WHERE id = ?
       LIMIT 1`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Mensaje guardado correctamente.',
      data: mapMessage(rows[0]),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createMessage,
};

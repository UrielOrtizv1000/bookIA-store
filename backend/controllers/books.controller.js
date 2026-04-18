const db = require('../config/db');

function mapBook(book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price,
    stock: book.stock,
    cover: book.cover,
    description: book.description,
    available: Number(book.stock) > 0,
  };
}

async function getAllBooks(req, res, next) {
  try {
    const [rows] = await db.query(
      `SELECT id, title, author, genre, price, stock, cover, description
       FROM books
       ORDER BY id ASC`
    );

    return res.status(200).json({
      success: true,
      data: rows.map(mapBook),
    });
  } catch (error) {
    return next(error);
  }
}

async function getBookById(req, res, next) {
  const bookId = Number(req.params.id);

  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'El ID del libro debe ser un entero positivo.',
    });
  }

  try {
    const [rows] = await db.query(
      `SELECT id, title, author, genre, price, stock, cover, description
       FROM books
       WHERE id = ?
       LIMIT 1`,
      [bookId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado.',
      });
    }

    return res.status(200).json({
      success: true,
      data: mapBook(rows[0]),
    });
  } catch (error) {
    return next(error);
  }
}

async function createBook(req, res, next) {
  const {
    title,
    author,
    genre,
    price,
    stock,
    cover,
    description,
  } = req.body;

  try {
    const [existingBooks] = await db.query(
      `SELECT id
       FROM books
       WHERE title = ?
       LIMIT 1`,
      [title]
    );

    if (existingBooks.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un libro registrado con el mismo titulo.',
      });
    }

    const [result] = await db.query(
      `INSERT INTO books (title, author, genre, price, stock, cover, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, author, genre, price, stock, cover, description]
    );

    const [rows] = await db.query(
      `SELECT id, title, author, genre, price, stock, cover, description
       FROM books
       WHERE id = ?
       LIMIT 1`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Libro creado correctamente.',
      data: mapBook(rows[0]),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};

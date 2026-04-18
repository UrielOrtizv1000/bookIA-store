const fs = require('fs');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function buildValidationError(errors) {
  const error = new Error('Los datos enviados no son validos.');
  error.statusCode = 400;
  error.errors = errors;
  return error;
}

function removeUploadedFile(file) {
  if (file?.path) {
    fs.unlink(file.path, () => undefined);
  }
}

function validateBookPayload(req, res, next) {
  const {
    title,
    author,
    genre,
    price,
    stock,
    description,
  } = req.body;

  const errors = [];

  if (!isNonEmptyString(title)) {
    errors.push({ field: 'title', message: 'El titulo es obligatorio.' });
  } else {
    req.body.title = title.trim();
  }

  if (!isNonEmptyString(author)) {
    errors.push({ field: 'author', message: 'El autor es obligatorio.' });
  } else {
    req.body.author = author.trim();
  }

  if (!isNonEmptyString(genre)) {
    errors.push({ field: 'genre', message: 'El genero es obligatorio.' });
  } else {
    req.body.genre = genre.trim();
  }

  if (!req.file) {
    errors.push({ field: 'cover', message: 'La portada es obligatoria.' });
  }

  if (!isNonEmptyString(description)) {
    errors.push({ field: 'description', message: 'La descripcion es obligatoria.' });
  } else {
    req.body.description = description.trim();
  }

  const parsedPrice = Number(price);
  if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
    errors.push({ field: 'price', message: 'El precio debe ser un numero mayor que 0.' });
  } else {
    req.body.price = parsedPrice;
  }

  const parsedStock = Number(stock);
  if (!Number.isInteger(parsedStock) || parsedStock < 0) {
    errors.push({ field: 'stock', message: 'El stock debe ser un entero mayor o igual que 0.' });
  } else {
    req.body.stock = parsedStock;
  }

  if (errors.length > 0) {
    removeUploadedFile(req.file);
    return next(buildValidationError(errors));
  }

  return next();
}

function validateMessagePayload(req, res, next) {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  } else {
    req.body.name = name.trim();
  }

  if (!isNonEmptyString(subject)) {
    errors.push({ field: 'subject', message: 'El asunto es obligatorio.' });
  } else {
    req.body.subject = subject.trim();
  }

  if (!isNonEmptyString(message)) {
    errors.push({ field: 'message', message: 'El mensaje no puede estar vacio.' });
  } else {
    req.body.message = message.trim();
  }

  if (!isNonEmptyString(email) || !EMAIL_REGEX.test(email.trim())) {
    errors.push({ field: 'email', message: 'El email debe tener un formato valido.' });
  } else {
    req.body.email = email.trim().toLowerCase();
  }

  if (errors.length > 0) {
    return next(buildValidationError(errors));
  }

  return next();
}

module.exports = {
  validateBookPayload,
  validateMessagePayload,
};

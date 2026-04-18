const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'image';

    callback(null, `${Date.now()}-${baseName}${extension}`);
  },
});

const uploadBookCover = multer({
  storage,
  fileFilter: (_req, file, callback) => {
    if (file.mimetype?.startsWith('image/')) {
      return callback(null, true);
    }

    const error = new Error('Solo se permiten archivos de imagen.');
    error.statusCode = 400;
    return callback(error);
  },
});

module.exports = uploadBookCover;

function errorHandler(err, req, res, next) {
  console.error(`[Error] ${err.message}`);

  if (err.code && err.sqlState) {
    return res.status(500).json({
    })
  }

  // Generic fallback
  res.status(500).json({ error: 'An unexpected server error occurred.' });
}

module.exports = errorHandler;
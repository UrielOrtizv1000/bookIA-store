function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error('[Error]', err);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'El recurso que intentas registrar ya existe.',
    });
  }

  if (err.code && err.sqlState) {
    return res.status(500).json({
      success: false,
      message: 'Se produjo un error al consultar la base de datos.',
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Ocurrio un error interno del servidor.',
    errors: err.errors || undefined,
  });
}

module.exports = errorHandler;

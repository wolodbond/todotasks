const notFoundErrorHandler = (err, req, res, next) => {
  let status = err.statusCode || err.status || 404;
  res.status(status).json({
    error: err
  });
};

module.exports = notFoundErrorHandler;

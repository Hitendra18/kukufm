const errorResponserHandler = (err, _, res, __) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const invalidPathHandler = (_, __, next) => {
  const error = new Error("Sorry! this path doesn't exits...");
  error.statusCode = 404;
  return next(error);
};

module.exports = { errorResponserHandler, invalidPathHandler };

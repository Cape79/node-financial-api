
const logger = require("../config/logger");
const config = require("./index");

/*
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;

  res.status(status).json({
    message: err.message || "Error interno del servidor",
  });
};
*/

const errorMiddleware = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    message:
      config.nodeEnv === "production"
        ? "Internal server error"
        : err.message,
  });
};

module.exports = errorMiddleware;
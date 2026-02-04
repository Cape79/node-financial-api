const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Token no proporcionado");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secret_super_seguro");

    req.user = decoded;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = authMiddleware;

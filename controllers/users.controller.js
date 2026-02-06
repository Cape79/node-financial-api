const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("email y password son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const existing = await usersRepository.getByEmail(email);
    if (existing) {
      const error = new Error("El usuario ya existe");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersRepository.createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("email y password son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const user = await usersRepository.getByEmail(email);
    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};

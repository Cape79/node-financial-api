
const express = require("express");

const logger = require("./config/logger");
const accountsRoutes = require("./routes/accounts.routes");
const transactionsRoutes = require("./routes/transactions.routes");
const usersRoutes = require("./routes/users.routes");
const errorHandler = require("./middlewares/error.middleware");


const app = express();

// 👇 middleware clave
app.use(express.json());

app.use((req, res, next) => {
  logger.info({
    message: "Incoming request",
    method: req.method,
    url: req.originalUrl,
  });
  next();
});

app.use("/accounts", accountsRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/users", usersRoutes);
app.use(errorHandler);


app.use((req, res) => {
  res.status(404).send("Not found");
});

module.exports = app;
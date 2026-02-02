const express = require("express");
const usersRoutes = require("./routes/users.routes");
const accountsRoutes = require("./routes/accounts.routes");
const transactionsRoutes = require("./routes/transactions.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// 👇 middleware clave
app.use(express.json());


app.use("/users", usersRoutes);
app.use("/accounts", accountsRoutes);
app.use("/transactions", transactionsRoutes);
app.use(errorHandler);


app.use((req, res) => {
  res.status(404).send("Not found");
});

module.exports = app;


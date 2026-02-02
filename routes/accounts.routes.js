const express = require("express");
const router = express.Router();

const {
  getAccounts,
  createAccount,
  getAccountTransactions,
} = require("../controllers/accounts.controller");

router.get("/", getAccounts);
router.post("/", createAccount);
router.get("/:id/transactions", getAccountTransactions);

module.exports = router;

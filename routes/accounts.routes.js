const express = require("express");
const router = express.Router();

const {
  getAccounts,
  getById,
  createAccount,
  getAccountTransactions,
} = require("../controllers/accounts.controller");

router.get("/", getAccounts);
router.get("/:id", getById);
router.post("/", createAccount);
router.get("/:id/transactions", getAccountTransactions);

module.exports = router;

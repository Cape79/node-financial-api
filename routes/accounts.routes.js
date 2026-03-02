const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const {
  getAccounts,
  getById,
  createAccount,
  getAccountTransactions,
  getSystemBalance,
  getMyAccounts,
} = require("../controllers/accounts.controller");

router.use(authMiddleware);

router.get("/", getAccounts);
router.get("/system/balance", getSystemBalance);
router.get("/me", getMyAccounts);
router.get("/:id", getById);
router.post("/", createAccount);
router.get("/:id/transactions", getAccountTransactions);

module.exports = router;

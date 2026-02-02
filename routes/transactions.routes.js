const express = require("express");
const router = express.Router();

const {
  createTransaction,
} = require("../controllers/transactions.controller");

router.post("/", createTransaction);

module.exports = router;

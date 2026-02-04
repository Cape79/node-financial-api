const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const {
  createTransaction,
} = require("../controllers/transactions.controller");


// 👇 ESTA LÍNEA ES LA CLAVE
router.use(authMiddleware);

router.post("/", createTransaction);


module.exports = router;

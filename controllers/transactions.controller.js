// imports internos

const {
  createTransactionService,
  transferTransactionService,
} = require("../services/transactions.service");


// funciones

const createTransaction = async (req, res, next) => {
  try {
    const { accountId, amount, type } = req.body;

    if (!accountId || !amount || !type) {
      const error = new Error("accountId, amount y type son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const result = await createTransactionService({
      accountId,
      amount,
      type,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const transferTransaction = async (req, res, next) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || !amount) {
      const error = new Error("fromAccountId, toAccountId y amount son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const result = await transferTransactionService({
      fromAccountId,
      toAccountId,
      amount,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};


// module.exports

module.exports = {
  createTransaction,
  transferTransaction,
};

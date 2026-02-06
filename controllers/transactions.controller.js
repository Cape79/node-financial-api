// imports externos

// imports internos

const {
  createTransactionService,
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


// module.exports

module.exports = {
  createTransaction,
};

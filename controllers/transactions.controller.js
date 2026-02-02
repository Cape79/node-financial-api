const accounts = require("./accounts.data");
const transactions = require("./transactions.data");


const createTransaction = async (req, res, next) => {
  try {
    const { accountId, amount, type } = req.body;
  
    if (!accountId || !amount || !type) {
      const error = new Error("accountId, amount y type son obligatorios");
      error.statusCode = 400;
      throw error;      
    }
  
    const account = accounts.find(
      (acc) => acc.id === Number(accountId)
    );
  
    if (!account) {
      const error = new Error("Cuenta no encontrada");
      error.statusCode = 404;
      throw error;      
    }
  
    if (type === "debit" && account.balance < amount) {
      const error = new Error("Fondos insuficientes");
      error.statusCode = 422;
      throw error;
    }
  
    if (type === "debit") {
      account.balance -= amount;
    }
  
    if (type === "credit") {
      account.balance += amount;
    }
  
    const transaction = {
      id: transactions.length + 1,
      accountId: account.id,
      type,
      amount,
      date: new Date(),
    };
  
    transactions.push(transaction);
  
    res.status(201).json({
      transaction,
      newBalance: account.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
};

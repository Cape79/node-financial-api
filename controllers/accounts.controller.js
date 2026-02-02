const accounts = require("./accounts.data");
const transactions = require("./transactions.data");


const getAccounts = (req, res) => {
  res.json({
    total: accounts.length,
    data: accounts,
  });
};

const createAccount = async (req, res, next) => {
  try {
    const { owner, initialBalance } = req.body;
  
    // validación mínima (muy típica en finanzas)
    if (!owner || initialBalance == 0) {
        const error = new Error("owner e initialBalance son obligatorios");
        error.statusCode = 400;
        throw error;
    }
  
    const newAccount = {
      id: accounts.length + 1,
      owner,
      balance: Number(initialBalance),
    };
  
    accounts.push(newAccount);
  
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
};

const getAccountTransactions = (req, res) => {
  const accountId = Number(req.params.id);

  const account = accounts.find(acc => acc.id === accountId);

  if (!account) {
    return res.status(404).json({ message: "Cuenta no encontrada" });
  }

  const accountTransactions = transactions.filter(
    tx => tx.accountId === accountId
  );

  res.json({
    accountId,
    total: accountTransactions.length,
    data: accountTransactions,
  });
};


module.exports = {
  getAccounts,
  createAccount,
  getAccountTransactions
};

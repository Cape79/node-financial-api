// imports externos

// imports internos (repositories, prisma)

const accountsRepository = require("../repositories/accounts.repository");
const transactionsRepository = require("../repositories/transactions.repository");

// funciones

const getAccounts = async (req, res, next) => {

  try {
    const acc = await accountsRepository.getAccounts();
    res.json(acc);
  } catch (error) {
    next(error);
  }
  
};

const getById = async (req, res, next) => {

  try {
    const id = Number(req.params.id);
    
    const acc = await accountsRepository.getById(id);
    if (!acc)
    {
      const error = new Error("La cuenta " + id + " no existe.");
      error.statusCode = 404;
      throw error;
    }

    res.json(acc);
  } catch (error) {
    next(error);
  }  
};

const createAccount = async (req, res, next) => {
  try {
    const { owner, initialBalance } = req.body;
  
    // validación mínima (muy típica en finanzas)
    if (!owner || initialBalance == null) {
        const error = new Error("owner e initialBalance son obligatorios");
        error.statusCode = 400;
        throw error;
    }

    if (Number(initialBalance) < 0) {
      const error = new Error("El balance inicial no puede ser negativo");
      error.statusCode = 422;
      throw error;
    }
  
    const newAccount = {      
      owner,
      balance: Number(initialBalance),
    };
  
    const created = await accountsRepository.create(newAccount);
  
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const getAccountTransactions = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);

    const account = await accountsRepository.getById(accountId);

    if (!account) {
      const error = new Error("Cuenta no encontrada");
      error.statusCode = 404;
      throw error;
    }

    const transactions = await transactionsRepository.getByAccountId(accountId);

    res.json({
      accountId,
      balance: account.balance,
      totalTransactions: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};


// module.exports

module.exports = {
  getAccounts,
  getById,
  createAccount,
  getAccountTransactions
};

// imports externos

// imports internos (repositories, prisma)

const accountsRepository = require("../repositories/accounts.repository");
const transactionsRepository = require("../repositories/transactions.repository");

const {
  getSystemBalanceService,
  getMyAccountsService,
  getAccountTransactionsService,
} = require("../services/accounts.service");


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
      userId: req.user.userId,
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort === "asc" ? "asc" : "desc";

    const account = await accountsRepository.getById(accountId);

    if (!account) {
      const error = new Error("Cuenta no encontrada");
      error.statusCode = 404;
      throw error;
    }

    //const transactions = await transactionsRepository.getByAccountId(accountId);

    const result = await getAccountTransactionsService({
      accountId,
      page,
      limit,
      sort,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};


const getSystemBalance = async (req, res, next) => {
  try {
    const result = await getSystemBalanceService();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getMyAccounts = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const result = await getMyAccountsService(userId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};


// module.exports

module.exports = {
  getAccounts,
  getById,
  createAccount,
  getAccountTransactions,
  getSystemBalance,
  getMyAccounts,
};

const prisma = require("../prisma/prismaClient");
const accountsRepository = require("../repositories/accounts.repository");
const transactionsRepository = require("../repositories/transactions.repository");
const logger = require("../config/logger");

const createTransactionService = async ({ accountId, amount, type }) => {
  return await prisma.$transaction(async (tx) => {
    const account = await tx.account.findUnique({
      where: { id: Number(accountId) },
    });

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

    const newBalance =
      type === "debit"
        ? account.balance - amount
        : account.balance + amount;

    await tx.account.update({
      where: { id: account.id },
      data: { balance: newBalance },
    });

    const transaction = await tx.transaction.create({
      data: {
        accountId: account.id,
        amount,
        type,
      },
    });

    return {
      transaction,
      newBalance,
    };
  });
};

const transferTransactionService = async ({ fromAccountId, toAccountId, amount }) => {

  if (Number(fromAccountId) === Number(toAccountId)) {
      const error = new Error("No se puede transferir a la misma cuenta");
      error.statusCode = 400;
      throw error;
    }

    if (amount <= 0) {
      const error = new Error("El monto debe ser mayor a cero");
      error.statusCode = 400;
      throw error;
    }

  logger.info({
    message: "Starting transfer",
    fromAccountId,
    toAccountId,
    amount,
  });

  return await prisma.$transaction(async (tx) => {

    const [fromAccount, toAccount] = await Promise.all([
      tx.account.findUnique({ where: { id: Number(fromAccountId) } }),
      tx.account.findUnique({ where: { id: Number(toAccountId) } }),
    ]);

    if (!fromAccount) {
      const error = new Error("Cuenta origen no encontrada");
      error.statusCode = 404;
      throw error;
    }

    if (!toAccount) {
      const error = new Error("Cuenta destino no encontrada");
      error.statusCode = 404;
      throw error;
    }

    if (fromAccount.balance < amount) {
      const error = new Error("Fondos insuficientes");
      error.statusCode = 422;
      throw error;
    }

    const newBalanceFrom = fromAccount.balance - amount;
    const newBalanceTo = toAccount.balance + amount;
    
    await tx.account.update({
      where: { id: fromAccount.id },
      data: { balance: newBalanceFrom },
    });

    await tx.account.update({
      where: { id: toAccount.id },
      data: { balance: newBalanceTo },
    });

    const transactionFrom = await tx.transaction.create({
      data: {
        accountId: fromAccount.id,
        amount,
        type: 'debit',
      },
    });

    const transactionTo = await tx.transaction.create({
      data: {
        accountId: toAccount.id,
        amount,
        type: 'credit',
      },
    });

    logger.info({
      message: "Transfer completed",
      fromAccountId,
      toAccountId,
      amount,
    });

    return {
      transactionFrom,
      transactionTo,
    };
  });

  
};

module.exports = {
  createTransactionService,
  transferTransactionService,
};

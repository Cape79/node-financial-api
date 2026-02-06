const prisma = require("../prisma/prismaClient");
const accountsRepository = require("../repositories/accounts.repository");
const transactionsRepository = require("../repositories/transactions.repository");

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

module.exports = {
  createTransactionService,
};

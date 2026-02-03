// imports externos

// imports internos (repositories, prisma)

const accountsRepository = require("../repositories/accounts.repository");
const transactionsRepository = require("../repositories/transactions.repository");
const prisma = require("../prisma/prismaClient");

// funciones

const createTransaction = async (req, res, next) => {
  try {
    const { accountId, amount, type } = req.body;

    if (!accountId || !amount || !type) {
      const error = new Error("accountId, amount y type son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    await prisma.$transaction(async (tx) => {
        const account = await tx.account.findUnique({
        where: { id: Number(accountId) },
      });

      if (!account) {
        const error = new Error("Cuenta no encontrada");
        error.statusCode = 404;
        throw error;
      }

      if (type === "debit" && account.balance < amount) {
        const error = new Error("Fondos insuficientes!");
        error.statusCode = 422;
        throw error;
      }

      // Calcular nuevo balance
      const newBalance =
        type === "debit"
          ? account.balance - amount
          : account.balance + amount;

      // 1️⃣ Actualizar balance en la DB
      await tx.account.update({
        where: { id: account.id },
        data: { balance: newBalance },
      });

      // 2️⃣ Crear la transacción en la DB
      await tx.transaction.create({
      data: {
          accountId: account.id,
          amount,
          type,
        },
      });
    });

    res.status(201).json({ message: "Transacción realizada correctamente" });

  } catch (error) {
    next(error);
  }
};

// module.exports

module.exports = {
  createTransaction,
};

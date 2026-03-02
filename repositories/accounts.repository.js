const prisma = require("../prisma/prismaClient");

const getAccounts = async () => {
  return await prisma.account.findMany();
}

const getById = async (id) => {
  return await prisma.account.findUnique({
    where: { id: Number(id) },
  });
};

const create = async (account) => {
  return await prisma.account.create({
    data: {
      owner: account.owner,
      balance: account.balance,
      userId: account.userId,
    },
  });
};

const getSystemBalance = async () => {
  const result = await prisma.account.aggregate({
    _sum: {
      balance: true,
    },
  });

  return result._sum.balance || 0;
};

const getAccountsByUserId = async (userId) => {
  return await prisma.account.findMany({
    where: { userId: Number(userId) },
  });
};

module.exports = {
  getAccounts,
  getById,
  create,
  getSystemBalance,
  getAccountsByUserId,
};

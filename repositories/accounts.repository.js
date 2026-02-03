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
    },
  });
};

module.exports = {
  getAccounts,
  getById,
  create,
};

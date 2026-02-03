const prisma = require("../prisma/prismaClient");

const create = async (data) => {
  return await prisma.transaction.create({
    data,
  });
};


const getByAccountId = async (accountId) => {
  return await prisma.transaction.findMany({
    where: { accountId: Number(accountId) },
    orderBy: { date: "desc" },
  });
};

module.exports = {
  create,
  getByAccountId,
};

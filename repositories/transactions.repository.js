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

const countByAccountId = async (accountId) => {
  return await prisma.transaction.count ({
    where: { accountId: Number(accountId) },    
  });
};

const getByAccountIdPaginated = async ({
  accountId,
  skip,
  limit,
  sort,
}) => {
  return prisma.transaction.findMany({
    where: { accountId },
    orderBy: { id: sort },
    skip,
    take: limit,
  });
};

module.exports = {
  create,
  getByAccountId,
  countByAccountId,
  getByAccountIdPaginated,
};

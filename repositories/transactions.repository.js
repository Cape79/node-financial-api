const prisma = require("../prisma/prismaClient");

const create = async (data) => {
  return await prisma.transaction.create({
    data,
  });
};

module.exports = {
  create,
};

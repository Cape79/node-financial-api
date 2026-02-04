const prisma = require("../prisma/prismaClient");

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const getByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

module.exports = {
  createUser,
  getByEmail,
};

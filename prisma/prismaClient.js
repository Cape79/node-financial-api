const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:postgres@localhost:5432/financial_api",
});

const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;

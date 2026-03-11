const accountsRepository = require("../repositories/accounts.repository");
const transactionsRepository = require("../repositories/transactions.repository");

const getSystemBalanceService = async () => {
  const totalBalance = await accountsRepository.getSystemBalance();

  return {
    totalBalance,
  };
};

const getMyAccountsService = async (userId) => {
  const accounts = await accountsRepository.getAccountsByUserId(userId);

  return {
    total: accounts.length,
    accounts,
  };
};

const getAccountTransactionsService = async ({
  accountId,
  page,
  limit,
  sort,
}) => {
  const skip = (page - 1) * limit;

  const total = await transactionsRepository.countByAccountId(accountId);

  const transactions = await transactionsRepository.getByAccountIdPaginated({
    accountId,
    skip,
    limit,
    sort,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    data: transactions,
  };
};

module.exports = {
  getSystemBalanceService,
  getMyAccountsService,
  getAccountTransactionsService,
};
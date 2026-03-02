const accountsRepository = require("../repositories/accounts.repository");

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

module.exports = {
  getSystemBalanceService,
  getMyAccountsService,
};
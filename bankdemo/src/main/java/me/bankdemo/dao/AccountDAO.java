package me.bankdemo.dao;

import java.util.List;

import me.bankdemo.model.Account;

public interface AccountDAO {

	// Get all Accounts for customerID
	List<Account> getCustomerAccounts(long customerId);

	// Get one Account details for accountID
	Account getAccountDetails(long accountId);

	// Save one Account for accountID
	long saveAccountDetails(Account account);

	// Update one Account details for accountID
	void updateAccountDetails(long accountId, Account account);

	// Delete one Account details for accountID
	void deleteAccount(long accountId);

	// Transfer balance within own accounts for one customerID
	void transferBalanceOwn(long fromAccountId, long toAccountId, long amount);

}

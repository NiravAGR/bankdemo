package me.bankdemo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.bankdemo.dao.AccountDAO;
import me.bankdemo.model.Account;


@Service
public class AccountServiceImpl implements AccountService{

	@Autowired
	AccountDAO accountDAO;
	
	@Override
	@Transactional
	//Get all Accounts for customerID
	public List<Account> getCustomerAccounts(long customerId) {
		return accountDAO.getCustomerAccounts(customerId);
	}

	@Override
	@Transactional
	//Get one Account details for accountID
	public Account getAccountDetails(long accountId) {
		return accountDAO.getAccountDetails(accountId);
	}

	@Override
	@Transactional
	//Save one Account for accountID
	public long saveAccountDetails(Account account) {
		return accountDAO.saveAccountDetails(account);
	}
	
	@Override
	@Transactional
	//Update one Account details for accountID
	public void updateAccountDetails(long accountId, Account account) {
		accountDAO.updateAccountDetails(accountId, account);		
	}

	@Override
	@Transactional
	//Delete one Account details for accountID
	public void deleteAccount(long accountId) {
		accountDAO.deleteAccount(accountId);		
	}

	@Override
	@Transactional
	//Transfer balance within own accounts for one customerID
	public void transferBalanceOwn(long fromAccountId, long toAccountId, long amount) {
		accountDAO.transferBalanceOwn(fromAccountId, toAccountId, amount);;
	}

}

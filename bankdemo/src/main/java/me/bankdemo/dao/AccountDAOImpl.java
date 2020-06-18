package me.bankdemo.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import me.bankdemo.model.Account;

@Repository
public class AccountDAOImpl implements AccountDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	@Override
	// Get all Accounts for customerID
	public List<Account> getCustomerAccounts(long customerId) {
		List<Account> accountList = null;
		try {
			accountList = sessionFactory.getCurrentSession()
					.createQuery("from Account where customerId = " + customerId).list();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return accountList;
	}

	@Override
	// Get one Account details for accountID
	public Account getAccountDetails(long accountId) {
		Account account = null;
		try {
			account = sessionFactory.getCurrentSession().get(Account.class, accountId);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return account;
	}

	@Override
	// Save one Account for accountID
	public long saveAccountDetails(Account account) {
		try {
			sessionFactory.getCurrentSession().save(account);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return account.getAccountNo();
	}

	@Override
	// Update one Account details for accountID
	public void updateAccountDetails(long accountId, Account account) {
		try {
			Session session = sessionFactory.getCurrentSession();
			Account oldAccount = session.byId(Account.class).load(accountId);
			oldAccount.setType(account.getType());
			oldAccount.setAmount(account.getAmount());
			session.flush();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	// Delete one Account details for accountID
	public void deleteAccount(long accountId) {
		try {
			Session session = sessionFactory.getCurrentSession();
			Account account = session.byId(Account.class).load(accountId);
			session.delete(account);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

	@Override
	// Transfer balance within own accounts for one customerID
	public void transferBalanceOwn(long fromAccountId, long toAccountId, long amount) {
		try {
			Session session = sessionFactory.getCurrentSession();
			Account fromAccount = session.byId(Account.class).load(fromAccountId);
			Account toAccount = session.byId(Account.class).load(toAccountId);
			if (fromAccount.getAmount() - (amount) >= 0) {
				fromAccount.setAmount(fromAccount.getAmount() - (amount));
				toAccount.setAmount(toAccount.getAmount() + (amount));
				session.flush();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}

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

	@Override
	// Get all Accounts for customerID
	public List<Account> getCustomerAccounts(long customerId) {
		@SuppressWarnings("unchecked")
		List<Account> accountList = sessionFactory.getCurrentSession()
				.createQuery("from Account where customerId = " + customerId).list();
		return accountList;
	}

	@Override
	// Get one Account details for accountID
	public Account getAccountDetails(long accountId) {
		Account account = sessionFactory.getCurrentSession().get(Account.class, accountId);
		return account;
	}

	@Override
	// Save one Account for accountID
	public long saveAccountDetails(Account account) {
		System.out.println(account.toString());
		sessionFactory.getCurrentSession().save(account);
		return account.getAccountNo();
	}

	@Override
	// Update one Account details for accountID
	public void updateAccountDetails(long accountId, Account account) {
		Session session = sessionFactory.getCurrentSession();
		Account oldAccount = session.byId(Account.class).load(accountId);
		oldAccount.setType(account.getType());
		oldAccount.setAmount(account.getAmount());
		session.flush();
	}

	@Override
	// Delete one Account details for accountID
	public void deleteAccount(long accountId) {
		Session session = sessionFactory.getCurrentSession();
		Account account = session.byId(Account.class).load(accountId);
		session.delete(account);

	}

	@Override
	// Transfer balance within own accounts for one customerID
	public void transferBalanceOwn(long fromAccountId, long toAccountId, long amount) {
		Session session = sessionFactory.getCurrentSession();
		Account fromAccount = session.byId(Account.class).load(fromAccountId);
		Account toAccount = session.byId(Account.class).load(toAccountId);
		if (fromAccount.getAmount() - (amount) >= 0) {
			fromAccount.setAmount(fromAccount.getAmount() - (amount));
			toAccount.setAmount(toAccount.getAmount() + (amount));
		}
		session.flush();
	}

}

package me.bankdemo.dao;

import java.util.List;

import me.bankdemo.model.Customer;

public interface CustomerDAO {

	// Get all Customers
	List<Customer> getAllCustomers();

	// Get one Customer for customerID
	Customer getCustomerDetails(long customerId);

	// Save one Customer for customerID
	long saveCustomerDetails(Customer customer);

	// Update one Customer for customerID
	void updateCustomerDetails(long customerId, Customer customer);

	// Update one Customer SSN for customerID
	void updateCustomerSsn(long customerId, Customer customer);

	// Delete one Customer for customerID
	void deleteCustomerDetails(long customerId);

}

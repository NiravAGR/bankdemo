package me.bankdemo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.bankdemo.dao.CustomerDAO;
import me.bankdemo.model.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDAO customerDAO;

	@Override
	@Transactional
	public List<Customer> getAllCustomers() {
		return customerDAO.getAllCustomers();
	}

	@Override
	@Transactional
	public Customer getCustomerDetails(long customerId) {
		return customerDAO.getCustomerDetails(customerId);
	}

	@Override
	@Transactional
	public long saveCustomerDetails(Customer customer) {
		return customerDAO.saveCustomerDetails(customer);
	}

	@Override
	@Transactional
	public void updateCustomerDetails(long customerId, Customer customer) {
		customerDAO.updateCustomerDetails(customerId, customer);
	}

	@Override
	@Transactional
	public void updateCustomerSsn(long customerId, Customer customer) {
		customerDAO.updateCustomerSsn(customerId, customer);
	}

	@Override
	@Transactional
	public void deleteCustomerDetails(long customerId) {
		customerDAO.deleteCustomerDetails(customerId);

	}

}

package me.bankdemo.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.Session;

import me.bankdemo.model.Customer;

@Repository
public class CustomerDAOImpl implements CustomerDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public List<Customer> getAllCustomers() {
		@SuppressWarnings("unchecked")
		List<Customer> customerList = sessionFactory.getCurrentSession().createQuery("from Customer").list();
		System.out.println("*** CustomerDAOImpl  getAllCustomers ***");
		return customerList;
	}

	@Override
	public Customer getCustomerDetails(long customerId) {
		Customer customer = sessionFactory.getCurrentSession().get(Customer.class, customerId);
		return customer;
	}

	@Override
	public long saveCustomerDetails(Customer customer) {
		sessionFactory.getCurrentSession().save(customer);
		return customer.getCustomerId();
	}

	@Override
	public void updateCustomerDetails(long customerId, Customer customer) {
		Session session = sessionFactory.getCurrentSession();
		Customer oldCustomer = session.byId(Customer.class).load(customerId);
		oldCustomer.setFirstName(customer.getFirstName());
		oldCustomer.setLastName(customer.getLastName());
		oldCustomer.setMobileNumber(customer.getMobileNumber());
		oldCustomer.setEmailID(customer.getEmailID());
		oldCustomer.setAddress(customer.getAddress());
		oldCustomer.setCity(customer.getCity());
		session.flush();
	}

	@Override
	public void updateCustomerSsn(long customerId, Customer customer) {
		Session session = sessionFactory.getCurrentSession();
		Customer oldCustomer = session.byId(Customer.class).load(customerId);
		oldCustomer.setSsn(customer.getSsn());
		session.flush();
	}

	@Override
	public void deleteCustomerDetails(long customerId) {
		Session session = sessionFactory.getCurrentSession();
		Customer customer = session.byId(Customer.class).load(customerId);
		session.delete(customer);
	}

}

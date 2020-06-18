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

	@SuppressWarnings("unchecked")
	@Override
	public List<Customer> getAllCustomers() {
		List<Customer> customerList = null;
		try {
		customerList = sessionFactory.getCurrentSession().createQuery("from Customer").list();
		System.out.println("*** CustomerDAOImpl  getAllCustomers ***");
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return customerList;
	}

	@Override
	public Customer getCustomerDetails(long customerId) {
		Customer customer = null;
		try {
			customer = sessionFactory.getCurrentSession().get(Customer.class, customerId);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return customer;
	}

	@Override
	public long saveCustomerDetails(Customer customer) {
		try {
			sessionFactory.getCurrentSession().save(customer);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return customer.getCustomerId();
	}

	@Override
	public void updateCustomerDetails(long customerId, Customer customer) {
		try {

			Session session = sessionFactory.getCurrentSession();
			Customer oldCustomer = session.byId(Customer.class).load(customerId);
			oldCustomer.setFirstName(customer.getFirstName());
			oldCustomer.setLastName(customer.getLastName());
			oldCustomer.setMobileNumber(customer.getMobileNumber());
			oldCustomer.setEmailID(customer.getEmailID());
			oldCustomer.setAddress(customer.getAddress());
			oldCustomer.setCity(customer.getCity());
			session.flush();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void updateCustomerSsn(long customerId, Customer customer) {
		try {
			Session session = sessionFactory.getCurrentSession();

			Customer oldCustomer = session.byId(Customer.class).load(customerId);
			oldCustomer.setSsn(customer.getSsn());
			session.flush();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void deleteCustomerDetails(long customerId) {
		try {
			Session session = sessionFactory.getCurrentSession();

			Customer customer = session.byId(Customer.class).load(customerId);
			session.delete(customer);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;

		}
	}

}

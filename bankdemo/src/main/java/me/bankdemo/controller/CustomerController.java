package me.bankdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import me.bankdemo.model.Customer;
import me.bankdemo.service.CustomerService;

@CrossOrigin("*")
@RestController
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	// Get all customer
	@GetMapping("/api/v1/all-customers")
	public ResponseEntity<List<Customer>> getCustomerList() {
		List<Customer> list = customerService.getAllCustomers();
		return ResponseEntity.ok().body(list);
	}

	// Get one customer for customerId
	@GetMapping("/api/v1/customer/{customerId}")
	public ResponseEntity<Customer> getCustomer(@PathVariable("customerId") long customerId) {
		Customer customer = customerService.getCustomerDetails(customerId);
		return ResponseEntity.ok().body(customer);
	}

	// Save one customer for customerId
	@PostMapping("/api/v1/save-customer")
	public ResponseEntity<String> saveCustomerDetails(@RequestBody Customer customer) {
		long customerId = customerService.saveCustomerDetails(customer);
		return ResponseEntity.ok().body("{\"response\": " + "\"Customer Details Saved for:" + customerId + "\"}");
	}

	// Update one customer for customerId
	@PutMapping("/api/v1/customer/{customerId}")
	public ResponseEntity<String> updateCustomerDetails(@PathVariable("customerId") long customerId,
			@RequestBody Customer customer) {
		customerService.updateCustomerDetails(customerId, customer);
		return ResponseEntity.ok().body("{\"response\": " + "\"Customer Details Updated for:" + customerId + "\"}");
	}

	// Update one customer SSN for customerID
	@PutMapping("/api/v1/customer-ssn/{customerId}")
	public ResponseEntity<String> updateCustomerSsn(@PathVariable("customerId") long customerId,
			@RequestBody Customer customer) {
		customerService.updateCustomerSsn(customerId, customer);
		return ResponseEntity.ok().body("{\"response\": " + "\"Customer Details Updated for:" + customerId + "\"}");
	}

	// Delete one customer for customerID
	@DeleteMapping("/api/v1/customer/{customerId}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("customerId") long customerId) {
		customerService.deleteCustomerDetails(customerId);
		return ResponseEntity.ok()
				.body("{\"response\": " + "\"Customer  " + customerId + "  has been deleted." + "\"}");
	}

}

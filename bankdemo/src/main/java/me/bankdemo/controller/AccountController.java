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

import me.bankdemo.model.Account;
import me.bankdemo.service.AccountService;

@CrossOrigin("*")
@RestController
public class AccountController {

	@Autowired
	AccountService accountService;

	// Get all customer accounts
	@GetMapping("/api/v1/accounts/{customerId}")
	public ResponseEntity<List<Account>> getAccountList(@PathVariable("customerId") long customerId) {
		List<Account> list = accountService.getCustomerAccounts(customerId);
		return ResponseEntity.ok().body(list);
	}

	// Get one account for accountId
	@GetMapping("/api/v1/account/{accountId}")
	public ResponseEntity<Account> getAccount(@PathVariable("accountId") long accountId) {
		Account account = accountService.getAccountDetails(accountId);
		return ResponseEntity.ok().body(account);
	}

	// Save one account for accountId
	@PostMapping("/api/v1/save-account")
	public ResponseEntity<String> saveAccountDetails(@RequestBody Account account) {
		long accountId = accountService.saveAccountDetails(account);
		return ResponseEntity.ok().body("{\"response\": " + "\"Account Details Saved for:" + accountId + "\"}");
	}

	// Update one account for accountId
	@PutMapping("/api/v1/account/{accountId}")
	public ResponseEntity<String> updateAccountDetails(@PathVariable("accountId") long accountId,
			@RequestBody Account account) {
		accountService.updateAccountDetails(accountId, account);
		return ResponseEntity.ok().body("{\"response\": " + "\"Account Details Updated for:" + accountId + "\"}");
	}

	// Delete one account for accountId
	@DeleteMapping("/api/v1/account/{accountId}")
	public ResponseEntity<String> deleteAccount(@PathVariable("accountId") long accountId) {
		accountService.deleteAccount(accountId);
		return ResponseEntity.ok().body("{\"response\": " + "\"Account  " + accountId + "  has been deleted." + "\"}");
	}

	// Transfer balance to own account
	@PutMapping("/api/v1/account/{fromAccountId}/{toAccountId}/{amount}")
	public ResponseEntity<String> transferBalanceOwn(@PathVariable("fromAccountId") long fromAccountId,
			@PathVariable("toAccountId") long toAccountId, @PathVariable("amount") long amount,
			@RequestBody Account account) {
		accountService.transferBalanceOwn(fromAccountId, toAccountId, amount);
		return ResponseEntity.ok().body("{\"response\": " + "\"Transfer Success. " + amount
				+ " $ debited from Account : " + fromAccountId + "  and credited to Account : " + toAccountId + "\"}");
	}

}

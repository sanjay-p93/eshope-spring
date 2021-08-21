package com.eshoppingzone.walletservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.walletservice.services.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@GetMapping("/complete/{txnId}")
	public void complete(@PathVariable String txnId) {
		transactionService.completeTransaction(txnId);
	}

	@GetMapping("/refund/{txnId}")
	public void findById(@PathVariable String txnId) {
		transactionService.refundTransaction(txnId);
	}
}

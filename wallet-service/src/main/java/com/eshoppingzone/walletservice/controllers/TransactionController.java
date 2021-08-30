package com.eshoppingzone.walletservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.walletservice.services.TransactionService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@GetMapping("/complete/{txnId}")
	@ApiOperation(value = "Complete a transaction by Id", notes = "Provide id to complete a specific transaction", response = String.class)
	public String complete(@PathVariable String txnId) {
		transactionService.completeTransaction(txnId);
		return "ok complted";
	}

	@GetMapping("/refund/{txnId}")
	@ApiOperation(value = "Refund a transaction by Id", notes = "Provide id to refund a specific transaction", response = String.class)
	public String findById(@PathVariable String txnId) {
		transactionService.refundTransaction(txnId);
		return "ok refunded";
	}
}

package com.eshoppingzone.walletservice.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.walletservice.models.Topup;
import com.eshoppingzone.walletservice.models.Transaction;
import com.eshoppingzone.walletservice.models.Wallet;
import com.eshoppingzone.walletservice.services.WalletService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/wallet")
@CrossOrigin(origins = "http://localhost:4200")
public class WalletController {

	@Autowired
	private WalletService walletService;

	@GetMapping("/check/{id}")
	@ApiOperation(value = "Find wallet by user Id", notes = "Provide Id to look up specific wallet", response = Wallet.class)
	public Optional<Wallet> findById(@PathVariable String id) {
		return walletService.findById(id);
	}

	@PostMapping("/add")
	@ApiOperation(value = "Add new wallet", notes = "Provide user Id and balance to add wallet")
	public void addnew(@RequestBody Wallet wallet, BindingResult result) {
		walletService.add(wallet);
	}

	@PostMapping("/topup")
	@ApiOperation(value = "Add amount to wallet", notes = "Provide user Id and balance amount to be added wallet")
	public void topup(@RequestBody Topup topup, BindingResult result) {
		walletService.topup(topup);
	}


	@PostMapping("/pay")
	@ApiOperation(value = "Transfer amount from one wallet to another", notes = "Provide source user Id and destination Id and amount to be transferred wallet", response = String.class)
	public ResponseEntity<String> intiateTransaction(@RequestBody Transaction transaction, BindingResult result) {
		return walletService.pay(transaction);
	}
}

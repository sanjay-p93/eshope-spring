package com.eshoppingzone.walletservice.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
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

@RestController
@RequestMapping("/wallet")
public class WalletController {

	@Autowired
	private WalletService walletService;

	@GetMapping("/check/{id}")
	public Optional<Wallet> findById(@PathVariable String id) {
		return walletService.findById(id);
	}

	@PostMapping("/add")
	public void addnew(@RequestBody Wallet wallet, BindingResult result) {
		walletService.add(wallet);
	}

	@PostMapping("/topup")
	public void topup(@RequestBody Topup topup, BindingResult result) {
		walletService.topup(topup);
	}


	@PostMapping("/pay")
	public void intiateTransaction(@RequestBody Transaction transaction, BindingResult result) {
		walletService.pay(transaction);
	}
}

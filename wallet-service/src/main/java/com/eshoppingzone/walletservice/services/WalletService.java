package com.eshoppingzone.walletservice.services;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eshoppingzone.walletservice.models.Topup;
import com.eshoppingzone.walletservice.models.Transaction;
import com.eshoppingzone.walletservice.models.Wallet;
import com.eshoppingzone.walletservice.repositories.WalletRepository;

@Service
public class WalletService {

	@Autowired
	private WalletRepository walletRepository;

	@Autowired
	private TransactionService transactionService;

	// find wallet by userId
	public Optional<Wallet> findById(String userId) {
		return walletRepository.findOneByUserId(userId);
	}

	// Add new wallet
	public Wallet add(Wallet wallet) {

		wallet.setPendingTransactions(Arrays.asList());
		return this.walletRepository.save(wallet);
	}

	// save changes to wallet
	public Wallet save(Wallet wallet) {
		return this.walletRepository.save(wallet);
	}

	// add balance to wallet
	public Wallet topup(Topup topup) throws Exception {
		Optional<Wallet> wallet = this.findById(topup.getUserId());
		if(wallet.isPresent()){
			Wallet userWallet = wallet.get();
			BigDecimal newBal = userWallet.getBalance().add(topup.getBalance());
			userWallet.setBalance(newBal);
			return this.save(userWallet);
		}else{
			throw new Exception("Wallet not found.");
		}
	}

	// Transferring from source wallet and initiating transaction
	public ResponseEntity<String> pay(Transaction transaction) {
		Optional<Wallet> SOURCEWALLET = this.findById(transaction.getSource());
		if (SOURCEWALLET.isPresent()) {
			Wallet sourcewallet = SOURCEWALLET.get();
			if (sourcewallet.getBalance().compareTo(transaction.getBalance()) >= 0) {

				BigDecimal newBal = sourcewallet.getBalance().subtract(transaction.getBalance());
				sourcewallet.setBalance(newBal);
				String txnId = transactionService.initiateTransaction(transaction);
				sourcewallet.addPendingTransaction(txnId);
				this.save(sourcewallet);
				return ResponseEntity.ok().body(txnId);

			} else {
				return ResponseEntity.badRequest()
						.body("Wallet balance insufficient. Please top up your wallet or try another payment methord.");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Wallet not found. Add wallet to your account avail this service");
		}
	}

	// Update pending transaction
	public void updatePendingTxn(String userId, String txnId) throws Exception {
		Optional<Wallet> wallet = this.findById(userId);
		if (wallet.isPresent()) {
			Wallet userWallet = wallet.get();
			userWallet.removePendingTransaction(txnId);
			this.save(userWallet);
		} else {
			throw new Exception("Wallet not found.");
		}
	}

}

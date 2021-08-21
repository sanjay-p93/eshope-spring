package com.eshoppingzone.walletservice.services;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

	// Add changes to wallet
	public void add(Wallet wallet) {
		wallet.setPendingTransactions(Arrays.asList());
		this.walletRepository.save(wallet);
	}

	// save changes to wallet
	public void save(Wallet wallet) {
		this.walletRepository.save(wallet);
	}

	// add balance to wallet
	public void topup(Topup topup) {
		Optional<Wallet> wallet = this.findById(topup.getUserId());
		if(wallet.isPresent()){
			Wallet userWallet = wallet.get();
			BigDecimal newBal = userWallet.getBalance().add(topup.getBalance());
			userWallet.setBalance(newBal);
			this.save(userWallet);
		}else{
			// no user wallet found.
		}
	}

	// Transferring from source wallet and initiating transaction
	public void pay(Transaction transaction) {
		Optional<Wallet> SOURCEWALLET = this.findById(transaction.getSource());
		if (SOURCEWALLET.isPresent()) {
			Wallet sourcewallet = SOURCEWALLET.get();
			if (sourcewallet.getBalance().compareTo(transaction.getBalance()) >= 0) {

				BigDecimal newBal = sourcewallet.getBalance().subtract(transaction.getBalance());
				sourcewallet.setBalance(newBal);
				String txnId = transactionService.initiateTransaction(transaction);
				sourcewallet.addPendingTransaction(txnId);
				this.save(sourcewallet);

			} else {
				// not enough balance for transaction.
			}
		} else {
			// no user wallet found.
		}
	}

	// Update pending transaction
	public void updatePendingTxn(String userId, String txnId) {
		Optional<Wallet> wallet = this.findById(userId);
		if (wallet.isPresent()) {
			Wallet userWallet = wallet.get();
			userWallet.removePendingTransaction(txnId);
			this.save(userWallet);
		} else {
			// no user wallet found.
		}
	}

}

package com.eshoppingzone.walletservice.services;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshoppingzone.walletservice.models.Topup;
import com.eshoppingzone.walletservice.models.Transaction;
import com.eshoppingzone.walletservice.repositories.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private WalletService walletService;

	// Find transaction by id
	public Optional<Transaction> findById(String id) {
		return transactionRepository.findById(id);
	}


	// Add transaction or save changes
	public void save(Transaction transaction) {
		transactionRepository.save(transaction);
	}


	// Adding transaction
	public String initiateTransaction(Transaction transaction) {
		transaction.setState("INITIATED");
		Transaction t = transactionRepository.save(transaction);
		return t.getId();
	}


	// Completing transaction
	public void completeTransaction(String txnId) throws Exception {
		Optional<Transaction> TRANSACTION = this.findById(txnId);
		if (TRANSACTION.isPresent()) {
			Transaction transaction = TRANSACTION.get();
			String txnState = transaction.getState();
			if (txnState.equals("INITIATED")) {
				this.updateBalance(transaction.getDestination(), transaction.getBalance());
				walletService.updatePendingTxn(transaction.getSource(), transaction.getId());
				transaction.setState("COMPLETED");
				transactionRepository.save(transaction);
			}
		} else {
			new Exception("Invalid transaction Id");
			// Transaction Id not valid.
		}
	}

	// Refunding transaction
	public void refundTransaction(String txnId) throws Exception {
		Optional<Transaction> TRANSACTION = this.findById(txnId);
		if (TRANSACTION.isPresent()) {
			Transaction transaction = TRANSACTION.get();
			String txnState = transaction.getState();
			if (txnState.equals("INITIATED")) {
				this.updateBalance(transaction.getSource(), transaction.getBalance());
				walletService.updatePendingTxn(transaction.getSource(), transaction.getId());
				transaction.setState("REFUNDED");
				transactionRepository.save(transaction);
			}
		} else {
			new Exception("Invalid transaction Id");
			// Transaction Id not valid.
		}
	}

	// Transferring transaction balance
	public void updateBalance(String id, BigDecimal balance) throws Exception {
		Topup destinationTopUp = new Topup();
		destinationTopUp.setBalance(balance);
		destinationTopUp.setUserId(id);
		walletService.topup(destinationTopUp);
	}


}

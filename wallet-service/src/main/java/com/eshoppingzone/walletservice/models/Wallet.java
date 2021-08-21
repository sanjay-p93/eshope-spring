package com.eshoppingzone.walletservice.models;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Wallets")
public class Wallet {

	@Id
	private String id;
	private String userId;
	private BigDecimal balance;
	private List<String> pendingTransactions;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public List<String> getPendingTransactions() {
		return pendingTransactions;
	}

	public void setPendingTransactions(List<String> pendingTransactions) {
		this.pendingTransactions = pendingTransactions;
	}

	public void addPendingTransaction(String pendingTransaction) {
		this.pendingTransactions.add(pendingTransaction);
	}

	public void removePendingTransaction(String pendingTransaction) {
		this.pendingTransactions.remove(pendingTransaction);
	}

	@Override
	public String toString() {
		return "Wallet [id=" + id + ", userId=" + userId + ", balance=" + balance + ", pendingTransactions="
				+ pendingTransactions + "]";
	}
}

package com.eshoppingzone.walletservice.models;

import java.math.BigDecimal;

public class Topup {

	private String userId;
	private BigDecimal balance;

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
}

package com.eshoppingzone.cartservice.models;

public class CheckoutDetails {

	private String userId;
	private String paymentType;
	private Address address;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public CheckoutDetails() {
		super();
	}

	public CheckoutDetails(String userId, String paymentType, Address address) {
		super();
		this.userId = userId;
		this.paymentType = paymentType;
		this.address = address;
	}
}

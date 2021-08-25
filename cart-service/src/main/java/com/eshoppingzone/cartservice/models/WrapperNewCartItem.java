package com.eshoppingzone.cartservice.models;

public class WrapperNewCartItem {

	private CartItem cartItem;
	private String userId;

	public CartItem getCartItem() {
		return cartItem;
	}

	public void setCartItem(CartItem cartItem) {
		this.cartItem = cartItem;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}

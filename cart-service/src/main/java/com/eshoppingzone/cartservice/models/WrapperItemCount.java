package com.eshoppingzone.cartservice.models;

public class WrapperItemCount {
	private String userId;
	private String itemId;
	private int quantity;

	public WrapperItemCount() {
		super();
	}

	public WrapperItemCount(String userId, String itemId, int quantity) {
		super();
		this.userId = userId;
		this.itemId = itemId;
		this.quantity = quantity;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}


	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}

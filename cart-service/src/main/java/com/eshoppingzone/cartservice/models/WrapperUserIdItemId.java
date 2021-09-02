package com.eshoppingzone.cartservice.models;

public class WrapperUserIdItemId {
	private String userId;
	private String itemId;

	public WrapperUserIdItemId() {
		super();
	}

	public WrapperUserIdItemId(String userId, String itemId) {
		super();
		this.userId = userId;
		this.itemId = itemId;
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

}

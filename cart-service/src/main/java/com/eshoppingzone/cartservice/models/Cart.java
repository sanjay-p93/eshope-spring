package com.eshoppingzone.cartservice.models;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Carts")
public class Cart {

	@Id
	private String id;
	private String userId;
	private BigDecimal totalPrice;
	private List<CartItem> items;

	public Cart() {
		super();
	}

	public Cart(String userId, BigDecimal totalPrice, CartItem cartItem) {
		super();
		this.userId = userId;
		this.totalPrice = totalPrice;
		this.items = Arrays.asList(cartItem);
	}

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

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", userId=" + userId + ", totalPrice=" + totalPrice + ", items=" + items + "]";
	}

}
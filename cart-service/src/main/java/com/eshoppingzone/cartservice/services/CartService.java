package com.eshoppingzone.cartservice.services;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshoppingzone.cartservice.models.Cart;
import com.eshoppingzone.cartservice.models.CartItem;
import com.eshoppingzone.cartservice.models.CheckoutDetails;
import com.eshoppingzone.cartservice.models.WrapperItemCount;
import com.eshoppingzone.cartservice.models.WrapperNewCartItem;
import com.eshoppingzone.cartservice.models.WrapperUserIdItemId;
import com.eshoppingzone.cartservice.repositories.CartRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;

	// Find cart
	public Optional<Cart> findByUserId(String userId) {
		return cartRepository.findOneByUserId(userId);
	}


	// Add cart
	public void add(Cart cart) {
		cartRepository.save(cart);
	}


	// Delete cart
	public void deleteCart(String id) {
		cartRepository.deleteById(id);
	}


	// Add new item to cart
	public void addNewItem(WrapperNewCartItem wrapper) {

		String userId = wrapper.getUserId();
		CartItem cartItem = wrapper.getCartItem();

		Optional<Cart> CART = this.findByUserId(userId);
		if (CART.isPresent()) {
			Cart cart = CART.get();
			cart.getItems().add(cartItem);
			cartRepository.save(cart);
		}
		else {
			// cart not found
		}

	}


	// Update item quantity
	public void updateItemQuantity(WrapperItemCount wrapper) {

		String userId = wrapper.getUserId();
		String itemId = wrapper.getItemId();
		int quantity = wrapper.getQuantity();

		Optional<Cart> CART = this.findByUserId(userId);
		if (CART.isPresent()) {
			Cart cart = CART.get();

			BigDecimal totalCost = BigDecimal.ZERO;
			for (CartItem item : cart.getItems()) {
				if(item.getId().equals(itemId)) {
					item.setQuantity(quantity);
				}
				int itemQuantity = item.getQuantity();
				totalCost = totalCost.add(item.getPrice().multiply(BigDecimal.valueOf(itemQuantity)));
			}
			cart.setTotalPrice(totalCost);
			cartRepository.save(cart);
		}
		else {
			// cart not found
		}
	}


	// Delete item from cart
	public void deleteItem(WrapperUserIdItemId wrapper) {

		String userId = wrapper.getUserId();
		String itemId = wrapper.getItemId();

		Optional<Cart> CART = this.findByUserId(userId);
		if (CART.isPresent()) {
			Cart cart = CART.get();
			if (cart.getItems().size() > 1) {
				BigDecimal totalCost = BigDecimal.ZERO;
				cart.getItems().removeIf(item -> (item.getId().equals(itemId)));
				for (CartItem item : cart.getItems()) {
					int itemQuantity = item.getQuantity();
					totalCost = totalCost.add(item.getPrice().multiply(BigDecimal.valueOf(itemQuantity)));
				}
				cart.setTotalPrice(totalCost);
				cartRepository.save(cart);
			}
			else {
				cartRepository.deleteById(cart.getId());
			}
		}
		else {
			// cart not found
		}
	}

	// Checkout cart items
	public void checkout(CheckoutDetails checkoutDetails) {
		// TODO method

	}

}

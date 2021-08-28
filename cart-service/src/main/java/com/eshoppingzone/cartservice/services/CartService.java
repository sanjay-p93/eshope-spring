package com.eshoppingzone.cartservice.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.eshoppingzone.cartservice.exceptions.WalletException;
import com.eshoppingzone.cartservice.models.Cart;
import com.eshoppingzone.cartservice.models.CartItem;
import com.eshoppingzone.cartservice.models.CheckoutDetails;
import com.eshoppingzone.cartservice.models.Order;
import com.eshoppingzone.cartservice.models.Transaction;
import com.eshoppingzone.cartservice.models.WrapperItemCount;
import com.eshoppingzone.cartservice.models.WrapperNewCartItem;
import com.eshoppingzone.cartservice.models.WrapperUserIdItemId;
import com.eshoppingzone.cartservice.repositories.CartRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private OrderService orderService;

	@Autowired
	RestTemplate restTemplate;

	// Find cart
	public Optional<Cart> findByUserId(String userId) {
		return cartRepository.findOneByUserId(userId);
	}


	// Add cart
	public void add(Cart cart) {
		List<CartItem> items = cart.getItems();
		cart.setTotalPrice(getNewTotalPrice(items));
		cartRepository.save(cart);
	}


	// Delete cart
	public void deleteCart(String id) {
		cartRepository.deleteById(id);
	}

	// Find total amount for item list
	public BigDecimal getNewTotalPrice(List<CartItem> items) {
		BigDecimal totalCost = BigDecimal.ZERO;
		for (CartItem item : items) {
			int itemQuantity = item.getQuantity();
			totalCost = totalCost.add(item.getPrice().multiply(BigDecimal.valueOf(itemQuantity)));
		}
		return totalCost;
	}


	// Add new item to cart
	public void addNewItem(WrapperNewCartItem wrapper) {

		String userId = wrapper.getUserId();
		CartItem cartItem = wrapper.getCartItem();

		Optional<Cart> CART = this.findByUserId(userId);
		if (CART.isPresent()) {
			Cart cart = CART.get();
			cart.getItems().add(cartItem);
			List<CartItem> items = cart.getItems();
			cart.setTotalPrice(getNewTotalPrice(items));
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
			cart.getItems().forEach(item -> {
				if(item.getId().equals(itemId)) {
					item.setQuantity(quantity);
				}
			});
			List<CartItem> items = cart.getItems();
			cart.setTotalPrice(getNewTotalPrice(items));
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
				cart.getItems().removeIf(item -> (item.getId().equals(itemId)));
				List<CartItem> items = cart.getItems();
				cart.setTotalPrice(getNewTotalPrice(items));
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
	public ResponseEntity<String> checkout(CheckoutDetails checkoutDetails) throws WalletException {

		Optional<Cart> CART = this.findByUserId(checkoutDetails.getUserId());
		
		if (CART.isPresent()) {
			Cart cart = CART.get();
			Order order = new Order(cart, checkoutDetails);
			if (order.getPaymentType().equals("WALLET")) {
				String txnId = this.initateWalletTransaction(order.getUserId(), order.getTotalPrice());
				order.setTransactionId(txnId);
			}
			orderService.add(order);
			cartRepository.deleteById(cart.getId());
			return ResponseEntity.ok().body("Order placed successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found.");
		}

	}


	// Initate Transaction
	public String initateWalletTransaction(String SourceId, BigDecimal Balance) throws WalletException {

		Transaction transaction = new Transaction();
		transaction.setSource(SourceId);
		transaction.setBalance(Balance);
		transaction.setDestination("eshope");

		try {
			String uri = "http://WALLET-SERVICE/wallet/pay";
			ResponseEntity<String> response = restTemplate.postForEntity(uri, transaction, String.class);
			String body = response.getBody();
			return body;
		} catch (HttpClientErrorException | HttpServerErrorException httpClientOrServerExc) {
			throw new WalletException(httpClientOrServerExc.getResponseBodyAsString());

		} catch (Exception e) {
			throw new WalletException("Wallet service is unavailable at the moment.");
		}
	}
	
	

}

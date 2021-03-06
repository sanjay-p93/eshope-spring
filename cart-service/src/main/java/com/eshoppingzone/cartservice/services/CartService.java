package com.eshoppingzone.cartservice.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
	public Cart addNewItem(WrapperNewCartItem wrapper) {

		String userId = wrapper.getUserId();
		CartItem cartItem = wrapper.getCartItem();

		Optional<Cart> CART = this.findByUserId(userId);
		if (CART.isEmpty()) {
			Cart cart = new Cart(userId, cartItem.getPrice(), cartItem);
			return cartRepository.save(cart);
		} else {
			Cart existingCart = CART.get();
			existingCart.getItems().add(cartItem);
			List<CartItem> items = existingCart.getItems();
			existingCart.setTotalPrice(getNewTotalPrice(items));
			return cartRepository.save(existingCart);
		}

	}


	// Update item quantity
	public Cart updateItemQuantity(WrapperItemCount wrapper) throws Exception {

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
			return cartRepository.save(cart);
		}
		else {
			throw new Exception("Cart not found.");
		}
	}


	// Delete item from cart
	public Cart deleteItem(WrapperUserIdItemId wrapper) throws Exception {

		String userId = wrapper.getUserId();
		String itemId = wrapper.getItemId();

		Optional<Cart> CART = this.findByUserId(userId);
		if (CART.isPresent()) {
			Cart cart = CART.get();
			if (cart.getItems().size() > 1) {
				cart.getItems().removeIf(item -> (item.getId().equals(itemId)));
				List<CartItem> items = cart.getItems();
				cart.setTotalPrice(getNewTotalPrice(items));
				return cartRepository.save(cart);
			}
			else {
				cartRepository.deleteById(cart.getId());
				return null;
			}
		}
		else {
			throw new Exception("Cart not found.");
		}
	}


	// Checkout cart items
	public ResponseEntity<Order> checkout(CheckoutDetails checkoutDetails) throws Exception {

		Optional<Cart> CART = this.findByUserId(checkoutDetails.getUserId());
		
		if (CART.isPresent()) {
			Cart cart = CART.get();
			Order order = new Order(cart, checkoutDetails);
			if (order.getPaymentType().equals("WALLET")) {
				String txnId = this.initateWalletTransaction(order.getUserId(), order.getTotalPrice());
				order.setTransactionId(txnId);
			}
			order = orderService.add(order);
			cartRepository.deleteById(cart.getId());
			return ResponseEntity.ok().body(order);
		} else {
			throw new Exception("Cart not found.");
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
			throw new WalletException(
					"Wallet service is unavailable at the moment. Please try another payment option or try again later.");
		}
	}
	
	

}

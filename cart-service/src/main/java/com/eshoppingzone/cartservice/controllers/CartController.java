package com.eshoppingzone.cartservice.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.cartservice.exceptions.WalletException;
import com.eshoppingzone.cartservice.models.Cart;
import com.eshoppingzone.cartservice.models.CheckoutDetails;
import com.eshoppingzone.cartservice.models.WrapperItemCount;
import com.eshoppingzone.cartservice.models.WrapperNewCartItem;
import com.eshoppingzone.cartservice.models.WrapperUserIdItemId;
import com.eshoppingzone.cartservice.services.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@GetMapping("/get/{userId}")
	public Optional<Cart> findByUserId(@PathVariable String userId) {
		return cartService.findByUserId(userId);
	}

	@PostMapping("/add")
	public void addnew(@RequestBody Cart cart, BindingResult result) {
		cartService.add(cart);
	}

	@PostMapping("/addNewitem")
	public void addNewItem(@RequestBody WrapperNewCartItem wrapper, BindingResult result) {
		System.out.println(result);
		cartService.addNewItem(wrapper);
	}

	@PostMapping("/updateitemquantity")
	public void updateItemQuantity(@RequestBody WrapperItemCount wrapper, BindingResult result) {
		cartService.updateItemQuantity(wrapper);
	}

	@PostMapping("/deleteItem")
	public void deleteItem(@RequestBody WrapperUserIdItemId wrapper, BindingResult result) {
		System.out.println(result);
		cartService.deleteItem(wrapper);
	}

	// todo
	@PostMapping("/checkout")
	public ResponseEntity<String> checkout(@RequestBody CheckoutDetails checkoutDetails, BindingResult result)
			throws WalletException {
		return cartService.checkout(checkoutDetails);
	}
}

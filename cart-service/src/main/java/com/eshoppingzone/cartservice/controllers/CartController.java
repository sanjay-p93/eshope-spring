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
import com.eshoppingzone.cartservice.models.Order;
import com.eshoppingzone.cartservice.models.WrapperItemCount;
import com.eshoppingzone.cartservice.models.WrapperNewCartItem;
import com.eshoppingzone.cartservice.models.WrapperUserIdItemId;
import com.eshoppingzone.cartservice.services.CartService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@GetMapping("/get/{userId}")
	@ApiOperation(value = "Find cart by user Id", notes = "Provide user Id to look up specific cart", response = Cart.class)
	public Optional<Cart> findByUserId(@PathVariable String userId) {
		return cartService.findByUserId(userId);
	}

	@PostMapping("/addNewitem")
	@ApiOperation(value = "Add new item to a cart Creat if not already exist", notes = "Provide a user id and cart item to add item to specific user cart")
	public Cart addNewItem(@RequestBody WrapperNewCartItem wrapper, BindingResult result) {
		return cartService.addNewItem(wrapper);
	}

	@PostMapping("/updateitemquantity")
	@ApiOperation(value = "Update item quantity in a cart", notes = "Provide a user id, item id and new qantity to update quantity of the cart item")
	public Cart updateItemQuantity(@RequestBody WrapperItemCount wrapper, BindingResult result) throws Exception {
		return cartService.updateItemQuantity(wrapper);
	}

	@PostMapping("/deleteItem")
	@ApiOperation(value = "Delete item in a cart", notes = "Provide a user id and item id to delete cart item")
	public Cart deleteItem(@RequestBody WrapperUserIdItemId wrapper, BindingResult result) throws Exception {
		return cartService.deleteItem(wrapper);
	}

	@PostMapping("/checkout")
	@ApiOperation(value = "Checkout a cart user cart and place order", notes = "Provide a user id, payment type and delivery address to place an order", response = String.class)
	public ResponseEntity<Order> checkout(@RequestBody CheckoutDetails checkoutDetails, BindingResult result)
			throws WalletException, Exception {
		return cartService.checkout(checkoutDetails);
	}
}

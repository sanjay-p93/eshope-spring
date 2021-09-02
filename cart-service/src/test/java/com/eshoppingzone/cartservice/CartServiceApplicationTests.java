package com.eshoppingzone.cartservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.client.RestTemplate;

import com.eshoppingzone.cartservice.models.Address;
import com.eshoppingzone.cartservice.models.Cart;
import com.eshoppingzone.cartservice.models.CartItem;
import com.eshoppingzone.cartservice.models.CheckoutDetails;
import com.eshoppingzone.cartservice.models.Order;
import com.eshoppingzone.cartservice.models.WrapperItemCount;
import com.eshoppingzone.cartservice.models.WrapperNewCartItem;
import com.eshoppingzone.cartservice.models.WrapperUserIdItemId;
import com.eshoppingzone.cartservice.repositories.CartRepository;
import com.eshoppingzone.cartservice.repositories.OrderRepository;
import com.eshoppingzone.cartservice.services.CartService;
import com.eshoppingzone.cartservice.services.OrderService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class CartServiceApplicationTests {

	@MockBean
	private CartRepository cartRepository;

	@Autowired
	private CartService cartService;

	@MockBean
	private OrderRepository orderRepository;

	@Autowired
	private OrderService orderService;

	@MockBean
	private RestTemplate restTemplate;

	// Cart service tests

	@Test
	void findByUserIdTest() {
		String id = "qwerty";
		Optional<Cart> cart = Optional.of(new Cart());
		when(cartRepository.findOneByUserId(id)).thenReturn(cart);
		assertEquals(cart, cartService.findByUserId(id));
	}

	@Test
	void deleteCart() {
		String id = "qwerty12346";
		cartService.deleteCart(id);
		verify(cartRepository, times(1)).deleteById(id);
	}
	
	
	@Test
	void getNewTotalPrice() {
		
		CartItem item1= new CartItem();
		item1.setPrice(BigDecimal.valueOf(2));
		item1.setQuantity(2);
		
		CartItem item2= new CartItem();
		item2.setPrice(BigDecimal.valueOf(2));
		item2.setQuantity(2);

		assertEquals(BigDecimal.valueOf(8), cartService.getNewTotalPrice(Stream
						.of(item1,item2)
						.collect(Collectors.toList())
		));
	}

	@Test
	void addNewItem() {

		WrapperNewCartItem wrapper = new WrapperNewCartItem();
		String id = "1";

		CartItem cartItem = new CartItem();
		cartItem.setPrice(BigDecimal.valueOf(2));
		cartItem.setQuantity(2);

		wrapper.setUserId(id);
		wrapper.setCartItem(cartItem);

		Cart cart = new Cart();
		List<CartItem> list = new ArrayList<CartItem>();
		cart.setItems(list);

		Optional<Cart> cartOptional = Optional.of(cart);
		when(cartRepository.findOneByUserId(id)).thenReturn(cartOptional);
		when(cartRepository.save(cart)).thenReturn(cart);
		assertEquals(cart, cartService.addNewItem(wrapper));
		
	}
	

	@Test
	public void updateItemQuantityTest() {
		WrapperItemCount wapper = new WrapperItemCount("a", "a", 1);
		when(cartRepository.findOneByUserId(wapper.getUserId())).thenReturn(null);
		assertThrows(Exception.class, () -> cartService.updateItemQuantity(wapper));
	}

	@Test
	public void deleteItemTest() {
		WrapperUserIdItemId wapper = new WrapperUserIdItemId("a", "a");
		when(cartRepository.findOneByUserId(wapper.getUserId())).thenReturn(null);
		assertThrows(Exception.class, () -> cartService.deleteItem(wapper));
	}

	@Test
	public void checkoutTest() {
		Address address = new Address("", "", "", "", 1);
		CheckoutDetails checkoutDetails = new CheckoutDetails("", "", address);
		when(cartRepository.findOneByUserId(checkoutDetails.getUserId())).thenReturn(null);
		assertThrows(Exception.class, () -> cartService.checkout(checkoutDetails));
	}

	// product service

	@Test
	void getall() {
		orderService.getall();
		verify(orderRepository, times(1)).findAll();
	}

	@Test
	void getByStatus() {
		orderService.getByStatus("a");
		verify(orderRepository, times(1)).findByOrderStatus("a");
	}

	@Test
	void userOrders() {
		orderService.userOrders("a");
		verify(orderRepository, times(1)).findByUserId("a");
	}

	@Test
	void findById() {
		orderService.findById("a");
		verify(orderRepository, times(1)).findById("a");
	}

	@Test
	void add() {
		Order order = new Order();
		when(orderRepository.save(order)).thenReturn(order);
		assertEquals(order, orderService.add(order));
	}

	@Test
	public void completeOrder() {
		String id = "a";
		when(orderRepository.findById(id)).thenReturn(null);
		assertThrows(Exception.class, () -> orderService.completeOrder(id));
	}

	@Test
	public void cancelOrder() {
		String id = "a";
		when(orderRepository.findById(id)).thenReturn(null);
		assertThrows(Exception.class, () -> orderService.cancelOrder(id));
	}
}

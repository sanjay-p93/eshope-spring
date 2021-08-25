package com.eshoppingzone.cartservice.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eshoppingzone.cartservice.models.Order;
import com.eshoppingzone.cartservice.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	RestTemplate restTemplate = new RestTemplate();


	// All orders
	public List<Order> getall() {
		return orderRepository.findAll();
	}

	// Pending orders
	public List<Order> getPending() {
		return orderRepository.findByOrderStatus("PENDING");
	}

	// Completed orders
	public List<Order> getcompleted() {
		return orderRepository.findByOrderStatus("COMPLETED");
	}

	// Cancelled orders
	public List<Order> getCancelled() {
		return orderRepository.findByOrderStatus("CANCELLED");
	}

	// User Orders
	public List<Order> userOrders(String userId) {
		return orderRepository.findByUserId(userId);
	}

	// Find order
	public Optional<Order> findById(String id) {
		return orderRepository.findById(id);
	}

	// Add order
	public void add(Order order) {
		order.setOrderStatus("PENDING");
		orderRepository.save(order);
	}


	// complete order
	public void completeOrder(String id) {

		Optional<Order> ORDER = this.findById(id);
		if (ORDER.isPresent()) {
			Order order = ORDER.get();
			if (order.getPaymentType().equals("WALLET")) {
				String uri = "http://localhost:8085/transaction/complete/" + order.getTransactionId();
				String msg = restTemplate.getForObject(uri, String.class);
				System.out.println(msg);
			}
			order.setOrderStatus("COMPLETED");
			orderRepository.save(order);
		}
	}


	// cancel order
	public void cancelOrder(String id) {

		Optional<Order> ORDER = this.findById(id);
		if (ORDER.isPresent()) {
			Order order = ORDER.get();
			if (order.getPaymentType().equals("WALLET")) {
				String uri = "http://localhost:8085/transaction/refund/" + order.getTransactionId();
				String msg = restTemplate.getForObject(uri, String.class);
				System.out.println(msg);
			}
			order.setOrderStatus("CANCELLED");
			orderRepository.save(order);
		}
	}


}

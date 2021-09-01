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

	@Autowired
	RestTemplate restTemplate;


	// All orders
	public List<Order> getall() {
		return orderRepository.findAll();
	}

	// Orders by status
	public List<Order> getByStatus(String status) {

		System.out.println(status);
		return orderRepository.findByOrderStatus(status);
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
	public Order add(Order order) {
		order.setOrderStatus("PENDING");
		return orderRepository.save(order);
	}


	// complete order
	public Order completeOrder(String id) throws Exception {

		Optional<Order> ORDER = this.findById(id);
		if (ORDER.isPresent()) {
			Order order = ORDER.get();
			if (order.getPaymentType().equals("WALLET")) {
				String uri = "http://WALLET-SERVICE/transaction/complete/" + order.getTransactionId();
				String msg = restTemplate.getForObject(uri, String.class);
				System.out.println(msg);
			}
			order.setOrderStatus("COMPLETED");
			return orderRepository.save(order);
		} else {
			throw new Exception("Could not find this order.");
		}
	}


	// cancel order
	public Order cancelOrder(String id) throws Exception {

		Optional<Order> ORDER = this.findById(id);
		if (ORDER.isPresent()) {
			Order order = ORDER.get();
			if (order.getPaymentType().equals("WALLET")) {
				String uri = "http://WALLET-SERVICE/transaction/refund/" + order.getTransactionId();
				String msg = restTemplate.getForObject(uri, String.class);
				System.out.println(msg);
			}
			order.setOrderStatus("CANCELLED");
			return orderRepository.save(order);
		} else {
			throw new Exception("Could not find this order.");
		}
	}


}

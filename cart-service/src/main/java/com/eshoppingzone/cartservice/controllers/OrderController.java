package com.eshoppingzone.cartservice.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.cartservice.models.Order;
import com.eshoppingzone.cartservice.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@GetMapping("/getall")
	public List<Order> getall() {
		return orderService.getall();
	}


	@GetMapping("/getpending")
	public List<Order> getPending() {
		return orderService.getPending();
	}


	@GetMapping("/getcompleted")
	public List<Order> getcompleted() {
		return orderService.getcompleted();
	}


	@GetMapping("/getcancelled")
	public List<Order> getCancelled() {
		return orderService.getCancelled();
	}


	@GetMapping("/userorders/{userId}")
	public List<Order> userOrders(@PathVariable String userId) {
		return orderService.userOrders(userId);
	}


	@GetMapping("/order/{id}")
	public Optional<Order> findById(@PathVariable String id) {
		return orderService.findById(id);
	}

	// temp
	@PostMapping("/add")
	public void addnew(@RequestBody Order order, BindingResult result) {
		orderService.add(order);
	}


	@GetMapping("/complete/{id}")
	public void completed(@PathVariable String id) {
		orderService.completeOrder(id);
	}


	@GetMapping("/cancel/{id}")
	public void cancel(@PathVariable String id) {
		orderService.cancelOrder(id);
	}

}

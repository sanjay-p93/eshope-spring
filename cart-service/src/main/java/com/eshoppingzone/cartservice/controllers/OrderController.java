package com.eshoppingzone.cartservice.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.cartservice.models.Order;
import com.eshoppingzone.cartservice.services.OrderService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@GetMapping("/getall")
	@ApiOperation(value = "Retrieves all orders", notes = "Find all orders", response = Order.class, responseContainer = "List")
	public List<Order> getall() {
		return orderService.getall();
	}


	@GetMapping("/getByStatus/{status}")
	@ApiOperation(value = "Retrieves orders by order status", notes = "Provide status to look up orders", response = Order.class, responseContainer = "List")
	public List<Order> getPending(@PathVariable String status) {
		System.out.println(status);
		return orderService.getByStatus(status);
	}

	@GetMapping("/userorders/{userId}")
	@ApiOperation(value = "Retrieves orders by user id", notes = "Provide user id to look up orders for a specific users", response = Order.class, responseContainer = "List")
	public List<Order> userOrders(@PathVariable String userId) {
		return orderService.userOrders(userId);
	}


	@GetMapping("/order/{id}")
	@ApiOperation(value = "Retrieves order by id", notes = "Provide id to look up specific order", response = Order.class)
	public Optional<Order> findById(@PathVariable String id) {
		return orderService.findById(id);
	}


	@GetMapping("/complete/{id}")
	@ApiOperation(value = "Complete an order by Id", notes = "Provide id to complete a specific order")
	public Order completed(@PathVariable String id) throws Exception {
		return orderService.completeOrder(id);
	}


	@GetMapping("/cancel/{id}")
	@ApiOperation(value = "Cancel an order by Id", notes = "Provide id to cancel a specific order")
	public Order cancel(@PathVariable String id) throws Exception {
		return orderService.cancelOrder(id);
	}

}

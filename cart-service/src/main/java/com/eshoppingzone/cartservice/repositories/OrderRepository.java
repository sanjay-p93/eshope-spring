package com.eshoppingzone.cartservice.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.cartservice.models.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

	List<Order> findByOrderStatus(String string);

	List<Order> findByUserId(String userId);

}


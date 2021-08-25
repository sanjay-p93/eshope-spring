package com.eshoppingzone.cartservice.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.cartservice.models.Cart;

public interface CartRepository extends MongoRepository<Cart, String> {


	Optional<Cart> findOneByUserId(String userId);

}


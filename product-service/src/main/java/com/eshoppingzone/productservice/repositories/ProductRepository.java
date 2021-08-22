package com.eshoppingzone.productservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.productservice.models.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

}

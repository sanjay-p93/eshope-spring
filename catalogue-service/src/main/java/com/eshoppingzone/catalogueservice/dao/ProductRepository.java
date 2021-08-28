package com.eshoppingzone.catalogueservice.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.catalogueservice.models.Product;


public interface ProductRepository extends MongoRepository<Product, String> {

	Product findOneById(String id);

	List<Product> findByCategory(String category);

	List<Product> findByNameRegex(String name);

}

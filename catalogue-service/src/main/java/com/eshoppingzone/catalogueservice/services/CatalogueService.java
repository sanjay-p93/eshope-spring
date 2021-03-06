package com.eshoppingzone.catalogueservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshoppingzone.catalogueservice.models.Product;
import com.eshoppingzone.catalogueservice.repositories.ProductRepository;

@Service
public class CatalogueService {

	@Autowired
	private ProductRepository productRepository;

	// get all the products
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	// get product by id
	public Product getProductById(String id) {
		return productRepository.findOneById(id);
	}

	// get product by category
	public List<Product> getProductByCategory(String category) {
		return productRepository.findByCategory(category);
	}

	// get product by name
	public List<Product> getProductByName(String name) {
		name = "\\b" + name + ".*\\b";
		return productRepository.findByNameRegex(name);
	}
}

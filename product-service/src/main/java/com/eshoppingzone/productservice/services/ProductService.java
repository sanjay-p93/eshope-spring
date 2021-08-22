package com.eshoppingzone.productservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshoppingzone.productservice.models.Product;
import com.eshoppingzone.productservice.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public void save(Product product) {
		productRepository.save(product);

	}

	public void deleteProduct(String id) {
		productRepository.deleteById(id);
	}
}

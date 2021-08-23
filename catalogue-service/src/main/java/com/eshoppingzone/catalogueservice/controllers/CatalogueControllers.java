package com.eshoppingzone.catalogueservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.catalogueservice.models.Product;
import com.eshoppingzone.catalogueservice.services.CatalogueService;

@RestController
@RequestMapping("/catalogue")
public class CatalogueControllers {

	@Autowired
	private CatalogueService catalogueService;

	@GetMapping("products")
	public List<Product> findAllProducts() {
		return catalogueService.getAllProducts();
	}

	@GetMapping("product/{id}")
	public Product findProductById(@PathVariable String id) {
		return catalogueService.getProductById(id);
	}

	@GetMapping("category/{category}")
	public List<Product> getProductByCategory(@PathVariable String category) {
		return catalogueService.getProductByCategory(category);
	}

	@GetMapping("products/name/{name}")
	public List<Product> getProductByName(@PathVariable String name) {
		return catalogueService.getProductByName(name);
	}
}

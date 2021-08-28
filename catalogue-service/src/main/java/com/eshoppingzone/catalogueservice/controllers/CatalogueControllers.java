package com.eshoppingzone.catalogueservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.catalogueservice.models.Product;
import com.eshoppingzone.catalogueservice.services.CatalogueService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/catalogue")
@CrossOrigin(origins = "http://localhost:4200")
public class CatalogueControllers {

	@Autowired
	private CatalogueService catalogueService;

	@GetMapping("products")
	@ApiOperation(value = "Retrieves all products", notes = "Find all products", response = Product.class, responseContainer = "List")
	public List<Product> findAllProducts() {
		return catalogueService.getAllProducts();
	}

	@GetMapping("product/{id}")
	@ApiOperation(value = "Retrieves products by id", notes = "Provide id to look up specific product", response = Product.class)
	public Product findProductById(@PathVariable String id) {
		return catalogueService.getProductById(id);
	}

	@GetMapping("category/{category}")
	@ApiOperation(value = "Retrieves products by category", notes = "Provide category name to look up product according to category", response = Product.class, responseContainer = "List")
	public List<Product> getProductByCategory(@ApiParam(value ="Catrgory of products you want to retrive",required =true) 
											@PathVariable String category) {
		return catalogueService.getProductByCategory(category);
	}

	@GetMapping("products/name/{name}")
	@ApiOperation(value = "Retrieves products by name", notes = "Provide name or initial part of name to look up product according to name", response = Product.class, responseContainer = "List")
	public List<Product> getProductByName(@PathVariable String name) {
		return catalogueService.getProductByName(name);
	}
}

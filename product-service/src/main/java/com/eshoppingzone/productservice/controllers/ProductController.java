package com.eshoppingzone.productservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.productservice.models.Product;
import com.eshoppingzone.productservice.services.ProductService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/save")
	@ApiOperation(value = "Add or Update product", notes = "Provide a product model to add new product or Provide a product model with Id to update a specific product")
	public Product addnew(@RequestBody Product product, BindingResult result) {
		return productService.save(product);
	}

	@DeleteMapping("/delete/{id}")
	@ApiOperation(value = "Delete a product", notes = "Provide Id to delete a specific product")
	public void deleteProduct(@PathVariable String id) {
		productService.deleteProduct(id);
	}

}

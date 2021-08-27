package com.eshoppingzone.productservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.productservice.models.Product;
import com.eshoppingzone.productservice.services.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/add")
	public void addnew(@RequestBody Product product, BindingResult result) {
		productService.save(product);
	}

	@PostMapping("/update")
	public void update(@RequestBody Product product, BindingResult result) {
		productService.save(product);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteProduct(@PathVariable String id) {
		productService.deleteProduct(id);
	}

}

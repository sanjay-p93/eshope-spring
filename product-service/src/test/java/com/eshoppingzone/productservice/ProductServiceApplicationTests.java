package com.eshoppingzone.productservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.eshoppingzone.productservice.models.Product;
import com.eshoppingzone.productservice.repositories.ProductRepository;
import com.eshoppingzone.productservice.services.ProductService;

@SpringBootTest
class ProductServiceApplicationTests {

	@Autowired
	private ProductService service;

	@MockBean
	private ProductRepository repository;

	@Test
	public void saveTest() {
		Product product = new Product();
		when(repository.save(product)).thenReturn(product);
		assertEquals(product, service.save(product));
	}

	@Test
	public void deleteProduct() {
		String id = "qwerty12346";
		service.deleteProduct(id);
		verify(repository, times(1)).deleteById(id);
	}


}

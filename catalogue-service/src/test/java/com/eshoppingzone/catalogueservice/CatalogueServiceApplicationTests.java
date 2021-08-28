package com.eshoppingzone.catalogueservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.eshoppingzone.catalogueservice.dao.ProductRepository;
import com.eshoppingzone.catalogueservice.models.Product;
import com.eshoppingzone.catalogueservice.services.CatalogueService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class CatalogueServiceApplicationTests {

	@Autowired
	private CatalogueService service;

	@MockBean
	private ProductRepository repository;

	@Test
	public void getAllProductsTest() {
		when(repository.findAll())
		.thenReturn(
			Stream.of(
					new Product("id1", "TestProduct1", "Test descriptionq", BigDecimal.valueOf(23), "BOOKS","https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"),
					new Product("id2", "TestProduct2", "Test descriptionq3", BigDecimal.valueOf(10),"ELECTRONICS","https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg")
						).collect(Collectors.toList()));
		assertEquals(2, service.getAllProducts().size());

	}

	@Test
	public void getProductById() {
		String id = "id1";
		Product product = new Product("id1", "TestProduct1", "Test descriptionq", BigDecimal.valueOf(23), "BOOKS",
				"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg");
		when(repository.findOneById(id)).thenReturn(product);
		assertEquals(product, service.getProductById(id));
	}

	@Test
	public void getProductByCategory() {
		String category = "BOOK1S";
		when(repository.findByCategory(category))
				.thenReturn(Stream
						.of(new Product("id1", "TestProduct1", "Test descriptionq", BigDecimal.valueOf(23), "BOOKS",
								"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"))
						.collect(Collectors.toList()));
		assertEquals(1, service.getProductByCategory(category).size());

	}

	@Test
	public void getProductByName() {
		String name = "TestProduct1";
		when(repository.findByNameRegex("\\b" + name + ".*\\b"))
				.thenReturn(Stream
						.of(new Product("id1", "TestProduct1", "Test descriptionq", BigDecimal.valueOf(23), "BOOKS",
								"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"))
						.collect(Collectors.toList()));
		assertEquals(1, service.getProductByName(name).size());

	}

}

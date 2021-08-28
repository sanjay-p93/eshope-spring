package com.eshoppingzone.catalogueservice.models;

import java.math.BigDecimal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Document(collection = "Products")
@ApiModel(description = "Deatils about the product")
public class Product {

	@Id
	@ApiModelProperty(notes = "The unique id of the product")
	private String id;
	@TextIndexed
	@ApiModelProperty(notes = "Name of the product")
	private String name;
	@ApiModelProperty(notes = "Details about the product")
	private String description;
	@ApiModelProperty(notes = "Product cost")
	private BigDecimal price;
	@ApiModelProperty(notes = "Product category")
	private String category;
	@ApiModelProperty(notes = "Image of product")
	private String imageUrl;

	public Product() {
		super();
	}

	public Product(String id, String name, String description, BigDecimal price, String category, String imageUrl) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
		this.imageUrl = imageUrl;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", category=" + category + ", imageUrl=" + imageUrl + "]";
	}
}

package com.eshoppingzone.catalogueservice;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class CatalogueServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatalogueServiceApplication.class, args);
	}

	@Bean
	public Docket swaggerConfig() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.eshoppingzone.catalogueservice.controllers"))
				.paths(PathSelectors.ant("/catalogue/**")).build().apiInfo(apiInfo());
	}

	private ApiInfo apiInfo() {
		return new ApiInfo("Catalogue Service", "Service to retrieve ", "1.0", "Free to use",
				new Contact("Sanjay Prakash", "http://eshop-zonee.com", "sanjay@eshop-zone.com"), "License of API",
				"http://eshop-zonee.com", Collections.emptyList());
	}

}

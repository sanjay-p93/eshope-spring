package com.eshoppingzone.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

import com.eshoppingzone.gateway.filters.post.SimplePostFilter;
import com.eshoppingzone.gateway.filters.pre.SimpleFilter;

@EnableZuulProxy
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public SimpleFilter simpleFilter() {
		return new SimpleFilter();
	}

	@Bean
	public SimplePostFilter postFilter() {
		return new SimplePostFilter();
	}

}
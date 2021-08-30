package com.eshoppingzone.gateway.model;


public class JWTRespone {
	private String jwtToken;

	public JWTRespone() {
	}

	public JWTRespone(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
}

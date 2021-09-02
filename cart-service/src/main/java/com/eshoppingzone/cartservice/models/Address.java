package com.eshoppingzone.cartservice.models;

public class Address {

	public String building;
	public String street;
	public String landmark;
	public String city;
	public int zip;

	public Address(String building, String street, String landmark, String city, int zip) {
		super();
		this.building = building;
		this.street = street;
		this.landmark = landmark;
		this.city = city;
		this.zip = zip;
	}

	public Address() {
		super();
	}

}

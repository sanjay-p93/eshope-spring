package com.eshoppingzone.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.eshoppingzone.gateway.model.JWTRequest;
import com.eshoppingzone.gateway.model.JWTRespone;
import com.eshoppingzone.gateway.model.user;
import com.eshoppingzone.gateway.service.userservice;
import com.eshoppingzone.gateway.utility.JWTUtility;

@RestController
@RequestMapping("/eshop")
public class controller {

	@Autowired
	private JWTUtility jwtUtility;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private userservice userservice;

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/authenticate")
	public JWTRespone authenticate(@RequestBody JWTRequest jwtRequest) throws Exception {

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())

			);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID CREDENTIALS", e);
		}

		final UserDetails userDetails = userservice.loadUserByUsername(jwtRequest.getUsername());
		final String token = jwtUtility.generateToken(userDetails);
		return new JWTRespone(token);
	}

	@PostMapping("/signup")
	public user signup(@RequestBody user user, BindingResult result) throws Exception {

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		try {
			String uri = "http://localhost:8081/users/signup";
			ResponseEntity<user> response = restTemplate.postForEntity(uri, user, user.class);
			return response.getBody();
		} catch (Exception e) {
			throw new Exception("SIGN UP FAILED", e);
		}
	}

	@PostMapping("/save")
	public user update(@RequestBody user user, BindingResult result) throws Exception {

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		try {
			String uri = "http://localhost:8081/users/save";
			ResponseEntity<user> response = restTemplate.postForEntity(uri, user, user.class);
			return response.getBody();
		} catch (Exception e) {
			throw new Exception("Profile update failed", e);
		}
	}
}

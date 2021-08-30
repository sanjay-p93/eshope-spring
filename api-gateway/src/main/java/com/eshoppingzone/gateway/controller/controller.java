package com.eshoppingzone.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.gateway.model.JWTRequest;
import com.eshoppingzone.gateway.model.JWTRespone;
import com.eshoppingzone.gateway.service.userservice;
import com.eshoppingzone.gateway.utility.JWTUtility;

@RestController
@RequestMapping("/gateway")
public class controller {

	@Autowired
	private JWTUtility jwtUtility;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private userservice userservice;

	@GetMapping("/ping")
	public String ping() {
		return "ping from Gateway";
	}

	@PostMapping("/authenticate")
	public JWTRespone authenticate(@RequestBody JWTRequest jwtRequest) throws Exception {

		System.out.println("-----------------------done --------------");

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())

			);
			System.out.println("-----------------------done --------------");
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID CREDENTIALS", e);
		}

		final UserDetails userDetails = userservice.loadUserByUsername(jwtRequest.getUsername());

		final String token = jwtUtility.generateToken(userDetails);

		return new JWTRespone(token);
	}
}

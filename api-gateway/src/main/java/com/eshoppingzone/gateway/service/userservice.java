package com.eshoppingzone.gateway.service;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eshoppingzone.gateway.model.user;


@Service
public class userservice implements UserDetailsService {


	@Autowired
	RestTemplate restTemplate;

	private static Logger LOGGER = LoggerFactory.getLogger(userservice.class);

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		try {
			String uri = "http://USER-SERVICE/users/user/" + username;
			user currentUser = restTemplate.getForObject(uri, user.class);
			if (currentUser == null) {
				throw new UsernameNotFoundException("User not found");
			}
			// set roles
			List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(currentUser.getRole()));

			// return spring security user instance
			return new User(currentUser.getEmail(), currentUser.getPassword(), authorities);
		} catch (Exception e) {
			throw new UsernameNotFoundException("User not found");
		}

	}
}
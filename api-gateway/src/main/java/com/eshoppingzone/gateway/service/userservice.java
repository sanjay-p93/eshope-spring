package com.eshoppingzone.gateway.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eshoppingzone.gateway.model.user;
import com.eshoppingzone.gateway.repository.UserRepository;

@Service
public class userservice implements UserDetailsService {

	@Autowired
	UserRepository details;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<user> user = details.findOneByEmail(username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		user currentUser = user.get();

		// set roles
		List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(currentUser.getRole()));

		// return spring security user instance
		return new User(currentUser.getEmail(), currentUser.getPassword(), authorities);
	}
}
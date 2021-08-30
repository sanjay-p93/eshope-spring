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
import com.eshoppingzone.gateway.repository.userDetails;

@Service
public class userservice implements UserDetailsService {

	@Autowired
	userDetails details;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		System.out.println(username);
		Optional<user> user = details.findByUsername(username);
		System.out.println(user);

		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}

		List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("USER"));

		return new User(user.get().getUsername(), user.get().getPassword(), authorities);
		// return new User("user","user",new ArrayList<>());
	}
}
package com.eshoppingzone.userservice.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshoppingzone.userservice.models.User;
import com.eshoppingzone.userservice.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	//get user by email
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findOneByEmail(email);
	}

	public void save(User user) {
		userRepository.save(user);
	}
}

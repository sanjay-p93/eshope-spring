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

	public User save(User user) throws Exception {
		Optional<User> existingUser = this.getUserByEmail(user.getEmail());
		if (existingUser.isEmpty()) {
			user.setRole("CUSTOMER");
			return userRepository.save(user);
		} else {
			throw new Exception("User with email " + user.getEmail() + " already exist.");

		}
	}
}

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

	// add new user if not already exist else throws exception
	public User addnew(User user) throws Exception {
		Optional<User> existingUser = this.getUserByEmail(user.getEmail());
		if (existingUser.isEmpty()) {
			user.setRole("CUSTOMER");
			return userRepository.save(user);
		} else {
			throw new Exception("User with email " + user.getEmail() + " already exist.");

		}
	}

	// save updated user
	public User save(User user) throws Exception {
		Optional<User> USER = this.getUserByEmail(user.getEmail());
		System.out.println("------------- \n\n");
		System.out.println(user);
		if (USER.isPresent()) {
			User existingUser = USER.get();
			user.setRole(existingUser.getRole());
			user.setId(existingUser.getId());
			return userRepository.save(user);
		} else {
			throw new Exception("Couldnt find valid user by the name email " + user.getEmail());

		}
	}
}

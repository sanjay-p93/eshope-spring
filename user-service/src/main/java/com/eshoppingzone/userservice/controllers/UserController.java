package com.eshoppingzone.userservice.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.userservice.models.User;
import com.eshoppingzone.userservice.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/user/{email}")
	public Optional<User> findById(@PathVariable String email) {
		return userService.getUserByEmail(email);
	}

	@PostMapping("/save_user")
	public void addnew(@RequestBody User user, BindingResult result) {
		userService.save(user);
	}

}

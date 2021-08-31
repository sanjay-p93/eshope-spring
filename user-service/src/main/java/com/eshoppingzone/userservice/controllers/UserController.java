package com.eshoppingzone.userservice.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshoppingzone.userservice.models.User;
import com.eshoppingzone.userservice.services.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/user/{email}")
	@ApiOperation(value = "Find user by email", notes = "Provide an email id to look up specific user", response = User.class)
	public Optional<User> findById(@PathVariable String email) {
		return userService.getUserByEmail(email);
	}

	@PostMapping("/save_user")
	@ApiOperation(value = "Add a new user", notes = "Provide userdetails to add a new user")
	public User addnew(@RequestBody User user, BindingResult result) throws Exception {
		return userService.save(user);
	}

}

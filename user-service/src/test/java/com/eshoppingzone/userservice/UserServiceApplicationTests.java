package com.eshoppingzone.userservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.eshoppingzone.userservice.models.User;
import com.eshoppingzone.userservice.repositories.UserRepository;
import com.eshoppingzone.userservice.services.UserService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class UserServiceApplicationTests {

	@Autowired
	private UserService service;

	@MockBean
	private UserRepository repository;

	@Test
	public void findByIdTest() {
		String email = "john@gmail.com";
		Optional<User> user = Optional.of(new User());
		when(repository.findOneByEmail(email)).thenReturn(user);
		assertEquals(user, service.getUserByEmail(email));

	}

	@Test
	public void addnewTest() throws Exception {
		User user = new User();
		user.setEmail("sanjay@wqw");
		user.setPassword("password");
		user.setName("sanjay");
		when(repository.save(user)).thenReturn(user);
		assertEquals(user, service.addnew(user));
	}

	@Test
	public void addnewTest2() {
		User user = new User();
		user.setEmail("sanjay@wqw");
		user.setPassword("password");
		user.setName("sanjay");
		Optional<User> userOptoional = Optional.of(user);
		when(repository.save(user)).thenReturn(user);
		when(repository.findOneByEmail(user.getEmail())).thenReturn(userOptoional);
		assertThrows(Exception.class, () -> service.addnew(user));
	}

	@Test
	public void saveTest() throws Exception {
		User user = new User();
		user.setEmail("sanjay@wqw");
		user.setPassword("password");
		user.setName("sanjay");
		Optional<User> userOptoional = Optional.of(user);
		when(repository.save(user)).thenReturn(user);
		when(repository.findOneByEmail(user.getEmail())).thenReturn(userOptoional);
		assertEquals(user, service.save(user));
	}

	@Test
	public void saveTest2() {
		User user = new User();
		user.setEmail("sanjay@wqw");
		user.setPassword("password");
		user.setName("sanjay");
		when(repository.save(user)).thenReturn(user);
		when(repository.findOneByEmail(user.getEmail())).thenReturn(null);
		assertThrows(Exception.class, () -> service.save(user));
	}
	
}

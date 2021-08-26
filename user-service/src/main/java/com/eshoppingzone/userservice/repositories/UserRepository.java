package com.eshoppingzone.userservice.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.userservice.models.User;

public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findOneByEmail(String email);

}

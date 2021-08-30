package com.eshoppingzone.gateway.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.gateway.model.user;

public interface userDetails extends MongoRepository<user, String> {

	Optional<user> findByUsername(String username);

	Optional<user> findByPassword(String string);
}
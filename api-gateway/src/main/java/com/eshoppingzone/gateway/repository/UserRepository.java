package com.eshoppingzone.gateway.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.gateway.model.user;

public interface UserRepository extends MongoRepository<user, String> {


	Optional<user> findOneByEmail(String username);
}
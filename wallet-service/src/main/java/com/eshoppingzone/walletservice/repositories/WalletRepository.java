package com.eshoppingzone.walletservice.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.walletservice.models.Wallet;

public interface WalletRepository extends MongoRepository<Wallet, String> {


	Optional<Wallet> findOneByUserId(String id);

}

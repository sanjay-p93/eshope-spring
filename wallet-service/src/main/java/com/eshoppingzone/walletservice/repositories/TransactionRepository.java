package com.eshoppingzone.walletservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshoppingzone.walletservice.models.Transaction;

public interface TransactionRepository extends MongoRepository<Transaction, String> {


}

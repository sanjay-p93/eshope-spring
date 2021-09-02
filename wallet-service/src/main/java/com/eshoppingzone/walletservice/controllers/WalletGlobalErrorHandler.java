package com.eshoppingzone.walletservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class WalletGlobalErrorHandler {

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<String> notFountGlobal(Exception e) {
		return ResponseEntity.badRequest().body(e.getLocalizedMessage());
	}

}

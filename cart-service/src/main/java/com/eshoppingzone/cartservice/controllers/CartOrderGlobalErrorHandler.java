package com.eshoppingzone.cartservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.eshoppingzone.cartservice.exceptions.WalletException;

@ControllerAdvice
public class CartOrderGlobalErrorHandler {

	@ExceptionHandler(value = WalletException.class)
	public ResponseEntity<String> erroHndle1(Exception e) {
		return ResponseEntity.badRequest().body(e.getLocalizedMessage());
	}

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<String> notFountGlobal(Exception e) {
		return ResponseEntity.badRequest().body(e.getLocalizedMessage());
	}

}

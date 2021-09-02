package com.eshoppingzone.walletservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.eshoppingzone.walletservice.models.Topup;
import com.eshoppingzone.walletservice.models.Transaction;
import com.eshoppingzone.walletservice.models.Wallet;
import com.eshoppingzone.walletservice.repositories.TransactionRepository;
import com.eshoppingzone.walletservice.repositories.WalletRepository;
import com.eshoppingzone.walletservice.services.TransactionService;
import com.eshoppingzone.walletservice.services.WalletService;

@SpringBootTest
class WalletServiceApplicationTests {

	@Autowired
	private WalletService walletService;
	@Autowired
	private TransactionService transactionService;

	@MockBean
	private WalletRepository walletRepository;
	@MockBean
	private TransactionRepository transactionRepository;

	//wallet test
	
	@Test
	void walletFindByIdTest() {
		String id="qwerty";
		Optional<Wallet> wallet = Optional.of(new Wallet());
		when(walletRepository.findOneByUserId(id)).thenReturn(wallet);
		assertEquals(wallet, walletService.findById(id));
	}

	@Test
	void walletAddTest() {
		Wallet wallet = new Wallet();
		when(walletRepository.save(wallet)).thenReturn(wallet);
		assertEquals(wallet, walletService.add(wallet));
	}

	@Test
	void walletSave() {
		Wallet wallet = new Wallet();
		when(walletRepository.save(wallet)).thenReturn(wallet);
		assertEquals(wallet, walletService.add(wallet));
	}

	@Test
	void walletTopupTest() {
		Topup topUp = new Topup();
		String id = "qwerty";
		topUp.setUserId(id);
		Wallet wallet = new Wallet();
		Optional<Wallet> walletOptional = Optional.of(new Wallet());
		when(walletRepository.findOneByUserId(id)).thenReturn(walletOptional);
		when(walletRepository.save(wallet)).thenReturn(wallet);
		try {
			assertEquals(wallet, walletService.topup(topUp));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Test
	void walletTopupTest2() {
		Topup topUp = new Topup();
		String id = "qwerty";
		topUp.setUserId(id);
		Wallet wallet = new Wallet();
		when(walletRepository.findOneByUserId(id)).thenReturn(null);
		when(walletRepository.save(wallet)).thenReturn(wallet);
		assertThrows(Exception.class, () -> walletService.topup(topUp));
	}


	//Transaction
	
	@Test
	void transactionFindByIdTest() {
		String id = "qwerty";
		Optional<Transaction> transaction = Optional.of(new Transaction());
		when(transactionRepository.findById(id)).thenReturn(transaction);
		assertEquals(transaction, transactionService.findById(id));
	}

	@Test
	void save() {
		Transaction transaction =new Transaction();
		transactionService.save(transaction);
		verify(transactionRepository, times(1)).save(transaction);
	}

	@Test
	void add() {
		Transaction transaction = new Transaction();
		transaction.setId("qwerty");
		when(transactionRepository.save(transaction)).thenReturn(transaction);
		assertEquals("qwerty", transactionService.initiateTransaction(transaction));
	}
	
	@Test
	public void completeTransaction() {
		String id = "1";
		when(transactionRepository.findById(id)).thenReturn(null);
		assertThrows(Exception.class, () -> transactionService.completeTransaction(id));
	}

	@Test
	public void refundTransaction() {
		String id = "1";
		when(transactionRepository.findById(id)).thenReturn(null);
		assertThrows(Exception.class, () -> transactionService.refundTransaction(id));
	}
}

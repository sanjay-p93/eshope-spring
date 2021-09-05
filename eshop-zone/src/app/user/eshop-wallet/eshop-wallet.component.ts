import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-eshop-wallet',
  templateUrl: './eshop-wallet.component.html',
  styleUrls: ['./eshop-wallet.component.css']
})
export class EshopWalletComponent implements OnInit {

  constructor(private walletService:WalletService) { }

  wallet!:Wallet;


  getWallet(){
    this.walletService.getShopWallet().subscribe(
      result=>this.wallet=result
    )
  }

  ngOnInit(): void {
    this.getWallet();
  }

}

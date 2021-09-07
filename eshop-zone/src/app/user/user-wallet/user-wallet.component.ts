import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css']
})
export class UserWalletComponent implements OnInit {

  constructor(
    private walletService:WalletService,
    public dialog: MatDialog
  ) { }
  
  wallet!:Wallet;
  amount:number=0;
  isAdd:boolean=false;
  isTopUp:boolean=false;

  getWallet(){
    this.walletService.getWallet().subscribe(
      result=>this.wallet=result
    )
  }

  addNew(){

    this.isAdd=true;
  }

  newTopUp(){
    this.isTopUp=true;
  }

  cancel(){
    this.isAdd=false;
    this.isTopUp=false;
    this.amount=0;

  }

  add(){
    if(this.amount<0){
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Warning',
          content:`Invalid entry.`
        }
      });
      return;
    }
    this.walletService.createOrTopUP(this.amount,"add").subscribe(result=>{
      this.wallet=result;
      this.isAdd=false;
    })
  }


  topup(){
    if(this.amount<1){
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Warning',
          content:`Please add an amount greater than zero.`
        }
      });
      return;
    }
    this.walletService.createOrTopUP(this.amount,"topup").subscribe(result=>{
      this.wallet=result;
      this.isTopUp=false;
    })
  }

  ngOnInit(): void {
    this.getWallet();
  }

}

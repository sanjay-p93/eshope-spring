import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TopUp } from '../models/topUp';
import { Wallet } from '../models/wallet';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  private walletUrl = 'http://localhost:8080/wallet-service/wallet/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    public dialog: MatDialog
  ) { }

  getWallet(): Observable<Wallet> {
    let url: string= this.walletUrl+"check/"+this.localstorageService.getUserId();
    return this.http.get<Wallet>(url).pipe(
        catchError(this.handleError<Wallet>('Wallet retrival ',undefined))
      );
  }

  getShopWallet(): Observable<Wallet> {
    let url: string= this.walletUrl+"check/eshope";
    return this.http.get<Wallet>(url).pipe(
        catchError(this.handleError<Wallet>('Wallet retrival ',undefined))
      );
  }

  createOrTopUP(amount:number,service:string): Observable<Wallet> {
    let url: string= this.walletUrl+service;
    let topup:TopUp={userId:this.localstorageService.getUserId(),balance:amount};
    return this.http.post<Wallet>(url,topup,this.httpOptions).pipe(
      catchError(this.handleError<Wallet>(`Request to ${service} `,undefined))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

 
      let message=`Oops something went wrong at Eshop-Zone, ${operation} failed. Try again after sometime.`;
      if(error.status==403){
        message=`You are not authorized to do this action.`
      }
      else if(typeof(error.error)=="string"){
        message=error.error;
      }
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Error',
          content:message
        }
      });
      
      console.error(error.error); 
      console.log(`${operation} failed : ${error.message}`);

      //returning empty result
      return of(result as T);
    };
  }
}

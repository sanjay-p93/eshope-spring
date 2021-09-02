import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TopUp } from '../models/topUp';
import { Wallet } from '../models/wallet';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  private walletUrl = 'http://localhost:8080/wallet/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) { }

  getWallet(): Observable<Wallet> {
    let url: string= this.walletUrl+"check/"+this.localstorageService.getUserId();
    return this.http.get<Wallet>(url).pipe(
        catchError(this.handleError<Wallet>('Wallet retrival ',undefined))
      );
  }

  createOrTopUP(amount:number,service:string): Observable<Wallet> {
    let url: string= this.walletUrl+service;
    let topup:TopUp={userId:this.localstorageService.getUserId(),balance:amount};
    return this.http.post<Wallet>(url,topup,this.httpOptions).pipe(
      catchError(this.handleError<Wallet>('Wallet topup ',undefined))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if(error.status==403){
        alert("You are not authorized to do this action");
      }
      else if(typeof(error.error)=="string"){
        alert(error.error);
      }
      else{
        alert(`Oops something went wrong at Eshop-Zone, ${operation} failed. Try again after sometime.`);
      }

      console.error(error.error); 
      console.log(`${operation} failed : ${error.message}`);

      //returning empty result
      return of(result as T);
    };
  }
}

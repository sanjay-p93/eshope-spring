import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { DeleteItemWrapper } from '../models/deleteItemWrapper';
import { ItemQuantityWrapper } from '../models/itemQuantityWrapper';
import { NewCartItemWrapper } from '../models/newCartItemWrapper';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartUrl = 'http://localhost:8080/cart/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) { }


  getCart(): Observable<Cart> {
    let getUrl: string= this.cartUrl+"get/"+this.localstorageService.getUserId();
    console.log(getUrl);
    return this.http.get<Cart>(getUrl)
      .pipe(
        catchError(this.handleError<Cart>('Catalouge retrival', undefined))
      );
  }

  addItem(cartItem :CartItem): Observable<Cart> {
    console.log(cartItem)
    const addItemUrl: string =this.cartUrl+"addNewitem";
    const wrapper:NewCartItemWrapper={userId:this.localstorageService.getUserId(),cartItem: cartItem }
    return this.http.post<Cart>(addItemUrl,wrapper,this.httpOptions)
      .pipe(
        catchError(this.handleError<Cart>('Adding new item',undefined))
      );
  }

  updateQuantity(cartItem :CartItem):Observable<Cart>{
    const updateQtyUrl: string =this.cartUrl+"updateitemquantity";
    const wrapper: ItemQuantityWrapper = {userId:this.localstorageService.getUserId(),itemId: cartItem.id,quantity: cartItem.quantity}
    return this.http.post<Cart>(updateQtyUrl,wrapper,this.httpOptions)
      .pipe(
        catchError(this.handleError<Cart>('Adding new item',undefined))
      );
  }

  deleteItem(cartItem :CartItem):Observable<Cart>{
    const deletionUrl: string =this.cartUrl+"deleteItem";
    const wrapper: DeleteItemWrapper = {userId:this.localstorageService.getUserId(),itemId: cartItem.id}
    return this.http.post<Cart>(deletionUrl,wrapper,this.httpOptions)
      .pipe(
        catchError(this.handleError<Cart>('Adding new item',undefined))
      );
  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status==403){
        alert("You are not authorized for this action.",);
      }
      else if(typeof(error.error)=="string"){
        alert(error.error);
      }
      else{
        alert("Oops something went wrong. Try again after sometime.");
      }
      console.error(error.error); 
      console.log(`${operation} failed : ${error.message}`);

      //returning empty result
      return of(result as T);
    };
  }
}

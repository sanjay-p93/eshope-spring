import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CheckoutDetails } from '../models/checkoutDetails';
import { DeleteItemWrapper } from '../models/deleteItemWrapper';
import { ItemQuantityWrapper } from '../models/itemQuantityWrapper';
import { NewCartItemWrapper } from '../models/newCartItemWrapper';
import { Order } from '../models/order';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartUrl = 'http://localhost:8080/cart-service/cart/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    public dialog: MatDialog
  ) { }


  getCart(): Observable<Cart> {
    let getUrl: string= this.cartUrl+"get/"+this.localstorageService.getUserId();
    return this.http.get<Cart>(getUrl)
      .pipe(
        catchError(this.handleError<Cart>('Cart retrival', undefined))
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
        catchError(this.handleError<Cart>('Adding item',undefined))
      );
  }

  deleteItem(cartItem :CartItem):Observable<Cart>{
    const deletionUrl: string =this.cartUrl+"deleteItem";
    const wrapper: DeleteItemWrapper = {userId:this.localstorageService.getUserId(),itemId: cartItem.id}
    return this.http.post<Cart>(deletionUrl,wrapper,this.httpOptions)
      .pipe(
        catchError(this.handleError<Cart>('Removal ',undefined))
      );
  }

  checkOut(checkoutDetails:CheckoutDetails):Observable<Order>{
    const checkOutUrl: string =this.cartUrl+"checkout";
    return this.http.post<Order>(checkOutUrl,checkoutDetails,this.httpOptions)
      .pipe(
        catchError(this.handleError<Order>('Removal ',undefined))
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

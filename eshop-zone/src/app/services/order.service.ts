import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:8080/orders/';



  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) { }

  getall(): Observable<Order[]> {
    let url: string= this.orderUrl+"getall";
    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError<Order[]>('Cart retrival', []))
      );
  }


  getUserOrder(): Observable<Order[]> {
    let url: string= this.orderUrl+"userorders/"+this.localstorageService.getUserId();
    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError<Order[]>('Cart retrival', []))
      );
  }

  getOrderById(orderId:string): Observable<Order> {
    let url: string= this.orderUrl+"order/"+orderId;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError<Order>('Cart retrival', undefined))
      );
  }

  completeOrder(orderId:string): Observable<Order> {
    let url: string= this.orderUrl+"complete/"+orderId;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError<Order>('Cart retrival', undefined))
      );
  }

  cancelOrder(orderId:string): Observable<Order> {
    let url: string= this.orderUrl+"cancel/"+orderId;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError<Order>('Cart retrival', undefined))
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

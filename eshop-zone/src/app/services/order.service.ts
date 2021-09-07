import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:8080/orders/';
  
  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    public dialog: MatDialog
  ) { }

  getall(): Observable<Order[]> {
    let url: string= this.orderUrl+"getall";
    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError<Order[]>('Order retrival', []))
      );
  }


  getUserOrder(): Observable<Order[]> {
    let url: string= this.orderUrl+"userorders/"+this.localstorageService.getUserId();
    return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError<Order[]>('Order retrival', []))
      );
  }

  getOrderById(orderId:string): Observable<Order> {
    let url: string= this.orderUrl+"order/"+orderId;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError<Order>('Order retrival', undefined))
      );
  }

  completeOrder(orderId:string): Observable<Order> {
    let url: string= this.orderUrl+"complete/"+orderId;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError<Order>('Completion process', undefined))
      );
  }

  cancelOrder(orderId:string): Observable<Order> {
    let url: string= this.orderUrl+"cancel/"+orderId;
    return this.http.get<Order>(url)
      .pipe(
        catchError(this.handleError<Order>('Cancel process', undefined))
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

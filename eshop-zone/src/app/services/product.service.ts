import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/product-service/product/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  saveProduct(product:Product): Observable<Product> {
    const url: string =this.productUrl+"save";
    return this.http.post<Product>(url,product,this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('Save operatoin ',undefined))
      );
  }

  deleteProduct(productId:string): Observable<any> {
    const url: string =this.productUrl+"delete/"+productId;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('Delete operation',"FAILED"))
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

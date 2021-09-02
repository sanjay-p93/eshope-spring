import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, of} from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private catalogueUrl = 'http://localhost:8080/catalogue/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    let getAllUrl: string= this.catalogueUrl+"products";   
    return this.http.get<Product[]>(getAllUrl)
      .pipe(
        catchError(this.handleError<Product[]>('Catalouge retrival', []))
      );
  }

  getByCategory(category: string): Observable<Product[]> {
    let getAllUrl: string= this.catalogueUrl+"category/"+category;   
    return this.http.get<Product[]>(getAllUrl)
      .pipe(
        catchError(this.handleError<Product[]>('Catalouge retrival', []))
      );
  }

  getById(id: string): Observable<Product> {
    let getAllUrl: string= this.catalogueUrl+"product/"+id;   
    return this.http.get<Product>(getAllUrl)
      .pipe(
        catchError(this.handleError<Product>('Catalouge retrival', undefined))
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

      console.error(error); 
      console.log(`${operation} failed : ${error.message}`);

      //returning empty result
      return of(result as T);
    };
  }
}

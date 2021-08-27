import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, of} from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private catalogueUrl = 'http://localhost:8083/catalogue/';

  constructor(
    private http: HttpClient,
  ) { }

  getProducts(filter : string): Observable<Product[]> {
    let getAllUrl: string= this.catalogueUrl+filter;
    console.log(getAllUrl);
     
    return this.http.get<Product[]>(getAllUrl)
      .pipe(
        catchError(this.handleError<Product[]>('Catalouge retrival', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed : ${error.message}`);

      //returning empty result
      return of(result as T);
    };
  }
}

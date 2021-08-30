import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JWTRequest } from '../models/JWTRequest';
import { JWTRespone } from '../models/JWTRespone';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signinUrl = 'http://localhost:8080/gateway/authenticate';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  signIn(jwtReq : JWTRequest): Observable<JWTRespone> {
    return this.http.post<JWTRespone>(this.signinUrl,jwtReq,this.httpOptions)
      .pipe(
        catchError(this.handleError<JWTRespone>('Sign in', {jwtToken:""}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status==403){
        alert("Invalid Cradentials");
      }
      else{
        alert("Oops somthing went wrong.");
      }
      console.error(error); 
      console.log(`${operation} failed : ${error.message}`);
      //returning empty result
      return of(result as T);
    };
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable ,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JWTRequest } from '../models/JWTRequest';
import { JWTRespone } from '../models/JWTRespone';
import { User } from '../models/user';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public signinUrl = 'http://localhost:8080/eshop/authenticate';
  public signupUrl = 'http://localhost:8080/user-service/users/signup'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  signIn(jwtReq : JWTRequest): Observable<JWTRespone> {
    return this.http.post<JWTRespone>(this.signinUrl,jwtReq,this.httpOptions)
      .pipe(
        catchError(this.handleError<JWTRespone>('Sign in', {jwtToken:""}))
      );
  }


  signUp(user : User): Observable<User> {
    return this.http.post<User>(this.signupUrl,user,this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Sign up',undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      let message=`Oops something went wrong at Eshop-Zone, ${operation} failed. Try again after sometime.`;
      if(error.status==403){
        message=`Invalid credentials.`
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

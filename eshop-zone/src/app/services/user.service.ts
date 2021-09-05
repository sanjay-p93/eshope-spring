import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users/'; 
  private updateUrl = 'http://localhost:8080/eshop/save'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private isLoggedIn = new Subject<boolean>();
  isLoggedIn$ =this.isLoggedIn.asObservable();
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ){}


  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 2 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getUserDetails(email : string): Observable<User> {
    let url: string= this.userUrl+"user/"+email;
    return this.http.get<User>(url).pipe(
        catchError(this.handleError<User>('User detail retrieval',undefined))
      );
  }

  updateDetails(user: User) {
    return this.http.post<User>(this.updateUrl,user,this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('User detail updation',undefined))
      );
  }

  logOut(){
    localStorage.clear();
    this.isLoggedIn.next(false);
    this.snackBar("You have been logged out");
    this.router.navigate(['home']);
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users/'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient,
    private router: Router
  ) { }


  getUserDetails(email : string): Observable<User> {
    let url: string= this.userUrl+"user/"+email;
    return this.http.get<User>(url).pipe(
        catchError(this.handleError<User>('User detail retrieval',undefined))
      );
  }

  updateDetails(user: User) {
    let url: string= this.userUrl+"save";
    return this.http.post<User>(url,user,this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('User detail updation',undefined))
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

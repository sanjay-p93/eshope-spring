import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users/user/'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huQDEyMyIsImV4cCI6MTYzMDQwODg5NCwidGVzdDEiOiJoZWxsbzEyMyIsImlhdCI6MTYzMDM5MDg5NH0.nGn4B8kMhQps19P2mqu3sOiNhdjd7HfUqJmSCrSHeVxGu-3gLBH19SMPWN3Zx1J8ESGSgRe5dD1itmwBi_2VIQ' })
  };



  constructor(private http: HttpClient) { }


  getUserDetails(email : string): Observable<User> {
    let getAllUrl: string= this.userUrl+email;
    console.log(" gets user");
    console.log(getAllUrl);
     
    return this.http.get<User>(getAllUrl)
      .pipe(
        catchError(this.handleError<User>('User Details',undefined))
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:8080/cart/';


  constructor(private http: HttpClient) { }
}

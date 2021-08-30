import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderIntercepterService implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (httpRequest.url.includes("catalogue/")||httpRequest.url.includes("gateway/authenticate")
          ||httpRequest.url.includes("users/save_user")) {
      console.log("no porobs here "+httpRequest.url);      
      return next.handle(httpRequest);
    }
    
    const jwt=localStorage.getItem('eshopZoneToken');
    const Authorization = "Bearer "+jwt;
    console.log(jwt);
    return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
  }
}


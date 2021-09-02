import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getToken(){
    return localStorage.getItem('eshopZoneToken');
  }

  getUser(){
    var USER = localStorage.getItem('eshopZoneUser');
    if(USER){
      let user: User = JSON.parse(USER);
      return user;
    }
    return undefined;
  }

  getUserId(){
    var USER = localStorage.getItem('eshopZoneUser');
    if(USER){
      let user: User = JSON.parse(USER);
      return user.id;
    }
    return "";
  }

  getRole(){
      return localStorage.getItem('eshopZoneRole')

  }

  getCartItemCount(){
    return localStorage.getItem('eshopZoneCartCount');
  }

  clear(){
    localStorage.clear();
  }

}

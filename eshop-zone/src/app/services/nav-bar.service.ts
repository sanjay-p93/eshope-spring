import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor() { }

  private isActive = new Subject<boolean>();
  isActive$ =this.isActive.asObservable();


  private cartItemCount = new Subject<number>();
  cartItemCount$ =this.cartItemCount.asObservable();

  hideNav(){
    this.isActive.next(false);
  }

  displayNav(){ 
    this.isActive.next(true);
  }

  setItemCount(count:number){
    this.cartItemCount.next(count);
  }
}

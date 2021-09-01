import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs/operators';
import { NavBarService } from '../services/nav-bar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private navBarService:NavBarService,
    private userService:UserService
  ) { }
  isActive:boolean=true;
  isLoggedIn:boolean=false;
  cartItemCount:number=0;

  setNavBar(){
    this.navBarService.isActive$.subscribe(
      isActive=>this.isActive=isActive
    );

  }

  setCartItemCount(){
    this.navBarService.cartItemCount$.subscribe(
      cartItemCount=>this.cartItemCount=cartItemCount
    );
  }


  setAsLoggedIn(){
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn=>this.isLoggedIn=isLoggedIn
    );
  }


  logOut(){
    this.userService.logOut();
  }

  ngOnInit(): void {
    this.setNavBar();
    this.setCartItemCount();
    this.setAsLoggedIn();
  }

}

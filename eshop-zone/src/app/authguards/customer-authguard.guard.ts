import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthguardGuard implements CanActivate {
  constructor(private localstorageService: LocalstorageService, private router: Router) {} 
  canActivate():boolean{
    if(!this.localstorageService.getUser()||!this.localstorageService.getRole()||!(this.localstorageService.getRole()=='CUSTOMER')){
      alert("Please sign as a customer to access this page!");
      this.router.navigateByUrl("/signin");  
    }
    return true;
  }
  
}

import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthguardGuard implements CanActivate {
  constructor(private localstorageService: LocalstorageService, private router: Router) {} 
  canActivate():boolean{
    if(!this.localstorageService.getUser()||!this.localstorageService.getRole()||!(this.localstorageService.getRole()=='ADMIN')){
      alert("Please sign as an admin to access this page!");
      this.router.navigateByUrl("/signin");  
    }
    return true;
  }
  
}
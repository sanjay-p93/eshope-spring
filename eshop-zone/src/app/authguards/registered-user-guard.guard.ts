import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserGuardGuard implements CanActivate {
  constructor(private localstorageService: LocalstorageService, private router: Router) {} 
  canActivate():boolean{
    if(!this.localstorageService.getUser()||!this.localstorageService.getRole()){
      alert("Please sign in to access this page!");
      this.router.navigateByUrl("/signin");  
    }
    return true;
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LocalstorageService } from './services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private localstorageService: LocalstorageService, private router: Router) {} 
  canActivate():boolean{
    console.log("here");
    
    if(!this.localstorageService.getUser()||!this.localstorageService.getRole()||!(this.localstorageService.getRole()=='ADMIN')){
      this.router.navigateByUrl("/signin");  
    }
    return true;
  }
  
}

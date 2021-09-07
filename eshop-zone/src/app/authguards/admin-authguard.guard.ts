import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CanActivate, Router} from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthguardGuard implements CanActivate {
  constructor(
    private localstorageService: LocalstorageService,
    private router: Router,
    public dialog: MatDialog
  ) {} 
  canActivate():boolean{
    if(!this.localstorageService.getUser()||!this.localstorageService.getRole()||!(this.localstorageService.getRole()=='ADMIN')){

      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Alert',
          content:`Please sign as an admin to access this page!`
        }
      });
      this.router.navigateByUrl("/signin");  
    }
    return true;
  }
  
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JWTRequest } from 'src/app/models/JWTRequest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { UserService } from 'src/app/services/user.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private navBarService:NavBarService,
    private authService:AuthService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  signupForm!: FormGroup;
  passwordEmpty:boolean=false;

  setUserDetails(){
    this.signupForm = this.formBuilder.group({
      name:             ["",[Validators.required,Validators.maxLength(25)]],
      password :        ["",Validators.required],
      confimPassword :  ["",Validators.required],
      email :           ["",[Validators.required,Validators.email]],
    }, { validators: PasswordValidator });

  }

  signUp(){
    
    if(!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      return
    }
    const formValue = this.signupForm.value;
    const user  = <User>{name:formValue.name,password :formValue.password,email :formValue.email};
    this.authService.signUp(user).subscribe(result=>{
        if(result){
          localStorage.setItem('eshopZoneUser', JSON.stringify(result));
          localStorage.setItem('eshopZoneRole', result.role);
          result.password=formValue.password;
          this.signIn(result);

        }
    });
    
  }
  signIn(user:User){
    const jwtReq : JWTRequest ={username:user.email,password:user.password};
    this.authService.signIn(jwtReq).subscribe(result=>{
        if(result.jwtToken!==""){
          localStorage.setItem('eshopZoneToken', result.jwtToken);
          this.router.navigate(['home']);
        }
        else{
          localStorage.clear();
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Alert',
              content:`You have been succesfully registered try logging in.`
            }
          });
          this.router.navigate(['signin']);
        }
    });
  }

  ngOnInit(): void {
    this.setUserDetails();
    this.navBarService.hideNav();
  }
}

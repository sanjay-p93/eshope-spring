import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { JWTRequest } from 'src/app/models/JWTRequest';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( 
    private formBuilder: FormBuilder, 
    private navBarService:NavBarService,
    private authService:AuthService,
    private router: Router,
    private userService:UserService

    ) { }

  signinForm!: FormGroup;

  setUserDetails(){
    this.signinForm = this.formBuilder.group({
      email:             ["rambo@123",Validators.required],
      password :        ["1234asdf",Validators.required],
    });

  }


  signIn(){
    if(!this.signinForm.valid) {
      this.signinForm.markAllAsTouched();
      return;
    }
    const formValue = this.signinForm.value;
    const jwtReq : JWTRequest ={username:formValue["email"],password:formValue["password"]};
    this.authService.signIn(jwtReq).subscribe(result=>{
        if(result.jwtToken!==""){
          localStorage.setItem('eshopZoneToken', result.jwtToken);
          this.getUser(jwtReq.username);
        }
    });
  }

  getUser(email : string){
    this.userService.getUserDetails(email).subscribe(user=>{
      if(!user){
        localStorage.clear();
        return;
      }
      localStorage.setItem('eshopZoneUser', JSON.stringify(user));
      localStorage.setItem('eshopZoneRole', user.role);
      this.userService.setAsLoggedIn();
      this.navBarService.displayNav();
      this.router.navigate(['home']);
    });
  }



  ngOnInit(): void {
    this.navBarService.hideNav();
    this.setUserDetails();
  }

}

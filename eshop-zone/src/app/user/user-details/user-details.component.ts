import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private localstorageService:LocalstorageService,
    private router: Router
  ) { }

  user!:User;
  userForm!: FormGroup;
  isEdit:boolean=false;

  createform(){

    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(25)]],
      email : [""],
      phone : ['',Validators.pattern("^[0-9]{10}$")],
      address : this.fb.group({
        building: [''],
        street:   [''],
        landmark: [''],
        city:     [''],
        zip:     ['',Validators.pattern("^[0-9]{6}$")],
      })
    }, { validators: PasswordValidator });
    this.userForm.disable();

  }

  setUserDetails(){
    this.userForm.enable();
    this.userForm.patchValue(this.user);
    this.userForm.disable();
  }


  edit(){
    this.isEdit=true;
    this.userForm.enable();
  }
  cancel(){
    this.isEdit=false;
    this.setUserDetails();
  }

  save(){
    if(!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isEdit=false;
    const formValue = this.userForm.getRawValue();
    const loggedUser=this.localstorageService.getUser();
    const user  = Object.assign({id:loggedUser?.id,password:loggedUser?.password},formValue);
    this.userService.updateDetails(user).subscribe(result=>{
      this.user=user;
      this.setUserDetails();
      localStorage.setItem('eshopZoneUser', JSON.stringify(result));
      
    });
  }

  getUserDetails(email?:string){
    if(!email){
      return;
    }
    this.userService.getUserDetails(email).subscribe(user=>{
      this.user=user;
      this.setUserDetails();
    })
  }
  
  ngOnInit(): void {
    this.createform();
    const email=this.localstorageService.getUser()?.email;
    this.getUserDetails(email);
  }

}

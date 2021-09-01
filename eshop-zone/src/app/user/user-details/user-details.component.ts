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

  userForm!: FormGroup;
  user!:User;
  isEdit:boolean=false;

  createform(){

    this.userForm = this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(25)]],
      password : ['',Validators.required],
      confimPassword : ['',Validators.required],
      email : [""],
      phone : [''],
      address : this.fb.group({
        building: [''],
        street:   [''],
        landmark: [''],
        city:     [''],
        zip:     [''],
      })
    }, { validators: PasswordValidator });
    this.userForm.disable();

  }

  setUserDetails(user:User){

    this.userForm.enable();
    this.userForm.patchValue(user);
    this.userForm.controls['confimPassword'].setValue(user.password);
    this.userForm.disable();
  }


  edit(){
    this.isEdit=true;
    this.userForm.enable();
  }
  cancel(){
    this.isEdit=false;
    this.userForm.disable();
  }

  save(){
    if(!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isEdit=false;
    const formValue = this.userForm.getRawValue();
    const user  = Object.assign({id:this.localstorageService.getUserId},formValue);
    this.userService.updateDetails(user).subscribe(result=>{
      this.setUserDetails(result);
      localStorage.setItem('eshopZoneUser', JSON.stringify(result));
      
    });
  }

  
  ngOnInit(): void {
    this.createform();

    const email=this.localstorageService.getUser()?.email;
    if(email){
      this.userService.getUserDetails(email).subscribe(user=>{
        this.setUserDetails(user);
      })
    }
    else{
      this.localstorageService.clear();
      this.router.navigate(['home']);
    }

    
  }

}

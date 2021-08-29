import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  userForm!: FormGroup;

  setUserDetails(){
    this.userForm = this.fb.group({
      name: ["",[Validators.required,Validators.maxLength(25)]],
      password : ["",Validators.required],
      confimPassword : ["",Validators.required],
      email : [{ value: '', disabled: true },],
      phone : [""],
      address : this.fb.group({
        building: [""],
        street:   [""],
        landmark: [""],
        city:     [""],
        zip:     [0],
      })
    }, { validators: PasswordValidator });

  }

  save(){
    console.log(this.userForm)
  }
  ngOnInit(): void {
    this.setUserDetails();
  }

}

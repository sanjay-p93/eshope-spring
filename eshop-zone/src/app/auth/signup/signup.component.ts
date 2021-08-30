import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private fb: FormBuilder) { }

  signupForm!: FormGroup;

  setUserDetails(){
    this.signupForm = this.fb.group({
      name:             ["",[Validators.required,Validators.maxLength(25)]],
      password :        ["",Validators.required],
      confimPassword :  ["",Validators.required],
      email :           ["",[Validators.required,Validators.email]],
    }, { validators: PasswordValidator });

  }

  signUp(){
    if(!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
    }
    console.log(this.signupForm.get("email")?.errors)
  }
  ngOnInit(): void {
    this.setUserDetails();
  }
}

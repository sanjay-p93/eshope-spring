import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  signinForm = new FormGroup({
    name: new FormControl(""),
    password : new FormControl("")
  });

  ngOnInit(): void {
  }

}

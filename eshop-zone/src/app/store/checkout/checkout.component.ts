import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isLinear = false;


  constructor(private _formBuilder: FormBuilder) { }

  addressForm!: FormGroup;
  paymentForm!: FormGroup;

  setUserDetails(){
    this.addressForm = this._formBuilder.group({
        building: ["",Validators.required],
        street:   ["",Validators.required],
        landmark: ["",Validators.required],
        city:     ["",Validators.required],
        zip:     [0],
      });

    this.paymentForm = this._formBuilder.group({
      paymentType: ['', Validators.required]
    });
  }

  save(){
    console.log(this.addressForm);

    console.log(this.paymentForm)
  }
  ngOnInit(): void {
    this.setUserDetails();
  }

}

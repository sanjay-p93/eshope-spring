import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { CheckoutDetails } from 'src/app/models/checkoutDetails';
import { CartService } from 'src/app/services/cart.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavBarService } from 'src/app/services/nav-bar.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isLinear = false;
  userAddress!:Address;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private localstorageService: LocalstorageService,
    private cartService:CartService,
    private navBarService: NavBarService
  ) { }


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addressForm!: FormGroup;
  paymentForm!: FormGroup;

  setUserDetails(){
    this.addressForm = this._formBuilder.group({
        building: ["",Validators.required],
        street:   ["",Validators.required],
        landmark: ["",Validators.required],
        city:     ["",Validators.required],
        zip:     ["",[Validators.required,Validators.pattern("^[0-9]{6}$")]],
      });

    this.paymentForm = this._formBuilder.group({
      paymentType: ['', Validators.required]
    });
  }

  checkAddressForm(){
    if(!this.addressForm.valid) {
      this.addressForm.markAllAsTouched();
    }
  }

  checkout(){
    const address= this.addressForm.value;
    const paymentType= this.paymentForm.get('paymentType')?.value;
    let checkoutDetails:CheckoutDetails={
      userId:       this.localstorageService.getUserId(),
      paymentType:  paymentType,
      address:      address
    };
    this.cartService.checkOut(checkoutDetails).subscribe(data=>{
      if(data){
        this.navBarService.setItemCount(0);
        this.snackBar("Your order was successfully placed");
        this.router.navigate(['orders']);
      }
    });
  }

  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  ngOnInit(): void {
    this.navBarService.displayNav();
    this.setUserDetails();
    this.userAddress=this.localstorageService.getUser()!.address;
    if(this.userAddress){
      this.addressForm.patchValue(this.userAddress);
    }
    
  }

}

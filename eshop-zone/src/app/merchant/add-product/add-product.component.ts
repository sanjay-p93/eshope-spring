import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productService:ProductService,
    private router: Router,
    private navBarService:NavBarService,
    private _snackBar: MatSnackBar
  ) {}

  product!:Product;
  productForm!: FormGroup;



  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  createForm(){
    this.productForm = this.fb.group({
      name:                 ["",[Validators.required,Validators.maxLength(25)]],
      description :         ["",Validators.required],
      price :               ["",[Validators.required,Validators.pattern("^[0-9]{1,5}$")]],
      category :            ["",[Validators.required]],
      imageUrl :            [""]
    });
  }


  save(){
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const newProduct:Product=Object.assign({id:""},this.productForm.value);
    this.productForm.disable();
    this.productService.saveProduct(newProduct).subscribe(data=>{
      console.log(data);
      if(data){
        this.snackBar("New product added");
        this.router.navigate(['merchant']);
      }
      this.product=data;
    })
  }

  ngOnInit() {

    this.navBarService.displayNav();
    this.createForm();
  }
}

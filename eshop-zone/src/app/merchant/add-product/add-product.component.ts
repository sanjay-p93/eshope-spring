import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { ProductService } from 'src/app/services/product.service';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private catalogueService: CatalogueService,
    private productService:ProductService,
    private router: Router,
  ) {}

  product!:Product;
  productForm!: FormGroup;

  createForm(){
    this.productForm = this.fb.group({
      name:                 ["",[Validators.required,Validators.maxLength(25)]],
      description :         ["",Validators.required],
      price :               ["",[Validators.required,Validators.pattern("^[0-9]{1,4}$")]],
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
        this.router.navigate(['productlist']);
      }
      this.product=data;
    })
  }

  ngOnInit() {
    this.createForm();
  }
}

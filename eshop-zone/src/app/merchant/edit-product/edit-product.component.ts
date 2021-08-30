import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  
  id!:string;

  productForm!: FormGroup;

  setProductDetails(){
    this.productForm = this.fb.group({
      name:                 ["",[Validators.required,Validators.maxLength(25)]],
      description :         ["",Validators.required],
      price :               ["",Validators.required],
      category :            ["",[Validators.required]],
      imageUrl :            ["",[Validators.required]]
    });

  }

  getProduct(id :string):void{
    console.log(id);
    this.id=id;
  }
  save(){
    console.log(this.id);
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getProduct(params['id']);
    });
    this.setProductDetails();
  }

}

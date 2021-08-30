import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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

  add(){
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
  }

  ngOnInit(): void {
    this.setProductDetails();
  }
}

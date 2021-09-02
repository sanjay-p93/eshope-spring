import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private catalogueService: CatalogueService,
    private productService:ProductService,
    private router: Router,
  ) {}

  product!:Product;
  isEdit:boolean=false;

  productForm!: FormGroup;

  createForm(){
    this.productForm = this.fb.group({
      name:                 ["",[Validators.required,Validators.maxLength(25)]],
      description :         ["",Validators.required],
      price :               ["",Validators.required],
      category :            ["",[Validators.required]],
      imageUrl :            ["",[Validators.required]]
    });
    this.productForm.disable();

  }

  getProduct(id :string):void{
    console.log("getProduct");
    this.catalogueService.getById(id).subscribe(data=>{
      this.product=data;
      this.setProductDetails();

    })
  }

  setProductDetails(){
    console.log("set");
    this.productForm.enable();
    this.productForm.patchValue(this.product);
    this.productForm.disable();
  }

  edit(){
    this.isEdit=true;
    this.productForm.enable();
  }

  cancelEdit(){
    this.setProductDetails()
    this.isEdit=false;
  }

  save(){
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue:Product=this.productForm.value;
    formValue.id=this.product.id;
    this.productForm.disable();
    this.productService.saveProduct(formValue).subscribe(data=>{
      console.log(data);
      if(!data){
        this.router.navigate(['productlist']);
      }
      this.product=data;
      this.setProductDetails();
      this.cancelEdit();

    })

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getProduct(params['id']);
    });
    this.createForm();
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class MerchantModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogueComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class StoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialModule
  ]
})
export class StoreModule { }

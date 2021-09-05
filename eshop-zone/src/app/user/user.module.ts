import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { MaterialModule } from '../material/material.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { EshopWalletComponent } from './eshop-wallet/eshop-wallet.component';


@NgModule({
  declarations: [
    ProfileComponent,
    OrderComponent,
    UserDetailsComponent,
    UserWalletComponent,
    OrderListComponent,
    EshopWalletComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule ,
    FormsModule
  ]
})
export class UserModule { }

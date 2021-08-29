import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { MaterialModule } from '../material/material.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    OrderComponent,
    UserDetailsComponent,
    UserWalletComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class UserModule { }

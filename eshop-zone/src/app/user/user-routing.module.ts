import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = 
[
  {path: 'profile', component: ProfileComponent},
  {path: 'order/{id}', component: OrderComponent},
  {path: 'orders', component: OrderListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

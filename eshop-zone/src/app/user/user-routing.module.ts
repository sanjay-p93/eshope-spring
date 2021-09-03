import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredUserGuardGuard } from '../authguards/registered-user-guard.guard';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = 
[
  {path: 'profile', component: ProfileComponent,canActivate: [RegisteredUserGuardGuard]},
  {path: 'orders', component: OrderListComponent,canActivate: [RegisteredUserGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

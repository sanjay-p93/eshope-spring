import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAuthguardGuard } from '../authguards/customer-authguard.guard';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = 
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: CatalogueComponent},
  {path: 'cart', component: CartComponent,canActivate: [CustomerAuthguardGuard]},
  {path: 'checkout', component: CheckoutComponent,canActivate: [CustomerAuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

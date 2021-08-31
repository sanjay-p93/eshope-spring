import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = 
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: CatalogueComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

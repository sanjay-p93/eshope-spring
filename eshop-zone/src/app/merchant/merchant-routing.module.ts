import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../authentication.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = 
[
  {path: 'merchant', component: ProductListComponent,canActivate: [AuthenticationGuard]},
  {path: 'merchant/add', component: AddProductComponent,canActivate: [AuthenticationGuard]},
  {path: 'merchant/edit/:id', component: EditProductComponent,canActivate: [AuthenticationGuard]},
  { path: 'merchant/**', redirectTo: 'merchant', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthguardGuard } from '../authguards/admin-authguard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = 
[
  {path: 'merchant', component: ProductListComponent,canActivate: [AdminAuthguardGuard]},
  {path: 'merchant/add', component: AddProductComponent,canActivate: [AdminAuthguardGuard]},
  {path: 'merchant/edit/:id', component: EditProductComponent,canActivate: [AdminAuthguardGuard]},
  { path: 'merchant/**', redirectTo: 'merchant', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }

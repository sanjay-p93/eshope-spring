import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from './store/store.module';
import { MerchantModule } from './merchant/merchant.module';
import { UserModule } from './user/user.module';

import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { HeaderIntercepterService } from './services/header-intercepter.service';
import { ErrorComponent } from './error/error.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ErrorComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    StoreModule,
    UserModule,
    MerchantModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeaderIntercepterService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

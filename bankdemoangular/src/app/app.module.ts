import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';

import { NewCustomerComponent } from './customer/new-customer/new-customer.component';
import { NewCustomerService } from './customer/new-customer/new-customer.service';
import { EditCustomerAdminComponent } from './customer/edit-customer-admin/edit-customer-admin.component';
import { EditCustomerAdminService } from './customer/edit-customer-admin/edit-customer-admin.service';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { EditCustomerService } from './customer/edit-customer/edit-customer.service';
import { DeleteCustomerComponent } from './customer/delete-customer/delete-customer.component';
import { DeleteCustomerService } from './customer/delete-customer/delete-customer.service';
import { NewAccountComponent } from './account/new-account/new-account.component';
import { NewAccountService } from './account/new-account/new-account.service';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { EditAccountService } from './account/edit-account/edit-account.service';
import { DeleteAccountComponent } from './account/delete-account/delete-account.component';
import { DeleteAccountService } from './account/delete-account/delete-account.service';
import { BalanceTransferOwnComponent } from './account/balance-transfer/balance-transfer-own.component';
import { BalanceTransferOwnService } from './account/balance-transfer/balance-transfer-own.service';
import { WelcomeComponent } from './common/welcome.component';
import { AboutComponent } from './common/about.component';




const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  { path: 'edit-customer-admin', component: EditCustomerAdminComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'delete-customer', component: DeleteCustomerComponent },
  { path: 'new-account', component: NewAccountComponent },
  { path: 'edit-account', component: EditAccountComponent },
  { path: 'delete-account', component: DeleteAccountComponent },
  { path: 'balance-transfer-own', component: BalanceTransferOwnComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  declarations: [
    AppComponent,
    NewCustomerComponent, EditCustomerAdminComponent, EditCustomerComponent, DeleteCustomerComponent,
    NewAccountComponent, EditAccountComponent, DeleteAccountComponent, BalanceTransferOwnComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NewCustomerService, EditCustomerService, EditCustomerAdminService, DeleteCustomerService,
    NewAccountService, EditAccountService, DeleteAccountService, BalanceTransferOwnService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Use RouterModule to set up routes
import { RouterModule } from '@angular/router';

// Importing service genergated with ng generate service
import { MerchantService } from './merchants.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { NavComponent } from './nav/nav.component';

// Create ROUTES object
const ROUTES = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MerchantsComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [MerchantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
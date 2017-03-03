import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Use RouterModule to set up routes
import { RouterModule } from '@angular/router';

// Importing service genergated with ng generate service
import { MerchantService } from './merchants.service';
import { StatesService } from './states.service';
import { RegisterService } from './register.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

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
  },
  {
    path:'merchants',
    component: MerchantsComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }  
];

@NgModule({
  declarations: [
    AppComponent,
    MerchantsComponent,
    LoginComponent,
    NavComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
  ],
  providers: [MerchantService,StatesService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
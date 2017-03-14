import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Use RouterModule to set up routes
import { Routes, RouterModule } from '@angular/router';

// Importing service genergated with ng generate service
import { NavigationService } from './shared/navigation.service';
import { MerchantService } from './shared/merchants.service';
import { StatesService } from './shared/states.service';
import { RegisterService } from './shared/register.service';
import { LoginService } from './shared/login.service';
import { ValidationsService } from './shared/validations.service';
import { ProfileService } from './shared/profile.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

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
    path:'merchants/:id',
    component: MerchantsComponent
  },    
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  }  
];

@NgModule({
  declarations: [
    AppComponent,
    MerchantsComponent,
    LoginComponent,
    NavComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
  ],
  providers: [NavigationService,MerchantService,StatesService,RegisterService,LoginService,ValidationsService,ProfileService], // YOU MUST ADD ALL SERVICES HERE
  bootstrap: [AppComponent]
})
export class AppModule { }
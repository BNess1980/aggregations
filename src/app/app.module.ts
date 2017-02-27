import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Use RouterModule to set up routes
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MerchantsComponent } from './merchants/merchants.component';

// Importing service genergated with ng generate service
import { MerchantService } from './merchants.service';
// Create ROUTES object
const ROUTES = [
  {
    path:'',
    redirectTo:'merchants',
    pathMatch:'full'
  },
  {
    path:'merchants',
    component: MerchantsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MerchantsComponent
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
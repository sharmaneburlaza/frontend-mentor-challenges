import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestCountriesApiRoutingModule } from './rest-countries-api-routing.module';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RestCountriesApiRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestCountriesApiModule { }

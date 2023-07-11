import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';

import { InputSwitchModule } from 'primeng/inputswitch';
import { RestCountriesApiModule } from './rest-countries-api/rest-countries-api.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MultiStepFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    HttpClientModule,
    RestCountriesApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
